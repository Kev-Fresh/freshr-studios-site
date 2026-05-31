import { useEffect } from 'react'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} — Freshr Studios`
      : 'Freshr Studios — Buffalo\'s Story Studio'
  }, [title])
}
