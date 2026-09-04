import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATA_SOURCE_ID =
  process.env.NOTION_NOTICE_DATA_SOURCE_ID

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

  number?: number | null
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

function getNumber(property?: NotionProperty) {
  return property?.number ?? 0
}

export async function GET() {
  try {
    if (!process.env.NOTION_TOKEN) {
      return NextResponse.json(
        {
          error: "NOTION_TOKEN이 설정되지 않았습니다.",
        },
        { status: 500 }
      )
    }

    if (!DATA_SOURCE_ID) {
      return NextResponse.json(
        {
          error:
            "NOTION_NOTICE_DATA_SOURCE_ID가 설정되지 않았습니다.",
        },
        { status: 500 }
      )
    }

    const response = await notion.dataSources.query({
      data_source_id: DATA_SOURCE_ID,

      filter: {
        property: "노출",
        checkbox: {
          equals: true,
        },
      },

      sorts: [
        {
          property: "정렬순서",
          direction: "ascending",
        },
      ],
    })

    const notices = response.results
      .filter((page) => "properties" in page)
      .map((page) => {
        const properties = page.properties as Record<
          string,
          NotionProperty
        >

        return {
          id: page.id,

          title: getTitle(
            properties["제목"]
          ),

          content: getRichText(
            properties["내용"]
          ),

          type: getSelect(
            properties["유형"]
          ),

          startDate: getDate(
            properties["시작일"]
          ),

          endDate: getDate(
            properties["종료일"]
          ),

          popup:
            properties["팝업"]?.checkbox ??
            false,

          order: getNumber(
            properties["정렬순서"]
          ),
        }
      })
      .filter((item) => item.title)

    // 날짜에 따른 실제 노출 여부 처리
    const now = new Date()

    const today =
      `${now.getFullYear()}-` +
      `${String(now.getMonth() + 1).padStart(2, "0")}-` +
      `${String(now.getDate()).padStart(2, "0")}`

    const activeNotices = notices.filter(
      (notice) => {
        if (
          notice.startDate &&
          today < notice.startDate
        ) {
          return false
        }

        if (
          notice.endDate &&
          today > notice.endDate
        ) {
          return false
        }

        return true
      }
    )

    return NextResponse.json({
      notices: activeNotices,
    })
  } catch (error) {
    console.error("Notice API error:", error)

    return NextResponse.json(
      {
        error:
          "공지사항을 불러오지 못했습니다.",

        detail:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    )
  }
}