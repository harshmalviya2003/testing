import FAQ from "@/components/Home/FAQ"
import Hero from "@/components/Home/Hero"
import Testimonials from "@/components/Home/Testimonials"
import Wavedash from "@/components/Home/Wavedash"
import WavedashCTA from "@/components/Home/WavedashCTA"
import WavedashFeatures from "@/components/Home/WavedashFeatures"

export default function Home() {
  return (
    <main>
      {/* <ImageSphere coverImageUrl="/a.png"/> */}
      <Hero />
      <Wavedash/>
      <WavedashFeatures />
     
      <Testimonials />
      <FAQ/>
      <WavedashCTA/>
    </main>
  )
}