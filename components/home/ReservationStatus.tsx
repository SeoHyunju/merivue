"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

type Reservation = {
  id: string
  weddingDate: string
  weddingTime: string
  region: string
  venue: string
  status: string
}

type ApiResponse = {
  success: boolean
  count: number
  reservations: Reservation[]
}

type WeekendDate = {
  date: Date
  dateString: string
}

const REGIONS = ["서울", "경기", "부산", "기타"]

function toDateString(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function formatWeekendDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date)
}

function getUpcomingWeekends(weeks = 4): WeekendDate[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const result: WeekendDate[] = []
  const cursor = new Date(today)

  while (result.length < weeks * 2) {
    const day = cursor.getDay()

    if (day === 0 || day === 6) {
      result.push({
        date: new Date(cursor),
        dateString: toDateString(cursor),
      })
    }

    cursor.setDate(cursor.getDate() + 1)
  }

  return result
}

function getRegionStatus(count: number) {
  if (count >= 2) {
    return {
      label: "마감 임박",
      badgeClass: "bg-[#efe4cf] text-[#876c3e]",
      dotClass: "bg-[#b5965b]",
    }
  }

  return {
    label: "예약 가능",
    badgeClass: "bg-[#edf3ec] text-[#567057]",
    dotClass: "bg-[#748f73]",
  }
}

export default function ReservationStatus() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    async function loadReservations() {
      try {
        const response = await fetch("/api/reservation-status", {
          cache: "no-store",
        })

        const data: ApiResponse = await response.json()

        if (!response.ok || !data.success) {
          throw new Error("예약 현황 조회 실패")
        }

        setReservations(data.reservations)
      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadReservations()
  }, [])

  const upcomingWeekends = useMemo(() => {
    return getUpcomingWeekends(4)
  }, [])

  const visibleWeekends = useMemo(() => {
    return showMore
      ? upcomingWeekends
      : upcomingWeekends.slice(0, 2)
  }, [showMore, upcomingWeekends])

  const confirmedReservations = useMemo(() => {
    return reservations.filter(
      (reservation) => reservation.status === "예약확정"
    )
  }, [reservations])

  const reservationCountByDateAndRegion = useMemo(() => {
    return confirmedReservations.reduce<
      Record<string, Record<string, number>>
    >((acc, reservation) => {
      if (!reservation.weddingDate) {
        return acc
      }

      const region = REGIONS.includes(reservation.region)
        ? reservation.region
        : "기타"

      if (!acc[reservation.weddingDate]) {
        acc[reservation.weddingDate] = {}
      }

      acc[reservation.weddingDate][region] =
        (acc[reservation.weddingDate][region] || 0) + 1

      return acc
    }, {})
  }, [confirmedReservations])

  return (
    <section className="bg-white px-5 py-24 sm:px-6 md:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col gap-7 border-b border-[#17233c]/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#a3844e]">
              RESERVATION STATUS
            </p>

            <h2 className="mt-5 text-3xl font-medium leading-[1.3] tracking-[-0.03em] text-[#17233c] sm:text-4xl md:text-[44px]">
              가까운 주말 예약 현황을
              <br />
              확인해 보세요
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#6d7280]">
              오늘을 기준으로 가장 가까운 주말의
              지역별 예약 가능 여부를 안내합니다.
            </p>
          </div>

          <Link
            href="/reservation"
            className="inline-flex h-11 shrink-0 items-center justify-center border border-[#17233c] px-7 text-sm font-medium text-[#17233c] transition-colors hover:bg-[#17233c] hover:text-white"
          >
            예약 및 문의
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#6d7280]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#748f73]" />
            예약 가능
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#b5965b]" />
            마감 임박
          </div>
        </div>

        {loading && (
          <div className="py-16 text-center">
            <p className="text-sm text-[#6d7280]">
              예약 현황을 확인하고 있습니다.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 border border-[#aa7777]/20 bg-[#faf1f1] px-6 py-8 text-center">
            <p className="text-sm text-[#865454]">
              예약 현황을 불러오지 못했습니다.
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mt-10 space-y-5">
              {visibleWeekends.map((weekend) => {
                const dateCounts =
                  reservationCountByDateAndRegion[weekend.dateString] || {}

                return (
                  <article
                    key={weekend.dateString}
                    className="border border-[#17233c]/10 bg-[#faf8f3]"
                  >
                    <div className="flex items-center justify-between border-b border-[#17233c]/10 px-6 py-5 sm:px-7">
                      <div>
                        <p className="text-[10px] tracking-[0.22em] text-[#a3844e]">
                          WEEKEND
                        </p>

                        <h3 className="mt-2 text-xl font-medium text-[#17233c]">
                          {formatWeekendDate(weekend.date)}
                        </h3>
                      </div>

                      <span className="text-xs text-[#8a8f98]">
                        지역별 예약 현황
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                      {REGIONS.map((region) => {
                        const count = dateCounts[region] || 0
                        const status = getRegionStatus(count)

                        return (
                          <div
                            key={region}
                            className="border-b border-[#17233c]/10 p-6 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <p className="font-medium text-[#17233c]">
                                {region}
                              </p>

                              <span
                                className={`px-3 py-1.5 text-[11px] font-medium ${status.badgeClass}`}
                              >
                                {status.label}
                              </span>
                            </div>

                            <div className="mt-5 flex items-center gap-2">
                              <span
                                className={`h-2 w-2 rounded-full ${status.dotClass}`}
                              />

                              <p className="text-xs text-[#6d7280]">
                                {status.label === "예약 가능"
                                  ? "예약 신청이 가능합니다."
                                  : "예약이 빠르게 진행되고 있습니다."}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex justify-end border-t border-[#17233c]/10 px-6 py-4 sm:px-7">
                      <Link
                        href="/reservation"
                        className="text-xs font-medium text-[#17233c] transition-opacity hover:opacity-60"
                      >
                        이 날짜로 예약 문의하기 →
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowMore((prev) => !prev)}
                className="inline-flex h-11 items-center justify-center border border-[#17233c]/20 bg-white px-8 text-sm font-medium text-[#17233c] transition-colors hover:border-[#17233c] hover:bg-[#17233c] hover:text-white"
              >
                {showMore ? "접기 ↑" : "다른 주말 더보기 ↓"}
              </button>
            </div>
          </>
        )}

        <div className="mt-8 border-t border-[#17233c]/10 pt-6">
          <p className="text-xs leading-6 text-[#8a8f98]">
            ※ 지역별 예약확정 현황을 기준으로 표시됩니다.
            동일 지역에 예약확정이 2건 이상인 경우 마감 임박으로 안내됩니다.
          </p>
        </div>
      </div>
    </section>
  )
}