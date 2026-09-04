import Image from "next/image"

const services = [
  {
    number: "01",
    title: "축의금 접수",
    description: "정확하고 신속한 접수로 누락 없이 축의금을 관리합니다.",
    image: "/images/service-reception-new.png",
  },
  {
    number: "02",
    title: "식권 배부",
    description: "하객 상황에 맞춰 식권을 정확하게 확인하고 배부합니다.",
    image: "/images/service-ticket.png",
  },
  {
    number: "03",
    title: "명단 관리",
    description: "하객 명단과 축의 내역을 체계적으로 기록하고 관리합니다.",
    image: "/images/service-list.png",
  },
  {
    number: "04",
    title: "하객 응대",
    description: "예식의 첫인상에 어울리는 정중하고 세심한 응대를 제공합니다.",
    image: "/images/service-greeting.png",
  },
  {
    number: "05",
    title: "정산 및 인계",
    description:
      "접수된 축의금을 선택한 정산 방식에 따라 정확하게 정리하여 인계합니다.",
    image: "/images/service-settlement.png",
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-white px-5 py-16 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ======================
            Title
        ====================== */}
        <div className="text-center">
          <p className="text-[10px] font-medium tracking-[0.28em] text-[#a3844e] sm:text-xs sm:tracking-[0.32em]">
            MERIVUE SERVICE
          </p>

          <h2 className="mt-4 text-[28px] font-medium leading-[1.3] tracking-[-0.025em] text-[#17233c] sm:mt-5 sm:text-4xl md:text-5xl">
            축의대 운영의 모든 순간을
            <br className="sm:hidden" />
            {" "}
            책임집니다
          </h2>

          <p className="mx-auto mt-4 max-w-2xl break-keep text-[13px] leading-6 text-[#6d7280] sm:mt-6 sm:text-base sm:leading-7">
            하객이 처음 마주하는 순간부터 축의금의 최종 인계까지,
            <br className="hidden sm:block" />
            MERIVUE가 체계적이고 세심하게 관리합니다.
          </p>
        </div>

        {/* ======================
            Services
        ====================== */}
        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => (
            <article
              key={service.number}
              className="group overflow-hidden border border-[#17233c]/10 bg-[#f8f5ef]"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#ebe3d5] sm:aspect-[4/3]">
                <Image
                  src={service.image}
                  alt={`MERIVUE ${service.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 md:group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Number */}
                <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f5ef]/95 text-[10px] font-medium text-[#a3844e] shadow-sm sm:left-4 sm:top-4 sm:h-9 sm:w-9 sm:text-xs">
                  {service.number}
                </div>
              </div>

              {/* Content */}
              <div className="relative px-5 pb-6 pt-0 text-center sm:min-h-52 sm:py-7">

                {/* Gold symbol */}
                <div className="mx-auto -mt-6 mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#c6aa73]/50 bg-white text-[#a3844e] shadow-sm sm:-mt-12 sm:mb-5 sm:h-12 sm:w-12">
                  <span className="text-base sm:text-lg">
                    ✦
                  </span>
                </div>

                <h3 className="text-[17px] font-medium tracking-tight text-[#17233c] sm:text-lg">
                  {service.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm break-keep text-[13px] leading-6 text-[#6d7280] sm:mt-4 sm:text-sm">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* ======================
            Bottom
        ====================== */}
        <div className="mt-10 flex flex-col items-center gap-5 border-t border-[#17233c]/10 pt-7 text-center sm:mt-12 sm:pt-8 md:flex-row md:justify-between md:text-left">

          <p className="break-keep text-[13px] leading-6 text-[#6d7280] sm:text-sm sm:leading-7">
            예식 규모와 현장 상황에 따라 필요한 업무와 인원을 맞춤 구성합니다.
          </p>

          <a
            href="/about"
            className="group inline-flex shrink-0 items-center gap-3 text-sm font-medium text-[#17233c]"
          >
            서비스 자세히 보기

            <span className="transition-transform duration-300 md:group-hover:translate-x-1">
              →
            </span>
          </a>

        </div>

      </div>
    </section>
  )
}