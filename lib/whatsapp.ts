/**
 * WhatsApp contact logic ported from the Nyanza Loyal Gate Apartment project.
 * Kept framework-agnostic so both the floating button and the enquiry form
 * use the same number and message format.
 */
export const whatsappContact = {
  number: '250788869958',
  display: '+250 788 869 958',
} as const

export type WhatsAppMessageKind = 'general' | 'stay' | 'dining' | 'celebration'

/** Build the wa.me deep link used across the site. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${whatsappContact.number}?text=${encodeURIComponent(message)}`
}

/** Preset opening lines, mirroring the ones used in the previous project. */
export const whatsappMessages: Record<WhatsAppMessageKind, string> = {
  general: 'Hello Nyanza Loyal Gate Apartment, I have a question about your services.',
  stay: 'Hello Nyanza Loyal Gate Apartment, I would like to enquire about booking a stay. Please share availability and rates.',
  dining: 'Hello Nyanza Loyal Gate Apartment, I would like to enquire about dining and catering. Please share your options and pricing.',
  celebration: 'Hello Nyanza Loyal Gate Apartment, I would like to plan a celebration or event. Please share your packages and availability.',
}

/**
 * Opens a WhatsApp chat from a user gesture. Using a temporary anchor avoids
 * popup blockers that often stop window.open(), and keeps the opener clean.
 */
export function openWhatsApp(message: string): void {
  if (typeof document === 'undefined') return
  const anchor = document.createElement('a')
  anchor.href = whatsappLink(message)
  anchor.target = '_blank'
  anchor.rel = 'noopener noreferrer'
  anchor.setAttribute('aria-hidden', 'true')
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}
