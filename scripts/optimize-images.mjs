/**
 * optimize-images.mjs — regenerate every derivative in public/images/ from the
 * pristine sources in originals/.
 *
 *   npm run images
 *
 * The site ships a <picture> per photo: a WebP <source> with a multi-width
 * srcset (what ~97% of browsers pick) and a JPEG <img> fallback. Widths are
 * chosen per asset from its largest rendered size on the page (see SPEC below)
 * rather than one global ladder, so we never ship a 1920w variant of an image
 * that only ever renders at 400px. Nothing is ever upscaled.
 *
 * Originals are never modified and never committed (see .gitignore) - this
 * script is the only supported way to produce the files in public/images/.
 */

import { readdir, mkdir, stat, rm, unlink } from 'node:fs/promises'
import { join, dirname, basename, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'originals')
const OUT = join(ROOT, 'public', 'images')

const JPEG_QUALITY = 80
const WEBP_QUALITY = 78

/**
 * Widths to emit per asset, widest first.
 *
 * The numbers are the largest CSS width each asset is displayed at, plus headroom
 * for 2x DPR:
 *   hero-flight       hero card (~50vw at md+) + full width below 768px  -> 1920
 *   humboldt-*        study backdrop (100vw) + wide service card (~66vw) -> 1920
 *   card strips       hero highlight cards: ~205px md+, full width mobile -> 1200
 */
const SPEC = {
  'hero-flight.jpg': [1920, 1280, 800, 480],
  'humboldt-university.jpg': [1920, 1280, 800, 480],
  // Hero highlight card strips: ~205px at md+, full width below 640px.
  'ticket.jpg': [1200, 800, 480],
  'umrah.jpg': [1200, 800, 480],
  'study.jpg': [1200, 800, 480],
}

/** Assets that are not photographic <img> content. */
const SPECIAL = {
  // A wordmark uploaded at 5823x2415, rendered at 40-48px tall. The 277px width
  // is the trimmed size the markup declares as width/height for CLS, so the
  // pipeline and src/app.js stay in agreement. Emitted lossless-ish because text
  // edges are the whole point of the asset.
  'SkyConnect (PNG).png': { kind: 'logo', width: 277 },
}

function isImage(file) {
  return /\.(jpe?g|png)$/i.test(file)
}

function fileName(stem, width, ext) {
  return `${stem}-${width}w.${ext}`
}

async function emit(inputPath, width, format, quality, outName) {
  const meta = await sharp(inputPath, { failOn: 'none' }).metadata()
  if (width > meta.width) return null

  let converter
  if (format === 'webp') converter = sharp(inputPath, { failOn: 'none' }).webp({ quality })
  // PNG is logo-only: trim transparent padding so the glyph aligns with
  // neighbouring text, then emit lossless-ish because text edges matter.
  else if (format === 'png') converter = sharp(inputPath, { failOn: 'none' }).trim().png({ compressionLevel: 9, effort: 7 })
  else converter = sharp(inputPath, { failOn: 'none' }).jpeg({ quality, mozjpeg: true, progressive: true })

  await mkdir(OUT, { recursive: true })
  await converter.resize({ width, withoutEnlargement: true }).toFile(join(OUT, outName))
  return (await stat(join(OUT, outName))).size
}

async function processPhoto(file) {
  const stem = basename(file, extname(file))
  const input = join(SRC, file)
  const widths = SPEC[file]
  if (!widths) throw new Error(`No width spec for "${file}" - add it to SPEC in this script.`)

  const meta = await sharp(input, { failOn: 'none' }).metadata()
  const emitted = []
  for (const width of widths) {
    const webp = await emit(input, width, 'webp', WEBP_QUALITY, fileName(stem, width, 'webp'))
    if (webp !== null) emitted.push({ width, webp })
  }
  if (emitted.length === 0) throw new Error(`No derivative produced for "${file}"`)

  // One JPEG fallback at the widest width we actually produced. `picture()` in
  // src/app.js always passes the full ladder and falls back to max(widths), so
  // this single file covers every usage. Browsers that lack WebP are old enough
  // that one mid-to-large JPEG is the pragmatic answer anyway.
  const fallbackWidth = emitted[0].width
  const jpeg = await emit(input, fallbackWidth, 'jpeg', JPEG_QUALITY, fileName(stem, fallbackWidth, 'jpg'))

  const total = emitted.reduce((n, e) => n + e.webp, 0) + (jpeg ?? 0)
  return {
    file,
    kind: 'photo',
    source: `${meta.width}x${meta.height}`,
    emitted,
    fallbackWidth,
    total,
  }
}

async function processLogo(file, width) {
  const input = join(SRC, file)
  const meta = await sharp(input, { failOn: 'none' }).metadata()
  // A wordmark uploaded at 5823x2415 and rendered at 40-48px tall. 277px wide
  // covers ~6x DPR at the navbar lockup. Emitted lossless-ish because text
  // edges are the whole point of the asset.
  const png = await emit(input, width, 'png', null, 'skyconnect-logo.png')
  return { file, kind: 'logo', source: `${meta.width}x${meta.height}`, emitted: [{ width, png }], fallbackWidth: null, total: png ?? 0 }
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

async function main() {
  const files = (await readdir(SRC)).filter(isImage).sort()
  if (files.length === 0) {
    console.error(`No source images found in ${SRC}`)
    process.exit(1)
  }

  // Clean slate so a renamed or dropped asset never leaves a stale derivative.
  await rm(OUT, { recursive: true, force: true })
  await mkdir(OUT, { recursive: true })

  const results = []
  for (const file of files) {
    results.push(SPEC[file] ? await processPhoto(file) : await processLogo(file, SPECIAL[file]?.width ?? 320))
  }

  await unlink(join(OUT, '.DS_Store')).catch(() => {})

  let grand = 0
  const sourceBytes = (await Promise.all(files.map((f) => stat(join(SRC, f)).then((s) => s.size)))).reduce((a, b) => a + b, 0)

  console.log('\npublic/images/')
  for (const r of results) {
    grand += r.total
    const widths = r.emitted.map((e) => `${e.width}w`).join(' ')
    console.log(
      `  ${r.file.padEnd(30)} ${r.source.padEnd(11)} -> ${(r.kind === 'logo' ? `${r.emitted[0].width}w png` : `${widths} webp + jpg`).padEnd(34)} ${kb(r.total)}`,
    )
  }

  const widest = results.reduce(
    (n, r) => n + Math.max(...r.emitted.map((e) => e.webp ?? e.png ?? 0)),
    0,
  )
  console.log(`\n  originals:     ${(sourceBytes / 1024 / 1024).toFixed(2)} MB`)
  console.log(`  derivatives:   ${(grand / 1024 / 1024).toFixed(2)} MB  (every format and width on disk)`)
  console.log(`  widest fetch:  ${(widest / 1024 / 1024).toFixed(2)} MB  (worst case: all images at their largest width)`)
  console.log(`  reduction:     ${(100 - (widest / sourceBytes) * 100).toFixed(0)}%\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
