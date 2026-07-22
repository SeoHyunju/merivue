import Header from "@/components/layout/Header"
import Hero from "@/components/home/Hero"
import ReservationStatus from "@/components/ReservationStatus"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#17233c]">
      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero />
      <ReservationStatus />
    </main>
  )
}