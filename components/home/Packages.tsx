import Link from "next/link"

const packages = [
  {
    name: "한측",
    subtitle: "2인 1조",
    normalPrice: "400,000원",
    eventPrice: "200,000원",
    hours: "기본 2시간",
    guests: "보증인원 100명",
    extra: "50명 추가 시 +100,000원",
    featured: false,
  },
  {
    name: "양측",
    subtitle: "2인 1조 × 2팀",
    normalPrice: "600,000원",
    eventPrice: "400,000원",
    hours: "기본 2시간",
    guests: "보증인원 100명",
    extra: "50명 추가 시 +100,000원",
    featured: true,
  },
]

export default function Packages() {
  return (
    <section className="bg-white px-5 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-[#a3844e]">
            MERIVUE PACKAGE
          </p>

          <h2 className="mt-5 text-3xl font-medium tracking-tight text-[#17233c] sm:text-4xl md:text-5xl">
            예식에 맞는 서비스를
            <br />
            선택하세요
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#6d7280] sm:text-base">
            현재 MERIVUE 오픈 이벤트 기간으로
            정상가 대비 특별 할인가를 적용하고 있습니다.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
          {packages.map((item) => (
            <article
              key={item.name}
              className={`relative border p-8 sm:p-10 ${
                item.featured
                  ? "border-[#b5965b] bg-[#fcfaf6]"
                  : "border-[#17233c]/10 bg-white"
              }`}
            >
              {item.featured && (
                <div className="absolute right-6 top-6 bg-[#17233c] px-4 py-2 text-[10px] tracking-[0.2em] text-white">
                  RECOMMENDED
                </div>
              )}

              <p className="text-xs tracking-[0.25em] text-[#a3844e]">
                OPEN EVENT
              </p>

              <h3 className="mt-5 text-3xl font-medium text-[#17233c]">
                {item.name}
              </h3>

              <p className="mt-2 text-sm text-[#6d7280]">
                {item.subtitle}
              </p>

              <div className="mt-8 border-y border-[#17233c]/10 py-7">
                <p className="text-sm text-[#8a8f98] line-through">
                  {item.normalPrice}
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <p className="text-4xl font-medium tracking-tight text-[#17233c]">
                    {item.eventPrice}
                  </p>
                </div>

                <p className="mt-3 text-xs text-[#a3844e]">
                  오픈 이벤트 특별가
                </p>
              </div>

              <div className="mt-8 space-y-4 text-sm text-[#4f5663]">
                <div className="flex items-center justify-between border-b border-[#17233c]/8 pb-4">
                  <span>이용시간</span>
                  <strong className="font-medium text-[#17233c]">
                    {item.hours}
                  </strong>
                </div>

                <div className="flex items-center justify-between border-b border-[#17233c]/8 pb-4">
                  <span>보증인원</span>
                  <strong className="font-medium text-[#17233c]">
                    {item.guests}
                  </strong>
                </div>

                <div className="flex items-center justify-between border-b border-[#17233c]/8 pb-4">
                  <span>추가비용</span>
                  <strong className="font-medium text-[#17233c]">
                    {item.extra}
                  </strong>
                </div>
              </div>

              <Link
                href="/reservation"
                className={`mt-9 inline-flex h-12 w-full items-center justify-center text-sm font-medium transition-colors ${
                  item.featured
                    ? "bg-[#17233c] text-white hover:bg-[#263756]"
                    : "border border-[#17233c] text-[#17233c] hover:bg-[#17233c] hover:text-white"
                }`}
              >
                이 상품으로 예약하기
              </Link>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-5xl border border-[#c6aa73]/25 bg-[#f8f5ef] px-6 py-5">
          <p className="text-sm leading-7 text-[#6d7280]">
            ※ 예식 규모 및 현장 상황에 따라 추가 인원이 필요할 수 있으며,
            상세 비용은 상담 과정에서 사전 안내드립니다.
          </p>
        </div>
      </div>
    </section>
  )
}