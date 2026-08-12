import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#111827] px-5 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-medium tracking-[0.24em]"
            >
              MERIVUE
            </Link>

            <p className="mt-5 text-sm leading-7 text-white/50">
              Premium Wedding Reception Service
              <br />
              소중한 순간, 정성을 다해 빛내드립니다.
            </p>
          </div>

          {/* Menu */}
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#c6aa73]">
              MENU
            </p>

            <div className="mt-5 space-y-3 text-sm text-white/65">
              <Link href="/" className="block hover:text-white">
                Home
              </Link>

              <Link href="/about" className="block hover:text-white">
                소개
              </Link>

              <Link
                href="/reservation"
                className="block hover:text-white"
              >
                예약 및 문의
              </Link>
            </div>
          </div>

          {/* Service */}
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#c6aa73]">
              SERVICE
            </p>

            <div className="mt-5 space-y-3 text-sm text-white/65">
              <p>토 · 일 예식 운영</p>
              <p>축의대 전문 서비스</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#c6aa73]">
              CONTACT
            </p>

            <div className="mt-5 space-y-3 text-sm text-white/65">
              <p>전화번호 추후 입력</p>
              <p>카카오톡 추후 입력</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-white/30">
            © MERIVUE. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}