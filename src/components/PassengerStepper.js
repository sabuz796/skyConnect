import { DropdownManager } from './DropdownManager.js'
import { Popover } from './Popover.js'
import { t } from '../js/i18n.js'

export class PassengerStepper extends Popover {
  constructor({ adults = 1, children = 0, infants = 0, maxTotal = 9 }) {
    super()
    this.counts = { adults, children, infants }
    this.maxTotal = maxTotal
    this.popover = null
    this.trigger = null
  }

  get total() {
    return this.counts.adults + this.counts.children + this.counts.infants
  }

  render() {
    return `
      <fieldset class="passenger-stepper" data-passenger>
        <button type="button" class="passenger-trigger" aria-haspopup="true" aria-expanded="false">
          <div>
            <div class="passenger-trigger-label" data-i18n="passengers">${t('passengers')}</div>
            <div class="passenger-trigger-value">${this.getSummary()}</div>
          </div>
          <svg class="passenger-trigger-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="passenger-popover hidden">
          ${this.renderCounter('adults', 'adult', 1, 9)}
          ${this.renderCounter('children', 'child', 0, 8)}
          ${this.renderCounter('infants', 'infant', 0, 8)}
          <p class="passenger-hint" data-i18n="infants_hint">${t('infants_hint')}</p>
        </div>
      </fieldset>
    `
  }

  getSummary() {
    const parts = []
    parts.push(`${this.counts.adults} ${PassengerStepper.pluralize('adult', this.counts.adults)}`)
    if (this.counts.children > 0) {
      parts.push(`${this.counts.children} ${PassengerStepper.pluralize('child', this.counts.children)}`)
    }
    if (this.counts.infants > 0) {
      parts.push(`${this.counts.infants} ${PassengerStepper.pluralize('infant', this.counts.infants)}`)
    }
    return parts.join(' · ')
  }

  static pluralize(label, count) {
    if (label === 'child') return t('children')
    if (count !== 1) return t(label + 's')
    return t(label)
  }

  renderCounter(key, label, min, max) {
    const count = this.counts[key]
    const canDec = count > min
    const canInc = this.total < this.maxTotal && count < max

    return `
      <div class="passenger-row" data-counter="${key}">
        <span class="passenger-row-label">${PassengerStepper.pluralize(label, count)}</span>
        <div class="passenger-row-controls">
          <button type="button" class="counter-btn dec" data-action="dec" data-key="${key}" aria-label="Decrease ${t(label)}" ${!canDec ? 'disabled' : ''}>
            <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <span class="counter-value" aria-live="polite">${count}</span>
          <button type="button" class="counter-btn inc" data-action="inc" data-key="${key}" aria-label="Increase ${t(label)}" ${!canInc ? 'disabled' : ''}>
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    `
  }

  bindEvents(container) {
    this.el = container.querySelector('[data-passenger]')
    if (!this.el) return

    this.trigger = this.el.querySelector('.passenger-trigger')
    this.popover = this.el.querySelector('.passenger-popover')
    this.anchor = this.trigger
    this.floatingEl = this.popover

    // Register with DropdownManager
    this.registerFloating()

    // Toggle popover
    this.trigger.addEventListener('click', () => this.toggle())

    // Counter button clicks
    this.el.addEventListener('click', (e) => {
      const btn = e.target.closest('.counter-btn')
      if (!btn || btn.disabled) return

      const key = btn.dataset.key
      const action = btn.dataset.action

      if (action === 'inc' && this.counts[key] < this.getMax(key)) {
        this.counts[key]++
      } else if (action === 'dec' && this.counts[key] > this.getMin(key)) {
        this.counts[key]--
      }

      this.update()
    })
  }

  getMin(key) {
    return key === 'adults' ? 1 : 0
  }

  getMax(key) {
    if (key === 'infants') return this.counts.adults
    return key === 'children' ? 8 : 9
  }

  update() {
    // Update counts display
    Object.keys(this.counts).forEach(key => {
      const row = this.el.querySelector(`[data-counter="${key}"]`)
      if (!row) return

      row.querySelector('.counter-value').textContent = this.counts[key]
    })

    // Update labels
    const rows = this.el.querySelectorAll('.passenger-row')
    const keys = ['adults', 'children', 'infants']
    const labels = ['adult', 'child', 'infant']
    rows.forEach((row, i) => {
      const key = keys[i]
      const label = labels[i]
      row.querySelector('.passenger-row-label').textContent =
        PassengerStepper.pluralize(label, this.counts[key])
    })

    // Update trigger summary
    const valueEl = this.trigger.querySelector('.passenger-trigger-value')
    if (valueEl) {
      valueEl.textContent = this.getSummary()
      valueEl.classList.toggle('has-value', this.total > 1)
    }

    // Update disabled states
    this.updateButtons()
  }

  updateButtons() {
    Object.keys(this.counts).forEach(key => {
      const row = this.el.querySelector(`[data-counter="${key}"]`)
      if (!row) return

      const dec = row.querySelector('.dec')
      const inc = row.querySelector('.inc')

      dec.disabled = this.counts[key] <= this.getMin(key)
      inc.disabled = this.counts[key] >= this.getMax(key) || this.total >= this.maxTotal
    })
  }

  toggle() {
    this.toggleFloating()
  }

  open() {
    this.openFloating()
    this.trigger?.classList.add('open')
  }

  close() {
    this.closeFloating()
    this.trigger?.classList.remove('open')
  }

  getValue() {
    return { ...this.counts }
  }

  reset() {
    this.counts = { adults: 1, children: 0, infants: 0 }
    if (this.el) this.update()
  }
}
