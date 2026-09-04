"use client"

import { useEffect, useState } from "react"

type Notice = {
  id: string
  title: string
  content: string
  type: string
  startDate: string
  endDate: string
  popup: boolean
  order: number
}

type ApiResponse = {
  notices: Notice[]
}

export default function NoticeBanner() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    async function loadNotices() {
      try {
        const response = await fetch("/api/notices", {
          cache: "no-store",
        })

        if (!response.ok) return

        const data: ApiResponse = await response.json()
        setNotices(data.notices ?? [])
      } catch (error) {
        console.error("Notice banner error:", error)
      }
    }

    loadNotices()
  }, [])

  useEffect(() => {
    if (notices.length <= 1) return

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 1 >= notices.length ? 0 : prev + 1
      )
    }, 5000)

    return () => window.clearInterval(timer)
  }, [notices.length])

  if (notices.length === 0) {
    return null
  }

  const currentNotice = notices[currentIndex]

  return (
    <div className="border-b border-[#E3DED5] bg-[#EEEAE3]">
      <div className="mx-auto flex min-h-11 max-w-7xl items-center justify-center gap-3 px-6 py-2 text-center">
        <span className="shrink-0 text-[10px] font-semibold tracking-[0.16em] text-[#B5965B]">
          NOTICE
        </span>

        <p className="truncate text-xs font-medium text-[#555D69] sm:text-sm">
          {currentNotice.title}
        </p>

        {notices.length > 1 && (
          <span className="shrink-0 text-[10px] tabular-nums text-[#A19C94]">
            {currentIndex + 1}/{notices.length}
          </span>
        )}
      </div>
    </div>
  )
}