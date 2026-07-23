import PageHeader from '../components/PageHeader/PageHeader'
import Contact from '../components/Contact/Contact'

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        lead="Ready to discuss a federal IT engagement? Reach out and we'll respond within one business day."
        accent="Get In Touch"
      />
      <Contact />
    </>
  )
}
