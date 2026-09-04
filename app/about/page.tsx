import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const services = [
  {
    number: "01",
    title: "축의금 접수",
    description:
      "하객의 축의금을 정중하게 접수하고 예식의 첫 순간을 안정적으로 관리합니다.",
  },
  {
    number: "02",
    title: "식권 배부",
    description:
      "예식 상황과 인원에 맞춰 식권을 정확하게 확인하고 배부합니다.",
  },
  {
    number: "03",
    title: "명단 관리",
    description:
      "축의금 접수 내역과 하객 정보를 체계적으로 기록하여 정확한 확인을 돕습니다.",
  },
  {
    number: "04",
    title: "하객 응대",
    description:
      "예식장을 방문한 하객이 불편함 없이 이동할 수 있도록 친절하고 정중하게 안내합니다.",
  },
  {
    number: "05",
    title: "정산 및 인계",
    description:
      "접수된 축의금과 관련 자료를 확인하고 정해진 방식에 따라 안전하게 인계합니다.",
  },
]

const standards = [
  {
    number: "01",
    english: "ACCURACY",
    title: "정확함",
    description:
      "작은 차이도 놓치지 않는 세심한 기록과 확인으로 축의금 접수부터 정산까지 정확하게 진행합니다.",
  },
  {
    number: "02",
    english: "TRUST",
    title: "신뢰",
    description:
      "소중한 축의금을 다루는 서비스인 만큼 모든 과정에서 책임감과 투명성을 가장 중요하게 생각합니다.",
  },
  {
    number: "03",
    english: "COURTESY",
    title: "품격",
    description:
      "하객이 처음 마주하는 자리에서 예식의 분위기에 어울리는 정중하고 품격 있는 응대를 제공합니다.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#17233c]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden px-5 pb-24 pt-40 sm:px-6 md:pb-32 md:pt-48 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,165,105,0.16),transparent_38%)]" />

        <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full border border-[#c6aa73]/20" />

        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.3em] text-[#a3844e]">
            ABOUT MERIVUE
          </p>

          <h1 className="mt-7 max-w-4xl text-4xl font-medium leading-[1.25] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
            예식의 첫인상을
            <br />
            정성으로 완성합니다.
          </h1>

          <div className="mt-10 grid gap-8 border-t border-[#17233c]/15 pt-9 md:grid-cols-2 md:gap-16">
            <p className="max-w-lg text-lg leading-8 text-[#17233c]">
              소중한 날,
              <br />
              가장 먼저 하객을 맞이하는 자리.
            </p>

            <p className="max-w-xl text-sm leading-7 text-[#6d7280] sm:text-base sm:leading-8">
              MERIVUE는 단순히 축의금을 접수하는 서비스를 넘어
              예식의 시작부터 정산과 인계까지 신뢰할 수 있는 운영을
              제공합니다. 가족이 소중한 순간에 더욱 집중할 수 있도록,
              보이지 않는 곳까지 세심하게 준비합니다.
            </p>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-white px-5 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#a3844e]">
              OUR STORY
            </p>

            <h2 className="mt-5 text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">
              중요한 순간일수록
              <br />
              기본이 중요합니다.
            </h2>
          </div>

          <div>
            <p className="text-lg leading-9 text-[#3f485a]">
              결혼식에는 신랑과 신부뿐 아니라 가족과 친지,
              그리고 소중한 하객들이 함께합니다.
            </p>

            <p className="mt-6 text-sm leading-8 text-[#6d7280] sm:text-base">
              그중 축의대는 많은 하객이 예식장에서 가장 먼저 마주하는
              공간입니다. 축의금 접수와 식권 배부, 하객 안내가
              자연스럽게 이루어져야 하고, 예식 이후에는 정확한 정산과
              안전한 인계가 필요합니다.
            </p>

            <p className="mt-6 text-sm leading-8 text-[#6d7280] sm:text-base">
              MERIVUE는 이러한 과정을 하나의 전문 서비스로 관리합니다.
              가족이나 지인에게 부담을 맡기는 대신, 교육된 인력이
              정해진 절차에 따라 예식의 시작을 책임집니다.
            </p>

            <div className="mt-10 border-l-2 border-[#c6aa73] pl-6">
              <p className="text-xl leading-9 text-[#17233c] sm:text-2xl">
                “소중한 순간,
                <br />
                정성을 다해 빛내드립니다.”
              </p>

              <p className="mt-4 text-xs tracking-[0.25em] text-[#a3844e]">
                MERIVUE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR ROLE */}
      <section className="px-5 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.3em] text-[#a3844e]">
              OUR ROLE
            </p>

            <h2 className="mt-5 text-3xl font-medium tracking-[-0.03em] sm:text-4xl md:text-5xl">
              MERIVUE가 하는 일
            </h2>

            <p className="mt-6 text-sm leading-8 text-[#6d7280] sm:text-base">
              하객을 처음 맞이하는 순간부터 예식이 끝난 뒤
              안전하게 인계하는 순간까지 필요한 업무를 체계적으로
              진행합니다.
            </p>
          </div>

          <div className="mt-14 border-t border-[#17233c]/15">
            {services.map((service) => (
              <div
                key={service.number}
                className="grid gap-4 border-b border-[#17233c]/10 py-7 transition-colors hover:bg-white/50 sm:grid-cols-[80px_180px_1fr] sm:items-center sm:gap-6 sm:px-4"
              >
                <p className="text-xs tracking-[0.2em] text-[#a3844e]">
                  {service.number}
                </p>

                <h3 className="text-lg font-medium sm:text-xl">
                  {service.title}
                </h3>

                <p className="max-w-2xl text-sm leading-7 text-[#6d7280]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STANDARD */}
      <section className="bg-[#17233c] px-5 py-24 text-white sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#c6aa73]">
                OUR STANDARD
              </p>

              <h2 className="mt-5 text-3xl font-medium tracking-[-0.03em] sm:text-4xl md:text-5xl">
                우리가 지키는
                <br />
                세 가지 기준
              </h2>
            </div>

            <div className="flex items-end">
              <p className="max-w-lg text-sm leading-8 text-white/60 sm:text-base">
                MERIVUE의 서비스는 단순히 업무를 대신하는 것이
                아닙니다. 소중한 예식을 맡겨주신 만큼 모든 과정에서
                동일한 서비스 기준을 지킵니다.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-3">
            {standards.map((standard) => (
              <div
                key={standard.number}
                className="bg-[#17233c] p-7 sm:p-8 lg:p-10"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs tracking-[0.2em] text-[#c6aa73]">
                    {standard.number}
                  </p>

                  <p className="text-[10px] tracking-[0.25em] text-white/30">
                    {standard.english}
                  </p>
                </div>

                <h3 className="mt-12 text-2xl font-medium">
                  {standard.title}
                </h3>

                <div className="mt-5 h-px w-8 bg-[#c6aa73]" />

                <p className="mt-6 text-sm leading-7 text-white/60">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PROFESSIONAL */}
      <section className="bg-white px-5 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#a3844e]">
              WHY MERIVUE
            </p>

            <h2 className="mt-5 text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl md:text-5xl">
              가족은 예식에
              <br />
              집중할 수 있도록.
            </h2>
          </div>

          <div className="space-y-8">
            <div className="border-b border-[#17233c]/10 pb-8">
              <p className="text-sm tracking-[0.15em] text-[#a3844e]">
                01
              </p>

              <h3 className="mt-3 text-xl font-medium">
                지인에게 부탁하지 않아도 됩니다.
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#6d7280]">
                가족과 지인은 축의대 업무 대신 신랑·신부와 함께
                예식의 순간에 집중할 수 있습니다.
              </p>
            </div>

            <div className="border-b border-[#17233c]/10 pb-8">
              <p className="text-sm tracking-[0.15em] text-[#a3844e]">
                02
              </p>

              <h3 className="mt-3 text-xl font-medium">
                역할과 절차가 명확합니다.
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#6d7280]">
                접수부터 기록, 정산, 인계까지 정해진 절차에 따라
                체계적으로 진행합니다.
              </p>
            </div>

            <div>
              <p className="text-sm tracking-[0.15em] text-[#a3844e]">
                03
              </p>

              <h3 className="mt-3 text-xl font-medium">
                예식의 첫인상이 달라집니다.
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#6d7280]">
                정돈된 축의대와 전문적인 하객 응대는 예식 전체의
                첫인상을 더욱 안정적이고 품격 있게 만들어 줍니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-5 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#c6aa73]/20" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.3em] text-[#a3844e]">
            WITH MERIVUE
          </p>

          <h2 className="mt-6 text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl md:text-5xl">
            소중한 순간,
            <br />
            정성을 다해 빛내드립니다.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#6d7280] sm:text-base">
            예식 일정과 장소를 알려주시면
            예약 가능 여부를 확인하여 안내드리겠습니다.
          </p>

        </div>
      </section>

      <Footer />
    </main>
  )
}