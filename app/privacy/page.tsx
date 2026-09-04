import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const sections = [
  {
    title: "제1조 (개인정보의 처리 목적)",
    content: [
      "메리뷰(이하 “회사”)는 축의대 대행 서비스의 제공 및 계약 이행을 위하여 필요한 범위에서 개인정보를 처리합니다.",
      "개인정보는 예약 및 계약 확인, 예식 정보 확인, 서비스 진행, 축의금 접수 및 정산, 식권 운영, 인수인계, 고객 응대 및 서비스 관련 사실관계 확인 등의 목적으로 이용됩니다.",
    ],
  },
  {
    title: "제2조 (처리하는 개인정보 항목)",
    content: [
      "회사는 서비스 제공 과정에서 다음과 같은 개인정보를 처리할 수 있습니다.",
      "1. 고객 정보: 성명, 연락처",
      "2. 예식 정보: 예식일, 예식시간, 예식장소, 신랑·신부 관련 서비스 진행 정보",
      "3. 서비스 진행 관계자 정보: 최종 인수자, 식권 추가 요청 담당자 등의 성명, 관계 및 연락처",
      "4. 축의대 서비스 진행 과정에서 작성되는 접수·정산 관련 기록",
      "5. 축의대 업무 진행 과정에서 촬영·녹화되는 영상 및 현장 음성 기록",
    ],
  },
  {
    title: "제3조 (개인정보의 처리 및 보유기간)",
    content: [
      "회사는 개인정보의 처리 목적이 달성될 때까지 필요한 범위에서 개인정보를 보유·이용합니다.",
      "서비스 제공 및 계약 이행 목적이 달성되어 개인정보가 불필요하게 된 경우 지체 없이 파기합니다.",
      "다만 관계 법령에 따라 일정 기간 보존할 의무가 있는 정보는 해당 법령에서 정한 기간 동안 별도로 안전하게 보관할 수 있습니다.",
    ],
  },
  {
    title: "제4조 (영상 및 음성 기록)",
    content: [
      "회사는 축의대 업무 진행 상황을 기록하고 축의금 관리·정산 및 분쟁 발생 시 사실관계를 확인하기 위하여 예식 당일 영상 및 현장 음성을 기록할 수 있습니다.",
      "현장 음성 기록은 축의대 업무 진행 확인과 축의금 관리·정산 등 서비스 수행에 필요한 범위에서 이용하며, 특정 하객의 사적인 대화를 수집하는 것을 목적으로 하지 않습니다.",
      "회사는 영상 및 현장 음성 기록이 이루어지는 사실을 현장 안내문 등의 방법으로 고지하며, 촬영된 기록을 내부 운영기준에 따라 안전하게 관리합니다.",
    ],
  },
  {
    title: "제5조 (축의금 접수 및 정산 기록)",
    content: [
      "회사는 축의금 접수 및 정산을 위하여 봉투 단위로 번호를 부여하고 필요한 경우 성명 및 금액을 기록할 수 있습니다.",
      "축의금 접수 및 정산 내역은 예식 당일 담당자가 현장에서 확인·기록한 내용을 기준으로 장부를 작성할 수 있으며, 계약에 따라 고객에게 PDF 또는 엑셀 파일 등의 형태로 전달할 수 있습니다.",
    ],
  },
  {
    title: "제6조 (개인정보의 제3자 제공)",
    content: [
      "회사는 원칙적으로 정보주체의 개인정보를 서비스 제공 및 계약 이행을 위하여 필요한 범위를 초과하여 제3자에게 제공하지 않습니다.",
      "다만 정보주체의 동의를 받은 경우 또는 관계 법령에 따라 개인정보 제공 의무가 발생하는 경우에는 관련 법령에서 허용하는 범위에서 제공할 수 있습니다.",
    ],
  },
  {
    title: "제7조 (개인정보의 파기)",
    content: [
      "회사는 개인정보의 보유기간이 경과하거나 처리 목적이 달성되는 등 개인정보가 불필요하게 된 경우 지체 없이 해당 개인정보를 파기합니다.",
      "관계 법령에 따라 보존이 필요한 개인정보는 다른 개인정보와 분리하여 보관하며, 해당 보존기간이 종료된 후 파기합니다.",
    ],
  },
  {
    title: "제8조 (정보주체의 권리)",
    content: [
      "정보주체는 회사가 처리하는 자신의 개인정보에 대하여 관계 법령에서 정하는 바에 따라 열람, 정정, 삭제 또는 처리정지를 요청할 수 있습니다.",
      "개인정보와 관련한 요청 및 문의는 회사의 대표 연락처를 통해 접수할 수 있습니다.",
    ],
  },
  {
    title: "제9조 (개인정보의 안전성 확보)",
    content: [
      "회사는 개인정보가 분실, 도난, 유출, 위조, 변조 또는 훼손되지 않도록 개인정보의 안전한 처리를 위하여 필요한 관리적·기술적 조치를 취하도록 노력합니다.",
      "축의금 및 개인정보를 취급하는 서비스 담당 인력은 업무 목적에 필요한 범위에서만 해당 정보를 취급하도록 관리합니다.",
    ],
  },
  {
    title: "제10조 (개인정보 보호 관련 문의)",
    content: [
      "개인정보 처리와 관련한 문의, 열람·정정·삭제 등의 요청은 아래의 연락처를 통해 접수할 수 있습니다.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="bg-[#F8F6F2]">
        <section className="border-b border-[#E6E1D9] px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold tracking-[0.28em] text-[#B5965B]">
              PRIVACY POLICY
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#17233C] md:text-4xl">
              개인정보처리방침
            </h1>

            <p className="mt-5 break-keep text-sm leading-7 text-[#6F7682]">
              메리뷰는 고객의 개인정보를 소중하게 생각하며
              안전하게 처리하기 위해 노력합니다.
            </p>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-lg font-semibold text-[#17233C]">
                    {section.title}
                  </h2>

                  <div className="mt-4 space-y-2">
                    {section.content.map((text, index) => (
                      <p
                        key={index}
                        className="break-keep text-sm leading-7 text-[#666D77] md:text-[15px]"
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-16 border-t border-[#E6E1D9] pt-8">
              <h2 className="text-sm font-semibold text-[#17233C]">
                개인정보 관련 문의
              </h2>

              <div className="mt-4 space-y-1 text-xs leading-6 text-[#8A8E95] md:text-sm">
                <p>상호: 메리뷰</p>
                <p>대표자: 김예은</p>
                <p>사업자등록번호: 338-25-02395</p>
                <p>
                  주소: 경기도 용인시 수지구 용구대로2790번길 7,
                  302-S399호(죽전동)
                </p>
                <p>
                  대표전화:{" "}
                  <a
                    href="tel:01079138435"
                    className="transition hover:text-[#17233C]"
                  >
                    010-7913-8435
                  </a>
                </p>
              </div>

              <p className="mt-6 text-xs text-[#A0A3A8]">
                시행일: 2026년 9월 3일
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}