/**
 * Responsive <picture> for a photo optimised by scripts/optimize-images.mjs.
 *
 * WebP is delivered through the <source srcset> (every browser made since
 * ~2020 selects it); the JPEG <img> is the fallback for the rest. The wrapper
 * carries the layout classes and the <img> is sized by `picture > img` in
 * main.css, so both end up filling the same box. object-position / opacity /
 * transform styling must go on the <img> via imgClass - it has no effect on
 * the wrapper.
 *
 * Pass the full width ladder from SPEC in the script rather than a subset: the
 * JPEG fallback is emitted at max(widths) only, so `sizes` is what right-sizes
 * any individual usage.
 *
 * @param {object} o
 * @param {string} o.stem          shared basename, e.g. 'hero-flight'
/**
 * Asset root, so this works both at `/` locally and on the `/skyConnect/`
 * project subpath. Vite substitutes this at build time, and it carries the
 * trailing slash already — so `${BASE}images/x` needs no separator.
 */
const BASE = import.meta.env.BASE_URL

/**
 * @param {number[]} o.widths      emitted widths, widest first
 * @param {string} o.sizes         sizes attribute
 * @param {string} o.pictureClass  layout classes for the wrapper
 * @param {string} [o.alt]
 * @param {string} [o.imgClass]    extra classes for the <img>
 * @param {string} [o.attrs]       extra attributes for the <img>
 * @param {number} [o.w] [o.h]     intrinsic size of the fallback, for CLS
 */
function picture({ stem, widths, sizes, pictureClass, alt = '', imgClass = '', attrs = '', w, h }) {
    const srcset = widths.map((width) => `${BASE}images/${stem}-${width}w.webp ${width}w`).join(', ')
    const fallback = `${BASE}images/${stem}-${Math.max(...widths)}w.jpg`
    const dims = w && h ? `width="${w}" height="${h}"` : ''
    const attrs2 = [
      `src="${fallback}"`,
      `alt="${alt}"`,
      imgClass ? `class="${imgClass}"` : '',
      dims,
      attrs,
    ].filter(Boolean).join(' ')
    return `
        <picture class="${pictureClass}">
          <source type="image/webp" srcset="${srcset}" sizes="${sizes}">
          <img ${attrs2}>
        </picture>`
  }

function header(c) {
  return `
  <!-- HEADER -->
  <header class="sticky top-0 z-50 bg-white/90 dark:bg-[#0a0f1a]/90 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-800/60">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-[72px]">
        <a href="#" class="flex items-center">
          <img src="${BASE}images/skyconnect-logo.png" alt="SkyConnect" class="h-14 object-contain" width="320" height="132" />
        </a>

        <nav class="hidden md:flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400" aria-label="Main">
          <a href="#/home" class="nav-link" data-view="home" data-i18n="nav_home">Home</a>
          <a href="#/services" class="nav-link" data-view="services" data-i18n="nav_services">Services</a>
          <a href="#/study" class="nav-link" data-view="study" data-i18n="nav_study">Study</a>
          <a href="#/contact" class="nav-link" data-view="contact" data-i18n="nav_contact">Contact</a>
        </nav>

        <div class="flex items-center gap-2 sm:gap-3">
          <div class="relative">
            <button id="lang-btn" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition" aria-haspopup="listbox" aria-expanded="false" aria-label="Select language">
              <span id="current-lang-flag" aria-hidden="true">🌐</span>
              <span id="current-lang">EN</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="lang-menu" role="listbox" aria-labelledby="lang-btn" class="hidden absolute right-0 mt-1 w-36 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-700 py-1 z-50">
              <button data-lang="en" class="lang-option w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 transition"><span aria-hidden="true">🌐</span> English</button>
              <button data-lang="sv" class="lang-option w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 transition"><span aria-hidden="true">🇸🇪</span> Svenska</button>
              <button data-lang="bn" class="lang-option w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 transition"><span aria-hidden="true">🇧🇩</span> বাংলা</button>
            </div>
          </div>

          <button id="theme-toggle" class="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition" aria-label="Toggle dark mode">
            <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>

          <a href="https://wa.me/${c.whatsappNumber}" target="_blank" rel="noopener" class="nav-whatsapp-btn hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-medium shadow-lg shadow-[#25D366]/25">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span class="hidden lg:inline">${c.phoneNumber}</span>
          </a>

          <button id="mobile-btn" class="md:hidden p-2 text-neutral-500 dark:text-neutral-400" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div id="mobile-menu" class="hidden md:hidden border-t border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-[#0a0f1a]">
      <div class="px-4 py-4 space-y-1 text-sm font-medium">
        <a href="#/home" class="mobile-nav-link" data-view="home" data-i18n="nav_home">Home</a>
        <a href="#/services" class="mobile-nav-link" data-view="services" data-i18n="nav_services">Services</a>
        <a href="#/study" class="mobile-nav-link" data-view="study" data-i18n="nav_study">Study</a>
        <a href="#/contact" class="mobile-nav-link" data-view="contact" data-i18n="nav_contact">Contact</a>
      </div>
    </div>
  </header>
  `
}

