const reservations = [
  {
    region: "서울",
    description: "강남 · 송파 · 영등포 · 종로",
    status: "예약 가능",
    statusStyle: "bg-[#e8efe8] text-[#49634b]",
    dates: ["8월 8일 토요일", "8월 9일 일요일"],
  },
  {
    region: "경기",
    description: "수원 · 성남 · 용인 · 고양",
    status: "마감 임박",
    statusStyle: "bg-[#f3ead8] text-[#8a6831]",
    dates: ["8월 8일 토요일", "8월 9일 일요일"],
  },
  {
    region: "부산",
    description: "해운대 · 부산진 · 동래 · 남구",
    status: "예약 마감",
    statusStyle: "bg-[#ececec] text-[#747474]",
    dates: ["8월 8일 토요일", "8월 9일 일요일"],
  },
]

export default function ReservationStatus() {
  return (
    <section className="bg-white px-5 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-[#17233c]/15 pb-10 md:flex-row md:items-end">
          <div>
            <p className="text-xs tracking-[0.28em] text-[#a3844e]">
              RESERVATION STATUS
            </p>

            <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
              지역별 예약 현황을
              <br />
              확인해 보세요
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#6d7280] sm:text-base">
            주말 예식 일정과 지역별 예약 가능 여부를 안내합니다. 세부 시간과
            인원은 상담 후 최종 확정됩니다.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {reservations.map((reservation) => (
            <article
              key={reservation.region}
              className="border border-[#17233c]/10 bg-[#f8f5ef] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-medium">{reservation.region}</p>
                  <p className="mt-2 text-sm leading-6 text-[#777d89]">
                    {reservation.description}
                  </p>
                </div>

                <span
                  className={`shrink-0 px-3 py-2 text-xs font-medium ${reservation.statusStyle}`}
                >
                  {reservation.status}
                </span>
              </div>

              <div className="mt-10 border-t border-[#17233c]/10 pt-6">
                <p className="text-xs tracking-[0.2em] text-[#a3844e]">
                  WEEKEND SCHEDULE
                </p>

                <div className="mt-4 space-y-3">
                  {reservation.dates.map((date) => (
                    <div
                      key={date}
                      className="flex items-center justify-between border-b border-[#17233c]/10 pb-3 text-sm"
                    >
                      <span>{date}</span>
                      <span className="text-[#777d89]">상담 가능</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-7 text-xs leading-6 text-[#858995]">
          ※ 실제 예약 가능 여부는 예식 장소, 시간 및 필요 인원에 따라 달라질
          수 있습니다.
        </p>
      </div>
    </section>
  )
}