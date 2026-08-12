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
      {/* HERO */}
      <section className="relative min-h-[720px] overflow-hidden bg-[#f8f5ef] pt-20 lg:min-h-[760px]">
        {/* Background Image */}
        <div className="absolute inset-0 top-20">
          <Image
            src="/images/hero-reception.png"
            alt="MERIVUE 프리미엄 축의대"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* 왼쪽 텍스트 가독성을 위한 그라데이션 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f5ef] via-[#f8f5ef]/95 to-[#f8f5ef]/10 lg:via-[#f8f5ef]/85 lg:to-transparent" />

          {/* 전체적으로 아주 약한 밝은 필터 */}
          <div className="absolute inset-0 bg-white/5" />
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto flex min-h-[640px] max-w-7xl items-center px-5 sm:px-6 lg:min-h-[680px] lg:px-8">
          <div className="max-w-2xl py-20">
            <p className="text-[11px] font-medium tracking-[0.32em] text-[#a3844e] sm:text-xs">
              PREMIUM WEDDING RECEPTION SERVICE
            </p>

            <h1 className="mt-7 text-[42px] font-medium leading-[1.18] tracking-[-0.035em] text-[#17233c] sm:text-5xl md:text-6xl lg:text-[68px]">
              예식의 첫인상을
              <br />
              정성으로 완성합니다
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-7 text-[#596174] sm:text-base sm:leading-8">
              MERIVUE는 축의금 접수부터 정산 · 인계까지,
              <br className="hidden sm:block" />
              정확한 절차와 품격 있는 서비스로
              <br className="hidden sm:block" />
              예식의 시작을 함께합니다.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/reservation"
                className="inline-flex h-13 items-center justify-center bg-[#17233c] px-9 text-sm font-medium text-white transition-all duration-300 hover:bg-[#263756]"
              >
                예약 및 문의
              </Link>

              <Link
                href="/about"
                className="inline-flex h-13 items-center justify-center border border-[#17233c]/60 bg-[#f8f5ef]/60 px-9 text-sm font-medium text-[#17233c] backdrop-blur-sm transition-all duration-300 hover:bg-[#17233c] hover:text-white"
              >
                서비스 알아보기
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* CORE STRENGTHS */}
      <section className="border-b border-[#17233c]/10 bg-[#fffdfa]">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((item, index) => (
            <div
              key={item.number}
              className={`group relative px-7 py-10 text-center sm:px-8 lg:py-12 ${
                index !== strengths.length - 1
                  ? "lg:border-r lg:border-[#17233c]/10"
                  : ""
              }`}
            >
              {/* Number */}
              <p className="text-[10px] tracking-[0.25em] text-[#a3844e]">
                {item.number}
              </p>

              {/* Icon */}
              <div className="mx-auto mt-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#c6aa73]/40 text-[#a3844e] transition-all duration-300 group-hover:border-[#a3844e] group-hover:bg-[#f8f5ef]">
                {index === 0 && (
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="1" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                )}

                {index === 1 && (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                  </svg>
                )}

                {index === 2 && (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-3Z" />
                    <path d="m9.5 12 1.6 1.6 3.5-3.6" />
                  </svg>
                )}

                {index === 3 && (
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <rect x="5" y="10" width="14" height="11" rx="1" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <circle cx="12" cy="15" r="1" />
                  </svg>
                )}
              </div>

              {/* Title */}
              <h2 className="mt-5 text-xl font-medium tracking-tight text-[#17233c]">
                {item.title}
              </h2>

              {/* Gold line */}
              <div className="mx-auto mt-4 h-px w-8 bg-[#b69152] transition-all duration-300 group-hover:w-12" />

              {/* Description */}
              <p className="mt-5 whitespace-pre-line text-sm leading-6 text-[#6d7280]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}