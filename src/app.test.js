/**
 * app.test.js — structural guards for the hash-routed view restructure.
 *
 * app.js imports nothing, so renderApp / viewContent are pure string builders
 * and can be asserted on without a DOM. These tests exist because the failure
 * modes here are silent: a dropped bullet, a section that quietly stops
 * rendering, or a data-i18n key that exists in only two of three language
 * files all leave a page that still "loads".
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { renderApp, viewContent } from './app.js'
import en from './i18n/en.json'
import sv from './i18n/sv.json'
import bn from './i18n/bn.json'

const CONFIG = {
  whatsappNumber: '46760139960',
  phoneNumber: '+46 76 013 99 60',
  phoneLink: '+46760139960',
  emailAddress: 'info@skyconnect-travels.se',
}

const VIEWS = ['home', 'services', 'study', 'contact']
const SECTIONS = {
  home: ['hero', 'why-trust'],
  services: ['services'],
  study: ['study'],
  contact: ['contact'],
}
// Sections the restructure deletes: why-us + trust (replaced by why-trust),
// stories (moments gallery), faq, and the id-less alsoAvailable visa/hotels strip.
const DELETED_IDS = ['why-us', 'stories', 'trust', 'faq', 'also-available']
// The complete palette app.js is allowed to use. The contact rewrite dropped
// '#1eb85a' - the old WhatsApp button's hover, which nothing else used -
// and introduced nothing new.
const APPROVED_HEX = [
  '#0a0f1a', '#111827', '#25d366', '#b8944f',
  '#c9a96e', '#f28b82', '#f7f5f2', '#faf6ee',
]

const VIEW_HTML = Object.fromEntries(VIEWS.map((v) => [v, viewContent(v, CONFIG)]))
const SHELL = renderApp(CONFIG)
const ALL_HTML = [SHELL, ...VIEWS.map((v) => VIEW_HTML[v])].join('\n')

/** Section ids in document order. `[^>]*` cannot cross a tag, so an id-less
 *  section never picks up an id belonging to a child. */
function sectionIds(html) {
  return [...html.matchAll(/<section[^>]*\sid="([^"]+)"/g)].map((m) => m[1])
}

/** One section's markup. */
function section(html, id) {
  return html.split(`id="${id}"`)[1].split('</section>')[0]
}

/** Strip everything that is not authored text - SVG geometry, palette
 *  literals - so digit scans only see copy. Heroicons are dense with
 *  coordinates like '11.952 11.952 0 0012' and #111827 is a six-digit run,
 *  either of which would otherwise read as a phone number. */
