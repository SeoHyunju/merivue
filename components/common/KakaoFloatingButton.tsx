export default function KakaoFloatingButton() {
  return (
    <a
      href="https://pf.kakao.com/_xixlLBX"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡 상담"
      className="group fixed bottom-3 right-3 z-[60] md:bottom-6 md:right-6"
    >
      <div
        className="
          flex items-center overflow-hidden rounded-full
          bg-[#FEE500]
          shadow-[0_3px_12px_rgba(0,0,0,0.10)]
          transition-all duration-300
          md:shadow-[0_6px_20px_rgba(0,0,0,0.14)]
          md:hover:-translate-y-1
          md:hover:shadow-[0_12px_35px_rgba(0,0,0,0.20)]
        "
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center md:h-14 md:w-14">
          <span className="text-[9px] font-bold tracking-tight text-[#191919] md:text-[11px]">
            TALK
          </span>
        </div>

        <div
          className="
            max-w-0 overflow-hidden whitespace-nowrap
            transition-all duration-300
            md:group-hover:max-w-[150px]
          "
        >
          <span className="block pr-6 text-sm font-semibold text-[#191919]">
            카카오톡 상담
          </span>
        </div>
      </div>
    </a>
  )
}