import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import WhoWeAre from './components/WhoWeAre/WhoWeAre'
import Services from './components/Services/Services'
import WhyKJB from './components/WhyKJB/WhyKJB'
import Clients from './components/Clients/Clients'
import Partners from './components/Partners/Partners'
import PastProjects from './components/PastProjects/PastProjects'
import Credentials from './components/Credentials/Credentials'
import CareersCallout from './components/CareersCallout/CareersCallout'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <WhoWeAre />
        <Services />
        <WhyKJB />
        <Clients />
        <Partners />
        <PastProjects />
        <Credentials />
        <CareersCallout />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
