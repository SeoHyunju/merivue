const settlementOptions = [
  {
    number: "01",
    title: "밀봉정산",
    subtitle: "프라이버시를 중요하게 생각하는 경우",
    description:
      "봉투를 개봉하지 않고 외부 기재 내용을 기준으로 기록하는 방식입니다.",
    extra: null,
  },
  {
    number: "02",
    title: "개봉정산",
    subtitle: "일반적으로 가장 많이 선택하는 방식",
    description:
      "봉투를 개봉하여 금액을 확인 및 기록한 후 다시 밀봉하는 방식입니다.",
    extra: null,
  },
  {
    number: "03",
    title: "권종별 계수 정산",
    subtitle: "고액 · 대규모 예식에 추천",
    description:
      "봉투 개봉 후 현금을 권종별로 분류하여 직접 계수하는 방식입니다.",
    extra: "+50,000원",
  },
]

export default function Settlement() {
  return (
    <section className="bg-[#f8f5ef] px-5 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ======================
            Heading
        ====================== */}
        <div className="grid gap-5 border-b border-[#17233c]/10 pb-9 sm:gap-8 sm:pb-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[10px] font-medium tracking-[0.28em] text-[#a3844e] sm:text-xs sm:tracking-[0.3em]">
              SETTLEMENT GUIDE
            </p>

            <h2 className="mt-4 text-[28px] font-medium leading-[1.3] tracking-[-0.025em] text-[#17233c] sm:mt-5 sm:text-4xl md:text-5xl">
              원하는 정산 방식을
              <br />
              선택하세요
            </h2>
          </div>

          <p className="max-w-xl break-keep text-[13px] leading-6 text-[#6d7280] sm:text-base sm:leading-7">
            고객님의 예식 규모와 선호에 따라
            <br className="sm:hidden" />
            {" "}
            세 가지 정산 방식 중 하나를 선택할 수 있습니다.
          </p>
        </div>

        {/* ======================
            Settlement Cards
        ====================== */}
        <div className="mt-9 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-3">
          {settlementOptions.map((item) => (
            <article
              key={item.number}
              className="border border-[#17233c]/10 bg-white p-5 sm:p-8"
            >
              {/* Number / Extra fee */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-medium tracking-[0.22em] text-[#a3844e] sm:text-xs sm:tracking-[0.25em]">
                  {item.number}
                </span>

                {item.extra && (
                  <span className="shrink-0 bg-[#17233c] px-3 py-1.5 text-[10px] font-semibold text-white sm:text-xs">
                    {item.extra}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-medium tracking-tight text-[#17233c] sm:mt-10 sm:text-2xl">
                {item.title}
              </h3>

              {/* Subtitle */}
              <p className="mt-2.5 break-keep text-[12px] font-medium leading-5 text-[#a3844e] sm:mt-3 sm:text-sm">
                {item.subtitle}
              </p>

              {/* Gold line */}
              <div className="mt-4 h-px w-8 bg-[#b5965b] sm:mt-6 sm:w-10" />

              {/* Description */}
              <p className="mt-4 break-keep text-[13px] leading-6 text-[#6d7280] sm:mt-6 sm:text-sm sm:leading-7">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* ======================
            Change Notice
        ====================== */}
        <div className="mt-8 border border-[#c6aa73]/30 bg-[#fffdfa] px-5 py-5 sm:mt-10 sm:px-8 sm:py-6">
          <div className="flex items-start gap-3">
            <div className="mt-[3px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#c6aa73]/50 text-[10px] font-semibold text-[#a3844e]">
              i
            </div>

            <div>
              <p className="text-[13px] font-semibold text-[#17233c] sm:text-sm">
                정산 방식 변경 안내
              </p>

              <p className="mt-1.5 break-keep text-[12px] leading-6 text-[#6d7280] sm:mt-2 sm:text-sm sm:leading-7">
                정산 방식은 예식일 7일 전까지 변경 가능합니다.
                이후에는 원활한 현장 운영을 위해 변경이 어렵습니다.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}