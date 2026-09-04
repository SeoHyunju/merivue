"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Reservation = {
  id: string
  title: string
  weddingDate: string
  region: string
  status: string
  message: string
}

type OpenPeriod = {
  id: string
  title: string
  startDate: string
  endDate: string
}

type ApiResponse = {
  reservations: Reservation[]
  openPeriods: OpenPeriod[]
}

const REGIONS = [
  "수도권",
  "충청·전라권",
  "경상·부산권",
] as const

const REGION_SHORT: Record<string, string> = {
  수도권: "수도",
  "충청·전라권": "충·전",
  "경상·부산권": "경·부",
}

type CalendarDay = {
  year: number
  month: number
  day: number
  dateString: string
  currentMonth: boolean
  weekday: number
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}

function makeDateString(
  year: number,
  month: number,
  day: number
) {
  return `${year}-${pad(month + 1)}-${pad(day)}`
}

function createCalendarDays(
  year: number,
  month: number
): CalendarDay[] {
  const firstDay = new Date(year, month, 1).getDay()
  const lastDate = new Date(year, month + 1, 0).getDate()
  const previousLastDate = new Date(year, month, 0).getDate()

  const days: CalendarDay[] = []

  // 이전 달
  for (let i = firstDay - 1; i >= 0; i--) {
    const date = new Date(
      year,
      month - 1,
      previousLastDate - i
    )

    days.push({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      dateString: makeDateString(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ),
      currentMonth: false,
      weekday: date.getDay(),
    })
  }

  // 현재 달
  for (let day = 1; day <= lastDate; day++) {
    const date = new Date(year, month, day)

    days.push({
      year,
      month,
      day,
      dateString: makeDateString(year, month, day),
      currentMonth: true,
      weekday: date.getDay(),
    })
  }

  // 다음 달
  let nextDay = 1

  while (days.length < 42) {
    const date = new Date(
      year,
      month + 1,
      nextDay
    )

    days.push({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      dateString: makeDateString(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ),
      currentMonth: false,
      weekday: date.getDay(),
    })

    nextDay++
  }

  return days
}

function isWeekend(weekday: number) {
  return weekday === 0 || weekday === 6
}

function isDateInOpenPeriod(
  dateString: string,
  openPeriods: OpenPeriod[]
) {
  return openPeriods.some(
    (period) =>
      dateString >= period.startDate &&
      dateString <= period.endDate
  )
}

function getTodayString() {
  const today = new Date()

  return makeDateString(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )
}

function getStatusStyle(status: string) {
  switch (status) {
    case "예약 가능":
      return {
        dot: "bg-[#9BC9A2]",
        text: "text-[#5D8C65]",
        badge:
          "border-[#CFE7D3] bg-[#EEF8F0] text-[#5D8C65]",
        card:
          "border-[#D9EBDD] bg-[#F8FCF8]",
      }

    case "마감 임박":
      return {
        dot: "bg-[#F1C66D]",
        text: "text-[#A77A24]",
        badge:
          "border-[#F2DEAD] bg-[#FFF8E8] text-[#A77A24]",
        card:
          "border-[#F2E3BD] bg-[#FFFCF5]",
      }

    case "예약 마감":
      return {
        dot: "bg-[#EFA0A7]",
        text: "text-[#B9626B]",
        badge:
          "border-[#F1C9CD] bg-[#FFF0F2] text-[#B9626B]",
        card:
          "border-[#F1D6D9] bg-[#FFF9FA]",
      }

    case "예약 오픈 전":
      return {
        dot: "bg-[#C8C5BF]",
        text: "text-[#96918A]",
        badge:
          "border-[#E1DED8] bg-[#F5F3F0] text-[#8D8982]",
        card:
          "border-[#E5E1DB] bg-[#FAF9F7]",
      }

    default:
      return {
        dot: "bg-[#C8C5BF]",
        text: "text-[#96918A]",
        badge:
          "border-[#E1DED8] bg-[#F5F3F0] text-[#8D8982]",
        card:
          "border-[#E5E1DB] bg-[#FAF9F7]",
      }
  }
}

function formatSelectedDate(dateString: string) {
  const [year, month, day] = dateString
    .split("-")
    .map(Number)

  const date = new Date(year, month - 1, day)

  const weekday = new Intl.DateTimeFormat("ko-KR", {
    weekday: "short",
  }).format(date)

  return `${year}년 ${month}월 ${day}일 (${weekday})`
}

