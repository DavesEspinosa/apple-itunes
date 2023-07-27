import { useEffect, useState } from 'react'

export const useWindowSize = (id: string) => {
  const [windowSize, setWindowSize] = useState<{
    width: number
    height: number
  }>({
    width: 0,
    height: 0,
  })
  const [container, setContainer] = useState<DOMRect | null>(null)

  useEffect(() => {
    setContainer(document.getElementById(id)?.getBoundingClientRect() ?? null)

    const handleResize = () => {
      if (!container) return
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight - container.top - 16,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [container?.top, windowSize.height, windowSize.width])

  return windowSize
}
