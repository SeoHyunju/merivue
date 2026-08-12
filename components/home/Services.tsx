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
    description: "접수된 축의금을 선택한 정산 방식에 따라 정확하게 정리하여 인계합니다.",
    image: "/images/service-settlement.png",
  },
]

export default function Services() {
  return (
    <section className="bg-white px-5 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Title */}
        <div className="text-center">
          <p className="text-xs tracking-[0.32em] text-[#a3844e]">
            MERIVUE SERVICE
          </p>

          <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight text-[#17233c] sm:text-4xl md:text-5xl">
            축의대 운영의 모든 순간을
            <br className="sm:hidden" />
            {" "}책임집니다
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#6d7280] sm:text-base">
            하객이 처음 마주하는 순간부터 축의금의 최종 인계까지,
            MERIVUE가 체계적이고 세심하게 관리합니다.
          </p>
        </div>

        {/* Services */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => (
            <article
              key={service.number}
              className="group overflow-hidden border border-[#17233c]/10 bg-[#f8f5ef]"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#ebe3d5]">
                <Image
                  src={service.image}
                  alt={`MERIVUE ${service.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Number */}
                <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#f8f5ef]/95 text-xs font-medium text-[#a3844e] shadow-sm">
                  {service.number}
                </div>
              </div>

              {/* Content */}
              <div className="relative min-h-52 px-5 py-7 text-center">
                {/* Gold symbol */}
                <div className="mx-auto -mt-12 mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#c6aa73]/50 bg-white text-[#a3844e] shadow-sm">
                  <span className="text-lg">✦</span>
                </div>

                <h3 className="text-lg font-medium tracking-tight text-[#17233c]">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-[#6d7280]">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-[#17233c]/10 pt-8 md:flex-row">
          <p className="text-sm leading-7 text-[#6d7280]">
            예식 규모와 현장 상황에 따라 필요한 업무와 인원을 맞춤 구성합니다.
          </p>

          <a
            href="/about"
            className="group inline-flex items-center gap-3 text-sm font-medium text-[#17233c]"
          >
            서비스 자세히 보기

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

      </div>
    </section>
  )
}