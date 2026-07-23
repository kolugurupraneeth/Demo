import PageHeader from '../components/PageHeader/PageHeader'
import CareersCallout from '../components/CareersCallout/CareersCallout'
import Events from '../components/Events/Events'

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Careers at KJB"
        lead="We hire veterans, train veterans, and are built by veterans. If you want to continue serving your country in federal IT — this is your team."
        accent="Join The Mission"
      />
      <CareersCallout />
      <Events />
    </>
  )
}
