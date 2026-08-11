import PageShell from '../../components/layout/PageShell'

export function AboutPage() {
  return (
    <PageShell showSearch={false}>
      <h1>About</h1>
      <p>The Engro Portal is where employees find and complete company forms by department.</p>
    </PageShell>
  )
}

export function FaqPage() {
  return (
    <PageShell showSearch={false}>
      <h1>FAQ</h1>
      <p>Questions about using the portal will be answered here.</p>
    </PageShell>
  )
}

export function ReportProblemPage() {
  return (
    <PageShell showSearch={false}>
      <h1>Report a Problem</h1>
      <p>Contact IT Support to report an issue with the portal.</p>
    </PageShell>
  )
}

export function NotFoundPage() {
  return (
    <PageShell showSearch={false}>
      <h1>Page not found</h1>
    </PageShell>
  )
}
