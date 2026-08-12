const steps = [
  {
    number: "01",
    title: "상담 신청",
    description:
      "예약 및 문의 페이지에서 예식일, 예식장, 상품 등 기본 정보를 작성해 주세요.",
  },
  {
    number: "02",
    title: "예약 확정",
    description:
      "예식 일정과 서비스 가능 여부를 확인한 후 상담을 통해 예약을 확정합니다.",
  },
  {
    number: "03",
    title: "예식 사전 확인",
    description:
      "예식 전 최종 인원과 현장 정보, 정산 방식 등 필요한 내용을 다시 한번 확인합니다.",
  },
  {
    number: "04",
    title: "예식 당일 운영",
    description:
      "전문 스태프가 현장에 도착하여 축의금 접수, 식권 배부, 명단 관리와 하객 응대를 진행합니다.",
  },
  {
    number: "05",
    title: "정산 및 인계",
    description:
      "선택하신 정산 방식에 따라 정확하게 정리한 후 지정된 분께 안전하게 인계합니다.",
  },
]

export default function Process() {
  return (
    <section className="bg-white px-5 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-[#a3844e]">
            SERVICE PROCESS
          </p>

          <h2 className="mt-5 text-3xl font-medium tracking-tight text-[#17233c] sm:text-4xl md:text-5xl">
            예약부터 인계까지
            <br />
            체계적으로 진행합니다
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#6d7280] sm:text-base">
            중요한 예식인 만큼 사전 준비부터 현장 운영,
            최종 인계까지 모든 과정을 세심하게 관리합니다.
          </p>
        </div>

        {/* Process */}
        <div className="relative mt-16">

          {/* Desktop connecting line */}
          <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-[#c6aa73]/35 lg:block" />

          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <article
                key={step.number}
                className="group relative text-center"
              >
                {/* Number */}
                <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#c6aa73]/50 bg-[#fffdfa] text-sm font-medium text-[#a3844e] transition-all duration-300 group-hover:border-[#17233c] group-hover:bg-[#17233c] group-hover:text-white">
                  {step.number}
                </div>

                {/* Content */}
                <div className="mt-7">
                  <h3 className="text-lg font-medium text-[#17233c]">
                    {step.title}
                  </h3>

                  <div className="mx-auto mt-4 h-px w-7 bg-[#b5965b]" />

                  <p className="mt-5 text-sm leading-7 text-[#6d7280]">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-16 border border-[#17233c]/10 bg-[#f8f5ef] px-6 py-7 text-center sm:px-10">
          <p className="text-sm leading-7 text-[#596174]">
            예식 장소와 현장 상황에 따라 세부 진행 과정은 달라질 수 있으며,
            필요한 사항은 예식 전 담당자가 사전에 안내드립니다.
          </p>
        </div>

      </div>
    </section>
  )
}