function hero(c) {
  return `
  <!-- HERO — Split Screen -->
  <section class="relative min-h-[85vh] flex items-center overflow-hidden bg-[#f7f5f2] dark:bg-[#0a0f1a]" id="hero">
    ${picture({
      stem: 'hero-flight',
      widths: [1920, 1280, 800, 480],
      sizes: '100vw',
      pictureClass: 'absolute inset-0 -z-20',
      alt: '',
      imgClass: 'hero-photo',
      attrs: 'fetchpriority="high"',
      w: 1920,
      h: 1275
    })}
    <div class="hero-wash absolute inset-0 -z-10" aria-hidden="true"></div>
    <div id="hero-glow" class="absolute inset-0 -z-5 pointer-events-none" aria-hidden="true"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 w-full py-24">
      <div class="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div class="lg:col-span-7">
          <h1 id="hero-title" class="headline-display text-4xl sm:text-5xl md:text-6xl text-neutral-900 dark:text-white mb-6">
            <span data-i18n="hero_title_1">Travel,</span><br>
            <span class="text-[#c9a96e]" data-i18n="hero_title_2">elevated.</span>
          </h1>
          <p id="hero-subtitle" class="text-lg text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed mb-6" data-i18n="hero_desc">
            Specialized in VFR flights to South Asia & Southeast Asia, complete Umrah packages and smooth visa handling.
          </p>
          <ul class="flex flex-col gap-2.5 mb-8">
            <li class="flex items-center gap-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">
              <span class="w-9 h-9 rounded-lg bg-[#c9a96e]/12 flex items-center justify-center flex-shrink-0 border border-[#c9a96e]/20">
                <svg class="w-[18px] h-[18px] text-[#c9a96e]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              </span>
              <span data-i18n="card1_title">Family Travel</span>
            </li>
            <li class="flex items-center gap-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">
              <span class="w-9 h-9 rounded-lg bg-[#c9a96e]/12 flex items-center justify-center flex-shrink-0 border border-[#c9a96e]/20">
                <svg class="w-[18px] h-[18px] text-[#c9a96e]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              </span>
              <span data-i18n="card2_title">Umrah Packages</span>
            </li>
            <li class="flex items-center gap-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">
              <span class="w-9 h-9 rounded-lg bg-[#c9a96e]/12 flex items-center justify-center flex-shrink-0 border border-[#c9a96e]/20">
                <svg class="w-[18px] h-[18px] text-[#c9a96e]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
              </span>
              <span data-i18n="study_title">Study Consultancy</span>
            </li>
          </ul>
          <div class="flex flex-wrap gap-3">
            <a href="#/services" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c9a96e] text-white font-medium text-sm hover:bg-[#b8944f] transition-all duration-200 active:scale-[0.98]">
              <span data-i18n="nav_services">Explore Services</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </a>
          </div>
        </div>
        <div class="relative hidden lg:block lg:col-span-5">
          <div class="rounded-xl overflow-hidden shadow-2xl dark:shadow-black/40 rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
            ${picture({
              stem: 'hero-flight',
              widths: [1920, 1280, 800, 480],
              sizes: '(min-width: 768px) 536px, 100vw',
              pictureClass: 'h-[480px]',
              alt: 'Premium travel experience',
              w: 1920,
              h: 1275
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
  `
}

