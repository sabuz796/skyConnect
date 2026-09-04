import { DropdownManager } from './DropdownManager.js'
import { Popover } from './Popover.js'
import { t, getLang } from '../js/i18n.js'

export class DatePicker extends Popover {
  constructor({ name, label, mode = 'single', minDate, presets = [], required = false }) {
    super()
    this.name = name
    this.label = label
    this.mode = mode // 'single' | 'range'
    this.minDate = minDate || this.today()
    this.presets = presets
    this.required = required
    this.id = `field-${name}-${Math.random().toString(36).slice(2, 8)}`
    this.value = null
    this.rangeStart = null
    this.rangeEnd = null
    this.currentMonth = new Date()
    this.popover = null
  }

  today() {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }

  render() {
    return `
      <div class="field datepicker" data-datepicker="${this.name}">
        <input
          type="text"
          id="${this.id}"
          name="${this.name}"
          class="field-input datepicker-trigger"
          readonly
          placeholder=" "
          aria-haspopup="dialog"
          aria-expanded="false"
          ${this.required ? 'required' : ''}
        />
        <label for="${this.id}" class="field-label">
          <span class="label-text">${this.label}</span>
          ${this.required ? '<span class="label-required" aria-hidden="true">*</span>' : ''}
        </label>
        <span class="field-border" aria-hidden="true"></span>
        <div class="datepicker-popover hidden" role="dialog" aria-label="Select ${this.label.toLowerCase()}">
          ${this.presets.length ? this.renderPresets() : ''}
          <div class="calendar-header">
            <button type="button" class="calendar-nav-btn" data-nav="prev" aria-label="Previous month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span class="calendar-title"></span>
            <button type="button" class="calendar-nav-btn" data-nav="next" aria-label="Next month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
          <div class="calendar-grid" role="grid" aria-label="Calendar"></div>
          ${this.mode === 'range' ? '<div class="range-preview"></div>' : ''}
          <div class="datepicker-actions" style="display:flex;gap:0.5rem;justify-content:flex-end;margin-top:0.75rem;">
            <button type="button" class="btn-secondary" data-action="clear" style="padding:0.375rem 0.75rem;font-size:0.75rem;border:1px solid var(--border-color);background:var(--surface);color:var(--text-secondary);border-radius:0.5rem;cursor:pointer;" data-i18n="clear">${t('clear')}</button>
            <button type="button" class="btn-primary" data-action="apply" style="padding:0.375rem 0.75rem;font-size:0.75rem;background:var(--accent);color:white;border:none;border-radius:0.5rem;cursor:pointer;" data-i18n="apply">${t('apply')}</button>
          </div>
        </div>
      </div>
    `
  }

  renderPresets() {
    return `
      <div class="date-presets">
        ${this.presets.map(p => `
          <button type="button" class="date-preset" data-days="${p.days}">${p.label}</button>
        `).join('')}
      </div>
    `
  }

