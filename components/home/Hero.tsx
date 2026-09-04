import Image from "next/image"
import Link from "next/link"

const strengths = [
  {
    number: "01",
    title: "정확한 접수",
    description: "전문 교육을 받은 스태프가\n누락 없이 정확하게 접수합니다.",
  },
  {
    number: "02",
    title: "정중한 응대",
    description: "하객 한 분 한 분을\n정중하고 따뜻하게 맞이합니다.",
  },
  {
    number: "03",
    title: "체계적인 정산",
    description: "투명하고 신뢰할 수 있는\n정산 절차로 관리합니다.",
  },
  {
    number: "04",
    title: "안전한 인계",
    description: "소중한 축의금을 안전하게\n정리하여 정확히 인계합니다.",
  },
]

export default function Hero() {
  return (
    <>
      {/* ======================
          HERO
      ====================== */}
      <section className="relative min-h-[560px] overflow-hidden bg-[#f8f5ef] sm:min-h-[680px] lg:min-h-[760px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-reception.png"
            alt="MERIVUE 프리미엄 축의대"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center] sm:object-center"
          />

          {/* Mobile overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f5ef] via-[#f8f5ef]/95 to-[#f8f5ef]/60 sm:hidden" />

          {/* Tablet / PC overlay */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-[#f8f5ef] via-[#f8f5ef]/90 to-[#f8f5ef]/10 sm:block lg:via-[#f8f5ef]/85 lg:to-transparent" />

          <div className="absolute inset-0 bg-white/5" />
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-5 sm:min-h-[680px] sm:px-6 lg:min-h-[760px] lg:px-8">
          <div className="max-w-2xl py-10 sm:py-16 lg:py-20">

            {/* Eyebrow */}
            <p className="text-[9px] font-medium tracking-[0.24em] text-[#a3844e] sm:text-xs sm:tracking-[0.32em]">
              PREMIUM WEDDING RECEPTION SERVICE
            </p>

            {/* Main title */}
            <h1 className="mt-4 text-[34px] font-medium leading-[1.18] tracking-[-0.035em] text-[#17233c] sm:mt-7 sm:text-5xl md:text-6xl lg:text-[68px]">
              예식의 첫인상을
              <br />
              정성으로 완성합니다
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-md break-keep text-[13px] leading-6 text-[#596174] sm:mt-7 sm:max-w-lg sm:text-base sm:leading-8">
              MERIVUE는 축의금 접수부터 정산 · 인계까지,
              <br className="hidden sm:block" />
              정확한 절차와 품격 있는 서비스로
              <br className="hidden sm:block" />
              예식의 시작을 함께합니다.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:gap-3">
              <Link
                href="/reservation-status"
                className="inline-flex h-[48px] items-center justify-center bg-[#17233c] px-7 text-[13px] font-medium text-white transition-all duration-300 active:scale-[0.99] md:hover:bg-[#263756] sm:h-[52px] sm:px-9 sm:text-sm"
              >
                예약 가능일 확인
              </Link>

              <Link
                href="/about"
                className="inline-flex h-[48px] items-center justify-center border border-[#17233c]/50 bg-[#f8f5ef]/70 px-7 text-[13px] font-medium text-[#17233c] backdrop-blur-sm transition-all duration-300 active:scale-[0.99] md:hover:bg-[#17233c] md:hover:text-white sm:h-[52px] sm:px-9 sm:text-sm"
              >
                서비스 알아보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================
          CORE STRENGTHS
      ====================== */}
      <section className="border-b border-[#17233c]/10 bg-[#fffdfa]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {strengths.map((item, index) => (
            <div
              key={item.number}
              className={`
                group relative
                px-3 py-7
                text-center
                sm:px-7 sm:py-10
                lg:px-8 lg:py-12

                ${
                  index % 2 === 0
                    ? "border-r border-[#17233c]/10"
                    : ""
                }

                ${
                  index < 2
                    ? "border-b border-[#17233c]/10 lg:border-b-0"
                    : ""
                }

                ${
                  index !== strengths.length - 1
                    ? "lg:border-r lg:border-[#17233c]/10"
                    : "lg:border-r-0"
                }
              `}
            >
              {/* Number */}
              <p className="text-[8px] tracking-[0.2em] text-[#a3844e] sm:text-[10px] sm:tracking-[0.25em]">
                {item.number}
              </p>

              {/* Icon */}
              <div className="mx-auto mt-3.5 flex h-11 w-11 items-center justify-center rounded-full border border-[#c6aa73]/40 text-[#a3844e] transition-all duration-300 sm:mt-5 sm:h-14 sm:w-14 lg:group-hover:border-[#a3844e] lg:group-hover:bg-[#f8f5ef]">
                {index === 0 && (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="sm:h-[27px] sm:w-[27px]"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="1" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                )}

                {index === 1 && (
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="sm:h-7 sm:w-7"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                  </svg>
                )}

                {index === 2 && (
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="sm:h-7 sm:w-7"
                  >
                    <path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-3Z" />
                    <path d="m9.5 12 1.6 1.6 3.5-3.6" />
                  </svg>
                )}

                {index === 3 && (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="sm:h-[27px] sm:w-[27px]"
                  >
                    <rect x="5" y="10" width="14" height="11" rx="1" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <circle cx="12" cy="15" r="1" />
                  </svg>
                )}
              </div>

              {/* Title */}
              <h2 className="mt-3.5 text-[15px] font-medium tracking-tight text-[#17233c] sm:mt-5 sm:text-xl">
                {item.title}
              </h2>

              {/* Gold line */}
              <div className="mx-auto mt-2.5 h-px w-5 bg-[#b69152] transition-all duration-300 sm:mt-4 sm:w-8 lg:group-hover:w-12" />

              {/* Description */}
              <p className="mt-3 break-keep whitespace-pre-line text-[11px] leading-[1.65] text-[#6d7280] sm:mt-5 sm:text-sm sm:leading-6">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}