import { AirportSearch } from './AirportSearch.js'
import { DatePicker } from './DatePicker.js'
import { PassengerStepper } from './PassengerStepper.js'
import { t } from '../js/i18n.js'
import { WHATSAPP_NUMBER } from '../js/config.js'

const SERVICES = [
  {
    id: 'flight',
    label: { en: 'Flight', sv: 'Flyg', bn: 'ফ্লাইট' },
    subtitle: { en: 'Air travel', sv: 'Flygresa', bn: 'বিমান ভ্রমণ' },
    num: '01',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`
  },
  {
    id: 'umrah',
    label: { en: 'Umrah', sv: 'Umrah', bn: 'উমরাহ' },
    subtitle: { en: 'Pilgrimage', sv: 'Vallfärd', bn: 'তীর্থযাত্রা' },
    num: '02',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`
  },
  {
    id: 'hotel',
    label: { en: 'Hotel', sv: 'Hotell', bn: 'হোটেল' },
    subtitle: { en: 'Accommodation', sv: 'Boende', bn: 'বাসস্থান' },
    num: '03',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`
  }
]

export class HeroForm {
  constructor({ lang = 'en', onLangChange } = {}) {
    this.lang = lang
    this.currentService = 'flight'
    this.isSwitching = false
    this.onLangChange = onLangChange
    this.formComponents = {}
    this.el = null
  }

  t(key) {
    return t(key)
  }

  render() {
    const tabs = SERVICES.map((s, i) => `
      <button
        role="tab"
        data-service="${s.id}"
        class="service-tab ${i === 0 ? 'active' : ''}"
        aria-selected="${i === 0}"
        aria-controls="form-${s.id}"
        id="tab-${s.id}"
        tabindex="${i === 0 ? '0' : '-1'}"
        style="--tab-delay: ${i * 80}ms"
      >
        <span class="tab-icon" aria-hidden="true">${s.icon}</span>
        <span class="tab-content">
          <span class="tab-number">${s.num}</span>
          <span class="tab-label" data-i18n="tab_${s.id}">${this.t('tab_' + s.id)}</span>
          <span class="tab-subtitle">${s.subtitle[this.lang] || s.subtitle.en}</span>
        </span>
      </button>
    `).join('')

    return `
      <div class="hero-form-container">
        <p class="form-caption">Your next journey starts here</p>
        <div class="service-tabs" role="tablist" aria-orientation="horizontal">
          ${tabs}
        </div>

        <div id="form-flight" class="form-panel" role="tabpanel" aria-labelledby="tab-flight">
          ${this.renderFlightForm()}
        </div>

        <div id="form-umrah" class="form-panel hidden" role="tabpanel" aria-labelledby="tab-umrah">
          ${this.renderUmrahForm()}
        </div>

        <div id="form-hotel" class="form-panel hidden" role="tabpanel" aria-labelledby="tab-hotel">
          ${this.renderHotelForm()}
        </div>
      </div>
    `
  }

  renderFlightForm() {
    return `
      <div class="grid sm:grid-cols-2 gap-x-5 gap-y-1">
        <div class="from-field"></div>
        <div class="to-field"></div>
      </div>
      <div class="grid sm:grid-cols-2 gap-x-5 gap-y-1">
        <div class="depart-field"></div>
        <div class="return-field"></div>
      </div>
      <div class="pax-field"></div>
      <div class="pt-2">
        <button type="submit" data-whatsapp="flight" class="submit-btn">
          <span class="btn-content">
            <span class="btn-text" data-i18n="btn_flight">Request quote</span>
            <span class="btn-arrow" aria-hidden="true">&rarr;</span>
          </span>
          <span class="btn-loader" aria-hidden="true">
            <svg class="spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg>
          </span>
          <span class="btn-success" aria-hidden="true">&#10003;</span>
        </button>
      </div>
    `
  }

  renderUmrahForm() {
    return `
      <div class="date-field"></div>
      <div class="field">
        <select id="umrah-package" name="package" class="field-select" required>
          <option value="3-star" data-i18n="opt_3star">${t('opt_3star')}</option>
          <option value="4-star" data-i18n="opt_4star">${t('opt_4star')}</option>
          <option value="5-star" data-i18n="opt_5star">${t('opt_5star')}</option>
          <option value="near-haram" data-i18n="opt_near">${t('opt_near')}</option>
        </select>
        <label for="umrah-package" class="field-label">
          <span class="label-text" data-i18n="label_hotel_class">${t('label_hotel_class')}</span>
          <span class="label-required" aria-hidden="true">*</span>
        </label>
        <span class="select-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </div>
      <div class="stepper-field"></div>
      <div class="pt-2">
        <button type="submit" data-whatsapp="umrah" class="submit-btn">
          <span class="btn-content">
            <span class="btn-text" data-i18n="btn_umrah">Request Umrah package</span>
            <span class="btn-arrow" aria-hidden="true">&rarr;</span>
          </span>
          <span class="btn-loader" aria-hidden="true">
            <svg class="spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg>
          </span>
          <span class="btn-success" aria-hidden="true">&#10003;</span>
        </button>
      </div>
    `
  }

  renderHotelForm() {
    return `
      <div class="dest-field"></div>
      <div class="grid sm:grid-cols-2 gap-x-5 gap-y-1">
        <div class="checkin-field"></div>
        <div class="checkout-field"></div>
      </div>
      <div class="field">
        <input type="text" id="hotel-rooms" name="rooms" class="field-input" placeholder=" " />
        <label for="hotel-rooms" class="field-label">
          <span class="label-text" data-i18n="label_rooms">${t('label_rooms')}</span>
        </label>
        <span class="field-border" aria-hidden="true"></span>
      </div>
      <div class="pt-2">
        <button type="submit" data-whatsapp="hotel" class="submit-btn">
          <span class="btn-content">
            <span class="btn-text" data-i18n="btn_hotel">Check hotel availability</span>
            <span class="btn-arrow" aria-hidden="true">&rarr;</span>
          </span>
          <span class="btn-loader" aria-hidden="true">
            <svg class="spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg>
          </span>
          <span class="btn-success" aria-hidden="true">&#10003;</span>
        </button>
      </div>
    `
  }

  bindEvents(container) {
    this.el = container
    if (!this.el) return

    // Tab clicks
    this.el.querySelectorAll('.service-tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchService(tab.dataset.service))

      // Keyboard nav
      tab.addEventListener('keydown', (e) => {
        const tabs = [...this.el.querySelectorAll('.service-tab')]
        const idx = tabs.indexOf(tab)

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault()
          const next = tabs[(idx + 1) % tabs.length]
          next.focus()
          next.click()
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault()
          const prev = tabs[(idx - 1 + tabs.length) % tabs.length]
          prev.focus()
          prev.click()
        }
      })
    })

    // Initialize sub-components for each service
    this.initFlightComponents()
    this.initUmrahComponents()
    this.initHotelComponents()

    // Add animate-fields to active panel for entrance animation
    const activePanel = this.el.querySelector('.form-panel:not(.hidden)')
    if (activePanel) {
      activePanel.classList.add('animate-fields')
      activePanel.addEventListener('animationend', () => {
        activePanel.classList.remove('animate-fields')
      }, { once: true })
    }

    // Submit handlers
    this.el.querySelectorAll('[data-whatsapp]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        this.handleSubmit(btn.dataset.whatsapp, btn)
      })
    })
  }

  initFlightComponents() {
    const panel = this.el.querySelector('#form-flight')

    const from = new AirportSearch({
      name: 'flight-from',
      label: t('label_from'),
      placeholder: t('ph_city_airport'),
      required: true
    })
    panel.querySelector('.from-field').innerHTML = from.render()
    from.bindEvents(panel)

    const to = new AirportSearch({
      name: 'flight-to',
      label: t('label_to'),
      placeholder: t('ph_city_airport'),
      required: true
    })
    panel.querySelector('.to-field').innerHTML = to.render()
    to.bindEvents(panel)

    const depart = new DatePicker({
      name: 'flight-depart',
      label: t('label_depart'),
      required: true,
      presets: [
        { label: t('preset_tomorrow'), days: 1 },
        { label: t('preset_this_weekend'), days: 6 - new Date().getDay() || 7 },
        { label: t('preset_next_week'), days: 7 }
      ]
    })
    panel.querySelector('.depart-field').innerHTML = depart.render()
    depart.bindEvents(panel)

    const ret = new DatePicker({
      name: 'flight-return',
      label: t('label_return'),
      required: false
    })
    panel.querySelector('.return-field').innerHTML = ret.render()
    ret.bindEvents(panel)

    const pax = new PassengerStepper({ adults: 1 })
    panel.querySelector('.pax-field').innerHTML = pax.render()
    pax.bindEvents(panel)

    this.formComponents.flight = { from, to, depart, ret, pax }
  }

  initUmrahComponents() {
    const panel = this.el.querySelector('#form-umrah')

    const date = new DatePicker({
      name: 'umrah-date',
      label: t('label_desired_date'),
      required: true,
      presets: [
        { label: t('preset_next_month'), days: 30 },
        { label: t('preset_in_2_months'), days: 60 },
        { label: t('preset_in_3_months'), days: 90 }
      ]
    })
    panel.querySelector('.date-field').innerHTML = date.render()
    date.bindEvents(panel)

    const pax = new PassengerStepper({ adults: 1 })
    panel.querySelector('.stepper-field').innerHTML = pax.render()
    pax.bindEvents(panel)

    this.formComponents.umrah = { date, pax }
  }

  initHotelComponents() {
    const panel = this.el.querySelector('#form-hotel')

    const dest = new AirportSearch({
      name: 'hotel-dest',
      label: t('label_dest'),
      placeholder: t('ph_city_hotel'),
      required: true
    })
    panel.querySelector('.dest-field').innerHTML = dest.render()
    dest.bindEvents(panel)

    const checkin = new DatePicker({
      name: 'hotel-checkin',
      label: t('label_checkin'),
      required: true,
      presets: [
        { label: t('preset_today'), days: 0 },
        { label: t('preset_tomorrow'), days: 1 },
        { label: t('preset_this_weekend'), days: 6 - new Date().getDay() || 7 }
      ]
    })
    panel.querySelector('.checkin-field').innerHTML = checkin.render()
    checkin.bindEvents(panel)

    const checkout = new DatePicker({
      name: 'hotel-checkout',
      label: t('label_checkout'),
      required: true
    })
    panel.querySelector('.checkout-field').innerHTML = checkout.render()
    checkout.bindEvents(panel)

    this.formComponents.hotel = { dest, checkin, checkout }
  }

  switchService(serviceId) {
    if (serviceId === this.currentService || this.isSwitching) return
    this.isSwitching = true

    const currentPanel = this.el.querySelector(`#form-${this.currentService}`)
    const nextPanel = this.el.querySelector(`#form-${serviceId}`)
    const currentTab = this.el.querySelector(`.service-tab[data-service="${this.currentService}"]`)
    const nextTab = this.el.querySelector(`.service-tab[data-service="${serviceId}"]`)

    // Close any open dropdowns
    const openDropdown = this.el.querySelector('.airport-dropdown:not(.hidden), .datepicker-popover:not(.hidden), .passenger-popover:not(.hidden)')
    if (openDropdown) {
      openDropdown.classList.add('hidden')
    }

    // Check for reduced motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      currentPanel.classList.add('hidden')
      nextPanel.classList.remove('hidden')
      this.finishSwitch(serviceId, currentTab, nextTab)
    } else {
      currentPanel.classList.add('exiting')
      currentPanel.addEventListener('animationend', () => {
        currentPanel.classList.add('hidden')
        currentPanel.classList.remove('exiting')

        nextPanel.classList.remove('hidden')
        nextPanel.classList.add('animate-fields')
        nextPanel.addEventListener('animationend', () => {
          nextPanel.classList.remove('animate-fields')
          this.isSwitching = false
        }, { once: true })
      }, { once: true })

      setTimeout(() => { this.isSwitching = false }, 500)
    }

    // Update tabs
    currentTab.classList.remove('active')
    currentTab.setAttribute('aria-selected', 'false')
    currentTab.setAttribute('tabindex', '-1')

    nextTab.classList.add('active')
    nextTab.setAttribute('aria-selected', 'true')
    nextTab.setAttribute('tabindex', '0')
    nextTab.focus()

    // Update CSS variable for service colors
    this.el.closest('[data-service]')?.setAttribute('data-service', serviceId)

    this.currentService = serviceId
  }

  finishSwitch(serviceId, currentTab, nextTab) {
    this.isSwitching = false
  }

  handleSubmit(service, btn) {
    const components = this.formComponents[service]
    if (!components) return

    const errors = this.validate(service, components)
    if (errors.length > 0) {
      this.showError(errors[0])
      return
    }

    btn.classList.add('loading')
    btn.disabled = true

    const message = this.buildMessage(service, components)

    setTimeout(() => {
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
      window.open(url, '_blank')

      btn.classList.remove('loading')
      btn.classList.add('success')

      setTimeout(() => {
        btn.classList.remove('success')
        btn.disabled = false
      }, 2000)
    }, 800)
  }

  validate(service, components) {
    const errors = []

    if (service === 'flight') {
      if (!components.from.getValue()) errors.push(t('error_dep_city'))
      if (!components.to.getValue()) errors.push(t('error_dest'))
      if (!components.depart.getValue()) errors.push(t('error_dep_date'))
    } else if (service === 'umrah') {
      if (!components.date.getValue()) errors.push(t('error_dep_date'))
    } else if (service === 'hotel') {
      if (!components.dest.getValue()) errors.push(t('error_dest_empty'))
      if (!components.checkin.getValue()) errors.push(t('error_checkin'))
      if (!components.checkout.getValue()) errors.push(t('error_checkout'))
    }

    return errors
  }

  showError(message) {
    const existing = document.querySelector('.form-error-toast')
    if (existing) existing.remove()

    const toast = document.createElement('div')
    toast.className = 'form-error-toast'
    toast.textContent = message
    toast.style.cssText = `
      position: fixed;
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      background: var(--error-color);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      z-index: 9999;
      animation: fieldErrorIn 0.2s ease-out;
    `
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
  }

  buildMessage(service, components) {
    const lines = []

    if (service === 'flight') {
      const from = components.from.selectedAirport
      const to = components.to.selectedAirport
      const depart = components.depart.getValue()
      const ret = components.ret.getValue()
      const pax = components.pax.getValue()

      lines.push(t('msg_flight_title'))
      lines.push('')
      lines.push(`${t('msg_from')}: ${from ? `${from.city} (${from.code})` : t('msg_na')}`)
      lines.push(`${t('msg_to')}: ${to ? `${to.city} (${to.code})` : t('msg_na')}`)
      lines.push(`${t('msg_depart')}: ${depart || t('msg_na')}`)
      if (ret) lines.push(`${t('msg_return')}: ${ret}`)
      lines.push(`${t('msg_passengers')}: ${pax.adults} adult${pax.adults > 1 ? 's' : ''}${pax.children ? `, ${pax.children} child${pax.children > 1 ? 'ren' : ''}` : ''}${pax.infants ? `, ${pax.infants} infant${pax.infants > 1 ? 's' : ''}` : ''}`)
    } else if (service === 'umrah') {
      const date = components.date.getValue()
      const pax = components.pax.getValue()
      const pkg = this.el.querySelector('#umrah-package')?.value

      lines.push(t('msg_umrah_title'))
      lines.push('')
      lines.push(`${t('msg_departure')}: ${date || t('msg_na')}`)
      lines.push(`${t('msg_hotel')}: ${pkg || t('msg_na')}`)
      lines.push(`${t('msg_travelers')}: ${pax.adults} adult${pax.adults > 1 ? 's' : ''}${pax.children ? `, ${pax.children} child${pax.children > 1 ? 'ren' : ''}` : ''}`)
    } else if (service === 'hotel') {
      const dest = components.dest.selectedAirport
      const checkin = components.checkin.getValue()
      const checkout = components.checkout.getValue()
      const rooms = this.el.querySelector('#hotel-rooms')?.value

      lines.push(t('msg_hotel_title'))
      lines.push('')
      lines.push(`${t('msg_destination')}: ${dest ? `${dest.city}, ${dest.country}` : t('msg_na')}`)
      lines.push(`${t('msg_checkin')}: ${checkin || t('msg_na')}`)
      lines.push(`${t('msg_checkout')}: ${checkout || t('msg_na')}`)
      if (rooms) lines.push(`${t('msg_rooms')}: ${rooms}`)
    }

    lines.push('')
    lines.push(t('msg_sent_via'))

    return lines.join('\n')
  }

  setLanguage(lang) {
    this.lang = lang
    // Update tab labels and subtitles
    this.el.querySelectorAll('.service-tab').forEach(tab => {
      const serviceId = tab.dataset.service
      const service = SERVICES.find(s => s.id === serviceId)
      if (service) {
        const label = tab.querySelector('.tab-label')
        const subtitle = tab.querySelector('.tab-subtitle')
        if (label) label.textContent = this.t('tab_' + serviceId)
        if (subtitle) subtitle.textContent = service.subtitle[lang] || service.subtitle.en
      }
    })

    // Re-render the form panels so labels/placeholders/presets pick up the
    // new language, while preserving what the user has already entered.
    this.refreshPanels()
  }

  refreshPanels() {
    // Snapshot current values
    const snapshot = {}
    for (const [service, components] of Object.entries(this.formComponents)) {
      snapshot[service] = {}
      for (const [key, comp] of Object.entries(components)) {
        if (comp instanceof AirportSearch) {
          snapshot[service][key] = { airport: comp.selectedAirport }
        } else if (comp instanceof DatePicker) {
          snapshot[service][key] = {
            value: comp.value ? comp.value.getTime() : null,
            rangeStart: comp.rangeStart ? comp.rangeStart.getTime() : null,
            rangeEnd: comp.rangeEnd ? comp.rangeEnd.getTime() : null
          }
        } else if (comp instanceof PassengerStepper) {
          snapshot[service][key] = { ...comp.counts }
        }
      }
      // Native fields (selects / text inputs)
      snapshot[service]._native = {}
      this.el.querySelector(`#form-${service}`)?.querySelectorAll('select, input[type="text"]:not([readonly])').forEach(inp => {
        if (inp.id) snapshot[service]._native[inp.id] = inp.value
      })
    }

    // Re-render panels
    const panels = { flight: 'renderFlightForm', umrah: 'renderUmrahForm', hotel: 'renderHotelForm' }
    for (const [service, methodName] of Object.entries(panels)) {
      const panel = this.el.querySelector(`#form-${service}`)
      if (!panel) continue
      panel.innerHTML = this[methodName]()
      this['init' + service[0].toUpperCase() + service.slice(1) + 'Components']()

      // Restore values
      for (const [key, val] of Object.entries(snapshot[service] || {})) {
        if (key === '_native') continue
        const comp = this.formComponents[service][key]
        if (!comp) continue
        if (comp instanceof AirportSearch && val.airport) {
          comp.selectAirport(val.airport)
        } else if (comp instanceof DatePicker) {
          if (val.value) { comp.value = new Date(val.value); comp.input.value = comp.formatDate(comp.value) }
          if (val.rangeStart) comp.rangeStart = new Date(val.rangeStart)
          if (val.rangeEnd) comp.rangeEnd = new Date(val.rangeEnd)
        } else if (comp instanceof PassengerStepper && val) {
          comp.counts = { ...val }
          comp.update()
        }
      }
      // Restore native fields
      const natives = snapshot[service]?._native || {}
      panel.querySelectorAll('select, input[type="text"]:not([readonly])').forEach(inp => {
        if (inp.id && natives[inp.id] !== undefined) inp.value = natives[inp.id]
      })
    }
  }
}
