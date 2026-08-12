const reasons = [
  {
    number: "01",
    title: "첫인상",
    description:
      "하객이 가장 먼저 마주하는 순간부터 따뜻하고 정돈된 응대로 예식의 좋은 첫인상을 만듭니다.",
  },
  {
    number: "02",
    title: "전문성",
    description:
      "체계적인 교육을 이수한 전문 스태프가 정확한 절차와 세심한 응대로 축의대를 운영합니다.",
  },
  {
    number: "03",
    title: "신뢰",
    description:
      "접수부터 정산, 최종 인계까지 투명한 절차로 진행하여 소중한 축의금을 안전하게 관리합니다.",
  },
  {
    number: "04",
    title: "품격",
    description:
      "예식 분위기에 어울리는 단정한 태도와 세심한 응대로 특별한 날의 품격을 높입니다.",
  },
]

export default function WhyMerivue() {
  return (
    <section className="bg-[#f8f5ef] px-5 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* 상단 제목 */}
        <div className="grid gap-8 border-b border-[#17233c]/10 pb-12 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-[10px] font-medium tracking-[0.32em] text-[#a3844e] sm:text-xs">
              WHY MERIVUE
            </p>

            <h2 className="mt-5 text-3xl font-medium leading-[1.35] tracking-[-0.03em] text-[#17233c] sm:text-4xl md:text-[46px]">
              예식의 첫인상은
              <br />
              축의대에서 시작됩니다
            </h2>
          </div>

          <div className="md:pb-1">
            <p className="max-w-xl text-sm leading-7 text-[#6d7280] sm:text-base sm:leading-8">
              MERIVUE는 단순한 인력 지원이 아닌,
              전문성과 책임감을 갖춘 축의대 서비스를 제공합니다.
              하객이 처음 마주하는 순간부터 축의금의 최종 인계까지
              모든 과정을 세심하게 관리합니다.
            </p>
          </div>
        </div>

        {/* 메인 브랜드 영역 */}
        <div className="relative mt-12 min-h-[420px] overflow-hidden border border-[#c6aa73]/20 bg-[#e9dfcf] sm:min-h-[500px] lg:min-h-[560px]">

          {/* 배경 장식 */}
          <div className="absolute -right-28 -top-32 h-96 w-96 rounded-full border border-[#a3844e]/15" />

          <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full border border-[#17233c]/10" />

          <div className="absolute left-[65%] top-0 h-full w-px bg-[#a3844e]/10" />

          {/* 중앙 MERIVUE 워터마크 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="select-none text-[70px] font-medium tracking-[0.18em] text-[#17233c]/[0.035] sm:text-[110px] lg:text-[150px]">
              MERIVUE
            </p>
          </div>

          {/* 왼쪽 하단 메시지 */}
          <div className="absolute bottom-8 left-7 sm:bottom-12 sm:left-10 lg:bottom-14 lg:left-14">
            <p className="text-[10px] tracking-[0.3em] text-[#a3844e]">
              PREMIUM WEDDING RECEPTION
            </p>

            <p className="mt-4 text-xl font-medium leading-8 text-[#17233c] sm:text-2xl sm:leading-9">
              소중한 순간을 더욱 정돈되고
              <br />
              품격 있게 완성합니다.
            </p>
          </div>

          {/* 오른쪽 상단 */}
          <div className="absolute right-7 top-8 hidden text-right sm:block sm:right-10 sm:top-10 lg:right-14 lg:top-14">
            <p className="text-[10px] tracking-[0.3em] text-[#a3844e]">
              MERIVUE
            </p>

            <p className="mt-3 text-xs leading-6 text-[#6d7280]">
              FIRST IMPRESSION
              <br />
              TRUST
              <br />
              PROFESSIONALISM
            </p>
          </div>
        </div>

        {/* 4가지 가치 */}
        <div className="grid border-x border-b border-[#17233c]/10 bg-[#fffdfa] sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, index) => (
            <article
              key={item.number}
              className={`group min-h-[260px] px-7 py-9 sm:px-8 ${
                index !== reasons.length - 1
                  ? "lg:border-r lg:border-[#17233c]/10"
                  : ""
              } ${
                index < 2
                  ? "border-b border-[#17233c]/10 lg:border-b-0"
                  : ""
              }`}
            >
              {/* 번호 */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.25em] text-[#a3844e]">
                  {item.number}
                </span>

                <span className="h-px w-8 bg-[#c6aa73]/60 transition-all duration-300 group-hover:w-12" />
              </div>

              {/* 제목 */}
              <h3 className="mt-12 text-xl font-medium tracking-tight text-[#17233c] sm:text-2xl">
                {item.title}
              </h3>

              {/* 설명 */}
              <p className="mt-5 text-sm leading-7 text-[#6d7280]">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* 하단 문구 */}
        <div className="mt-10 flex flex-col gap-6 border-t border-[#17233c]/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-lg font-medium leading-8 text-[#17233c] sm:text-xl">
            보이지 않는 부분까지 세심하게,
            <br />
            그것이 MERIVUE의 기준입니다.
          </p>

          <p className="text-[9px] tracking-[0.25em] text-[#a3844e] sm:text-[10px]">
            FIRST IMPRESSION · TRUST · PROFESSIONALISM
          </p>
        </div>

      </div>
    </section>
  )
}