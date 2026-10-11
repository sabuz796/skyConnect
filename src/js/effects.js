/**
 * effects.js — decorative/ambient effects (all respect prefers-reduced-motion).
 */

export function initHeroGlow(prefersReducedMotion) {
  if (prefersReducedMotion) return

  // The hero lives inside <main>, which the router replaces on every view
  // change, so these nodes are resolved inside the handlers instead of being
  // cached at bind time - a cached reference is detached after the first trip
  // away from Home and the effect silently stops. The listeners themselves are
  // registered once, here, and stay for the life of the page.
  document.addEventListener('mousemove', (e) => {
    const hero = document.getElementById('hero')
    const glow = document.getElementById('hero-glow')
    if (!hero || !glow) return

    const rect = hero.getBoundingClientRect()
    const inside = e.clientX >= rect.left && e.clientX <= rect.right
      && e.clientY >= rect.top && e.clientY <= rect.bottom

    // Replaces the old `mouseleave` reset: recentre once the pointer leaves
    // the hero's box, which the hero may not even have been mounted for.
    if (!inside) {
      glow.style.setProperty('--mouse-x', '50%')
      glow.style.setProperty('--mouse-y', '50%')
      return
    }

    glow.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    glow.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }, { passive: true })

  // Parallax on hero photo
  window.addEventListener('scroll', () => {
    const heroPhoto = document.querySelector('.hero-photo')
    if (!heroPhoto) return
    const rate = window.scrollY * 0.3
    heroPhoto.style.transform = `scale(1.05) translateY(${rate}px)`
  }, { passive: true })
}

export function initTiltCards(prefersReducedMotion) {
  if (prefersReducedMotion) return

  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -8
      const rotateY = ((x - centerX) / centerX) * 8

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    })
  })
}

export function initFloatingWhatsappEntrance(prefersReducedMotion) {
  if (prefersReducedMotion) return

  const floatBtn = document.querySelector('.float-whatsapp')
  if (floatBtn) {
    // Trigger entrance animation
    floatBtn.style.animation = 'floatBtnEntrance 0.6s 1s cubic-bezier(0.22, 1, 0.36, 1) both'
  }
}
