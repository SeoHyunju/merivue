import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#f8f5ef]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-[0.22em] sm:text-xl"
        >
          MERIVUE
        </Link>

        <nav className="hidden items-center gap-10 text-sm md:flex">
          <Link href="/" className="transition-opacity hover:opacity-60">
            Home
          </Link>

          <Link href="/about" className="transition-opacity hover:opacity-60">
            소개
          </Link>

          <Link
            href="/reservation"
            className="transition-opacity hover:opacity-60"
          >
            예약 및 문의
          </Link>
        </nav>

        <Link
          href="/reservation"
          className="inline-flex h-10 items-center justify-center rounded-full bg-[#17233c] px-6 text-sm font-medium text-white transition-colors hover:bg-[#263756]"
        >
          예약하기
        </Link>
      </div>
    </header>
  );
}