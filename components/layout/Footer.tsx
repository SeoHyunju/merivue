import Link from "next/link"

const footerMenus = [
  { label: "서비스", href: "/#services" },
  { label: "이용안내", href: "/#process" },
  { label: "상품안내", href: "/#packages" },
  { label: "예약현황", href: "/reservation-status" },
  { label: "FAQ", href: "/#faq" },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#E2DED7] bg-[#17233C] px-5 py-10 text-white sm:px-6 md:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl">

        {/* ======================
            Top
        ====================== */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block text-lg font-semibold tracking-[0.18em] text-white sm:text-xl"
            >
              MERIVUE
            </Link>

            <p className="mt-3 text-[13px] leading-6 text-white/60 sm:mt-4 sm:text-sm sm:leading-7">
              소중한 순간,
              <br />
              정성을 다해 빛내드립니다.
            </p>
          </div>

          {/* Navigation / SNS */}
          <div className="lg:text-right">

            <nav className="grid grid-cols-3 gap-x-5 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3 lg:justify-end">
              {footerMenus.map((menu) => (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className="text-[13px] text-white/70 transition md:hover:text-white sm:text-sm"
                >
                  {menu.label}
                </Link>
              ))}
            </nav>

            {/* Instagram */}
            <div className="mt-6 flex lg:justify-end">
              <a
                href="https://www.instagram.com/merivue_wedding"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MERIVUE Instagram"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-white/65 transition md:hover:text-white sm:text-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>

                <span>@merivue_wedding</span>

                <span
                  className="text-white/40 transition-transform duration-300 md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </div>

          </div>
        </div>

        {/* ======================
            Business Information
        ====================== */}
        <div className="mt-9 border-t border-white/10 pt-7 sm:mt-10 sm:pt-8">

          <div className="space-y-1.5 break-keep text-[11px] leading-5 text-white/50 sm:space-y-2 sm:text-xs sm:leading-6 md:text-sm">

            <p>
              <span className="font-medium text-white/75">
                메리뷰
              </span>

              <span className="mx-2 text-white/20">
                |
              </span>

              대표 김예은
            </p>

            <p>
              사업자등록번호 338-25-02395
            </p>

            <p>
              경기도 용인시 수지구 용구대로2790번길 7,
              <br className="sm:hidden" />
              {" "}
              302-S399호(죽전동)
            </p>

            <p>
              대표전화{" "}
              <a
                href="tel:01079138435"
                className="text-white/65 transition md:hover:text-white"
              >
                010-7913-8435
              </a>
            </p>

          </div>

          {/* ======================
              Legal / Copyright
          ====================== */}
          <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-6">

            <div className="flex items-center gap-5">
              <Link
                href="/terms"
                className="text-[11px] text-white/45 transition md:hover:text-white sm:text-xs"
              >
                이용약관
              </Link>

              <Link
                href="/privacy"
                className="text-[11px] font-medium text-white/70 transition md:hover:text-white sm:text-xs"
              >
                개인정보처리방침
              </Link>
            </div>

            <p className="text-[10px] tracking-[0.02em] text-white/35 sm:text-xs">
              © 2026 MERIVUE. All rights reserved.
            </p>

          </div>
        </div>

      </div>
    </footer>
  )
}