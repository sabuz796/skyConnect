/**
 * effects.js — decorative/ambient effects (all respect prefers-reduced-motion).
 */

export function initHeroGlow(prefersReducedMotion) {
  if (prefersReducedMotion) return

  const hero = document.getElementById('hero')
  const glow = document.getElementById('hero-glow')
  const heroPhoto = hero?.querySelector('.hero-photo')

  if (hero && glow) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glow.style.setProperty('--mouse-x', `${x}px`)
      glow.style.setProperty('--mouse-y', `${y}px`)
    })

    hero.addEventListener('mouseleave', () => {
      glow.style.setProperty('--mouse-x', '50%')
      glow.style.setProperty('--mouse-y', '50%')
    })
  }

  // Parallax on hero photo
  if (heroPhoto) {
    window.addEventListener('scroll', () => {
      const rate = window.scrollY * 0.3
      heroPhoto.style.transform = `scale(1.05) translateY(${rate}px)`
    }, { passive: true })
  }
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

export function initStudyArrows(prefersReducedMotion) {
  if (prefersReducedMotion) return

  document.querySelectorAll('.study-arrow svg').forEach((arrow) => {
    arrow.style.animation = 'studyArrowPulse 2s ease-in-out infinite'
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
