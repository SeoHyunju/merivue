export default function InstagramFloatingButton() {
  return (
    <a
      href="https://www.instagram.com/merivue_wedding"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="MERIVUE 인스타그램"
      className="group fixed bottom-[60px] right-3 z-[60] md:bottom-[92px] md:right-6"
    >
      <div
        className="
          flex items-center overflow-hidden rounded-full
          bg-white/95
          shadow-[0_3px_12px_rgba(0,0,0,0.10)]
          backdrop-blur-sm
          transition-all duration-300
          md:bg-white
          md:shadow-[0_6px_20px_rgba(0,0,0,0.14)]
          md:hover:-translate-y-1
          md:hover:shadow-[0_12px_35px_rgba(0,0,0,0.20)]
        "
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center md:h-14 md:w-14">
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px] text-[#17233C] md:h-6 md:w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle
              cx="17.5"
              cy="6.5"
              r="1"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </div>

        <div
          className="
            max-w-0 overflow-hidden whitespace-nowrap
            transition-all duration-300
            md:group-hover:max-w-[180px]
          "
        >
          <span className="block pr-6 text-sm font-semibold text-[#17233C]">
            @merivue_wedding
          </span>
        </div>
      </div>
    </a>
  )
}