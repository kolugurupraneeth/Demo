import PageHeader from '../components/PageHeader/PageHeader'
import WhoWeAre from '../components/WhoWeAre/WhoWeAre'
import Clients from '../components/Clients/Clients'
import Partners from '../components/Partners/Partners'

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Who We Are"
        lead="A veteran-owned small business built on service, integrity, and a firsthand understanding of the mission we support."
        accent="About KJB Solutions"
      />
      <WhoWeAre />
      <Clients />
      <Partners />
    </>
  )
}
