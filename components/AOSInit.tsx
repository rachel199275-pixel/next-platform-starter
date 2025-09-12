'use client'
import { useEffect } from 'react'
import AOS from 'aos'

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      // 你可以依喜好調整
      duration: 600,
      easing: 'ease-out',
      once: true,
      offset: 40,
    })
  }, [])

  return null
}
