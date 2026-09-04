"use client"

import { useEffect, useMemo, useState } from "react"

type FAQItem = {
  id: string
  question: string
  answer: string
  category: string
  order: number
}

type ApiResponse = {
  faqs: FAQItem[]
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeCategory, setActiveCategory] =
    useState("전체")
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    async function loadFaqs() {
      try {
        setLoading(true)
        setError(false)

        const response = await fetch("/api/faqs", {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error("FAQ 조회 실패")
        }

        const data: ApiResponse = await response.json()

        setFaqs(data.faqs ?? [])
      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadFaqs()
  }, [])

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        faqs
          .map((item) => item.category)
          .filter(Boolean)
      )
    )

    return ["전체", ...uniqueCategories]
  }, [faqs])

  const filteredFaqs = useMemo(() => {
    if (activeCategory === "전체") {
      return faqs
    }

    return faqs.filter(
      (item) => item.category === activeCategory
    )
  }, [faqs, activeCategory])

  function toggleFaq(id: string) {
    setOpenId((prev) =>
      prev === id ? null : id
    )
  }

  function changeCategory(category: string) {
    setActiveCategory(category)
    setOpenId(null)
  }

  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-white px-5 py-16 sm:px-6 md:py-20"
    >
      <div className="mx-auto max-w-5xl">

        {/* ======================
            Heading
        ====================== */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold tracking-[0.28em] text-[#B5965B] sm:text-xs">
            FAQ
          </p>

          <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.03em] text-[#17233C] sm:text-3xl md:text-4xl">
            자주 묻는 질문
          </h2>

          <p className="mt-4 break-keep text-[13px] leading-6 text-[#6F7682] sm:mt-5 sm:text-sm sm:leading-7 md:text-base">
            MERIVUE 이용 전 자주 확인하시는
            <br className="sm:hidden" />
            {" "}
            내용을 안내드립니다.
          </p>
        </div>

        {/* ======================
            Loading
        ====================== */}
        {loading && (
          <div className="py-16 text-center text-[13px] text-[#8B8F96] sm:py-20 sm:text-sm">
            자주 묻는 질문을 불러오고 있습니다.
          </div>
        )}

        {/* ======================
            Error
        ====================== */}
        {!loading && error && (
          <div className="mt-10 border border-[#E2DED7] bg-[#F8F6F2] px-5 py-12 text-center sm:mt-14 sm:px-6 sm:py-14">
            <p className="text-[13px] text-[#777] sm:text-sm">
              자주 묻는 질문을 불러오지 못했습니다.
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          faqs.length > 0 && (
            <>
              {/* ======================
                  Category
              ====================== */}
              {categories.length > 2 && (
                <div className="mt-9 flex flex-wrap justify-center gap-2 sm:mt-12">
                  {categories.map((category) => {
                    const active =
                      activeCategory === category

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          changeCategory(category)
                        }
                        className={`min-h-10 rounded-full border px-4 py-2 text-[12px] font-medium transition sm:px-5 sm:py-2.5 sm:text-sm ${
                          active
                            ? "border-[#17233C] bg-[#17233C] text-white"
                            : "border-[#DED9D1] bg-white text-[#6F7682] md:hover:border-[#17233C] md:hover:text-[#17233C]"
                        }`}
                      >
                        {category}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* ======================
                  FAQ List
              ====================== */}
              <div className="mt-9 border-t border-[#E7E2DA] sm:mt-12">
                {filteredFaqs.map((item) => {
                  const opened =
                    openId === item.id

                  return (
                    <div
                      key={item.id}
                      className="border-b border-[#E7E2DA]"
                    >
                      {/* Question */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleFaq(item.id)
                        }
                        className="flex w-full items-start justify-between gap-3 py-5 text-left sm:gap-6 sm:py-6 md:py-7"
                        aria-expanded={opened}
                      >
                        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">

                          {/* Q */}
                          <span className="mt-[2px] shrink-0 text-[10px] font-semibold tracking-[0.16em] text-[#B5965B] sm:text-xs">
                            Q
                          </span>

                          {/* Question Content */}
                          <div className="min-w-0 flex-1">
                            {item.category && (
                              <p className="mb-1.5 text-[9px] font-medium tracking-[0.12em] text-[#A19B91] sm:mb-2 sm:text-[10px]">
                                {item.category}
                              </p>
                            )}

                            <h3 className="break-keep text-[14px] font-semibold leading-[1.65] text-[#17233C] sm:text-sm sm:leading-7 md:text-base">
                              {item.question}
                            </h3>
                          </div>
                        </div>

                        {/* Plus */}
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-[22px] font-light leading-none text-[#17233C] transition-transform duration-300 sm:h-8 sm:w-8 sm:text-xl ${
                            opened
                              ? "rotate-45"
                              : ""
                          }`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>

                      {/* Answer */}
                      {opened && (
                        <div className="pb-6 pl-[25px] pr-1 sm:pb-7 sm:pl-8 sm:pr-2 md:pb-8 md:pl-10">
                          <div className="border-l border-[#D9D3C9] pl-4 sm:pl-5">
                            <p className="whitespace-pre-line break-keep text-[13px] leading-6 text-[#6F7682] sm:text-sm sm:leading-7 md:text-base">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          )}

        {/* ======================
            Empty
        ====================== */}
        {!loading &&
          !error &&
          faqs.length === 0 && (
            <div className="mt-10 border border-[#E2DED7] bg-[#F8F6F2] px-5 py-12 text-center sm:mt-14 sm:px-6 sm:py-14">
              <p className="text-[13px] text-[#777] sm:text-sm">
                등록된 FAQ가 없습니다.
              </p>
            </div>
          )}

      </div>
    </section>
  )
}