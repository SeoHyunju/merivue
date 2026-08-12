import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export async function GET() {
  try {
    const dataSourceId = process.env.NOTION_DATA_SOURCE_ID

    if (!dataSourceId) {
      return NextResponse.json(
        {
          success: false,
          message: "NOTION_DATA_SOURCE_ID가 설정되지 않았습니다.",
        },
        { status: 500 }
      )
    }

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
                content: "테스트 예약자",
              },
            },
          ],
        },

        연락처: {
          rich_text: [
            {
              text: {
                content: "010-1234-5678",
              },
            },
          ],
        },

        예식일: {
          date: {
            start: "2026-09-05",
          },
        },

        예식시간: {
          rich_text: [
            {
              text: {
                content: "오후 1:00",
              },
            },
          ],
        },

        예식장: {
          rich_text: [
            {
              text: {
                content: "MERIVUE 웨딩홀",
              },
            },
          ],
        },

        지역: {
          select: {
            name: "서울",
          },
        },

        상품명: {
          rich_text: [
            {
              text: {
                content: "테스트 상품",
              },
            },
          ],
        },

        상품코드: {
          select: {
            name: "PACKAGE_A",
          },
        },

        정산방식: {
          select: {
            name: "밀봉정산",
          },
        },

        보증인원: {
          number: 100,
        },

        추가인원: {
          number: 0,
        },

        최종금액: {
          number: 200000,
        },

        문의사항: {
          rich_text: [
            {
              text: {
                content: "Notion API 연결 테스트입니다.",
              },
            },
          ],
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
      message: "Notion 예약 등록 성공!",
      pageId: response.id,
    })
  } catch (error) {
    console.error("Notion API Error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Notion 예약 등록에 실패했습니다.",
        error:
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.",
      },
      { status: 500 }
    )
  }
}