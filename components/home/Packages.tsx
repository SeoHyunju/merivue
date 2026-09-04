"use client"

import { useEffect, useState } from "react"

type PackageItem = {
  id: string
  name: string
  code: string
  originalPrice: number
  salePrice: number
  staff: string
  basicHours: number
  guaranteedGuests: number
  extraGuestUnit: number
  extraFee: number
  eventLabel: string
  eventDescription: string
  startDate: string
  endDate: string
  order: number
}

type ApiResponse = {
  packages: PackageItem[]
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR").format(price)
}

function isEventActive(
  startDate: string,
  endDate: string
) {
  const now = new Date()

  const today =
    `${now.getFullYear()}-` +
    `${String(now.getMonth() + 1).padStart(2, "0")}-` +
    `${String(now.getDate()).padStart(2, "0")}`

  if (startDate && today < startDate) {
    return false
  }

  if (endDate && today > endDate) {
    return false
  }

  return true
}

export default function Packages() {
  const [packages, setPackages] =
    useState<PackageItem[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState(false)

  useEffect(() => {
    async function loadPackages() {
      try {
        setLoading(true)
        setError(false)

        const response = await fetch(
          "/api/prices",
          {
            cache: "no-store",
          }
        )

        if (!response.ok) {
          throw new Error(
            "상품 정보 조회 실패"
          )
        }

        const data: ApiResponse =
          await response.json()

        setPackages(data.packages ?? [])
      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadPackages()
  }, [])

  return (
    <section
      id="packages"
      className="scroll-mt-20 bg-[#F8F6F2] px-5 py-16 sm:px-6 md:py-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* ======================
            Heading
        ====================== */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold tracking-[0.28em] text-[#B5965B] sm:text-xs">
            PACKAGES
          </p>

          <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.03em] text-[#17233C] sm:text-3xl md:text-4xl">
            상품 안내
          </h2>

          <p className="mt-4 break-keep text-[13px] leading-6 text-[#6F7682] sm:mt-5 sm:text-sm sm:leading-7 md:text-base">
            예식 규모와 진행 방식에 맞는
            <br className="sm:hidden" />
            {" "}
            MERIVUE 서비스를 선택해 주세요.
          </p>
        </div>

        {/* ======================
            Loading
        ====================== */}
        {loading && (
          <div className="py-16 text-center text-[13px] text-[#8B8F96] sm:py-20 sm:text-sm">
            상품 정보를 불러오고 있습니다.
          </div>
        )}

        {/* ======================
            Error
        ====================== */}
        {!loading && error && (
          <div className="mt-10 border border-[#E2DED7] bg-white px-5 py-12 text-center sm:mt-14 sm:px-6 sm:py-14">
            <p className="text-[13px] text-[#777] sm:text-sm">
              상품 정보를 불러오지 못했습니다.
            </p>
          </div>
        )}

        {/* ======================
            Package Cards
        ====================== */}
        {!loading &&
          !error &&
          packages.length > 0 && (
            <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2">
              {packages.map((item) => {
                const eventActive =
                  isEventActive(
                    item.startDate,
                    item.endDate
                  )

                const showEvent =
                  eventActive &&
                  item.salePrice > 0 &&
                  item.originalPrice >
                    item.salePrice

                return (
                  <article
                    key={item.id}
                    className="relative overflow-hidden border border-[#DED9D1] bg-white px-5 py-7 sm:px-7 sm:py-9 md:px-10 md:py-11"
                  >
                    {/* Event badge */}
                    {showEvent &&
                      item.eventLabel && (
                        <div className="absolute right-0 top-0 bg-[#17233C] px-3 py-2 text-[9px] font-semibold tracking-[0.14em] text-white sm:px-5 sm:py-2.5 sm:text-[10px] sm:tracking-[0.18em]">
                          {item.eventLabel}
                        </div>
                      )}

                    {/* Package title */}
                    <div
                      className={
                        showEvent
                          ? "pr-24 sm:pr-28"
                          : ""
                      }
                    >
                      <p className="text-[9px] font-medium tracking-[0.18em] text-[#B5965B] sm:text-xs">
                        MERIVUE SERVICE
                      </p>

                      <h3 className="mt-2.5 text-[24px] font-semibold tracking-[-0.03em] text-[#17233C] sm:mt-3 sm:text-2xl md:text-3xl">
                        {item.name}
                      </h3>
                    </div>

                    {/* ======================
                        Basic Information
                    ====================== */}
                    <div className="mt-6 border-y border-[#EEEAE4] py-5 sm:mt-8 sm:py-7">

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[13px] text-[#777D86] sm:text-sm">
                          진행 인원
                        </span>

                        <span className="text-right text-[13px] font-semibold text-[#17233C] sm:text-sm">
                          {item.staff}
                        </span>
                      </div>

                      <div className="mt-3.5 flex items-center justify-between gap-4 sm:mt-4">
                        <span className="text-[13px] text-[#777D86] sm:text-sm">
                          기본 이용시간
                        </span>

                        <span className="text-right text-[13px] font-semibold text-[#17233C] sm:text-sm">
                          {item.basicHours}시간
                        </span>
                      </div>

                      <div className="mt-3.5 flex items-center justify-between gap-4 sm:mt-4">
                        <span className="text-[13px] text-[#777D86] sm:text-sm">
                          보증 인원
                        </span>

                        <span className="text-right text-[13px] font-semibold text-[#17233C] sm:text-sm">
                          {item.guaranteedGuests.toLocaleString(
                            "ko-KR"
                          )}
                          명
                        </span>
                      </div>

                      <div className="mt-3.5 flex items-center justify-between gap-4 sm:mt-4">
                        <span className="shrink-0 text-[13px] text-[#777D86] sm:text-sm">
                          추가 인원
                        </span>

                        <span className="text-right text-[13px] font-semibold text-[#17233C] sm:text-sm">
                          {item.extraGuestUnit.toLocaleString(
                            "ko-KR"
                          )}
                          명당 +
                          {formatPrice(
                            item.extraFee
                          )}
                          원
                        </span>
                      </div>
                    </div>

                    {/* ======================
                        Price
                    ====================== */}
                    <div className="mt-6 sm:mt-8">

                      {showEvent && (
                        <>
                          {item.eventDescription && (
                            <p className="break-keep text-[11px] font-medium leading-5 text-[#B5965B] sm:text-xs">
                              {item.eventDescription}
                            </p>
                          )}

                          <p className="mt-2.5 text-[12px] text-[#A4A4A0] line-through sm:mt-3 sm:text-sm">
                            {formatPrice(
                              item.originalPrice
                            )}
                            원
                          </p>
                        </>
                      )}

                      <div
                        className={`flex items-end gap-1 ${
                          showEvent
                            ? "mt-1"
                            : ""
                        }`}
                      >
                        <strong className="text-[30px] font-semibold leading-none tracking-[-0.04em] text-[#17233C] sm:text-3xl md:text-4xl">
                          {formatPrice(
                            showEvent
                              ? item.salePrice
                              : item.originalPrice
                          )}
                        </strong>

                        <span className="pb-0.5 text-[13px] text-[#6F7682] sm:pb-1 sm:text-sm">
                          원
                        </span>
                      </div>

                      {showEvent && (
                        <p className="mt-3 text-[10px] tracking-[0.08em] text-[#9B8A69] sm:text-[11px]">
                          OPENING EVENT PRICE
                        </p>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          )}

        {/* ======================
            Additional Information
        ====================== */}
        {!loading &&
          !error &&
          packages.length > 0 && (
            <div className="mt-6 border border-[#E2DED7] bg-[#F2EFEA] px-5 py-6 sm:mt-8 sm:px-6 sm:py-7 md:px-8">

              <p className="text-[13px] font-semibold text-[#17233C] sm:text-sm">
                추가 안내
              </p>

              <div className="mt-3.5 space-y-2.5 break-keep text-[12px] leading-6 text-[#737982] sm:mt-4 sm:text-sm">
                <p>
                  · 상품별 보증인원 및 추가 인원 비용은
                  위 상품 안내를 기준으로 적용됩니다.
                </p>

                <p>
                  · 권종별 계수 정산 선택 시
                  5만원의 추가 비용이 발생합니다.
                </p>

                <p>
                  · 정산 방식은 예식일 7일 전까지
                  변경 가능합니다.
                </p>
              </div>
            </div>
          )}
      </div>
    </section>
  )
}