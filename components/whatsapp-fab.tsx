'use client'

import { whatsappContact, whatsappLink, whatsappMessages } from '@/lib/whatsapp'

function WhatsAppGlyph({ size = 25 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.56 4.19 1.62 6.02L4 29l8.13-1.57a12.9 12.9 0 0 0 3.9.6h.01C22.68 28.03 28.08 22.63 28.08 16S22.68 3 16.04 3Zm0 22.9h-.01a10.7 10.7 0 0 1-3.46-.56l-.25-.09-4.82.93.96-4.7-.16-.24a10.66 10.66 0 0 1-1.63-5.7c0-5.9 4.8-10.7 10.71-10.7 2.86 0 5.55 1.12 7.57 3.14a10.63 10.63 0 0 1 3.13 7.57c0 5.9-4.8 10.7-10.7 10.7Zm5.87-8.01c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6a9.7 9.7 0 0 1-1.79-2.23c-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56l-.62-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.25 3.44 5.46 4.82.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.16-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  )
}

/** Fixed, understated chat button that fits the site's monochrome styling. */
export function WhatsAppFab({ ready = true }: { ready?: boolean }) {
  return (
    <a
      className={`wa-fab ${ready ? 'wa-fab--ready' : ''}`}
      href={whatsappLink(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with Nyanza Loyal Gate Apartment on WhatsApp (${whatsappContact.display})`}
      tabIndex={ready ? 0 : -1}
    >
      <span className="wa-fab__icon"><WhatsAppGlyph /></span>
      <span className="wa-fab__label">CHAT ON WHATSAPP</span>
    </a>
  )
}

export { WhatsAppGlyph }
