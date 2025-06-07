import { useCallback, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function useSmoothScroll() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const id = hash.replace('#', '')
      scrollToSection(id)
    }
  }, [pathname, searchParams])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100 // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      // Add a small delay for cross-page navigation to ensure the element is rendered
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }, 100)
    }
  }, [])

  return scrollToSection
} 