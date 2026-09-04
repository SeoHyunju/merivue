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

function getTodayKey() {
  const now = new Date()

  return `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`
}

function getTypeLabel(type: string) {
  switch (type) {
    case "예약마감":
      return "RESERVATION"

    case "이벤트":
      return "EVENT"

    default:
      return "NOTICE"
  }
}

export default function NoticePopup() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    async function loadNotices() {
      try {
        const response = await fetch("/api/notices", {
          cache: "no-store",
        })

        if (!response.ok) return

        const data: ApiResponse = await response.json()

        const popupNotices = (data.notices ?? []).filter(
          (notice) => notice.popup
        )

        const availableNotices = popupNotices.filter(
          (notice) => {
            const storageKey = `merivue_notice_${notice.id}`
            const hiddenDate = localStorage.getItem(storageKey)

            return hiddenDate !== getTodayKey()
          }
        )

        setNotices(availableNotices)

        if (availableNotices.length > 0) {
          setVisible(true)
        }
      } catch (error) {
        console.error("Notice popup error:", error)
      }
    }

    loadNotices()
  }, [])

  if (!visible || notices.length === 0) {
    return null
  }

  const currentNotice = notices[currentIndex]

  function closeCurrent() {
    if (currentIndex < notices.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      return
    }

    setVisible(false)
  }

  function hideToday() {
    const storageKey = `merivue_notice_${currentNotice.id}`

    localStorage.setItem(storageKey, getTodayKey())

    closeCurrent()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101725]/40 px-5 backdrop-blur-[2px]">
      <div className="w-full max-w-[460px] overflow-hidden border border-white/60 bg-[#F8F6F2] shadow-[0_30px_80px_rgba(23,35,60,0.22)]">

        <div className="px-7 pb-8 pt-9 sm:px-10 sm:pb-10 sm:pt-11">
          <div className="flex items-start justify-between gap-5">
            <p className="text-[10px] font-semibold tracking-[0.26em] text-[#B5965B]">
              {getTypeLabel(currentNotice.type)}
            </p>

            {notices.length > 1 && (
              <span className="text-[10px] tabular-nums text-[#A09B93]">
                {currentIndex + 1} / {notices.length}
              </span>
            )}
          </div>

          <h2 className="mt-5 break-keep text-2xl font-semibold leading-[1.4] tracking-[-0.035em] text-[#17233C]">
            {currentNotice.title}
          </h2>

          {currentNotice.content && (
            <p className="mt-5 whitespace-pre-line break-keep text-sm leading-7 text-[#6F7682]">
              {currentNotice.content}
            </p>
          )}

          <div className="mt-8 h-px bg-[#E2DED7]" />

          <p className="mt-6 text-xs leading-6 text-[#99958E]">
            자세한 예약 가능 여부는 예약 현황에서 확인하실 수 있습니다.
          </p>

          <a
            href="/reservation-status"
            className="mt-6 flex h-[52px] w-full items-center justify-center bg-[#17233C] px-6 text-sm font-semibold text-white transition hover:bg-[#243451]"
          >
            예약 현황 확인하기
          </a>
        </div>

        <div className="grid grid-cols-2 border-t border-[#E2DED7] bg-white">
          <button
            type="button"
            onClick={hideToday}
            className="h-[52px] border-r border-[#E2DED7] text-xs font-medium text-[#777D86] transition hover:bg-[#F8F6F2]"
          >
            오늘 하루 보지 않기
          </button>

          <button
            type="button"
            onClick={closeCurrent}
            className="h-[52px] text-xs font-medium text-[#17233C] transition hover:bg-[#F8F6F2]"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}