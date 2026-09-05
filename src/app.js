function header(c) {
  return `
  <!-- HEADER -->
  <header class="sticky top-0 z-50 bg-white/90 dark:bg-[#0a0f1a]/90 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-800/60">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-[72px]">
        <a href="#" class="flex items-center">
          <img src="/images/SkyConnect (PNG).png" alt="SkyConnect" class="h-14 object-contain" />
        </a>

        <nav class="hidden md:flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
          <a href="#services" class="nav-link" data-i18n="nav_services">Services</a>
          <a href="#stories" class="nav-link" data-i18n="nav_moments">Stories</a>
          <a href="#contact" class="nav-link" data-i18n="nav_contact">Contact</a>
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
        <a href="#services" class="mobile-nav-link" data-i18n="nav_services">Services</a>
        <a href="#stories" class="mobile-nav-link" data-i18n="nav_moments">Stories</a>
        <a href="#contact" class="mobile-nav-link" data-i18n="nav_contact">Contact</a>
      </div>
    </div>
  </header>
  `
}

function hero(c) {
  return `
  <!-- HERO — Split Screen -->
  <section class="relative min-h-[85vh] flex items-center overflow-hidden bg-[#f7f5f2] dark:bg-[#0a0f1a]" id="hero">
    <img src="/images/hero-flight.jpg" alt="" class="hero-photo absolute inset-0 -z-20 w-full h-full object-cover" fetchpriority="high" />
    <div class="hero-wash absolute inset-0 -z-10" aria-hidden="true"></div>
    <div id="hero-glow" class="absolute inset-0 -z-5 pointer-events-none" aria-hidden="true"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 w-full py-24">
      <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <p class="eyebrow mb-4" data-i18n="badge">100% State Travel Guarantee</p>
          <h1 id="hero-title" class="headline-display text-4xl sm:text-5xl md:text-6xl text-neutral-900 dark:text-white mb-6">
            <span data-i18n="hero_title_1">Travel,</span><br>
            <span class="text-[#c9a96e]" data-i18n="hero_title_2">elevated.</span>
          </h1>
          <p id="hero-subtitle" class="text-lg text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed mb-8" data-i18n="hero_desc">
            Specialized in VFR flights to South Asia & Southeast Asia, complete Umrah packages and smooth visa handling.
          </p>
          <div class="flex flex-wrap gap-3">
            <a href="#booking" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c9a96e] text-white font-medium text-sm hover:bg-[#b8944f] transition-all duration-200 active:scale-[0.98]">
              <span data-i18n="nav_services">Explore Services</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </a>
          </div>
        </div>
        <div class="relative hidden md:block">
          <div class="rounded-xl overflow-hidden shadow-2xl dark:shadow-black/40 rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
            <img src="/images/hero-flight.jpg" alt="Premium travel experience" class="w-full h-[480px] object-cover" />
          </div>
          <div class="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-white dark:bg-neutral-800 shadow-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-100 dark:border-neutral-700">
            <span data-i18n="badge">100% State Travel Guarantee</span>
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
  <section id="booking" class="section-fade scroll-mt-20 py-16 md:py-24 bg-[#f7f5f2] dark:bg-[#0a0f1a]">
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
  <section id="services" class="section-fade scroll-mt-20 py-16 md:py-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="mb-12 reveal">
        <h2 class="headline-display text-3xl md:text-4xl text-neutral-900 dark:text-white mb-3" data-i18n="services_title">Our expertise</h2>
        <p class="text-neutral-500 dark:text-neutral-400 max-w-md" data-i18n="services_desc">Personal service and strong airline connections for routes that suit you.</p>
      </div>
      <div class="grid md:grid-cols-12 gap-5">
        <!-- VFR Flights — Large -->
        <div class="md:col-span-8 service-card tilt-card relative overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/60" data-service-reveal style="--service-delay: 0ms">
          <img src="/images/dubai.jpg" alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div class="service-photo-overlay absolute inset-0"></div>
          <div class="relative p-7 md:p-9 flex flex-col justify-end min-h-[280px] md:min-h-[340px]">
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

        <!-- Umrah — Small -->
        <div class="md:col-span-4 service-card tilt-card relative overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-[#faf6ee] dark:bg-neutral-900" data-service-reveal style="--service-delay: 110ms">
          <div class="p-7 flex flex-col justify-between min-h-[280px] md:min-h-[340px]">
            <div class="service-icon w-11 h-11 rounded-lg bg-[#c9a96e]/15 flex items-center justify-center border border-[#c9a96e]/20">
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

        <!-- Visa — Small -->
        <div class="md:col-span-4 service-card tilt-card relative overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900" data-service-reveal style="--service-delay: 220ms">
          <div class="p-7 flex flex-col justify-between min-h-[260px]">
            <div class="service-icon w-11 h-11 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/40">
              <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <div>
              <h3 class="headline-display text-xl text-neutral-900 dark:text-white mb-2" data-i18n="card3_title">Visa Handling</h3>
              <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4" data-i18n="card3_desc">We guide you through visa processes for Saudi Arabia, Bangladesh, Pakistan, India and Vietnam.</p>
              <ul class="space-y-1.5">
                <li class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span data-i18n="card3_li1">Fast & secure document check</span></li>
                <li class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span data-i18n="card3_li2">Umrah visa via authorization</span></li>
                <li class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span data-i18n="card3_li3">Personal service all the way</span></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Study — Large -->
        <div class="md:col-span-8 service-card tilt-card relative overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/60" data-service-reveal style="--service-delay: 330ms">
          <img src="/images/humboldt-university.jpg" alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div class="service-photo-overlay absolute inset-0"></div>
          <div class="relative p-7 md:p-9 flex flex-col justify-end min-h-[280px] md:min-h-[320px]">
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

function whyUs() {
  return `
  <!-- WHY US -->
  <section id="why-us" class="section-fade scroll-mt-20 py-16 md:py-24 bg-[#f7f5f2] dark:bg-[#111827]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="mb-12 reveal">
        <h2 class="headline-display text-3xl md:text-4xl text-neutral-900 dark:text-white mb-3" data-i18n="whyus_title">Why choose SkyConnect?</h2>
        <p class="text-neutral-500 dark:text-neutral-400 max-w-md" data-i18n="whyus_desc">We make travel personal, fast and affordable.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-5">
        <div class="whyus-card bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 p-7" style="--card-delay: 0ms">
          <div class="whyus-icon w-11 h-11 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center mb-5 border border-[#c9a96e]/15">
            <svg class="w-5 h-5 text-[#c9a96e]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-2" data-i18n="whyus1_title">Personal Service</h3>
          <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed" data-i18n="whyus1_desc">No call centers - you get a dedicated travel advisor from first contact to landing.</p>
        </div>
        <div class="whyus-card bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 p-7" style="--card-delay: 100ms">
          <div class="whyus-icon w-11 h-11 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-5 border border-emerald-200/60 dark:border-emerald-800/40">
            <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-2" data-i18n="whyus2_title">Best Price Guarantee</h3>
          <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed" data-i18n="whyus2_desc">Direct airline partnerships mean competitive fares you won't find on comparison sites.</p>
        </div>
        <div class="whyus-card bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 p-7" style="--card-delay: 200ms">
          <div class="whyus-icon w-11 h-11 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-5 border border-amber-200/60 dark:border-amber-800/40">
            <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 class="text-base font-semibold text-neutral-900 dark:text-white mb-2" data-i18n="whyus3_title">Fast Response</h3>
          <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed" data-i18n="whyus3_desc">WhatsApp replies within minutes, not hours - because your travel plans can't wait.</p>
        </div>
      </div>
    </div>
  </section>
  `
}

function study(c) {
  return `
  <!-- STUDY CONSULTANCY -->
  <section id="study" class="relative section-fade scroll-mt-20 py-16 md:py-24 overflow-hidden">
    <img src="/images/humboldt-university.jpg" alt="" class="study-photo absolute inset-0 -z-20 w-full h-full object-cover" loading="lazy" />
    <div class="study-wash absolute inset-0 -z-10" aria-hidden="true"></div>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <div class="text-center mb-12">
        <h2 class="headline-display text-3xl md:text-4xl text-white tracking-tight mb-3" data-i18n="study_title">Study Consultancy</h2>
        <p class="text-white/70 max-w-lg mx-auto" data-i18n="study_desc">Your gateway to education abroad - from university admissions to student visas.</p>
      </div>
      <div class="study-glass p-6 md:p-8">
        <div class="study-steps relative">
          <div class="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-3 items-start">
          <div class="study-step tilt-card text-center" data-study-reveal style="--study-delay: 0ms">
            <div class="study-step-num relative z-10 w-16 h-16 rounded-full bg-[#c9a96e]/20 border-4 border-white/80 flex items-center justify-center mx-auto mb-7">
              <span class="text-xl font-bold text-white">1</span>
            </div>
            <div class="study-step-icon w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-5 border border-white/15">
              <svg class="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14v7m0-7l6.16-3.422"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2" data-i18n="study_card1_title">University Admissions</h3>
            <p class="text-[15px] text-white/60 leading-relaxed mb-5 max-w-[240px] mx-auto" data-i18n="study_card1_desc">We guide you through the entire application process.</p>
            <ul class="study-list space-y-2.5 text-[15px] text-white/80 text-left max-w-[240px] mx-auto rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5">
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg><span data-i18n="study_card1_li1">Free initial consultation</span></li>
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg><span data-i18n="study_card1_li2">University selection & application</span></li>
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span data-i18n="study_card1_li3">Scholarship guidance</span></li>
            </ul>
          </div>
          <div class="hidden md:flex study-arrow items-center justify-center pt-6" aria-hidden="true">
            <svg class="w-8 h-8 text-white/30" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </div>
          <div class="study-step tilt-card text-center" data-study-reveal style="--study-delay: 150ms">
            <div class="study-step-num relative z-10 w-16 h-16 rounded-full bg-[#c9a96e]/20 border-4 border-white/80 flex items-center justify-center mx-auto mb-7">
              <span class="text-xl font-bold text-white">2</span>
            </div>
            <div class="study-step-icon w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-5 border border-white/15">
              <svg class="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2" data-i18n="study_card2_title">Student Visa</h3>
            <p class="text-[15px] text-white/60 leading-relaxed mb-5 max-w-[240px] mx-auto" data-i18n="study_card2_desc">Complete visa support for your study destination.</p>
            <ul class="study-list space-y-2.5 text-[15px] text-white/80 text-left max-w-[240px] mx-auto rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5">
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg><span data-i18n="study_card2_li1">Document preparation</span></li>
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg><span data-i18n="study_card2_li2">Application review</span></li>
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg><span data-i18n="study_card2_li3">Interview preparation</span></li>
            </ul>
          </div>
          <div class="hidden md:flex study-arrow items-center justify-center pt-6" aria-hidden="true">
            <svg class="w-8 h-8 text-white/30" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </div>
          <div class="study-step tilt-card text-center" data-study-reveal style="--study-delay: 300ms">
            <div class="study-step-num relative z-10 w-16 h-16 rounded-full bg-[#c9a96e]/20 border-4 border-white/80 flex items-center justify-center mx-auto mb-6">
              <span class="text-xl font-bold text-white">3</span>
            </div>
            <div class="study-step-icon w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/15">
              <svg class="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2" data-i18n="study_card3_title">Pre-Departure</h3>
            <p class="text-[15px] text-white/60 leading-relaxed mb-5 max-w-[240px] mx-auto" data-i18n="study_card3_desc">Everything you need before boarding the plane.</p>
            <ul class="study-list space-y-2.5 text-[15px] text-white/80 text-left max-w-[240px] mx-auto rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5">
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg><span data-i18n="study_card3_li1">Accommodation assistance</span></li>
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg><span data-i18n="study_card3_li2">Travel insurance</span></li>
              <li class="flex items-center gap-2.5"><svg class="w-4 h-4 text-[#c9a96e] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span data-i18n="study_card3_li3">Pre-departure briefing</span></li>
            </ul>
          </div>
        </div>
      </div>
      </div>
      <div class="text-center mt-12">
        <a href="#contact" class="study-cta-glass inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-base transition-all duration-300 hover:scale-105">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          <span data-i18n="study_btn">FREE Consultancy</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
        </a>
      </div>
    </div>
  </section>
  `
}

function moments() {
  return `
  <!-- STORIES — Horizontal Scroll -->
  <section id="stories" class="section-fade scroll-mt-20 py-16 md:py-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="mb-12 reveal">
        <h2 class="headline-display text-3xl md:text-4xl text-neutral-900 dark:text-white mb-3" data-i18n="moments_title">Stories</h2>
        <p class="text-neutral-500 dark:text-neutral-400 max-w-md" data-i18n="moments_desc">Every journey tells a story. Here are some of the places and feelings we help create.</p>
      </div>
      <div class="gallery-wrapper">
        <div class="gallery-scroll" id="gallery-scroll">
          <div class="moment-card reveal reveal-delay-1">
            <img src="/images/airplane-wing.jpg" alt="Airplane wing above the clouds at sunset" loading="lazy" class="blur-load" />
            <div class="moment-overlay"></div>
            <div class="moment-caption">
              <p class="headline-display text-white text-xl" data-i18n="moment1_caption">Where the sky meets possibility</p>
            </div>
          </div>
          <div class="moment-card reveal reveal-delay-2">
            <img src="/images/dubai.jpg" alt="Burj Al Arab Dubai" loading="lazy" class="blur-load" />
            <div class="moment-overlay"></div>
            <div class="moment-caption">
              <p class="headline-display text-white text-lg" data-i18n="moment2_caption">First light over the Gulf</p>
            </div>
          </div>
          <div class="moment-card reveal reveal-delay-3">
            <img src="/images/mountain-lake.jpg" alt="Traveler overlooking a mountain lake" loading="lazy" class="blur-load" />
            <div class="moment-overlay"></div>
            <div class="moment-caption">
              <p class="headline-display text-white text-lg" data-i18n="moment4_caption">Standing still in the vastness</p>
            </div>
          </div>
          <div class="moment-card reveal reveal-delay-4">
            <img src="/images/alpine-boats.jpg" alt="Wooden boats on a turquoise alpine lake" loading="lazy" class="blur-load" />
            <div class="moment-overlay"></div>
            <div class="moment-caption">
              <p class="headline-display text-white text-lg" data-i18n="moment5_caption">Water that mirrors the mountains</p>
            </div>
          </div>
          <div class="moment-card reveal reveal-delay-5">
            <img src="/images/passports.jpg" alt="Two friends holding passports together" loading="lazy" class="blur-load" />
            <div class="moment-overlay"></div>
            <div class="moment-caption">
              <p class="headline-display text-white text-xl" data-i18n="moment6_caption">Two passports. One adventure.</p>
            </div>
          </div>
          <div class="moment-card reveal reveal-delay-6">
            <img src="/images/travel-flatlay.jpg" alt="Travel essentials on a world map" loading="lazy" class="blur-load" />
            <div class="moment-overlay"></div>
            <div class="moment-caption">
              <p class="headline-display text-white text-lg" data-i18n="moment3_caption">The quiet before the journey</p>
            </div>
          </div>
        </div>
        <div class="gallery-nav">
          <button type="button" class="gallery-nav-btn gallery-prev" id="gallery-prev" aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button type="button" class="gallery-nav-btn gallery-next" id="gallery-next" aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  </section>
  `
}

function trust() {
  return `
  <!-- TRUST -->
  <section id="trust" class="section-fade scroll-mt-20 py-16 md:py-24 bg-[#f7f5f2] dark:bg-[#111827]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="mb-12 reveal">
        <h2 class="headline-display text-3xl md:text-4xl text-neutral-900 dark:text-white mb-3" data-i18n="trust_title">Protected by Danish law</h2>
        <p class="text-neutral-500 dark:text-neutral-400 max-w-lg" data-i18n="trust_desc">When you book Umrah packages or combination trips with hotels through us, the trip is covered by the Danish Rejsegarantifonden.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-5">
        <div class="trust-item flex gap-4 p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60" data-trust-reveal style="--trust-delay: 0ms">
          <div class="w-10 h-10 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0 border border-[#c9a96e]/15">
            <svg class="w-5 h-5 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <div>
            <h4 class="font-medium text-neutral-900 dark:text-white mb-1 text-sm" data-i18n="trust1_title">Protected by law</h4>
            <p class="text-sm text-neutral-500 dark:text-neutral-400" data-i18n="trust1_desc">Guaranteed refund or repatriation if something unexpected happens.</p>
          </div>
        </div>
        <div class="trust-item flex gap-4 p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60" data-trust-reveal style="--trust-delay: 100ms">
          <div class="w-10 h-10 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0 border border-[#c9a96e]/15">
            <svg class="w-5 h-5 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <div>
            <h4 class="font-medium text-neutral-900 dark:text-white mb-1 text-sm" data-i18n="trust2_title">Secure payments</h4>
            <p class="text-sm text-neutral-500 dark:text-neutral-400" data-i18n="trust2_desc">Your funds are held in secured client accounts at Svea Bank until the ticket is issued.</p>
          </div>
        </div>
        <div class="trust-item flex gap-4 p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60" data-trust-reveal style="--trust-delay: 200ms">
          <div class="w-10 h-10 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0 border border-[#c9a96e]/15">
            <svg class="w-5 h-5 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/></svg>
          </div>
          <div>
            <h4 class="font-medium text-neutral-900 dark:text-white mb-1 text-sm" data-i18n="trust3_title">Direct contact 24/7</h4>
            <p class="text-sm text-neutral-500 dark:text-neutral-400" data-i18n="trust3_desc">No call centers. We personally handle all changes and questions.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
}

