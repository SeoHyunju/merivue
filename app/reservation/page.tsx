"use client"

import { FormEvent, useMemo, useState } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const packages = [
  {
    code: "PACKAGE_A",
    name: "한측",
    description: "2인 1조",
    price: 200000,
  },
  {
    code: "PACKAGE_B",
    name: "양측",
    description: "2인 1조 × 2팀",
    price: 400000,
  },
]

const settlementOptions = [
  {
    value: "밀봉정산",
    title: "밀봉정산",
    description:
      "봉투를 개봉하지 않고 외부 기재 내용을 기준으로 기록합니다.",
    price: 0,
  },
  {
    value: "개봉정산",
    title: "개봉정산",
    description:
      "봉투를 개봉하여 금액을 확인 및 기록한 후 다시 밀봉합니다.",
    price: 0,
  },
  {
    value: "권종별 계수 정산",
    title: "권종별 계수 정산",
    description:
      "봉투 개봉 후 현금을 권종별로 분류하여 직접 계수합니다.",
    price: 50000,
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR").format(price)
}

export default function ReservationPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [weddingDate, setWeddingDate] = useState("")
  const [weddingTime, setWeddingTime] = useState("")
  const [venue, setVenue] = useState("")

  const [region, setRegion] = useState("")
  const [customRegion, setCustomRegion] = useState("")

  const [packageCode, setPackageCode] = useState("")
  const [settlementType, setSettlementType] = useState("")
  const [guestCount, setGuestCount] = useState("100")
  const [message, setMessage] = useState("")
  const [privacyAgree, setPrivacyAgree] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resultMessage, setResultMessage] = useState("")
  const [resultType, setResultType] = useState<
    "success" | "error" | ""
  >("")

  const selectedPackage = packages.find(
    (item) => item.code === packageCode
  )

  const selectedSettlement = settlementOptions.find(
    (item) => item.value === settlementType
  )

  const additionalGuests = useMemo(() => {
    const guests = Number(guestCount) || 0

    if (guests <= 100) {
      return 0
    }

    return guests - 100
  }, [guestCount])

  const additionalGuestPrice = useMemo(() => {
    if (additionalGuests <= 0) {
      return 0
    }

    return Math.ceil(additionalGuests / 50) * 100000
  }, [additionalGuests])

  const totalPrice = useMemo(() => {
    const packagePrice = selectedPackage?.price ?? 0
    const settlementPrice = selectedSettlement?.price ?? 0

    return packagePrice + additionalGuestPrice + settlementPrice
  }, [
    selectedPackage,
    selectedSettlement,
    additionalGuestPrice,
  ])

  function isWeekend(dateString: string) {
    if (!dateString) {
      return false
    }

    const date = new Date(`${dateString}T12:00:00`)
    const day = date.getDay()

    return day === 0 || day === 6
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setResultMessage("")
    setResultType("")

    if (!isWeekend(weddingDate)) {
      setResultType("error")
      setResultMessage(
        "MERIVUE는 토요일과 일요일 예식만 예약 가능합니다."
      )
      return
    }

    if (region === "기타" && !customRegion.trim()) {
      setResultType("error")
      setResultMessage("기타 지역명을 입력해 주세요.")
      return
    }

    if (!selectedPackage) {
      setResultType("error")
      setResultMessage("상품을 선택해 주세요.")
      return
    }

    if (!selectedSettlement) {
      setResultType("error")
      setResultMessage("정산 방식을 선택해 주세요.")
      return
    }

    if (!privacyAgree) {
      setResultType("error")
      setResultMessage(
        "개인정보 수집 및 이용에 동의해 주세요."
      )
      return
    }

    const finalMessage =
      region === "기타"
        ? `[기타 지역: ${customRegion}]\n${message}`
        : message

    try {
      setIsSubmitting(true)

      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          weddingDate,
          weddingTime,
          venue,
          region: region === "기타" ? "기타" : region,

          packageName: `${selectedPackage.name} (${selectedPackage.description})`,
          packageCode: selectedPackage.code,

          settlementType: selectedSettlement.value,

          guestCount: Number(guestCount),

          message: finalMessage,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "예약 접수에 실패했습니다."
        )
      }

      setResultType("success")
      setResultMessage(
        "예약 신청이 정상적으로 접수되었습니다. 확인 후 순차적으로 연락드리겠습니다."
      )

      setName("")
      setPhone("")
      setWeddingDate("")
      setWeddingTime("")
      setVenue("")
      setRegion("")
      setCustomRegion("")
      setPackageCode("")
      setSettlementType("")
      setGuestCount("100")
      setMessage("")
      setPrivacyAgree(false)
    } catch (error) {
      setResultType("error")
      setResultMessage(
        error instanceof Error
          ? error.message
          : "예약 접수 중 오류가 발생했습니다."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#17233c]">
      <Header />

      <section className="px-5 pb-14 pt-36 sm:px-6 md:pb-16 md:pt-40 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs tracking-[0.3em] text-[#a3844e]">
            RESERVATION & CONTACT
          </p>

          <h1 className="mt-5 text-4xl font-medium tracking-[-0.035em] sm:text-5xl md:text-6xl">
            예약 및 문의
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#6d7280] sm:text-base">
            예식 정보를 입력해 주시면 일정 확인 후 상담을 통해
            최종 예약을 안내드립니다.
          </p>

          <p className="mt-3 text-sm font-medium text-[#a3844e]">
            토요일 · 일요일 예식만 예약 가능합니다.
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-6 md:pb-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <form
            onSubmit={handleSubmit}
            className="border border-[#17233c]/10 bg-white p-6 sm:p-8 lg:p-10"
          >
            <div>
              <p className="text-xs tracking-[0.25em] text-[#a3844e]">
                01 · CUSTOMER INFORMATION
              </p>

              <h2 className="mt-3 text-2xl font-medium">
                예약자 정보
              </h2>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">
                  예약자명 *
                </span>

                <input
                  required
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="mt-2 h-12 w-full border border-[#17233c]/15 bg-[#fffdfa] px-4 text-sm outline-none transition focus:border-[#a3844e]"
                  placeholder="성함을 입력해 주세요"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">
                  연락처 *
                </span>

                <input
                  required
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="mt-2 h-12 w-full border border-[#17233c]/15 bg-[#fffdfa] px-4 text-sm outline-none transition focus:border-[#a3844e]"
                  placeholder="010-0000-0000"
                />
              </label>
            </div>

            <div className="mt-12 border-t border-[#17233c]/10 pt-9">
              <p className="text-xs tracking-[0.25em] text-[#a3844e]">
                02 · WEDDING INFORMATION
              </p>

              <h2 className="mt-3 text-2xl font-medium">
                예식 정보
              </h2>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">
                  예식일 *
                </span>

                <input
                  required
                  type="date"
                  value={weddingDate}
                  onChange={(e) => {
                    const value = e.target.value

                    if (!value) {
                      setWeddingDate("")
                      return
                    }

                    if (!isWeekend(value)) {
                      setWeddingDate("")
                      setResultType("error")
                      setResultMessage(
                        "토요일 또는 일요일 날짜를 선택해 주세요."
                      )
                      return
                    }

                    setWeddingDate(value)
                    setResultMessage("")
                    setResultType("")
                  }}
                  className="mt-2 h-12 w-full border border-[#17233c]/15 bg-[#fffdfa] px-4 text-sm outline-none transition focus:border-[#a3844e]"
                />

                <p className="mt-2 text-xs text-[#8a8f98]">
                  토요일 · 일요일 예식만 예약 가능합니다.
                </p>
              </label>

              <label className="block">
                <span className="text-sm font-medium">
                  예식시간 *
                </span>

                <input
                  required
                  type="time"
                  value={weddingTime}
                  onChange={(e) =>
                    setWeddingTime(e.target.value)
                  }
                  className="mt-2 h-12 w-full border border-[#17233c]/15 bg-[#fffdfa] px-4 text-sm outline-none transition focus:border-[#a3844e]"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">
                  예식장 *
                </span>

                <input
                  required
                  value={venue}
                  onChange={(e) =>
                    setVenue(e.target.value)
                  }
                  className="mt-2 h-12 w-full border border-[#17233c]/15 bg-[#fffdfa] px-4 text-sm outline-none transition focus:border-[#a3844e]"
                  placeholder="예식장명을 입력해 주세요"
                />
              </label>

              <div className="sm:col-span-2">
                <label className="block">
                  <span className="text-sm font-medium">
                    지역 *
                  </span>

                  <select
                    required
                    value={region}
                    onChange={(e) => {
                      setRegion(e.target.value)

                      if (
                        e.target.value !== "기타"
                      ) {
                        setCustomRegion("")
                      }
                    }}
                    className="mt-2 h-12 w-full border border-[#17233c]/15 bg-[#fffdfa] px-4 text-sm outline-none transition focus:border-[#a3844e]"
                  >
                    <option value="">
                      지역을 선택해 주세요
                    </option>

                    <option value="서울">
                      서울
                    </option>

                    <option value="경기">
                      경기
                    </option>

                    <option value="부산">
                      부산
                    </option>

                    <option value="기타">
                      기타
                    </option>
                  </select>
                </label>

                {region === "기타" && (
                  <label className="mt-4 block">
                    <span className="text-sm font-medium">
                      기타 지역 *
                    </span>

                    <input
                      required
                      value={customRegion}
                      onChange={(e) =>
                        setCustomRegion(
                          e.target.value
                        )
                      }
                      className="mt-2 h-12 w-full border border-[#17233c]/15 bg-[#fffdfa] px-4 text-sm outline-none transition focus:border-[#a3844e]"
                      placeholder="예: 대구, 울산, 경남 창원"
                    />

                    <p className="mt-2 text-xs leading-6 text-[#8a8f98]">
                      기타 지역은 서비스 가능 여부 확인 후 상담을 통해 안내드립니다.
                    </p>
                  </label>
                )}
              </div>
            </div>

            <div className="mt-12 border-t border-[#17233c]/10 pt-9">
              <p className="text-xs tracking-[0.25em] text-[#a3844e]">
                03 · PACKAGE
              </p>

              <h2 className="mt-3 text-2xl font-medium">
                상품 선택
              </h2>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {packages.map((item) => {
                const active =
                  packageCode === item.code

                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() =>
                      setPackageCode(item.code)
                    }
                    className={`border p-6 text-left transition ${
                      active
                        ? "border-[#b5965b] bg-[#fcfaf6]"
                        : "border-[#17233c]/10 bg-white hover:border-[#b5965b]/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xl font-medium">
                          {item.name}
                        </p>

                        <p className="mt-1 text-sm text-[#6d7280]">
                          {item.description}
                        </p>
                      </div>

                      <div
                        className={`h-4 w-4 rounded-full border ${
                          active
                            ? "border-[#a3844e] bg-[#a3844e]"
                            : "border-[#17233c]/30"
                        }`}
                      />
                    </div>

                    <p className="mt-7 text-2xl font-medium">
                      {formatPrice(
                        item.price
                      )}
                      원
                    </p>

                    <p className="mt-2 text-xs text-[#a3844e]">
                      오픈 이벤트가
                    </p>
                  </button>
                )
              })}
            </div>

            <div className="mt-8">
              <label className="block">
                <span className="text-sm font-medium">
                  예상 하객 인원 *
                </span>

                <input
                  required
                  type="number"
                  min={1}
                  value={guestCount}
                  onChange={(e) =>
                    setGuestCount(
                      e.target.value
                    )
                  }
                  className="mt-2 h-12 w-full border border-[#17233c]/15 bg-[#fffdfa] px-4 text-sm outline-none transition focus:border-[#a3844e]"
                />

                <p className="mt-2 text-xs leading-6 text-[#8a8f98]">
                  기본 보증인원은 100명이며, 초과 인원은 50명 단위마다 100,000원이 추가됩니다.
                </p>
              </label>
            </div>

            <div className="mt-12 border-t border-[#17233c]/10 pt-9">
              <p className="text-xs tracking-[0.25em] text-[#a3844e]">
                04 · SETTLEMENT
              </p>

              <h2 className="mt-3 text-2xl font-medium">
                정산방식 선택
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#6d7280]">
                정산방식은 예식일 7일 전까지 변경 가능합니다.
              </p>
            </div>

            <div className="mt-7 space-y-3">
              {settlementOptions.map(
                (item) => {
                  const active =
                    settlementType ===
                    item.value

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() =>
                        setSettlementType(
                          item.value
                        )
                      }
                      className={`w-full border p-5 text-left transition ${
                        active
                          ? "border-[#b5965b] bg-[#fcfaf6]"
                          : "border-[#17233c]/10 bg-white hover:border-[#b5965b]/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium">
                            {item.title}
                          </p>

                          <p className="mt-2 text-sm leading-6 text-[#6d7280]">
                            {
                              item.description
                            }
                          </p>
                        </div>

                        {item.price > 0 && (
                          <span className="shrink-0 text-sm font-medium text-[#a3844e]">
                            +
                            {formatPrice(
                              item.price
                            )}
                            원
                          </span>
                        )}
                      </div>
                    </button>
                  )
                }
              )}
            </div>

            <div className="mt-12 border-t border-[#17233c]/10 pt-9">
              <label className="block">
                <span className="text-sm font-medium">
                  문의사항
                </span>

                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  rows={5}
                  className="mt-2 w-full resize-none border border-[#17233c]/15 bg-[#fffdfa] p-4 text-sm outline-none transition focus:border-[#a3844e]"
                  placeholder="추가 요청사항이 있으시면 작성해 주세요."
                />
              </label>
            </div>

            <label className="mt-8 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={privacyAgree}
                onChange={(e) =>
                  setPrivacyAgree(
                    e.target.checked
                  )
                }
                className="mt-1"
              />

              <span className="text-sm leading-6 text-[#6d7280]">
                예약 상담을 위한 개인정보 수집 및 이용에 동의합니다.
              </span>
            </label>

            {resultMessage && (
              <div
                className={`mt-6 border px-5 py-4 text-sm leading-6 ${
                  resultType === "success"
                    ? "border-[#829b80]/30 bg-[#f1f6f0] text-[#4f694d]"
                    : "border-[#aa7777]/30 bg-[#faf1f1] text-[#865454]"
                }`}
              >
                {resultMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 flex h-14 w-full items-center justify-center bg-[#17233c] text-sm font-medium text-white transition hover:bg-[#263756] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "예약 접수 중..."
                : "예약 신청하기"}
            </button>
          </form>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-[#c6aa73]/25 bg-[#fffdfa] p-6 sm:p-8">
              <p className="text-xs tracking-[0.25em] text-[#a3844e]">
                RESERVATION SUMMARY
              </p>

              <h2 className="mt-3 text-2xl font-medium">
                예약 예상 금액
              </h2>

              <div className="mt-8 space-y-5 border-y border-[#17233c]/10 py-6 text-sm">
                <div className="flex justify-between gap-5">
                  <span className="text-[#6d7280]">
                    선택 상품
                  </span>

                  <span className="text-right font-medium">
                    {selectedPackage
                      ? `${selectedPackage.name} (${selectedPackage.description})`
                      : "선택 전"}
                  </span>
                </div>

                <div className="flex justify-between gap-5">
                  <span className="text-[#6d7280]">
                    상품 금액
                  </span>

                  <span className="font-medium">
                    {selectedPackage
                      ? `${formatPrice(
                          selectedPackage.price
                        )}원`
                      : "0원"}
                  </span>
                </div>

                <div className="flex justify-between gap-5">
                  <span className="text-[#6d7280]">
                    추가 인원
                  </span>

                  <span className="font-medium">
                    {additionalGuests > 0
                      ? `${additionalGuests}명`
                      : "없음"}
                  </span>
                </div>

                <div className="flex justify-between gap-5">
                  <span className="text-[#6d7280]">
                    인원 추가비
                  </span>

                  <span className="font-medium">
                    {formatPrice(
                      additionalGuestPrice
                    )}
                    원
                  </span>
                </div>

                <div className="flex justify-between gap-5">
                  <span className="text-[#6d7280]">
                    정산방식
                  </span>

                  <span className="text-right font-medium">
                    {selectedSettlement?.title ??
                      "선택 전"}
                  </span>
                </div>

                <div className="flex justify-between gap-5">
                  <span className="text-[#6d7280]">
                    정산 추가비
                  </span>

                  <span className="font-medium">
                    {formatPrice(
                      selectedSettlement?.price ??
                        0
                    )}
                    원
                  </span>
                </div>
              </div>

              <div className="mt-7 flex items-end justify-between">
                <span className="text-sm text-[#6d7280]">
                  예상 총금액
                </span>

                <p className="text-3xl font-medium tracking-tight">
                  {formatPrice(totalPrice)}
                  <span className="ml-1 text-base">
                    원
                  </span>
                </p>
              </div>

              <p className="mt-6 text-xs leading-6 text-[#8a8f98]">
                최종 금액은 상담 및 예식 현장 조건 확인 후 확정됩니다.
              </p>
            </div>

            <div className="mt-5 border border-[#17233c]/10 bg-white p-6">
              <p className="font-medium">
                예약 전 확인사항
              </p>

              <div className="mt-4 space-y-3 text-sm leading-6 text-[#6d7280]">
                <p>
                  • 토요일 · 일요일 예식만 운영합니다.
                </p>

                <p>
                  • 예약 신청 후 상담을 거쳐 최종 확정됩니다.
                </p>

                <p>
                  • 정산 방식은 예식일 7일 전까지 변경 가능합니다.
                </p>

                <p>
                  • 기타 지역은 상담 후 서비스 가능 여부를 안내드립니다.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  )
}