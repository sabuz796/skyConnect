/**
 * whatsapp.js — pure helpers for building WhatsApp request messages.
 * No DOM, no localStorage: all values come in as plain data and
 * translations are injected via the `t` parameter. Fully unit-testable.
 */

export function formatPassengers(pax) {
  const { adults = 0, children = 0, infants = 0 } = pax || {}
  let out = `${adults} adult${adults !== 1 ? 's' : ''}`
  if (children) out += `, ${children} child${children > 1 ? 'ren' : ''}`
  if (infants) out += `, ${infants} infant${infants > 1 ? 's' : ''}`
  return out
}

export function buildFlightMessage({ from, to, depart, ret, pax }, t) {
  const na = t('msg_na')
  return [
    t('msg_flight_title'),
    '',
    `${t('msg_from')}: ${from ? `${from.city} (${from.code})` : na}`,
    `${t('msg_to')}: ${to ? `${to.city} (${to.code})` : na}`,
    `${t('msg_depart')}: ${depart || na}`,
    ...(ret ? [`${t('msg_return')}: ${ret}`] : []),
    `${t('msg_passengers')}: ${formatPassengers(pax)}`
  ].join('\n')
}

export function buildUmrahMessage({ date, pkg, pax }, t) {
  const na = t('msg_na')
  return [
    t('msg_umrah_title'),
    '',
    `${t('msg_departure')}: ${date || na}`,
    `${t('msg_hotel')}: ${pkg || na}`,
    `${t('msg_travelers')}: ${formatPassengers(pax)}`
  ].join('\n')
}

export function buildHotelMessage({ dest, checkin, checkout, rooms }, t) {
  const na = t('msg_na')
  return [
    t('msg_hotel_title'),
    '',
    `${t('msg_destination')}: ${dest ? `${dest.city}, ${dest.country}` : na}`,
    `${t('msg_checkin')}: ${checkin || na}`,
    `${t('msg_checkout')}: ${checkout || na}`,
    ...(rooms ? [`${t('msg_rooms')}: ${rooms}`] : [])
  ].join('\n')
}

export function buildWhatsAppUrl(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}