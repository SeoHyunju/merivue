"use client"

import Link from "next/link"
import { useState } from "react"

const menus = [
  { label: "서비스", href: "/#services" },
  { label: "이용안내", href: "/#process" },
  { label: "상품안내", href: "/#packages" },
  { label: "예약현황", href: "/reservation-status" },
  { label: "FAQ", href: "/#faq" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f8f6f2]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

        <Link
          href="/"
          onClick={closeMenu}
          className="text-xl font-semibold tracking-[0.18em] text-[#17233c]"
        >
          MERIVUE
        </Link>

        {/* PC 메뉴 */}
        <nav className="hidden items-center gap-8 md:flex">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="text-sm font-medium text-[#5f6672] transition hover:text-[#17233c]"
            >
              {menu.label}
            </Link>
          ))}
        </nav>

        {/* PC 예약 버튼 */}
        <Link
          href="/reservation-status"
          className="hidden h-11 items-center justify-center border border-[#17233c] px-5 text-sm font-medium text-[#17233c] transition hover:bg-[#17233c] hover:text-white md:inline-flex"
        >
          예약 가능일 확인
        </Link>

        {/* 모바일 햄버거 버튼 */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <div className="relative h-5 w-6">
            <span
              className={`absolute left-0 top-0 block h-[1.5px] w-6 bg-[#17233c] transition-all duration-300 ${
                menuOpen ? "translate-y-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[9px] block h-[1.5px] w-6 bg-[#17233c] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[18px] block h-[1.5px] w-6 bg-[#17233c] transition-all duration-300 ${
                menuOpen ? "-translate-y-[9px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>

      </div>

      {/* 모바일 메뉴 */}
      <div
        className={`overflow-hidden border-t border-black/5 bg-[#f8f6f2] transition-all duration-300 md:hidden ${
          menuOpen
            ? "max-h-[520px] opacity-100"
            : "max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <nav className="px-6 pb-8 pt-5">
          <div className="flex flex-col">
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                onClick={closeMenu}
                className="border-b border-[#17233c]/10 py-4 text-[15px] font-medium text-[#434b59] transition hover:text-[#17233c]"
              >
                {menu.label}
              </Link>
            ))}
          </div>

          <Link
            href="/reservation-status"
            onClick={closeMenu}
            className="mt-6 flex h-[52px] items-center justify-center bg-[#17233c] px-6 text-sm font-semibold text-white transition hover:bg-[#243451]"
          >
            예약 가능일 확인
          </Link>
        </nav>
      </div>
    </header>
  )
}