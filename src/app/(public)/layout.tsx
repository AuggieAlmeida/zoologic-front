'use client'
import { useLayoutEffect } from 'react'

// The public pages are designed light only (photo background, white card), and
// a fresh load renders them that way. Signing out of the panel navigates on the
// client, so the dark class the panel put on <html> stayed behind and turned
// the card's headings into light text on white (1.1:1). Drop it before the
// first paint; the panel applies the saved theme again on its way back in.
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  return children
}