function booking(c) {
  return `
  <!-- BOOKING -->
  <section id="booking" class="section-fade scroll-mt-20 py-12 md:py-16 bg-[#f7f5f2] dark:bg-[#0a0f1a]">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-14 items-start">
        <div data-service="flight">
          <div id="hero-form" class="bg-white dark:bg-[#111827] border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl p-6 md:p-8"></div>
        </div>
        <div class="md:sticky md:top-24 reveal">
          <p class="eyebrow mb-4" data-i18n="nav_services">Services</p>
          <h2 class="headline-display text-3xl md:text-[2.5rem] text-neutral-900 dark:text-white mb-4 leading-[1.1]"><span data-i18n="booking_title_1">Journeys,</span><br><span data-i18n="booking_title_2">handled with care.</span></h2>
          <p class="text-neutral-500 dark:text-neutral-400 max-w-sm text-[0.9375rem] leading-relaxed" data-i18n="services_desc">Personal service and strong airline connections for routes that suit you.</p>
          <p class="text-xs text-neutral-400 dark:text-neutral-500 mt-5" data-i18n="form_note">Request is sent directly via WhatsApp - we usually reply within minutes</p>
        </div>
      </div>
    </div>
  </section>
  `
}

function services() {
  return `
  <!-- SERVICES — Bento Grid -->
  <section id="services" class="section-fade scroll-mt-20 py-12 md:py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="mb-12 reveal">
        <h2 class="headline-display text-3xl md:text-4xl text-neutral-900 dark:text-white mb-3" data-i18n="services_title">Our expertise</h2>
        <p class="text-neutral-500 dark:text-neutral-400 max-w-md" data-i18n="services_desc">Personal service and strong airline connections for routes that suit you.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-5">
        <!-- 01 VFR Flights -->
        <div class="service-card tilt-card relative overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/60" data-service-reveal style="--service-delay: 0ms">
          ${picture({
            stem: 'dubai',
            widths: [800, 480],
            sizes: '(min-width: 768px) 33vw, 100vw',
            pictureClass: 'absolute inset-0',
            alt: '',
            attrs: 'loading="lazy"',
            w: 800,
            h: 1200
          })}
          <div class="service-photo-overlay absolute inset-0"></div>
          <div class="relative p-7 md:p-8 flex flex-col justify-end min-h-[280px] md:min-h-[340px]">
            <span class="headline-display text-3xl text-[#c9a96e] mb-3">01</span>
            <div class="service-icon w-11 h-11 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </div>
            <h3 class="headline-display text-2xl text-white mb-2" data-i18n="card1_title">VFR Flights</h3>
            <p class="text-sm text-white/70 leading-relaxed mb-4 max-w-md" data-i18n="card1_desc">Special fares and conditions for those visiting family in Bangladesh, India, Pakistan, Nepal, Sri Lanka and Vietnam.</p>
            <ul class="flex flex-wrap gap-2">
              <li class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/80 border border-white/10"><span data-i18n="card1_li1">Generous baggage (often 2×23 kg)</span></li>
              <li class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/80 border border-white/10"><span data-i18n="card1_li2">Child-friendly fares</span></li>
              <li class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/80 border border-white/10"><span data-i18n="card1_li3">Flexible rebooking</span></li>
            </ul>
          </div>
        </div>

        <!-- 02 Umrah -->
        <div class="service-card tilt-card relative overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-[#faf6ee] dark:bg-neutral-900" data-service-reveal style="--service-delay: 110ms">
          <div class="p-7 md:p-8 flex flex-col justify-end min-h-[280px] md:min-h-[340px]">
            <span class="headline-display text-3xl text-[#c9a96e] mb-3">02</span>
            <div class="service-icon w-11 h-11 rounded-lg bg-[#c9a96e]/15 flex items-center justify-center border border-[#c9a96e]/20 mb-4">
              <svg class="w-5 h-5 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <div>
              <h3 class="headline-display text-xl text-neutral-900 dark:text-white mb-2" data-i18n="card2_title">Umrah Packages</h3>
              <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4" data-i18n="card2_desc">Complete packages with flights, hotels near the Haramain and transfers.</p>
              <ul class="space-y-1.5">
                <li class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"><span class="w-1.5 h-1.5 rounded-full bg-[#c9a96e]"></span><span data-i18n="card2_li1">Hotels right by the Haram</span></li>
                <li class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"><span class="w-1.5 h-1.5 rounded-full bg-[#c9a96e]"></span><span data-i18n="card2_li2">Guaranteed travel protection</span></li>
                <li class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"><span class="w-1.5 h-1.5 rounded-full bg-[#c9a96e]"></span><span data-i18n="card2_li3">Swedish / Danish support</span></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 03 Study -->
        <div class="service-card tilt-card relative overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/60" data-service-reveal style="--service-delay: 220ms">
          ${picture({
            stem: 'humboldt-university',
            widths: [1920, 1280, 800, 480],
            sizes: '(min-width: 768px) 33vw, 100vw',
            pictureClass: 'absolute inset-0',
            alt: '',
            attrs: 'loading="lazy"',
            w: 1920,
            h: 1280
          })}
          <div class="service-photo-overlay absolute inset-0"></div>
          <div class="relative p-7 md:p-8 flex flex-col justify-end min-h-[280px] md:min-h-[320px]">
            <span class="headline-display text-3xl text-[#c9a96e] mb-3">03</span>
            <div class="service-icon w-11 h-11 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14v7m0-7l6.16-3.422"/></svg>
            </div>
            <h3 class="headline-display text-2xl text-white mb-2" data-i18n="study_title">Study Consultancy</h3>
            <p class="text-sm text-white/70 leading-relaxed mb-4 max-w-md" data-i18n="study_desc">Your gateway to education abroad - from university admissions to student visas.</p>
            <div class="flex flex-wrap gap-3">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/80 border border-white/10" data-i18n="study_pill_admissions">University Admissions</span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/80 border border-white/10" data-i18n="study_pill_visa">Student Visa</span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/80 border border-white/10" data-i18n="study_pill_predepart">Pre-Departure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
}

function study(c) {
  return `
  <!-- STUDY CONSULTANCY -->
  <section id="study" class="relative section-fade scroll-mt-20 py-12 md:py-16 overflow-hidden">
    ${picture({
      stem: 'humboldt-university',
      widths: [1920, 1280, 800, 480],
      sizes: '100vw',
      pictureClass: 'absolute inset-0 -z-20',
      alt: '',
      imgClass: 'study-photo',
      attrs: 'loading="lazy"',
      w: 1920,
      h: 1280
    })}
    <div class="study-wash absolute inset-0 -z-10" aria-hidden="true"></div>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <div class="text-center mb-12">
        <h2 class="headline-display text-3xl md:text-4xl text-white tracking-tight mb-3" data-i18n="study_title">Study Consultancy</h2>
        <p class="text-white/70 max-w-lg mx-auto" data-i18n="study_desc">Your gateway to education abroad - from university admissions to student visas.</p>
      </div>
      <div class="study-glass p-6 md:p-8">
        <div class="study-steps relative mt-10 space-y-8 md:space-y-10">
          <div class="grid md:grid-cols-[6rem_1fr_1fr] gap-6 items-start border-b border-white/15 pb-8 md:pb-10" data-study-reveal style="--study-delay: 0ms">
            <div class="headline-display text-4xl md:text-5xl text-[#c9a96e]">01</div>
            <div>
              <div class="study-step-icon w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center mb-4 border border-white/15">
                <svg class="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14v7m0-7l6.16-3.422"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white" data-i18n="study_card1_title">University Admissions</h3>
            </div>
            <div>
              <p class="text-[15px] text-white/60 leading-relaxed mb-5" data-i18n="study_card1_desc">We guide you through the entire application process.</p>
              <ul class="study-list space-y-2.5 text-[15px] text-white/80 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5">
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg><span data-i18n="study_card1_li1">Free initial consultation</span></li>
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg><span data-i18n="study_card1_li2">University selection & application</span></li>
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span data-i18n="study_card1_li3">Scholarship guidance</span></li>
              </ul>
            </div>
          </div>
          <div class="grid md:grid-cols-[6rem_1fr_1fr] gap-6 items-start border-b border-white/15 pb-8 md:pb-10" data-study-reveal style="--study-delay: 150ms">
            <div class="headline-display text-4xl md:text-5xl text-[#c9a96e]">02</div>
            <div>
              <div class="study-step-icon w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center mb-4 border border-white/15">
                <svg class="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white" data-i18n="study_card2_title">Student Visa</h3>
            </div>
            <div>
              <p class="text-[15px] text-white/60 leading-relaxed mb-5" data-i18n="study_card2_desc">Complete visa support for your study destination.</p>
              <ul class="study-list space-y-2.5 text-[15px] text-white/80 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5">
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg><span data-i18n="study_card2_li1">Document preparation</span></li>
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg><span data-i18n="study_card2_li2">Application review</span></li>
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg><span data-i18n="study_card2_li3">Interview preparation</span></li>
              </ul>
            </div>
          </div>
          <div class="grid md:grid-cols-[6rem_1fr_1fr] gap-6 items-start border-b border-white/15 pb-8 md:pb-10 last:border-b-0" data-study-reveal style="--study-delay: 300ms">
            <div class="headline-display text-4xl md:text-5xl text-[#c9a96e]">03</div>
            <div>
              <div class="study-step-icon w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center mb-4 border border-white/15">
                <svg class="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white" data-i18n="study_card3_title">Pre-Departure</h3>
            </div>
            <div>
              <p class="text-[15px] text-white/60 leading-relaxed mb-5" data-i18n="study_card3_desc">Everything you need before boarding the plane.</p>
              <ul class="study-list space-y-2.5 text-[15px] text-white/80 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5">
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg><span data-i18n="study_card3_li1">Accommodation assistance</span></li>
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg><span data-i18n="study_card3_li2">Travel insurance</span></li>
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span data-i18n="study_card3_li3">Pre-departure briefing</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-12">
        <a href="#/contact" class="study-cta-glass inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-base transition-all duration-300 hover:scale-105">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          <span data-i18n="study_btn">FREE Consultancy</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
        </a>
      </div>
    </div>
  </section>
  `
}

function trustBand(c) {
  return `
  <!-- WHY TRUST US -->
  <section id="why-trust" class="section-fade scroll-mt-20 py-12 md:py-16 bg-[#f7f5f2] dark:bg-[#111827]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="mb-12 reveal">
        <h2 class="headline-display text-3xl md:text-4xl text-neutral-900 dark:text-white mb-3" data-i18n="trustband_title">Why trust us</h2>
        <p class="text-neutral-500 dark:text-neutral-400 max-w-lg" data-i18n="trustband_desc">Every claim below comes from a signed agreement, not a promise.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-5">
        <!-- 01 Contracted & accountable -->
        <div class="trust-item flex gap-4 p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60" data-trust-reveal style="--trust-delay: 0ms">
          <div class="w-10 h-10 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0 border border-[#c9a96e]/15">
            <svg class="w-5 h-5 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <div>
            <h4 class="font-medium text-neutral-900 dark:text-white mb-1 text-sm" data-i18n="trustband1_title">Contracted &amp; accountable</h4>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed" data-i18n="trustband1_desc">We work under a signed agreement with a registered Norwegian travel group. You know exactly who you are dealing with.</p>
          </div>
        </div>

        <!-- 02 Official travel documents -->
        <div class="trust-item flex gap-4 p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60" data-trust-reveal style="--trust-delay: 100ms">
          <div class="w-10 h-10 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0 border border-[#c9a96e]/15">
            <svg class="w-5 h-5 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </div>
          <div>
            <h4 class="font-medium text-neutral-900 dark:text-white mb-1 text-sm" data-i18n="trustband2_title">Official travel documents</h4>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed" data-i18n="trustband2_desc">Every booking is confirmed in writing, and your e-tickets are issued directly from the supplier's booking system.</p>
          </div>
        </div>

        <!-- 03 Trained advisors -->
        <div class="trust-item flex gap-4 p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60" data-trust-reveal style="--trust-delay: 200ms">
          <div class="w-10 h-10 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0 border border-[#c9a96e]/15">
            <svg class="w-5 h-5 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479M12 14l6.16-3.422"/></svg>
          </div>
          <div>
            <h4 class="font-medium text-neutral-900 dark:text-white mb-1 text-sm" data-i18n="trustband3_title">Trained advisors</h4>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed" data-i18n="trustband3_desc">Our team completes the supplier's basic training and follow-up courses before handling any booking.</p>
          </div>
        </div>
      </div>

      <!-- Partner strip -->
      <div class="trust-copy mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl bg-[#111827] dark:bg-[#0a0f1a] px-6 py-5 border border-neutral-800" data-trust-reveal style="--trust-delay: 300ms">
        <p class="text-sm text-neutral-300">
          <span class="text-[#c9a96e] font-semibold mr-2" data-i18n="trustband_partners">Partnered with</span>
          Airticket AS · REISEbazaar · airticketgroup.travel
        </p>
        <p class="text-sm text-neutral-500">Storgata 3, 0155 Oslo</p>
      </div>
    </div>
  </section>
  `
}

function contact(c) {
  const inputClass = 'w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a96e] focus:ring-2 focus:ring-[#c9a96e]/40 transition'
  const labelClass = 'block text-sm font-medium text-white mb-2'
  const valueClass = 'text-neutral-400 hover:text-[#c9a96e] transition break-words'
  const errorClass = 'hidden mt-2 text-sm text-[#f28b82]'

  return `
  <!-- CONTACT - inverted panel -->
  <section id="contact" class="section-fade scroll-mt-20 py-12 md:py-16 bg-[#111827]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="reveal max-w-2xl">
        <p class="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a96e] mb-4" data-i18n="contact_eyebrow">Get in touch</p>
        <h2 class="headline-display text-3xl md:text-4xl text-white mb-5" data-i18n="contact_heading">Tell us what you're trying to do.</h2>
        <p class="text-neutral-400 leading-relaxed" data-i18n="contact_desc">We'll come back with what it costs, how long it takes, and what papers you need. If there's a catch, you'll hear it from us before you pay anything.</p>
      </div>

      <div class="reveal reveal-delay-2 mt-10 md:mt-14 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-10">
        <form id="contact-form" novalidate>
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label for="cf-name" class="${labelClass}" data-i18n="contact_name">Full name</label>
              <input id="cf-name" name="name" type="text" autocomplete="name" aria-describedby="cf-name-error" class="${inputClass}" />
              <p id="cf-name-error" role="alert" class="${errorClass}"></p>
            </div>
            <div>
              <label for="cf-email" class="${labelClass}" data-i18n="contact_email">Email</label>
              <input id="cf-email" name="from" type="email" autocomplete="email" aria-describedby="cf-email-error" class="${inputClass}" />
              <p id="cf-email-error" role="alert" class="${errorClass}"></p>
            </div>
            <div>
              <label for="cf-topic" class="${labelClass}" data-i18n="contact_topic_label">What do you need help with?</label>
              <select id="cf-topic" name="topic" aria-describedby="cf-topic-error" class="${inputClass}">
                <option value="Family Travel" data-i18n="card1_title">Family Travel</option>
                <option value="Umrah Packages" data-i18n="card2_title">Umrah Packages</option>
                <option value="Study Consultancy" data-i18n="contact_topic_study" selected>Study Consultancy</option>
                <option value="Visa Assistance" data-i18n="contact_topic_visa">Visa Assistance</option>
              </select>
              <p id="cf-topic-error" role="alert" class="${errorClass}"></p>
            </div>
            <div class="sm:col-span-2">
              <label for="cf-message" class="${labelClass}" data-i18n="contact_message_label">Tell us a little about your plans</label>
              <textarea id="cf-message" name="message" rows="5" aria-describedby="cf-message-error" class="${inputClass} resize-y"></textarea>
              <p id="cf-message-error" role="alert" class="${errorClass}"></p>
            </div>
          </div>

          <button type="submit" class="mt-6 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#c9a96e] text-[#111827] font-medium text-sm hover:bg-[#b8944f] transition-all duration-200 active:scale-[0.98]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span data-i18n="contact_submit">Request my free consultation</span>
          </button>
        </form>
      </div>

      <div class="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-neutral-400">
        <a href="mailto:${c.emailAddress}" class="${valueClass}">${c.emailAddress}</a>
        <span class="text-neutral-600" aria-hidden="true">·</span>
        <a href="tel:${c.phoneLink}" class="${valueClass}">${c.phoneNumber}</a>
        <span class="text-neutral-600" aria-hidden="true">·</span>
        <span data-i18n="hours">Phone hours: Mon-Sun 09:00-18:00 · WhatsApp support 24/7</span>
      </div>
    </div>
  </section>
  `
}

function footer(c) {
  return `
  <!-- FOOTER -->
  <footer class="bg-[#0a0f1a] text-neutral-500 py-12 border-t border-neutral-800/50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid md:grid-cols-3 gap-8 mb-10 items-start">
        <div>
          <div class="mb-3">
            <img src="${BASE}images/skyconnect-logo.png" alt="SkyConnect" class="h-20 object-contain" width="320" height="132" />
          </div>
          <p class="text-sm text-neutral-300 font-medium mb-2" data-i18n="footer_tagline">Your journey. Our attention to detail.</p>
          <p class="text-sm max-w-xs leading-relaxed" data-i18n="footer_desc">From visiting family to spiritual journeys and international study, SkyConnect brings together carefully arranged travel services with personal support at every step.</p>
        </div>
        <div>
          <p class="text-[#c9a96e] font-semibold mb-3 text-sm" data-i18n="nav_services">Services</p>
          <ul class="space-y-2 text-sm">
            <li><a href="#/services" class="hover:text-white transition" data-i18n="card1_title">Family Travel</a></li>
            <li><a href="#/services" class="hover:text-white transition" data-i18n="card2_title">Umrah Packages</a></li>
            <li><a href="#/study" class="hover:text-white transition" data-i18n="study_title">Study Consultancy</a></li>
          </ul>
        </div>
        <div>
          <p class="text-[#c9a96e] font-semibold mb-3 text-sm" data-i18n="footer_company">Company</p>
          <p class="text-sm">SkyConnect Travels</p>
          <p class="text-sm" data-i18n="footer_owner">Owner: Aslam Hossain</p>
          <p class="text-sm" data-i18n="footer_org">Org No: 930420-0158</p>
        </div>
      </div>
      <div class="border-t border-neutral-800/50 pt-6 text-xs text-center">
        © 2026 SkyConnect. <span data-i18n="footer_rights">All rights reserved.</span>
      </div>
    </div>
  </footer>
  `
}

function floatingWhatsApp(c) {
  return `
  <!-- Floating WhatsApp -->
  <a href="https://wa.me/${c.whatsappNumber}" target="_blank" rel="noopener" class="float-whatsapp fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition z-50" aria-label="Chat on WhatsApp">
    <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
  `
}

function backToTop() {
  return `
  <button id="back-to-top" class="fixed bottom-6 left-6 w-11 h-11 rounded-full bg-neutral-800 dark:bg-neutral-700 text-white flex items-center justify-center shadow-lg opacity-0 pointer-events-none transition-all duration-300 z-50 hover:bg-neutral-700 dark:hover:bg-neutral-600" aria-label="Back to top">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
    </svg>
  </button>`
}

/**
 * The three views. `home` is the default when the hash is missing or
 * unrecognised. Each view is exactly two sections.
 */
export function viewContent(name, c) {
  if (name === 'services') return services() + booking(c)
  if (name === 'study') return study(c)
  if (name === 'contact') return contact(c)
  return hero(c) + trustBand(c)
}

export function renderApp(c) {
  return header(c) + '<main id="view-root">' + viewContent('home', c) + '</main>' + footer(c) + floatingWhatsApp(c) + backToTop()
}
