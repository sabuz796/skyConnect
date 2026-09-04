import { DropdownManager } from './DropdownManager.js'

/**
 * Popover — shared base class for floating UI (airport dropdown, date picker,
 * passenger stepper). Handles portal-to-body, viewport-aware positioning
 * (respecting the sticky header), and scroll/resize listener lifecycle.
 *
 * Subclasses must set:
 *   this.el          — field wrapper element (stays in the form)
 *   this.floatingEl  — the element that gets portaled to <body>
 *   this.anchor      — the input/trigger used for positioning
 */
export class Popover {
  constructor() {
    this.isOpen = false
    this.el = null
    this.floatingEl = null
    this.anchor = null
  }

  openFloating() {
    // Portal to body to escape backdrop-filter containing block
    this._originalParent = this.floatingEl.parentElement
    document.body.appendChild(this.floatingEl)

    this.isOpen = true
    this.floatingEl.classList.remove('hidden')
    this.anchor?.setAttribute('aria-expanded', 'true')
    this.positionFloating()
    DropdownManager.open(this)

    // Reposition (not close) on scroll so the popover follows its anchor —
    // this avoids the popover snapping shut when the user scrolls inside it
    // on touch devices.
    this._scrollHandler = () => this.positionFloating()
    this._resizeHandler = () => this.positionFloating()
    window.addEventListener('scroll', this._scrollHandler, { passive: true })
    window.addEventListener('resize', this._resizeHandler, { passive: true })
  }

  closeFloating() {
    this.isOpen = false
    this.floatingEl.classList.add('hidden')
    this.anchor?.setAttribute('aria-expanded', 'false')
    DropdownManager.close(this)

    // Return to original parent
    if (this._originalParent) {
      this._originalParent.appendChild(this.floatingEl)
      this._originalParent = null
    }

    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler)
      this._scrollHandler = null
    }
    if (this._resizeHandler) {
      window.removeEventListener('resize', this._resizeHandler)
      this._resizeHandler = null
    }
  }

  positionFloating() {
    if (!this.anchor || !this.floatingEl) return

    const rect = this.anchor.getBoundingClientRect()
    const viewportH = window.innerHeight
    const viewportW = window.innerWidth
    const floatingH = this.floatingEl.offsetHeight || 300
    const gap = 6
    const stickyHeaderH = 80 // sticky header height + safety margin
    const minTop = 8

    // Prefer below the anchor; flip above if there is not enough room,
    // then clamp so we never overlap the sticky header or leave the viewport.
    let top
    if (viewportH - rect.bottom > floatingH + gap) {
      top = rect.bottom + gap
    } else if (rect.top - stickyHeaderH > floatingH + gap) {
      top = rect.top - floatingH - gap
    } else {
      // Not enough room either way — use the larger space and cap height
      const below = viewportH - rect.bottom
      if (below >= rect.top - stickyHeaderH) {
        top = rect.bottom + gap
        this.floatingEl.style.maxHeight = `${below - gap * 2}px`
      } else {
        top = stickyHeaderH
        this.floatingEl.style.maxHeight = `${rect.top - stickyHeaderH - gap}px`
      }
    }
    top = Math.max(minTop, top)
    this.floatingEl.style.top = `${top}px`

    // Horizontal: align with anchor, clamped to viewport
    let left = rect.left
    const width = rect.width

    if (left + width > viewportW - 16) {
      left = viewportW - width - 16
    }
    if (left < 16) {
      left = 16
    }

    this.floatingEl.style.left = `${left}px`
    this.floatingEl.style.width = `${width}px`
  }

  registerFloating() {
    DropdownManager.register(this)
  }

  toggleFloating() {
    if (this.isOpen) this.closeFloating()
    else this.openFloating()
  }
}
