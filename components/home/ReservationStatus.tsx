const regions = [
  {
    name: "서울",
    status: "원활",
    period: "6월 12일 ~ 7월 12일",
    available: "12일",
    limited: "3일",
    closed: "2일",
  },
  {
    name: "경기",
    status: "보통",
    period: "6월 12일 ~ 7월 12일",
    available: "8일",
    limited: "6일",
    closed: "3일",
  },
  {
    name: "부산",
    status: "여유",
    period: "6월 12일 ~ 7월 12일",
    available: "15일",
    limited: "2일",
    closed: "0일",
  },
]

export default function ReservationStatus() {
  return (
    <section className="bg-[#fffdfa] px-5 py-24 sm:px-6 md:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <p className="text-[10px] tracking-[0.32em] text-[#a3844e]">
              RESERVATION STATUS
            </p>

            <h2 className="mt-5 text-3xl font-medium leading-[1.3] tracking-[-0.03em] text-[#17233c] sm:text-4xl md:text-[44px]">
              지역별 예약 현황을
              <br />
              확인해 보세요
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#6d7280] md:justify-self-end">
            지역을 선택하시면 자세한 예약 현황을
            확인하실 수 있습니다.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {regions.map((region) => (
            <article
              key={region.name}
              className="border border-[#17233c]/10 bg-[#f8f5ef] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(23,35,60,0.06)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-medium text-[#17233c]">
                    {region.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#8a8f98]">
                    기간 · {region.period}
                  </p>
                </div>

                <span className="bg-white px-3 py-1.5 text-[10px] font-medium text-[#a3844e]">
                  {region.status}
                </span>
              </div>

              <div className="mt-8 border-t border-[#17233c]/10 pt-6">
                <p className="text-[9px] tracking-[0.25em] text-[#a3844e]">
                  RESERVATION STATUS
                </p>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#596174]">예약 가능 일자</span>
                    <strong className="font-medium text-[#17233c]">
                      {region.available}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#596174]">예약 마감 임박</span>
                    <strong className="font-medium text-[#17233c]">
                      {region.limited}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#596174]">예약 마감</span>
                    <strong className="font-medium text-[#17233c]">
                      {region.closed}
                    </strong>
                  </div>
                </div>
              </div>

              <button className="mt-7 flex w-full items-center justify-between border-t border-[#17233c]/10 pt-5 text-xs font-medium text-[#17233c]">
                자세히 보기
                <span>→</span>
              </button>
            </article>
          ))}
        </div>

        <p className="mt-7 text-xs leading-6 text-[#9a9da5]">
          ※ 실제 예약 가능 여부는 예식일, 시간 및 현장 상황에 따라
          달라질 수 있습니다.
        </p>

      </div>
    </section>
  )
}