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
    <section className="bg-[#f8f5ef] px-5 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-[#17233c]/10 pb-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#a3844e]">
              SETTLEMENT GUIDE
            </p>

            <h2 className="mt-5 text-3xl font-medium tracking-tight text-[#17233c] sm:text-4xl md:text-5xl">
              원하는 정산 방식을
              <br />
              선택하세요
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-[#6d7280] sm:text-base">
            고객님의 예식 규모와 선호에 따라
            세 가지 정산 방식 중 하나를 선택할 수 있습니다.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {settlementOptions.map((item) => (
            <article
              key={item.number}
              className="border border-[#17233c]/10 bg-white p-7 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.25em] text-[#a3844e]">
                  {item.number}
                </span>

                {item.extra && (
                  <span className="bg-[#17233c] px-3 py-1.5 text-xs font-medium text-white">
                    {item.extra}
                  </span>
                )}
              </div>

              <h3 className="mt-10 text-2xl font-medium text-[#17233c]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm font-medium text-[#a3844e]">
                {item.subtitle}
              </p>

              <div className="mt-6 h-px w-10 bg-[#b5965b]" />

              <p className="mt-6 text-sm leading-7 text-[#6d7280]">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 border border-[#c6aa73]/30 bg-[#fffdfa] px-6 py-6 sm:px-8">
          <p className="text-sm font-medium text-[#17233c]">
            정산 방식 변경 안내
          </p>

          <p className="mt-2 text-sm leading-7 text-[#6d7280]">
            정산 방식은 예식일 7일 전까지 변경 가능합니다.
            이후에는 원활한 현장 운영을 위해 변경이 어렵습니다.
          </p>
        </div>
      </div>
    </section>
  )
}