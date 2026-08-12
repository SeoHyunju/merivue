import { Client } from "@notionhq/client"
import { NextRequest, NextResponse } from "next/server"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

/* =========================
   상품 설정
========================= */

const PACKAGES = {
  PACKAGE_A: {
    name: "한측",
    description: "2인 1조",
    price: 200000,
  },

  PACKAGE_B: {
    name: "양측",
    description: "2인 1조 × 2팀",
    price: 400000,
  },
} as const

/* =========================
   정산방식 설정
========================= */

const SETTLEMENTS = {
  밀봉정산: {
    price: 0,
  },

  개봉정산: {
    price: 0,
  },

  "권종별 계수 정산": {
    price: 50000,
  },
} as const

/* =========================
   허용 지역
========================= */

const REGIONS = ["서울", "경기", "부산", "기타"] as const

/* =========================
   토 / 일 확인
========================= */

function isWeekend(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`)

  if (Number.isNaN(date.getTime())) {
    return false
  }

  const day = date.getDay()

  return day === 0 || day === 6
}

/* =========================
   날짜 형식 확인
========================= */

function isValidDateFormat(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date)
}

/* =========================
   연락처 확인
========================= */

function isValidPhone(phone: string) {
  const cleaned = phone.replace(/-/g, "")

  return /^01[016789]\d{7,8}$/.test(cleaned)
}

/* =========================
   문자열 정리
========================= */

function cleanText(value: unknown, maxLength = 500) {
  if (typeof value !== "string") {
    return ""
  }

  return value.trim().slice(0, maxLength)
}

/* =========================
   예약 API
========================= */

export async function POST(request: NextRequest) {
  try {
    const dataSourceId = process.env.NOTION_DATA_SOURCE_ID

    if (!process.env.NOTION_TOKEN || !dataSourceId) {
      console.error("Notion 환경변수가 설정되지 않았습니다.")

      return NextResponse.json(
        {
          success: false,
          message: "예약 시스템 설정 오류입니다.",
        },
        { status: 500 }
      )
    }

    /* =========================
       요청 데이터
    ========================= */

    const body = await request.json()

    const name = cleanText(body.name, 50)
    const phone = cleanText(body.phone, 30)

    const weddingDate = cleanText(
      body.weddingDate,
      20
    )

    const weddingTime = cleanText(
      body.weddingTime,
      20
    )

    const venue = cleanText(body.venue, 100)
    const region = cleanText(body.region, 20)

    const packageCode = cleanText(
      body.packageCode,
      30
    )

    const settlementType = cleanText(
      body.settlementType,
      50
    )

    const message = cleanText(
      body.message,
      1000
    )

    const guestCount =
      Number(body.guestCount) ||
      Number(body.guaranteedGuests) +
        Number(body.additionalGuests || 0)

    /* =========================
       필수값 확인
    ========================= */

    if (
      !name ||
      !phone ||
      !weddingDate ||
      !weddingTime ||
      !venue ||
      !region ||
      !packageCode ||
      !settlementType
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "필수 입력 항목을 확인해 주세요.",
        },
        { status: 400 }
      )
    }

    /* =========================
       연락처 검증
    ========================= */

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "연락처를 정확하게 입력해 주세요.",
        },
        { status: 400 }
      )
    }

    /* =========================
       예식일 검증
    ========================= */

    if (
      !isValidDateFormat(weddingDate) ||
      !isWeekend(weddingDate)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "MERIVUE는 토요일과 일요일 예식만 예약 가능합니다.",
        },
        { status: 400 }
      )
    }

    /* =========================
       과거 날짜 방지
    ========================= */

    const wedding = new Date(
      `${weddingDate}T23:59:59`
    )

    const today = new Date()

    today.setHours(0, 0, 0, 0)

    if (wedding < today) {
      return NextResponse.json(
        {
          success: false,
          message:
            "이미 지난 날짜는 예약할 수 없습니다.",
        },
        { status: 400 }
      )
    }

    /* =========================
       지역 검증
    ========================= */

    if (
      !REGIONS.includes(
        region as (typeof REGIONS)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "올바른 지역을 선택해 주세요.",
        },
        { status: 400 }
      )
    }

    /* =========================
       상품 검증
    ========================= */

    if (!(packageCode in PACKAGES)) {
      return NextResponse.json(
        {
          success: false,
          message: "올바른 상품을 선택해 주세요.",
        },
        { status: 400 }
      )
    }

    const selectedPackage =
      PACKAGES[
        packageCode as keyof typeof PACKAGES
      ]

    /* =========================
       정산방식 검증
    ========================= */

    if (!(settlementType in SETTLEMENTS)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "올바른 정산방식을 선택해 주세요.",
        },
        { status: 400 }
      )
    }

    const selectedSettlement =
      SETTLEMENTS[
        settlementType as keyof typeof SETTLEMENTS
      ]

    /* =========================
       하객 수 검증
    ========================= */

    if (
      !Number.isFinite(guestCount) ||
      guestCount < 1 ||
      guestCount > 5000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "예상 하객 인원을 확인해 주세요.",
        },
        { status: 400 }
      )
    }

    /* =========================
       서버에서 가격 계산
    ========================= */

    const guaranteedGuests = 100

    const additionalGuests = Math.max(
      0,
      guestCount - guaranteedGuests
    )

    const additionalGuestPrice =
      additionalGuests > 0
        ? Math.ceil(additionalGuests / 50) *
          100000
        : 0

    const totalPrice =
      selectedPackage.price +
      additionalGuestPrice +
      selectedSettlement.price

    /* =========================
       Notion 등록
    ========================= */

    const response = await notion.pages.create({
      parent: {
        type: "data_source_id",
        data_source_id: dataSourceId,
      },

      properties: {
        예약자명: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },

        연락처: {
          rich_text: [
            {
              text: {
                content: phone,
              },
            },
          ],
        },

        예식일: {
          date: {
            start: weddingDate,
          },
        },

        예식시간: {
          rich_text: [
            {
              text: {
                content: weddingTime,
              },
            },
          ],
        },

        예식장: {
          rich_text: [
            {
              text: {
                content: venue,
              },
            },
          ],
        },

        지역: {
          select: {
            name: region,
          },
        },

        상품명: {
          rich_text: [
            {
              text: {
                content: `${selectedPackage.name} (${selectedPackage.description})`,
              },
            },
          ],
        },

        상품코드: {
          select: {
            name: packageCode,
          },
        },

        정산방식: {
          select: {
            name: settlementType,
          },
        },

        보증인원: {
          number: guaranteedGuests,
        },

        추가인원: {
          number: additionalGuests,
        },

        최종금액: {
          number: totalPrice,
        },

        문의사항: {
          rich_text: message
            ? [
                {
                  text: {
                    content: message,
                  },
                },
              ]
            : [],
        },

        예약상태: {
          select: {
            name: "신규문의",
          },
        },
      },
    })

    return NextResponse.json({
      success: true,

      message:
        "예약 신청이 정상적으로 접수되었습니다.",

      reservationId: response.id,

      price: {
        packagePrice: selectedPackage.price,
        additionalGuestPrice,
        settlementPrice:
          selectedSettlement.price,
        totalPrice,
      },
    })
  } catch (error) {
    console.error(
      "Reservation API Error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        message:
          "예약 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      },
      { status: 500 }
    )
  }
}