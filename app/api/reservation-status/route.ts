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

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: 100,
      sorts: [
        {
          property: "예식일",
          direction: "ascending",
        },
      ],
    })

    const reservations = response.results.map((page) => {
      if (!("properties" in page)) {
        return null
      }

      const properties = page.properties

      const weddingDateProperty = properties["예식일"]
      const regionProperty = properties["지역"]
      const statusProperty = properties["예약상태"]
      const venueProperty = properties["예식장"]
      const timeProperty = properties["예식시간"]

      const weddingDate =
        weddingDateProperty?.type === "date"
          ? weddingDateProperty.date?.start ?? ""
          : ""

      const region =
        regionProperty?.type === "select"
          ? regionProperty.select?.name ?? ""
          : ""

      const status =
        statusProperty?.type === "select"
          ? statusProperty.select?.name ?? ""
          : ""

      const venue =
        venueProperty?.type === "rich_text"
          ? venueProperty.rich_text
              .map((item) => item.plain_text)
              .join("")
          : ""

      const weddingTime =
        timeProperty?.type === "rich_text"
          ? timeProperty.rich_text
              .map((item) => item.plain_text)
              .join("")
          : ""

      return {
        id: page.id,
        weddingDate,
        weddingTime,
        region,
        venue,
        status,
      }
    })

    const validReservations = reservations.filter(
      (reservation) => reservation !== null
    )

    return NextResponse.json({
      success: true,
      count: validReservations.length,
      reservations: validReservations,
    })
  } catch (error) {
    console.error("Reservation Status API Error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "예약 현황을 불러오지 못했습니다.",
        error:
          process.env.NODE_ENV === "development" &&
          error instanceof Error
            ? error.message
            : undefined,
      },
      { status: 500 }
    )
  }
}