  bindEvents(container) {
    this.el = container.querySelector(`[data-datepicker="${this.name}"]`)
    if (!this.el) return

    this.input = this.el.querySelector('.datepicker-trigger')
    this.popover = this.el.querySelector('.datepicker-popover')
    this.anchor = this.input
    this.floatingEl = this.popover

    // Register with DropdownManager
    this.registerFloating()

    // Toggle on input click
    this.input.addEventListener('click', () => this.toggle())

    // Navigation
    this.el.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const dir = btn.dataset.nav
        if (dir === 'prev') {
          this.currentMonth.setMonth(this.currentMonth.getMonth() - 1)
        } else {
          this.currentMonth.setMonth(this.currentMonth.getMonth() + 1)
        }
        this.renderCalendar()
      })
    })

    // Presets
    this.el.querySelectorAll('.date-preset').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const days = parseInt(btn.dataset.days)
        const date = new Date()
        date.setDate(date.getDate() + days)
        date.setHours(0, 0, 0, 0)
        this.selectDate(date)
      })
    })

    // Calendar day clicks
    this.popover.addEventListener('click', (e) => {
      const dayBtn = e.target.closest('.calendar-day')
      if (!dayBtn || dayBtn.disabled) return

      const dateStr = dayBtn.dataset.date
      const [y, m, d] = dateStr.split('-').map(Number)
      const date = new Date(y, m - 1, d)
      this.selectDate(date)
    })

    // Apply/Clear
    this.el.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        if (btn.dataset.action === 'apply') this.apply()
        if (btn.dataset.action === 'clear') this.clear()
      })
    })

    // Keyboard
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close()
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        this.toggle()
      }
    })

    // Initial render
    this.renderCalendar()
  }

  renderCalendar() {
    const grid = this.popover.querySelector('.calendar-grid')
    const title = this.popover.querySelector('.calendar-title')
    if (!grid || !title) return

    const year = this.currentMonth.getFullYear()
    const month = this.currentMonth.getMonth()

    const locale = getLang() === 'bn' ? 'bn-BD' : getLang() === 'sv' ? 'sv-SE' : 'en-GB'
    title.textContent = new Date(year, month).toLocaleDateString(locale, { month: 'long', year: 'numeric' })

    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const today = this.today()

    const weekdaysShort = {
      en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      sv: ['Sö', 'Må', 'Ti', 'On', 'To', 'Fr', 'Lö'],
      bn: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি']
    }
    const weekdays = weekdaysShort[getLang()] || weekdaysShort.en
    let html = weekdays.map(d => `<div class="calendar-weekday">${d}</div>`).join('')

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      html += '<div></div>'
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d)
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const isToday = date.getTime() === today.getTime()
      const isPast = date < this.minDate
      const isSelected = this.mode === 'single'
        ? this.value && date.getTime() === this.value.getTime()
        : (this.rangeStart && date.getTime() === this.rangeStart.getTime()) ||
          (this.rangeEnd && date.getTime() === this.rangeEnd.getTime())
      const inRange = this.mode === 'range' && this.rangeStart && this.rangeEnd &&
        date > this.rangeStart && date < this.rangeEnd

      const classes = [
        'calendar-day',
        isToday ? 'today' : '',
        isPast ? 'disabled' : '',
        isSelected ? 'selected' : '',
        inRange ? 'in-range' : ''
      ].filter(Boolean).join(' ')

      html += `<button type="button" class="${classes}" data-date="${dateStr}" ${isPast ? 'disabled' : ''} aria-label="${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}">${d}</button>`
    }

    grid.innerHTML = html
  }

  selectDate(date) {
    if (this.mode === 'single') {
      this.value = date
      this.input.value = this.formatDate(date)
      this.close()
      this.input.dispatchEvent(new Event('change'))
    } else {
      // Range mode
      if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
        // Start new range
        this.rangeStart = date
        this.rangeEnd = null
        this.input.value = this.formatDate(date) + ' → ...'
      } else {
        // Complete range
        if (date < this.rangeStart) {
          this.rangeEnd = this.rangeStart
          this.rangeStart = date
        } else {
          this.rangeEnd = date
        }
        this.input.value = `${this.formatDate(this.rangeStart)} → ${this.formatDate(this.rangeEnd)}`
        this.close()
        this.input.dispatchEvent(new Event('change'))
      }
      this.renderCalendar()
    }
  }

  formatDate(date) {
    const locale = getLang() === 'bn' ? 'bn-BD' : getLang() === 'sv' ? 'sv-SE' : 'en-GB'
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
  }

  apply() {
    if (this.mode === 'range' && this.rangeStart) {
      this.input.value = this.rangeStart
        ? `${this.formatDate(this.rangeStart)}${this.rangeEnd ? ' → ' + this.formatDate(this.rangeEnd) : ' → ...'}`
        : ''
    }
    this.close()
    this.input.dispatchEvent(new Event('change'))
  }

  clear() {
    this.value = null
    this.rangeStart = null
    this.rangeEnd = null
    this.input.value = ''
    this.renderCalendar()
    this.input.dispatchEvent(new Event('change'))
  }

  toggle() {
    this.toggleFloating()
  }

  open() {
    this.renderCalendar()
    this.openFloating()
  }

  close() {
    this.closeFloating()
  }

  getValue() {
    if (this.mode === 'single') {
      return this.value ? this.value.toISOString().split('T')[0] : ''
    }
    return {
      start: this.rangeStart ? this.rangeStart.toISOString().split('T')[0] : '',
      end: this.rangeEnd ? this.rangeEnd.toISOString().split('T')[0] : ''
    }
  }

  reset() {
    this.value = null
    this.rangeStart = null
    this.rangeEnd = null
    if (this.input) this.input.value = ''
    this.renderCalendar()
  }
}