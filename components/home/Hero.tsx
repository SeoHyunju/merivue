import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,165,105,0.20),transparent_40%)]" />

      <div className="pointer-events-none absolute -left-28 top-40 h-72 w-72 rounded-full border border-[#c6aa73]/20" />

      <div className="pointer-events-none absolute -bottom-36 right-0 h-96 w-96 rounded-full border border-[#17233c]/10" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="mb-6 text-xs tracking-[0.26em] text-[#a3844e] sm:text-sm sm:tracking-[0.3em]">
            PREMIUM WEDDING RECEPTION SERVICE
          </p>

          <h1 className="max-w-3xl text-4xl font-medium leading-[1.18] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            예식의 첫인상을
            <br />
            정성으로 완성합니다
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-[#596174] md:mt-8 md:text-lg">
            MERIVUE는 축의금 접수부터 하객 응대, 정확한 정산과 인계까지
            예식의 시작을 품격 있게 책임지는 프리미엄 축의대 서비스입니다.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/reservation"
              className="inline-flex h-13 items-center justify-center bg-[#17233c] px-8 text-sm font-medium text-white transition-colors hover:bg-[#263756]"
            >
              예약 및 문의
            </Link>

            <Link
              href="/about"
              className="inline-flex h-13 items-center justify-center border border-[#17233c] bg-transparent px-8 text-sm font-medium text-[#17233c] transition-colors hover:bg-[#17233c] hover:text-white"
            >
              서비스 알아보기
            </Link>
          </div>

          <div className="mt-14 grid max-w-xl grid-cols-3 gap-4 border-t border-[#17233c]/15 pt-7">
            <div>
              <p className="text-xl font-medium sm:text-2xl">01</p>
              <p className="mt-2 text-xs leading-5 text-[#6d7280] sm:text-sm">
                전문적인
                <br />
                하객 응대
              </p>
            </div>

            <div>
              <p className="text-xl font-medium sm:text-2xl">02</p>
              <p className="mt-2 text-xs leading-5 text-[#6d7280] sm:text-sm">
                정확한
                <br />
                축의금 정산
              </p>
            </div>

            <div>
              <p className="text-xl font-medium sm:text-2xl">03</p>
              <p className="mt-2 text-xs leading-5 text-[#6d7280] sm:text-sm">
                안전하고
                <br />
                투명한 인계
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="aspect-[4/5] border border-[#c6aa73]/40 bg-[#ebe3d5] p-4 sm:p-5">
            <div className="relative flex h-full items-end overflow-hidden bg-[#d9cfbe] p-7 sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#a3844e]/25" />

              <div className="pointer-events-none absolute right-12 top-16 h-40 w-px bg-[#a3844e]/20" />

              <div className="pointer-events-none absolute right-8 top-36 h-px w-32 bg-[#a3844e]/20" />

              <div className="relative border-l border-[#a3844e] pl-5">
                <p className="text-xs tracking-[0.25em] text-[#806b45]">
                  MERIVUE
                </p>

                <p className="mt-3 max-w-xs text-2xl leading-relaxed sm:text-3xl">
                  소중한 순간,
                  <br />
                  정성을 다해
                  <br />
                  빛내드립니다.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 hidden border border-[#c6aa73]/40 bg-[#f8f5ef] px-7 py-5 shadow-sm md:block">
            <p className="text-xs tracking-[0.2em] text-[#a3844e]">
              WEDDING RECEPTION
            </p>

            <p className="mt-2 text-sm">전문적인 하객 응대와 정확한 정산</p>
          </div>
        </div>
      </div>
    </section>
  )
}