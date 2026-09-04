/**
 * DropdownManager — Singleton that manages all dropdowns (airport search, date picker).
 * Ensures only one dropdown is open at a time and handles click-outside logic centrally.
 */
class DropdownManagerClass {
  constructor() {
    this.openDropdown = null
    this.handler = this.handleDocumentClick.bind(this)
    document.addEventListener('click', this.handler, true) // capture phase
  }

  register(dropdown) {
    // dropdown must have: { el, close(), isOpen() }
    dropdown._dmId = Math.random().toString(36).slice(2)
  }

  open(dropdown) {
    // Close any other open dropdown first
    if (this.openDropdown && this.openDropdown !== dropdown) {
      this.openDropdown.close()
    }
    this.openDropdown = dropdown
  }

  close(dropdown) {
    if (this.openDropdown === dropdown) {
      this.openDropdown = null
    }
  }

  handleDocumentClick(e) {
    if (!this.openDropdown) return

    const dd = this.openDropdown
    // If click is inside the dropdown's element, don't close
    if (dd.el && dd.el.contains(e.target)) return

    // Clicks inside the portaled floating element (which lives in <body>)
    // must also count as "inside"
    if (dd.floatingEl && dd.floatingEl.contains(e.target)) return

    // Click is outside — close
    dd.close()
    this.openDropdown = null
  }
}

// Singleton
export const DropdownManager = new DropdownManagerClass()