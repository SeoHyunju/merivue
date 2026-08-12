import Link from "next/link"

export default function CTA() {
  return (
    <section className="bg-[#17233c] px-5 py-20 text-white sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] text-[#c6aa73]">
            RESERVATION
          </p>

          <h2 className="mt-5 text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
            소중한 순간,
            <br />
            정성을 다해 빛내드립니다
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
            토요일 · 일요일 예식 예약을 받고 있습니다.
            일정과 지역을 확인한 후 상담을 진행해 주세요.
          </p>
        </div>

        <Link
          href="/reservation"
          className="inline-flex h-13 shrink-0 items-center justify-center bg-[#c6aa73] px-10 text-sm font-medium text-[#17233c] transition hover:bg-[#d7bd88]"
        >
          예약 및 문의
        </Link>
      </div>
    </section>
  )
}