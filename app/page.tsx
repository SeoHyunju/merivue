import Header from "@/components/layout/Header"
import Hero from "@/components/home/Hero"
import Services from "@/components/home/Services"
import ReservationStatus from "@/components/home/ReservationStatus"
import WhyMerivue from "@/components/home/WhyMerivue"
import Packages from "@/components/home/Packages"
import Settlement from "@/components/home/Settlement"
import Process from "@/components/home/Process"
import FAQ from "@/components/home/FAQ"
import CTA from "@/components/home/CTA"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#17233c]">
      <Header />

      <Hero />

      <Services />

      <ReservationStatus />

      <WhyMerivue />

      <Packages />

      <Settlement />

      <Process />

      <FAQ />

      <CTA />

      <Footer />
    </main>
  )
}