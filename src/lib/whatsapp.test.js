import { describe, it, expect } from 'vitest'
import {
  formatPassengers,
  buildFlightMessage,
  buildUmrahMessage,
  buildHotelMessage,
  buildWhatsAppUrl
} from './whatsapp.js'
import en from '../i18n/en.json'

const t = (key) => en[key] ?? key
const AIRPORT = { code: 'DAC', city: 'Dhaka', country: 'Bangladesh', name: 'Hazrat Shahjalal' }
const AIRPORT_2 = { code: 'ARN', city: 'Stockholm', country: 'Sweden', name: 'Arlanda' }

describe('formatPassengers', () => {
  it('singularizes a single adult', () => {
    expect(formatPassengers({ adults: 1 })).toBe('1 adult')
  })

  it('pluralizes multiple adults', () => {
    expect(formatPassengers({ adults: 3 })).toBe('3 adults')
  })

  it('handles children and infants with correct plurals', () => {
    expect(formatPassengers({ adults: 2, children: 1, infants: 2 }))
      .toBe('2 adults, 1 child, 2 infants')
    expect(formatPassengers({ adults: 1, children: 2, infants: 1 }))
      .toBe('1 adult, 2 children, 1 infant')
  })

  it('omits zero counts', () => {
    expect(formatPassengers({ adults: 2, children: 0, infants: 0 })).toBe('2 adults')
  })
})

describe('buildFlightMessage', () => {
  it('builds a full flight message', () => {
    const msg = buildFlightMessage({
      from: AIRPORT_2, to: AIRPORT, depart: '2026-10-01', ret: '2026-10-15',
      pax: { adults: 2, children: 1 }
    }, t)
    expect(msg).toContain(en.msg_flight_title)
    expect(msg).toContain(`${en.msg_from}: Stockholm (ARN)`)
    expect(msg).toContain(`${en.msg_to}: Dhaka (DAC)`)
    expect(msg).toContain(`${en.msg_depart}: 2026-10-01`)
    expect(msg).toContain(`${en.msg_return}: 2026-10-15`)
    expect(msg).toContain(`${en.msg_passengers}: 2 adults, 1 child`)
  })

  it('falls back to N/A for missing return date', () => {
    const msg = buildFlightMessage({
      from: AIRPORT_2, to: AIRPORT, depart: '2026-10-01', ret: '', pax: { adults: 1 }
    }, t)
    expect(msg).not.toContain(en.msg_return)
    expect(msg).not.toContain(`${en.msg_return}: ${en.msg_na}`) // line omitted entirely
  })
})

describe('buildUmrahMessage', () => {
  it('falls back to N/A for missing package', () => {
    const msg = buildUmrahMessage({ date: '2026-11-01', pkg: undefined, pax: { adults: 2 } }, t)
    expect(msg).toContain(`${en.msg_hotel}: ${en.msg_na}`)
    expect(msg).toContain(`${en.msg_travelers}: 2 adults`)
  })
})

describe('buildHotelMessage', () => {
  it('includes rooms line only when rooms given', () => {
    const base = { dest: AIRPORT, checkin: '2026-10-01', checkout: '2026-10-07' }
    const withRooms = buildHotelMessage({ ...base, rooms: '2' }, t)
    const withoutRooms = buildHotelMessage(base, t)
    expect(withRooms).toContain(`${en.msg_rooms}: 2`)
    expect(withoutRooms).not.toContain(en.msg_rooms)
  })

  it('falls back to N/A for missing destination', () => {
    const msg = buildHotelMessage({ dest: null, checkin: '2026-10-01', checkout: '2026-10-07' }, t)
    expect(msg).toContain(`${en.msg_destination}: ${en.msg_na}`)
  })
})

describe('buildWhatsAppUrl', () => {
  const NUMBER = '46739786740'

  it('prefixes wa.me with the number', () => {
    expect(buildWhatsAppUrl(NUMBER, 'Hello')).toBe(`https://wa.me/${NUMBER}?text=Hello`)
  })

  it('encodes newlines', () => {
    const url = buildWhatsAppUrl(NUMBER, 'line1\nline2')
    expect(url).not.toContain('\n')
    expect(decodeURIComponent(url.split('text=')[1])).toBe('line1\nline2')
  })

  it('encodes Bangla text without loss', () => {
    const msg = 'নাম: রফিক\nFrån: Stockholm (ARN)'
    const url = buildWhatsAppUrl(NUMBER, msg)
    expect(url).not.toMatch(/[\u0980-\u09FF]/) // no raw Bangla chars in URL
    expect(decodeURIComponent(url.split('text=')[1])).toBe(msg)
  })

  it('encodes Swedish å/ä/ö without loss', () => {
    const msg = 'Från: Växjö — Hässleholm'
    const url = buildWhatsAppUrl(NUMBER, msg)
    expect(url).not.toMatch(/[åäöÅÄÖ ]/)
    expect(decodeURIComponent(url.split('text=')[1])).toBe(msg)
  })

  it('safely encodes special URL characters (&, ?, #, %)', () => {
    const msg = 'R&B deal? 50% off #1'
    const url = buildWhatsAppUrl(NUMBER, msg)
    expect(decodeURIComponent(url.split('text=')[1])).toBe(msg)
  })
})