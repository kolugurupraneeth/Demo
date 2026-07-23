import PageHeader from '../components/PageHeader/PageHeader'
import Services from '../components/Services/Services'
import PastProjects from '../components/PastProjects/PastProjects'

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        title="What We Do"
        lead="End-to-end IT solutions spanning program management, software development, and infrastructure consulting — delivered across the full SDLC."
        accent="Our Solutions"
      />
      <Services />
      <PastProjects />
    </>
  )
}
