const faqs = [
  {
    question: "예약은 언제까지 가능한가요?",
    answer:
      "예약 가능 여부는 예식일과 지역, 현장 상황에 따라 달라집니다. 가능한 일정은 예약 및 문의 페이지에서 확인해 주세요.",
  },
  {
    question: "평일 예식도 가능한가요?",
    answer:
      "MERIVUE는 현재 토요일과 일요일 예식만 예약 가능합니다.",
  },
  {
    question: "정산 방식은 변경할 수 있나요?",
    answer:
      "정산 방식은 예식일 7일 전까지 변경 가능합니다. 이후에는 원활한 현장 운영을 위해 변경이 어렵습니다.",
  },
  {
    question: "보증인원 100명을 초과하면 어떻게 되나요?",
    answer:
      "보증인원 초과 시 50명 추가마다 100,000원의 추가 비용이 발생합니다.",
  },
  {
    question: "예약 신청하면 바로 확정되나요?",
    answer:
      "예약 신청은 접수 단계이며, 일정과 서비스 가능 여부를 확인한 후 상담을 통해 최종 확정됩니다.",
  },
]

export default function FAQ() {
  return (
    <section className="bg-[#f8f5ef] px-5 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-[#a3844e]">
            FREQUENTLY ASKED QUESTIONS
          </p>

          <h2 className="mt-5 text-3xl font-medium tracking-tight text-[#17233c] sm:text-4xl md:text-5xl">
            자주 묻는 질문
          </h2>
        </div>

        <div className="mt-14 border-t border-[#17233c]/10">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group border-b border-[#17233c]/10"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6">
                <div className="flex items-center gap-5">
                  <span className="text-xs text-[#a3844e]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-base font-medium text-[#17233c] sm:text-lg">
                    {faq.question}
                  </h3>
                </div>

                <span className="text-xl font-light text-[#a3844e] transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="pb-7 pl-10 pr-6 sm:pl-12">
                <p className="max-w-3xl text-sm leading-7 text-[#6d7280]">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}