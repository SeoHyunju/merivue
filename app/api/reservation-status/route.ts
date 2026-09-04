import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const STATUS_DATA_SOURCE_ID =
  process.env.NOTION_RESERVATION_STATUS_DATA_SOURCE_ID

const OPEN_DATA_SOURCE_ID =
  process.env.NOTION_RESERVATION_OPEN_DATA_SOURCE_ID

type NotionProperty = {
  title?: Array<{
    plain_text?: string
  }>

  rich_text?: Array<{
    plain_text?: string
  }>

  select?: {
    name?: string
  } | null

  date?: {
    start?: string
    end?: string | null
  } | null

  checkbox?: boolean
}

function getTitle(property?: NotionProperty) {
  return (
    property?.title
      ?.map((item) => item.plain_text ?? "")
      .join("") ?? ""
  )
}

function getRichText(property?: NotionProperty) {
  return (
    property?.rich_text
      ?.map((item) => item.plain_text ?? "")
      .join("") ?? ""
  )
}

function getSelect(property?: NotionProperty) {
  return property?.select?.name ?? ""
}

function getDate(property?: NotionProperty) {
  return property?.date?.start ?? ""
}

export async function GET() {
  try {
    /* =========================
       환경변수 확인
    ========================= */

    if (!process.env.NOTION_TOKEN) {
      return NextResponse.json(
        {
          error: "NOTION_TOKEN이 설정되지 않았습니다.",
        },
        {
          status: 500,
        }
      )
    }

    if (!STATUS_DATA_SOURCE_ID) {
      return NextResponse.json(
        {
          error:
            "NOTION_RESERVATION_STATUS_DATA_SOURCE_ID가 설정되지 않았습니다.",
        },
        {
          status: 500,
        }
      )
    }

    if (!OPEN_DATA_SOURCE_ID) {
      return NextResponse.json(
        {
          error:
            "NOTION_RESERVATION_OPEN_DATA_SOURCE_ID가 설정되지 않았습니다.",
        },
        {
          status: 500,
        }
      )
    }

    /* =========================
       1. 예약현황 관리 DB
    ========================= */

    const statusResponse = await notion.dataSources.query({
      data_source_id: STATUS_DATA_SOURCE_ID,

      filter: {
        property: "노출",
        checkbox: {
          equals: true,
        },
      },

      sorts: [
        {
          property: "예식일",
          direction: "ascending",
        },
      ],
    })

    const reservations = statusResponse.results
      .filter((page) => "properties" in page)
      .map((page) => {
        const properties = page.properties as Record<
          string,
          NotionProperty
        >

        return {
          id: page.id,

          title: getTitle(
            properties["일정명"]
          ),

          weddingDate: getDate(
            properties["예식일"]
          ),

          region: getSelect(
            properties["권역"]
          ),

          status: getSelect(
            properties["상태"]
          ),

          message: getRichText(
            properties["안내문구"]
          ),
        }
      })
      .filter(
        (item) =>
          item.weddingDate &&
          item.region &&
          item.status
      )

    /* =========================
       2. 예약오픈 관리 DB
    ========================= */

    const openResponse = await notion.dataSources.query({
      data_source_id: OPEN_DATA_SOURCE_ID,

      filter: {
        property: "오픈",
        checkbox: {
          equals: true,
        },
      },

      sorts: [
        {
          property: "시작일",
          direction: "ascending",
        },
      ],
    })

    const openPeriods = openResponse.results
      .filter((page) => "properties" in page)
      .map((page) => {
        const properties = page.properties as Record<
          string,
          NotionProperty
        >

        return {
          id: page.id,

          title: getTitle(
            properties["오픈명"]
          ),

          startDate: getDate(
            properties["시작일"]
          ),

          endDate: getDate(
            properties["종료일"]
          ),
        }
      })
      .filter(
        (item) =>
          item.startDate &&
          item.endDate
      )

    /* =========================
       결과 반환
    ========================= */

    return NextResponse.json({
      reservations,
      openPeriods,
    })
  } catch (error) {
    console.error(
      "Reservation status API error:",
      error
    )

    return NextResponse.json(
      {
        error:
          "예약현황을 불러오지 못했습니다.",

        detail:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    )
  }
}