function faq() {
  return `
  <!-- FAQ -->
  <section id="faq" class="section-fade scroll-mt-20 py-16 md:py-24">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <div class="faq-heading text-center mb-10" data-faq-reveal style="--faq-delay: 0ms">
        <h2 class="headline-display text-3xl md:text-4xl text-neutral-900 dark:text-white mb-3" data-i18n="faq_title">Frequently asked questions</h2>
        <p class="text-neutral-500 dark:text-neutral-400" data-i18n="faq_desc">Quick answers to what you usually wonder about.</p>
      </div>
      <div class="space-y-0">
        <div class="faq-item" data-faq-reveal style="--faq-delay: 100ms">
          <button class="accordion-trigger w-full flex items-center justify-between px-6 py-5 text-left font-medium text-neutral-900 dark:text-white" aria-expanded="false">
            <span data-i18n="faq1_q">Is extra baggage included on VFR flights?</span>
            <svg class="w-5 h-5 text-neutral-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="accordion-content">
            <div class="px-6 pb-5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed" data-i18n="faq1_a">Yes. On most routes to Bangladesh, India, Sri Lanka and Pakistan we work with airlines such as Qatar Airways, Emirates and Biman that allow up to 46 kg (2×23 kg) checked baggage. This is clearly stated on your confirmation.</div>
          </div>
        </div>
        <div class="faq-item" data-faq-reveal style="--faq-delay: 190ms">
          <button class="accordion-trigger w-full flex items-center justify-between px-6 py-5 text-left font-medium text-neutral-900 dark:text-white" aria-expanded="false">
            <span data-i18n="faq2_q">How does payment work?</span>
            <svg class="w-5 h-5 text-neutral-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="accordion-content">
            <div class="px-6 pb-5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed" data-i18n="faq2_a">Once we confirm your seats you receive a written booking confirmation with payment instructions. We accept bank transfer and Swish. When payment is registered we issue your e-ticket.</div>
          </div>
        </div>
        <div class="faq-item" data-faq-reveal style="--faq-delay: 280ms">
          <button class="accordion-trigger w-full flex items-center justify-between px-6 py-5 text-left font-medium text-neutral-900 dark:text-white" aria-expanded="false">
            <span data-i18n="faq3_q">Do you help with Umrah visas?</span>
            <svg class="w-5 h-5 text-neutral-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="accordion-content">
            <div class="px-6 pb-5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed" data-i18n="faq3_a">Yes. We arrange official Umrah visas to Saudi Arabia and can also assist with entry registrations for Bangladesh, Pakistan, India and Vietnam.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
}

function contact(c) {
  return `
  <!-- CONTACT -->
  <section id="contact" class="section-fade scroll-mt-20 py-16 md:py-24 bg-[#0a0f1a]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <h2 class="headline-display text-3xl md:text-4xl text-white mb-4" data-i18n="contact_title">Ready to travel?</h2>
      <p class="text-neutral-400 mb-10 max-w-md mx-auto" data-i18n="contact_desc">Call us or send a message on WhatsApp - we find the best options for you.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="tel:${c.phoneLink}" class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#c9a96e] text-white font-medium text-sm hover:bg-[#b8944f] transition-all duration-200 active:scale-[0.98]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          ${c.phoneNumber}
        </a>
        <a href="mailto:${c.emailAddress}" class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EA4335] text-white font-medium text-sm hover:bg-[#c5221f] transition-all duration-200 active:scale-[0.98]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          <span data-i18n="btn_email">Email us</span>
        </a>
        <a href="https://wa.me/${c.whatsappNumber}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white font-medium text-sm hover:bg-[#1eb85a] transition-all duration-200 active:scale-[0.98]">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <span data-i18n="btn_whatsapp">Chat on WhatsApp</span>
        </a>
      </div>
      <p class="mt-8 text-sm text-neutral-500">
        <span data-i18n="hours">Phone hours: Mon-Sun 09:00-18:00 · WhatsApp support 24/7</span>
      </p>
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
            <img src="/images/SkyConnect (PNG).png" alt="SkyConnect" class="h-20 object-contain" />
          </div>
          <p class="text-sm text-neutral-300 font-medium mb-2" data-i18n="footer_tagline">Your journey. Our attention to detail.</p>
          <p class="text-sm max-w-xs leading-relaxed" data-i18n="footer_desc">From visiting family to spiritual journeys and international study, SkyConnect brings together carefully arranged travel services with personal support at every step.</p>
        </div>
        <div>
          <p class="text-[#c9a96e] font-semibold mb-3 text-sm" data-i18n="nav_services">Services</p>
          <ul class="space-y-2 text-sm">
            <li><a href="#services" class="hover:text-white transition" data-i18n="card1_title">Family Travel</a></li>
            <li><a href="#services" class="hover:text-white transition" data-i18n="card2_title">Umrah Packages</a></li>
            <li><a href="#services" class="hover:text-white transition" data-i18n="card3_title">Visa Assistance</a></li>
            <li><a href="#study" class="hover:text-white transition" data-i18n="study_title">Study Consultancy</a></li>
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

function validationModal() {
  return `
  <div id="validation-modal" class="fixed inset-0 z-[100] hidden items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div id="modal-backdrop" class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
    <div id="modal-card" class="relative w-full max-w-sm bg-white dark:bg-neutral-800 rounded-xl shadow-2xl p-8 text-center">
      <div class="mx-auto mb-5 w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
        <svg class="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
        </svg>
      </div>
      <h3 id="modal-title" class="text-lg font-semibold text-neutral-900 dark:text-white mb-2" data-i18n="modal_title">Missing information</h3>
      <p id="modal-message" class="text-sm text-neutral-500 dark:text-neutral-400 mb-6"></p>
      <button id="modal-close" class="w-full py-3 rounded-lg bg-[#c9a96e] hover:bg-[#b8944f] text-white font-medium text-sm transition" data-i18n="modal_close">
        Got it
      </button>
    </div>
  </div>`
}

function backToTop() {
  return `
  <button id="back-to-top" class="fixed bottom-6 left-6 w-11 h-11 rounded-full bg-neutral-800 dark:bg-neutral-700 text-white flex items-center justify-center shadow-lg opacity-0 pointer-events-none transition-all duration-300 z-50 hover:bg-neutral-700 dark:hover:bg-neutral-600" aria-label="Back to top">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
    </svg>
  </button>`
}

export function renderApp(c) {
  return header(c) + hero(c) + booking(c) + services() + whyUs() + study(c) + moments() + trust() + faq() + contact(c) + footer(c) + floatingWhatsApp(c) + validationModal() + backToTop()
}