function stripNonText(html) {
  return html
    .replace(/ d="[^"]*"/g, '')
    .replace(/ viewBox="[^"]*"/g, '')
    .replace(/ stroke-width="[^"]*"/g, '')
    .replace(/#[0-9a-fA-F]{3,8}\b/g, '')
    .replace(/ (?:width|height|sizes)="[^"]*"/g, '') // intrinsic 1920x1275 is not a date
    .replace(/ src(?:set)?="[^"]*"/g, '') // 'hero-flight-1920w.webp 1920w' is not a date // 'hero-flight-1920w.webp 1920w' is not a date
}

describe('view routing', () => {
  it('renders the expected section list per view', () => {
    for (const view of VIEWS) {
      expect(sectionIds(VIEW_HTML[view]), view).toEqual(SECTIONS[view])
    }
  })

  it('falls back to home for an unknown or empty view name', () => {
    expect(sectionIds(viewContent('nonsense', CONFIG))).toEqual(SECTIONS.home)
    expect(sectionIds(viewContent('', CONFIG))).toEqual(SECTIONS.home)
  })

  it('drops every retired section from all three views', () => {
    for (const view of VIEWS) {
      for (const id of DELETED_IDS) {
        expect(VIEW_HTML[view], `${view} must not render #${id}`).not.toContain(`id="${id}"`)
      }
    }
  })

  it('shows How it works inside the services view with a contact CTA', () => {
    expect(VIEW_HTML.services).toContain('data-i18n="how_title"')
    expect(VIEW_HTML.services).toContain('data-i18n="how1_title"')
    expect(VIEW_HTML.services).toContain('href="#/contact"')
  })

  it('lays the hero highlights out as a single row of three cards', () => {
    const heroList = VIEW_HTML.home.split('<ul class="grid grid-cols-1 sm:grid-cols-3')[1].split('</ul>')[0]
    expect((heroList.match(/<li /g) || [])).toHaveLength(3)
    for (const n of [1, 2, 3]) {
      expect(heroList).toContain(`data-i18n="hero_item${n}_title"`)
      expect(heroList).toContain(`data-i18n="hero_item${n}_desc"`)
    }
  })

  it('sends each hero highlight card where it belongs', () => {
    // The card id, the link target and the router's `card-<segment>` lookup have
    // to agree, or the click silently lands at the top of the services view.
    // Study is the exception: it has a fuller view of its own, so its hero card
    // goes there and note the services card still keeps a working deep link.
    for (const name of ['ticket', 'umrah']) {
      expect(VIEW_HTML.home, name).toContain(`href="#/services/${name}"`)
    }
    expect(VIEW_HTML.home).toContain('href="#/study"')
    expect(VIEW_HTML.home).not.toContain('href="#/services/study"')
    for (const name of ['ticket', 'umrah', 'study']) {
      expect(VIEW_HTML.services, name).toContain(`id="card-${name}"`)
    }
  })
})

describe('app shell', () => {
  it('renders header, one <main>, footer and the floating actions', () => {
    expect(SHELL).toContain('<main id="view-root">')
    expect(SHELL.match(/<main\b/g)).toHaveLength(1)
    expect(SHELL).toContain('class="float-whatsapp')
    expect(SHELL).toContain('id="back-to-top"')
  })

  it('boots into the home view inside <main>', () => {
    const main = SHELL.slice(SHELL.indexOf('<main id="view-root">'))
    expect(sectionIds(main)).toEqual(SECTIONS.home)
  })

  it('keeps the WhatsApp booking link intact', () => {
    expect(ALL_HTML).toContain(`https://wa.me/${CONFIG.whatsappNumber}`)
    expect(ALL_HTML).toContain(`tel:${CONFIG.phoneLink}`)
  })

  it('shows the email under Company in the footer', () => {
    expect(SHELL).toContain(`mailto:${CONFIG.emailAddress}`)
    expect(SHELL).toContain(CONFIG.emailAddress)
  })
})

describe('navbar', () => {
  it('offers exactly Home / Services / Study / Contact, twice (desktop + mobile)', () => {
    const navLinks = [...ALL_HTML.matchAll(/href="([^"]+)"[^>]*data-view="([^"]+)"/g)]
    expect(navLinks.map((m) => m[2])).toEqual([
      'home', 'services', 'study', 'contact', 'home', 'services', 'study', 'contact',
    ])
    expect(navLinks.map((m) => m[1])).toEqual([
      '#/home', '#/services', '#/study', '#/contact',
      '#/home', '#/services', '#/study', '#/contact',
    ])
  })

  it('routes the hero CTA and footer service links to the views', () => {
    expect(VIEW_HTML.home).toContain('href="#/services"') // hero CTA
    expect(SHELL).not.toContain('href="#booking"')
    expect(SHELL).not.toContain('href="#services"')
  })

  it('drops the dead Visa Assistance link from the footer', () => {
    expect(SHELL).not.toContain('data-i18n="card3_title"')
  })

  it('routes the study CTA to the contact view', () => {
    // Contact is its own view now, so this is a route the router handles.
    // initSmoothScroll deliberately skips '#/…' - feeding one to
    // querySelector would throw on the '/' and kill the whole click.
    expect(VIEW_HTML.study).toContain('href="#/contact"')
    expect(VIEW_HTML.study).not.toContain('href="#contact"')
  })
})

describe('contact view', () => {
  const contact = VIEW_HTML.contact

  it('is its own view rather than part of Study', () => {
    expect(sectionIds(contact)).toEqual(['contact'])
    expect(VIEW_HTML.study).not.toContain('id="contact"')
    expect(VIEW_HTML.study).not.toContain('contact-form')
  })

  it('reads the email and phone from config, never a literal', () => {
    expect(contact).toContain(`mailto:${CONFIG.emailAddress}`)
    expect(contact).toContain(`tel:${CONFIG.phoneLink}`)
    expect(contact).toContain(CONFIG.phoneNumber)
    const source = readFileSync(new URL('./app.js', import.meta.url), 'utf8')
    expect(source).not.toContain('skyconnect-travels.se')
    expect(source).not.toContain('+46')
  })

  it('posts nothing - the form composes a mailto: instead', () => {
    expect(contact).toContain('id="contact-form"')
    expect(contact).toContain('novalidate')
    expect(contact).not.toMatch(/<form[^>]*\saction=/)
    for (const id of ['cf-name', 'cf-email', 'cf-topic', 'cf-message']) {
      expect(contact).toContain(`id="${id}"`)
      expect(contact).toContain(`id="${id}-error"`)
      expect(contact).toContain(`aria-describedby="${id}-error"`)
    }
    // One live region per field, announced independently of the others.
    expect((contact.match(/role="alert"/g) || []).length).toBe(4)
    expect((contact.match(/<option/g) || []).length).toBe(4)
  })

  it('defaults the topic dropdown to Study Consultancy', () => {
    // No option carried `selected`, so the browser picked the first one -
    // Family Travel - and nothing asserted it, so it could regress silently
    // the moment the list was reordered.
    const select = contact.slice(contact.indexOf('id="cf-topic"'), contact.indexOf('</select>'))
    const options = [...select.matchAll(/<option\b[^>]*>/g)].map((m) => m[0])
    expect(options).toHaveLength(4)
    expect(options.filter((o) => /\bselected\b/.test(o))).toHaveLength(1)
    expect(options.find((o) => /\bselected\b/.test(o))).toContain('data-i18n="contact_topic_study"')
  })

  it('reuses the existing service names for the topic options', () => {
    // Reusing card1_title / card2_title keeps the service names in the nav,
    // footer, cards and this dropdown from drifting apart.
    expect(contact).toContain('data-i18n="card1_title"')
    expect(contact).toContain('data-i18n="card2_title"')
  })

  it('introduces no colour outside the approved palette', () => {
    const hex = [...new Set([...contact.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((m) => m[0].toLowerCase()))]
    expect(hex.filter((h) => !APPROVED_HEX.includes(h))).toEqual([])
  })

  it('keeps the contact panel dark in both modes', () => {
    // footer() is already bg-[#0a0f1a] with no dark: variant, so the bottom of the
    // page is dark in light mode today. Contact extends that band upward instead of
    // introducing a new alternation. A dark: prefix here would bring the bone section back.
    const section = contact.slice(contact.indexOf('<section id="contact"'), contact.indexOf('</section>'))
    expect(section).toContain('bg-[#111827]')
    expect(section).not.toContain('dark:bg-')
    expect(section).not.toContain('#f7f5f2')
  })

  it('flips the CTA to ink on gold so it passes AA', () => {
    // white on #c9a96e is 2.24:1 and fails AA. Ink on #c9a96e is 7.93:1, and the
    // gold stays as the brand accent - only the text colour inverts.
    const button = contact.slice(contact.indexOf('type="submit"'))
    expect(button).toContain('bg-[#c9a96e]')
    expect(button).toContain('text-[#111827]')
    expect(button).not.toContain('text-white')
  })

  it('uses a light red for form errors on the dark panel', () => {
    // #c5221f on navy is 2.77:1 - a pre-existing dark-mode bug that only became
    // visible once this section is always dark. Red must get lighter on a dark
    // surface, not darker. #f28b82 is 6.73:1.
    expect(contact).toContain('text-[#f28b82]')
    expect(contact).not.toContain('#c5221f')
    expect(contact).not.toContain('#EA4335')
  })

  it('collapses the contact details into one hairline row', () => {
    // The three stacked micro-label blocks are gone; email and phone stay real links.
    expect(contact).not.toContain('contact_label_email')
    expect(contact).not.toContain('contact_label_phone')
    expect(contact).not.toContain('contact_label_hours')
    expect(contact).toContain('mailto:')
    expect(contact).toContain('tel:')
    expect((contact.match(/data-i18n="hours"/g) || []).length).toBe(1)
  })
})

describe('layout positions', () => {
  it('uses the 12-column hero split', () => {
    const hero = VIEW_HTML.home
    expect(hero).toContain('lg:grid-cols-12')
    expect(hero).toContain('lg:col-span-7')
    expect(hero).toContain('lg:col-span-5')
    expect(hero).not.toContain('md:grid-cols-2')
  })

  it('uses bordered rows for the study steps', () => {
    const study = VIEW_HTML.study
    expect(study).toContain('md:grid-cols-[6rem_1fr_1fr]')
    expect((study.match(/border-b\b/g) || []).length).toBeGreaterThanOrEqual(3)
    expect(study).not.toContain('study-arrow')
    expect(study).not.toContain('tilt-card')
    expect((study.match(/data-study-reveal/g) || []).length).toBe(3)
  })

  it('stacks contact into one full-width column with an inset form panel', () => {
    const contact = section(VIEW_HTML.contact, 'contact')
    // Demo B dropped the two-column split in favour of copy above, panel below.
    expect(contact).not.toContain('lg:grid-cols-2')
    expect(contact).not.toContain('text-center')
    expect(contact).toContain('bg-white/[0.04]')
    // One hours line - the row is a single line, not three stacked label blocks.
    expect((contact.match(/data-i18n="hours"/g) || []).length).toBe(1)
  })

  it('uses the tighter section padding everywhere', () => {
    // The hero is min-height driven and never carried py-*.
    for (const view of VIEWS) {
      for (const id of SECTIONS[view].filter((s) => s !== 'hero')) {
        const s = section(VIEW_HTML[view], id)
        expect(s, id).toContain('py-12 md:py-16')
        expect(s, id).not.toContain('py-16 md:py-24')
      }
    }
    expect(VIEW_HTML.home).toContain('min-h-[85vh]')
  })

  it('keeps every study bullet', () => {
    for (const card of [1, 2, 3]) {
      for (const li of [1, 2, 3]) {
        expect(VIEW_HTML.study, `study_card${card}_li${li}`)
          .toContain(`data-i18n="study_card${card}_li${li}"`)
      }
    }
  })
})

describe('trust band', () => {
  it('replaces why-us + trust with three cards and no partner strip', () => {
    const home = VIEW_HTML.home
    expect(home).toContain('id="why-trust"')
    expect((home.match(/class="trust-item /g) || []).length).toBe(3)
    expect(home).not.toContain('Airticket AS')
    expect(home).not.toContain('trustband_partners')
    expect(home).toContain('data-trust-reveal')
  })

  it('publishes no phone number, contract date, price or guarantee', () => {
    const home = stripNonText(VIEW_HTML.home)
    expect(home).not.toContain('2242')                      // Airticket's switchboard
    expect(home).not.toMatch(/\btel:/)                      // no phone link
    expect(home).not.toMatch(/\+\d{2}/)                     // no country code
    expect(home).not.toMatch(/\d{2,4}[ -]\d{2,4}[ -]\d{2,4}/) // no grouped number
    expect(home).not.toMatch(/\b(?:19|20)\d{2}\b/)          // no contract date
    expect(home).not.toMatch(/@/)                           // no email address
    expect(home.toLowerCase()).not.toMatch(/garanti|guarantee/) // no "guarantee" - both spellings
    expect(home.toLowerCase()).not.toContain('pris')        // no pricing
    expect(home.toLowerCase()).not.toContain('licens')      // no "licensed"
  })
})

describe('no colour or typography change', () => {
  it('uses only the approved palette', () => {
    const source = readFileSync(new URL('./app.js', import.meta.url), 'utf8')
    const hex = [...new Set(
      [...source.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((m) => m[0].toLowerCase()),
    )]
    expect(hex.sort()).toEqual(APPROVED_HEX)
  })

  it('keeps the two self-hosted typefaces', () => {
    expect(ALL_HTML).toContain('headline-display')
    const css = readFileSync(new URL('./styles/main.css', import.meta.url), 'utf8')
    // Font families are declared only in the @font-face blocks. Pinning them
    // to the two self-hosted faces catches a third typeface sneaking in.
    expect([...new Set([...css.matchAll(/font-family:\s*"([^"]+)"/g)].map((m) => m[1]))].sort())
      .toEqual(['Inter', 'Playfair Display'])
    expect(css).toContain('.headline-display')
  })
})

describe('i18n coverage', () => {
  it('resolves every data-i18n key in all three languages', () => {
    const keys = [...new Set([...ALL_HTML.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]))]
    expect(keys.length).toBeGreaterThan(50)

    for (const lang of [['en', en], ['sv', sv], ['bn', bn]]) {
      const [name, dict] = lang
      const missing = keys.filter((k) => !(k in dict))
      expect(missing, `${name}.json is missing`).toEqual([])
    }
  })

  it('keeps the three languages the same shape', () => {
    const shape = (d) => Object.keys(d).sort().join(',')
    expect(shape(sv)).toBe(shape(en))
    expect(shape(bn)).toBe(shape(en))
  })

  it('has no key left over from a deleted section', () => {
    const dead = Object.keys(en).filter((k) =>
      /^(faq\d|faq_|moments?|moment\d|whyus\d|whyus_|trust[123]?_|card3_|nav_moments|booking_|tab_|label_|opt_|preset_|msg_(?!na$)|error_|email_fallback|passengers|infants_hint|btn_(flight|umrah|hotel)|form_caption|no_airports|clear|apply)/.test(k))
    expect(dead).toEqual([])
  })
})
