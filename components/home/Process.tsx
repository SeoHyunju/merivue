const steps = [
  {
    number: "01",
    title: "예약 가능일 확인",
    description:
      "예약 현황에서 예식일과 권역별 예약 가능 여부를 확인해 주세요.",
  },
  {
    number: "02",
    title: "카카오톡 상담",
    description:
      "카카오톡 상담을 통해 예식일, 예식장, 진행 상품 등 필요한 정보를 확인합니다.",
  },
  {
    number: "03",
    title: "예약 확정",
    description:
      "예식 일정과 서비스 내용을 확인한 후 예약을 최종 확정합니다.",
  },
  {
    number: "04",
    title: "예식 사전 확인",
    description:
      "예식 전 최종 인원과 현장 정보, 정산 방식 등 필요한 내용을 다시 한번 확인합니다.",
  },
  {
    number: "05",
    title: "예식 당일 운영 및 인계",
    description:
      "전문 스태프가 현장을 운영하고 선택하신 정산 방식에 따라 정확하게 정리하여 안전하게 인계합니다.",
  },
]

export default function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-20 bg-white px-5 py-16 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ======================
            Heading
        ====================== */}
        <div className="text-center">
          <p className="text-[10px] font-medium tracking-[0.28em] text-[#a3844e] sm:text-xs sm:tracking-[0.3em]">
            SERVICE PROCESS
          </p>

          <h2 className="mt-4 text-[28px] font-medium leading-[1.3] tracking-[-0.025em] text-[#17233c] sm:mt-5 sm:text-4xl md:text-5xl">
            예약부터 인계까지
            <br />
            체계적으로 진행합니다
          </h2>

          <p className="mx-auto mt-4 max-w-2xl break-keep text-[13px] leading-6 text-[#6d7280] sm:mt-6 sm:text-base sm:leading-7">
            중요한 예식인 만큼 사전 준비부터 현장 운영,
            <br className="hidden sm:block" />
            최종 인계까지 모든 과정을 세심하게 관리합니다.
          </p>
        </div>

        {/* ======================
            MOBILE PROCESS
        ====================== */}
        <div className="relative mt-10 sm:hidden">

          {/* Vertical line */}
          <div className="absolute bottom-10 left-[23px] top-6 w-px bg-[#c6aa73]/35" />

          <div className="relative space-y-8">
            {steps.map((step) => (
              <article
                key={step.number}
                className="relative flex items-start gap-5"
              >
                {/* Number */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c6aa73]/50 bg-[#fffdfa] text-[11px] font-medium text-[#a3844e]">
                  {step.number}
                </div>

                {/* Content */}
                <div className="min-w-0 pt-1">
                  <h3 className="text-[17px] font-medium tracking-tight text-[#17233c]">
                    {step.title}
                  </h3>

                  <div className="mt-2.5 h-px w-6 bg-[#b5965b]" />

                  <p className="mt-3 break-keep text-[13px] leading-6 text-[#6d7280]">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ======================
            TABLET / PC PROCESS
        ====================== */}
        <div className="relative mt-14 hidden sm:block lg:mt-16">

          {/* Desktop connecting line */}
          <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-[#c6aa73]/35 lg:block" />

          <div className="relative grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <article
                key={step.number}
                className="group relative text-center"
              >
                {/* Number */}
                <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#c6aa73]/50 bg-[#fffdfa] text-sm font-medium text-[#a3844e] transition-all duration-300 lg:group-hover:border-[#17233c] lg:group-hover:bg-[#17233c] lg:group-hover:text-white">
                  {step.number}
                </div>

                {/* Content */}
                <div className="mt-7">
                  <h3 className="text-lg font-medium text-[#17233c]">
                    {step.title}
                  </h3>

                  <div className="mx-auto mt-4 h-px w-7 bg-[#b5965b]" />

                  <p className="mt-5 break-keep text-sm leading-7 text-[#6d7280]">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ======================
            Bottom message
        ====================== */}
        <div className="mt-12 border border-[#17233c]/10 bg-[#f8f5ef] px-5 py-6 text-center sm:mt-16 sm:px-10 sm:py-7">
          <p className="break-keep text-[12px] leading-6 text-[#596174] sm:text-sm sm:leading-7">
            예식 장소와 현장 상황에 따라 세부 진행 과정은 달라질 수 있으며,
            <br className="hidden md:block" />
            필요한 사항은 예식 전 담당자가 사전에 안내드립니다.
          </p>
        </div>

      </div>
    </section>
  )
}