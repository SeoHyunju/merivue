export default function KakaoFloatingButton() {
  return (
    <a
      href="https://pf.kakao.com/_xixlLBX"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-[60]"
      aria-label="카카오톡 상담"
    >
      <div
        className="
          flex items-center overflow-hidden rounded-full
          bg-[#FEE500]
          shadow-[0_8px_25px_rgba(0,0,0,0.15)]
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-[0_12px_35px_rgba(0,0,0,0.20)]
        "
      >
        {/* TALK 아이콘 */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center">
          <span className="text-[11px] font-bold tracking-tight text-[#191919]">
            TALK
          </span>
        </div>

        {/* PC 마우스 오버 시 펼쳐지는 문구 */}
        <div
          className="
            max-w-0 overflow-hidden whitespace-nowrap
            transition-all duration-300
            group-hover:max-w-[150px]
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