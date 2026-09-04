import airports from '../data/airports.json'
import { DropdownManager } from './DropdownManager.js'
import { Popover } from './Popover.js'
import { t } from '../js/i18n.js'

export class AirportSearch extends Popover {
  constructor({ name, label, placeholder, onSelect, required = false }) {
    super()
    this.name = name
    this.label = label
    this.placeholder = placeholder || ''
    this.onSelect = onSelect
    this.required = required
    this.id = `field-${name}-${Math.random().toString(36).slice(2, 8)}`
    this.query = ''
    this.highlighted = -1
    this.results = []
    this.selectedAirport = null
    this.dropdown = null
  }

  search(q) {
    if (!q || q.length < 1) {
      // Show recent/popular on empty
      return this.getDefaults()
    }
    const lower = q.toLowerCase()
    return airports.filter(a =>
      a.code.toLowerCase().includes(lower) ||
      a.city.toLowerCase().includes(lower) ||
      a.country.toLowerCase().includes(lower) ||
      a.name.toLowerCase().includes(lower)
    ).slice(0, 8)
  }

  getDefaults() {
    // Popular routes from Scandinavia
    const popular = ['JED', 'DXB', 'LHR', 'IST', 'DAC', 'DEL', 'BOM', 'CPH']
    return popular.map(code => airports.find(a => a.code === code)).filter(Boolean).slice(0, 6)
  }

  render() {
    return `
      <div class="field airport-search" data-search="${this.name}">
        <input
          type="text"
          id="${this.id}"
          name="${this.name}"
          class="field-input airport-input"
          placeholder=" "
          autocomplete="off"
          role="combobox"
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-autocomplete="list"
          ${this.required ? 'required' : ''}
        />
        <label for="${this.id}" class="field-label">
          <span class="label-text">${this.label}</span>
          ${this.required ? '<span class="label-required" aria-hidden="true">*</span>' : ''}
        </label>
        <span class="field-border" aria-hidden="true"></span>
        <div class="airport-dropdown hidden" role="listbox" aria-label="${this.label}"></div>
      </div>
    `
  }

  bindEvents(container) {
    this.el = container.querySelector(`[data-search="${this.name}"]`)
    if (!this.el) return

    this.input = this.el.querySelector('.airport-input')
    this.dropdown = this.el.querySelector('.airport-dropdown')
    this.anchor = this.input
    this.floatingEl = this.dropdown

    // Register with DropdownManager
    this.registerFloating()

    // Show defaults on focus
    this.input.addEventListener('focus', () => {
      this.results = this.getDefaults()
      this.renderDropdown()
      this.open()
    })

    // Search on input
    let debounce
    this.input.addEventListener('input', (e) => {
      clearTimeout(debounce)
      debounce = setTimeout(() => {
        this.query = e.target.value
        this.highlighted = -1
        this.results = this.search(this.query)
        this.renderDropdown()
        if (this.results.length > 0) this.open()
        else this.close()
      }, 150)
    })

    // Keyboard navigation
    this.input.addEventListener('keydown', (e) => {
      if (!this.isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
          this.results = this.getDefaults()
          this.renderDropdown()
          this.open()
        }
        return
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          this.highlighted = Math.min(this.highlighted + 1, this.results.length - 1)
          this.updateHighlight()
          break
        case 'ArrowUp':
          e.preventDefault()
          this.highlighted = Math.max(this.highlighted - 1, -1)
          this.updateHighlight()
          break
        case 'Enter':
          e.preventDefault()
          if (this.highlighted >= 0) {
            this.selectAirport(this.results[this.highlighted])
          }
          break
        case 'Escape':
          this.close()
          break
      }
    })

    // Click on dropdown item
    this.dropdown.addEventListener('click', (e) => {
      const item = e.target.closest('.airport-result')
      if (item) {
        const code = item.dataset.code
        const airport = airports.find(a => a.code === code)
        if (airport) this.selectAirport(airport)
      }
    })
  }

  renderDropdown() {
    if (!this.dropdown) return

    if (this.results.length === 0) {
      this.dropdown.innerHTML = `
        <div class="airport-empty" data-i18n="no_airports">${t('no_airports')}</div>
      `
      return
    }

    this.dropdown.innerHTML = this.results.map((a, i) => `
      <button
        type="button"
        class="airport-result ${i === this.highlighted ? 'highlighted' : ''}"
        data-code="${a.code}"
        role="option"
        aria-selected="${i === this.highlighted}"
      >
        <span class="airport-code">${a.code}</span>
        <span class="airport-info">
          <span class="airport-city">${a.city}</span>
          <span class="airport-name">${a.name}, ${a.country}</span>
        </span>
      </button>
    `).join('')
  }

  updateHighlight() {
    if (!this.dropdown) return
    const items = this.dropdown.querySelectorAll('.airport-result')
    items.forEach((item, i) => {
      item.classList.toggle('highlighted', i === this.highlighted)
      item.setAttribute('aria-selected', i === this.highlighted)
    })
    // Scroll highlighted into view
    if (this.highlighted >= 0 && items[this.highlighted]) {
      items[this.highlighted].scrollIntoView({ block: 'nearest' })
    }
  }

  selectAirport(airport) {
    this.selectedAirport = airport
    this.input.value = `${airport.city} (${airport.code})`
    this.close()
    if (this.onSelect) this.onSelect(airport)

    // Trigger change event for validation
    this.input.dispatchEvent(new Event('change'))
  }

  open() {
    this.openFloating()
  }

  close() {
    this.closeFloating()
    this.highlighted = -1
  }

  getValue() {
    return this.selectedAirport ? this.selectedAirport.code : ''
  }

  reset() {
    this.selectedAirport = null
    if (this.input) this.input.value = ''
  }
}