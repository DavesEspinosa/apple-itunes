import { ReactElement, useEffect, useState } from 'react'

export const HydrationZustand = ({ children }: { children: ReactElement }) => {
  const [isHydrated, setIsHydrated] = useState<boolean>(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated ? <>{children}</> : null
}
