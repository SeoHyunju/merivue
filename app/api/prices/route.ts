import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATA_SOURCE_ID =
  process.env.NOTION_PRICE_DATA_SOURCE_ID

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
  number?: number | null
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

function getNumber(property?: NotionProperty) {
  return property?.number ?? 0
}

function getDate(property?: NotionProperty) {
  return property?.date?.start ?? ""
}

export async function GET() {
  try {
    if (!process.env.NOTION_TOKEN) {
      return NextResponse.json(
        { error: "NOTION_TOKEN이 설정되지 않았습니다." },
        { status: 500 }
      )
    }

    if (!DATA_SOURCE_ID) {
      return NextResponse.json(
        {
          error:
            "NOTION_PRICE_DATA_SOURCE_ID가 설정되지 않았습니다.",
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

    const packages = response.results
      .filter((page) => "properties" in page)
      .map((page) => {
        const properties = page.properties as Record<
          string,
          NotionProperty
        >

        return {
          id: page.id,

          name: getTitle(properties["상품명"]),
          code: getSelect(properties["상품코드"]),

          originalPrice: getNumber(
            properties["정상가"]
          ),

          salePrice: getNumber(
            properties["판매가"]
          ),

          staff: getRichText(
            properties["진행인원"]
          ),

          basicHours: getNumber(
            properties["기본이용시간"]
          ),

          guaranteedGuests: getNumber(
            properties["보증인원"]
          ),

          extraGuestUnit: getNumber(
            properties["추가인원단위"]
          ),

          extraFee: getNumber(
            properties["추가요금"]
          ),

          eventLabel: getRichText(
            properties["이벤트문구"]
          ),

          eventDescription: getRichText(
            properties["이벤트설명"]
          ),

          startDate: getDate(
            properties["시작일"]
          ),

          endDate: getDate(
            properties["종료일"]
          ),

          order: getNumber(
            properties["정렬순서"]
          ),
        }
      })
      .filter(
        (item) =>
          item.name &&
          item.code &&
          item.originalPrice > 0
      )

    return NextResponse.json({
      packages,
    })
  } catch (error) {
    console.error("Price API error:", error)

    return NextResponse.json(
      {
        error: "상품 정보를 불러오지 못했습니다.",
        detail:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    )
  }
}