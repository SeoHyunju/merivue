import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ReservationStatus from "@/components/home/ReservationStatus"

export default function ReservationStatusPage() {
  return (
    <>
      <Header />

      <main className="bg-[#F8F6F2]">
        {/* ======================
            PAGE HERO
        ====================== */}
        <section className="border-b border-[#E6E1D9] bg-[#F8F6F2] px-5 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20 md:pb-20 md:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-semibold tracking-[0.28em] text-[#B5965B] sm:text-xs sm:tracking-[0.3em]">
              RESERVATION
            </p>

            <h1 className="mt-4 text-[32px] font-semibold tracking-[-0.04em] text-[#17233C] sm:mt-5 sm:text-4xl md:text-5xl">
              예약 현황
            </h1>

            <p className="mx-auto mt-5 max-w-2xl break-keep text-[13px] leading-6 text-[#6F7682] sm:mt-6 sm:text-sm sm:leading-7 md:text-base">
              예식 날짜를 선택하시면 권역별 예약 가능 여부를
              확인하실 수 있습니다.
              <br className="hidden sm:block" />
              예약 현황 확인 후 카카오톡으로 편하게 상담해 주세요.
            </p>
          </div>
        </section>

        {/* ======================
            CALENDAR
        ====================== */}
        <ReservationStatus />

        {/* ======================
            RESERVATION GUIDE
        ====================== */}
        <section className="bg-white px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">

            <div className="border border-[#E2DED7] px-5 py-8 sm:px-6 sm:py-10 md:px-12 md:py-12">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#B5965B] sm:text-xs">
                RESERVATION GUIDE
              </p>

              <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.03em] text-[#17233C] sm:mt-4 sm:text-2xl md:text-3xl">
                예약이 확정되는 순서
              </h2>

              <div className="mt-8 divide-y divide-[#17233C]/10 sm:mt-10">

                {/* 01 */}
                <div className="py-5 first:pt-0 sm:flex sm:gap-5 sm:py-6">
                  <span className="block text-[10px] font-semibold tracking-[0.18em] text-[#B5965B] sm:w-8 sm:shrink-0 sm:pt-1 sm:text-xs">
                    01
                  </span>

                  <p className="mt-2 break-keep text-[13px] leading-6 text-[#626872] sm:mt-0 sm:text-sm sm:leading-7 md:text-base">
                    달력에서 원하시는{" "}
                    <strong className="font-semibold text-[#17233C]">
                      예식일과 권역의 예약 현황
                    </strong>
                    을 먼저 확인해 주세요.
                  </p>
                </div>

                {/* 02 */}
                <div className="py-5 sm:flex sm:gap-5 sm:py-6">
                  <span className="block text-[10px] font-semibold tracking-[0.18em] text-[#B5965B] sm:w-8 sm:shrink-0 sm:pt-1 sm:text-xs">
                    02
                  </span>

                  <p className="mt-2 break-keep text-[13px] leading-6 text-[#626872] sm:mt-0 sm:text-sm sm:leading-7 md:text-base">
                    카카오톡 상담을 통해 일정과 서비스 내용을 확인한 뒤{" "}
                    <strong className="font-semibold text-[#17233C]">
                      계약서를 안내해드립니다.
                    </strong>
                  </p>
                </div>

                {/* 03 */}
                <div className="py-5 sm:flex sm:gap-5 sm:py-6">
                  <span className="block text-[10px] font-semibold tracking-[0.18em] text-[#B5965B] sm:w-8 sm:shrink-0 sm:pt-1 sm:text-xs">
                    03
                  </span>

                  <p className="mt-2 break-keep text-[13px] leading-6 text-[#626872] sm:mt-0 sm:text-sm sm:leading-7 md:text-base">
                    계약서 작성 후{" "}
                    <strong className="font-semibold text-[#17233C]">
                      계약금 입금이 확인되면 최종 예약이 확정됩니다.
                    </strong>
                  </p>
                </div>

                {/* 04 */}
                <div className="pb-0 pt-5 sm:flex sm:gap-5 sm:pt-6">
                  <span className="block text-[10px] font-semibold tracking-[0.18em] text-[#B5965B] sm:w-8 sm:shrink-0 sm:pt-1 sm:text-xs">
                    04
                  </span>

                  <p className="mt-2 break-keep text-[13px] leading-6 text-[#626872] sm:mt-0 sm:text-sm sm:leading-7 md:text-base">
                    동일한 날짜에 여러 상담이 진행되는 경우{" "}
                    <strong className="font-semibold text-[#17233C]">
                      상담 순서가 아닌 계약금 확인 순서
                    </strong>
                    로 예약이 확정됩니다.
                  </p>
                </div>

              </div>
            </div>

            {/* ======================
                CTA
            ====================== */}
            <div className="mt-8 bg-[#EFECE7] px-5 py-10 text-center sm:mt-10 sm:px-6 sm:py-14 md:px-10 md:py-16">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#B5965B] sm:text-xs">
                PLAN YOUR DAY
              </p>

              <h2 className="mt-3 break-keep text-[24px] font-semibold leading-[1.35] tracking-[-0.03em] text-[#17233C] sm:mt-4 sm:text-2xl md:text-3xl">
                원하시는 예식일을
                <br className="sm:hidden" />
                {" "}미리 확인해 주세요
              </h2>

              <p className="mx-auto mt-4 max-w-xl break-keep text-[13px] leading-6 text-[#6F7682] sm:mt-5 sm:text-sm sm:leading-7 md:text-base">
                인기 있는 일정은 예약이 조기에 마감될 수 있습니다.
                <br className="hidden sm:block" />
                예약 현황을 확인하신 후 카카오톡으로 상담해 주세요.
              </p>

              <div className="mt-7 flex flex-col items-stretch justify-center gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
                <a
                  href="https://pf.kakao.com/_xixlLBX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[52px] items-center justify-center bg-[#17233C] px-7 text-[13px] font-semibold text-white transition active:scale-[0.99] sm:h-14 sm:min-w-[240px] sm:px-8 sm:text-sm md:hover:bg-[#243451]"
                >
                  카카오톡으로 예약 상담하기
                </a>

                <a
                  href="/#services"
                  className="inline-flex h-[52px] items-center justify-center border border-[#CBC5BB] bg-transparent px-7 text-[13px] font-medium text-[#5E646D] transition active:scale-[0.99] sm:h-14 sm:min-w-[220px] sm:px-8 sm:text-sm md:hover:bg-white md:hover:text-[#17233C]"
                >
                  MERIVUE 서비스 살펴보기
                </a>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}