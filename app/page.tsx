import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import Hero from "@/components/home/Hero"
import WhyMerivue from "@/components/home/WhyMerivue"
import Services from "@/components/home/Services"
import Process from "@/components/home/Process"
import Packages from "@/components/home/Packages"
import Settlement from "@/components/home/Settlement"
import ReservationStatus from "@/components/home/ReservationStatus"
import FAQ from "@/components/home/FAQ"
import KakaoFloatingButton from "@/components/common/KakaoFloatingButton"
import NoticeBanner from "@/components/common/NoticeBanner"
import NoticePopup from "@/components/common/NoticePopup"
import InstagramFloatingButton from "@/components/common/InstagramFloatingButton"

export default function Home() {
  return (
    <>
  <Header />

  <NoticeBanner />

  <main>
    <Hero />
    <WhyMerivue />
    <Services />
    <Process />
    <Packages />
    <Settlement />
    <FAQ />
    </main>

    <Footer />

    <InstagramFloatingButton />
    <KakaoFloatingButton />

    <NoticePopup />
    </>
  )
}