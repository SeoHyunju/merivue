import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATA_SOURCE_ID =
  process.env.NOTION_FAQ_DATA_SOURCE_ID

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
            "NOTION_FAQ_DATA_SOURCE_ID가 설정되지 않았습니다.",
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

    const faqs = response.results
      .filter((page) => "properties" in page)
      .map((page) => {
        const properties = page.properties as Record<
          string,
          NotionProperty
        >

        return {
          id: page.id,

          question: getTitle(
            properties["질문"]
          ),

          answer: getRichText(
            properties["답변"]
          ),

          category: getSelect(
            properties["카테고리"]
          ),

          order: getNumber(
            properties["정렬순서"]
          ),
        }
      })
      .filter(
        (item) =>
          item.question &&
          item.answer
      )

    return NextResponse.json({
      faqs,
    })
  } catch (error) {
    console.error("FAQ API error:", error)

    return NextResponse.json(
      {
        error: "FAQ를 불러오지 못했습니다.",
        detail:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    )
  }
}