export default function ReservationStatus() {
  const today = new Date()
  const todayString = getTodayString()

  const [reservations, setReservations] =
    useState<Reservation[]>([])

  const [openPeriods, setOpenPeriods] =
    useState<OpenPeriod[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [currentYear, setCurrentYear] =
    useState(today.getFullYear())

  const [currentMonth, setCurrentMonth] =
    useState(today.getMonth())

  const [selectedDate, setSelectedDate] =
    useState<string | null>(null)

  /* 상세 현황 자동 스크롤용 */
  const detailRef = useRef<HTMLDivElement | null>(null)

  /* ==============================
     API
  ============================== */

  useEffect(() => {
    async function loadReservations() {
      try {
        setLoading(true)
        setError(false)

        const response = await fetch(
          "/api/reservation-status",
          {
            cache: "no-store",
          }
        )

        if (!response.ok) {
          throw new Error("예약현황 조회 실패")
        }

        const data: ApiResponse =
          await response.json()

        setReservations(data.reservations ?? [])
        setOpenPeriods(data.openPeriods ?? [])
      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadReservations()
  }, [])

  /* ==============================
     날짜 선택 후 상세 현황 자동 스크롤
  ============================== */

  useEffect(() => {
    if (!selectedDate) return

    const timer = window.setTimeout(() => {
      detailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 150)

    return () => {
      window.clearTimeout(timer)
    }
  }, [selectedDate])

  /* ==============================
     Notion 예약현황 날짜별 정리
  ============================== */

  const reservationsByDate = useMemo(() => {
    const map = new Map<string, Reservation[]>()

    reservations.forEach((reservation) => {
      if (!map.has(reservation.weddingDate)) {
        map.set(reservation.weddingDate, [])
      }

      map
        .get(reservation.weddingDate)
        ?.push(reservation)
    })

    return map
  }, [reservations])

  const calendarDays = useMemo(() => {
    return createCalendarDays(
      currentYear,
      currentMonth
    )
  }, [currentYear, currentMonth])

  /* ==============================
     상태 계산
  ============================== */

  function getDefaultMessage(status: string) {
    switch (status) {
      case "예약 가능":
        return "현재 예약 가능합니다."

      case "마감 임박":
        return "예약 마감이 임박했습니다."

      case "예약 마감":
        return "예약이 마감되었습니다."

      case "예약 오픈 전":
        return "아직 예약이 오픈되지 않았습니다."

      default:
        return ""
    }
  }

  function getRegionStatus(
    dateString: string,
    weekday: number,
    region: string
  ) {
    // 평일
    if (!isWeekend(weekday)) {
      return null
    }

    // 지난 날짜
    if (dateString < todayString) {
      return null
    }

    // 예약 오픈 여부
    const opened = isDateInOpenPeriod(
      dateString,
      openPeriods
    )

    if (!opened) {
      return {
        status: "예약 오픈 전",
        message:
          "아직 예약이 오픈되지 않았습니다.",
      }
    }

    // Notion 예약현황 관리 DB의 예외값
    const dayReservations =
      reservationsByDate.get(dateString) ?? []

    const override = dayReservations.find(
      (item) => item.region === region
    )

    if (override) {
      return {
        status: override.status,
        message:
          override.message ||
          getDefaultMessage(override.status),
      }
    }

    // 오픈 기간 토·일 기본값
    return {
      status: "예약 가능",
      message: "현재 예약 가능합니다.",
    }
  }

  /* ==============================
     월 이동
  ============================== */

  function previousMonth() {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1)
      setCurrentMonth(11)
    } else {
      setCurrentMonth((prev) => prev - 1)
    }

    setSelectedDate(null)
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1)
      setCurrentMonth(0)
    } else {
      setCurrentMonth((prev) => prev + 1)
    }

    setSelectedDate(null)
  }

  return (
    <section
      id="reservation-status"
      className="bg-[#F8F6F2] px-4 py-14 sm:px-6 md:py-20"
    >
      <div className="mx-auto max-w-6xl">

        {loading && (
          <div className="py-20 text-center text-sm text-[#8B8F96]">
            예약 현황을 불러오고 있습니다.
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-[#E4DFD6] bg-white px-6 py-16 text-center">
            <p className="text-sm text-[#777]">
              예약 현황을 불러오지 못했습니다.
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ======================
                달력 안내
            ====================== */}

            <div className="mb-5 text-center md:mb-7">
              <p className="text-sm font-semibold text-[#17233C] md:text-base">
                예식일을 선택해 주세요
              </p>

              <p className="mt-1.5 text-xs leading-6 text-[#7F848C] md:text-sm">
                날짜를 선택하시면 권역별 예약 현황을
                자세히 확인하실 수 있습니다.
              </p>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-[#B5965B]">
                <span>달력에서 토·일 날짜 선택</span>
                <span aria-hidden="true">↓</span>
              </div>
            </div>

            {/* ======================
                달력
            ====================== */}

            <div className="overflow-hidden rounded-2xl border border-[#E2DED7] bg-white">

              {/* 월 이동 */}
              <div className="flex h-20 items-center justify-between border-b border-[#ECE8E1] px-4 sm:px-7">

                <button
                  type="button"
                  onClick={previousMonth}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#E2DED7] text-xl text-[#17233C] transition hover:bg-[#F8F6F2]"
                  aria-label="이전 달"
                >
                  ‹
                </button>

                <h2 className="text-lg font-semibold text-[#17233C] md:text-2xl">
                  {currentYear}년 {currentMonth + 1}월
                </h2>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#E2DED7] text-xl text-[#17233C] transition hover:bg-[#F8F6F2]"
                  aria-label="다음 달"
                >
                  ›
                </button>

              </div>

              {/* 요일 */}
              <div className="grid grid-cols-7 border-b border-[#ECE8E1]">
                {[
                  "일",
                  "월",
                  "화",
                  "수",
                  "목",
                  "금",
                  "토",
                ].map((day, index) => (
                  <div
                    key={day}
                    className={`py-4 text-center text-sm font-medium ${
                      index === 0
                        ? "text-[#D77C7C]"
                        : index === 6
                        ? "text-[#6E91B7]"
                        : "text-[#858991]"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* 날짜 */}
              <div className="grid grid-cols-7">

                {calendarDays.map((day) => {
                  const weekend =
                    isWeekend(day.weekday)

                  const past =
                    day.dateString < todayString

                  const opened =
                    isDateInOpenPeriod(
                      day.dateString,
                      openPeriods
                    )

                  const selected =
                    selectedDate === day.dateString

                  const selectable =
                    day.currentMonth &&
                    weekend &&
                    !past

                  return (
                    <button
                      key={day.dateString}
                      type="button"
                      disabled={!selectable}
                      onClick={() =>
                        setSelectedDate(day.dateString)
                      }
                      className={`
                        relative
                        min-h-[95px]
                        border-b
                        border-r
                        border-[#F0ECE6]
                        p-2
                        text-left
                        transition
                        sm:min-h-[160px]
                        sm:p-4

                        ${
                          !day.currentMonth
                            ? "bg-[#FAF9F7]"
                            : past
                            ? "bg-[#FAF9F7]"
                            : "bg-white"
                        }

                        ${
                          selectable
                            ? "cursor-pointer hover:bg-[#FCFBF8]"
                            : "cursor-default"
                        }

                        ${
                          selected
                            ? "ring-2 ring-inset ring-[#C9A765]"
                            : ""
                        }
                      `}
                    >

                      {/* 날짜 */}
                      <div
                        className={`text-center text-sm font-medium sm:text-lg ${
                          !day.currentMonth
                            ? "text-[#D4D1CC]"
                            : past
                            ? "text-[#CCC8C1]"
                            : day.weekday === 0
                            ? "text-[#D77C7C]"
                            : day.weekday === 6
                            ? "text-[#6286AD]"
                            : "text-[#17233C]"
                        }`}
                      >
                        {day.day}
                      </div>

                      {/* 지난 날짜 */}
                      {day.currentMonth &&
                        weekend &&
                        past && (
                          <div className="mt-5 text-center">
                            <span className="text-[9px] font-medium text-[#C2BEB7] sm:text-xs">
                              지난 일정
                            </span>
                          </div>
                        )}

                      {/* 오픈 전 */}
                      {day.currentMonth &&
                        weekend &&
                        !past &&
                        !opened && (
                          <div className="mt-5 flex justify-center sm:mt-8">
                            <span className="rounded-full bg-[#F3F1EE] px-2 py-1 text-[8px] font-medium text-[#99948D] sm:px-3 sm:py-1.5 sm:text-xs">
                              예약 오픈 전
                            </span>
                          </div>
                        )}

                      {/* 예약 오픈된 토/일 */}
                      {day.currentMonth &&
                        weekend &&
                        !past &&
                        opened && (
                          <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">

                            {REGIONS.map((region) => {
                              const result =
                                getRegionStatus(
                                  day.dateString,
                                  day.weekday,
                                  region
                                )

                              if (!result) return null

                              const style =
                                getStatusStyle(
                                  result.status
                                )

                              return (
                                <div
                                  key={region}
                                  className="flex items-center gap-1 sm:gap-2"
                                >
                                  <span
                                    className={`h-2 w-2 shrink-0 rounded-full sm:h-2.5 sm:w-2.5 ${style.dot}`}
                                  />

                                  <span
                                    className={`truncate text-[9px] font-medium sm:text-sm ${style.text}`}
                                  >
                                    <span className="sm:hidden">
                                      {REGION_SHORT[region]}
                                    </span>

                                    <span className="hidden sm:inline">
                                      {region}
                                    </span>
                                  </span>
                                </div>
                              )
                            })}

                          </div>
                        )}

                    </button>
                  )
                })}

              </div>
            </div>

            {/* ======================
                범례
            ====================== */}

            <div className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-3">

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#9BC9A2]" />
                <span className="text-sm text-[#5D8C65]">
                  예약 가능
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F1C66D]" />
                <span className="text-sm text-[#A77A24]">
                  마감 임박
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EFA0A7]" />
                <span className="text-sm text-[#B9626B]">
                  예약 마감
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C8C5BF]" />
                <span className="text-sm text-[#96918A]">
                  예약 오픈 전
                </span>
              </div>

            </div>

            {/* ======================
                선택 날짜 상세
            ====================== */}

            {selectedDate && (() => {
              const [year, month, day] =
                selectedDate
                  .split("-")
                  .map(Number)

              const weekday = new Date(
                year,
                month - 1,
                day
              ).getDay()

              const opened =
                isDateInOpenPeriod(
                  selectedDate,
                  openPeriods
                )

              return (
                <div
                  ref={detailRef}
                  className="mt-10 scroll-mt-24 overflow-hidden rounded-2xl border border-[#E2DED7] bg-white"
                >

                  <div className="border-b border-[#ECE8E1] px-6 py-7 text-center">

                    <p className="text-xs font-medium tracking-[0.16em] text-[#B5965B]">
                      RESERVATION AVAILABILITY
                    </p>

                    <h3 className="mt-2 text-xl font-semibold text-[#17233C] md:text-2xl">
                      {formatSelectedDate(
                        selectedDate
                      )}
                    </h3>

                    <p className="mt-2 text-xs text-[#8B8F96] md:text-sm">
                      선택하신 예식일의 권역별 예약 현황입니다.
                    </p>

                  </div>

                  {!opened ? (
                    <div className="px-6 py-14 text-center">

                      <span className="inline-flex rounded-full border border-[#E1DED8] bg-[#F5F3F0] px-5 py-2.5 text-sm font-semibold text-[#8D8982]">
                        예약 오픈 전
                      </span>

                      <p className="mt-5 text-sm leading-7 text-[#7F848C]">
                        아직 예약이 오픈되지 않은
                        일정입니다.
                        <br />
                        예약 오픈 일정은 추후
                        안내드리겠습니다.
                      </p>

                    </div>
                  ) : (
                    <div className="grid gap-4 p-4 md:grid-cols-3 md:p-6">

                      {REGIONS.map((region) => {
                        const result =
                          getRegionStatus(
                            selectedDate,
                            weekday,
                            region
                          )

                        if (!result) return null

                        const style =
                          getStatusStyle(
                            result.status
                          )

                        return (
                          <div
                            key={region}
                            className={`rounded-xl border px-5 py-8 text-center ${style.card}`}
                          >

                            <p className="text-base font-semibold text-[#17233C] md:text-lg">
                              {region}
                            </p>

                            <div className="mt-5">
                              <span
                                className={`inline-flex rounded-full border px-5 py-2.5 text-sm font-semibold ${style.badge}`}
                              >
                                {result.status}
                              </span>
                            </div>

                            <p className="mt-5 min-h-[48px] text-sm leading-6 text-[#7F848C]">
                              {result.message}
                            </p>

                          </div>
                        )
                      })}

                    </div>
                  )}

                </div>
              )
            })()}

          </>
        )}

      </div>
    </section>
  )
}