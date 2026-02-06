import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="container mx-auto flex max-w-3xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
            <LayoutGrid className="h-6 w-6 text-primary" />
            FlowBoard
          </Link>
          <Link to="/terms"><Button type="button" variant="ghost" size="sm">Terms</Button></Link>
        </div>
      </header>
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-muted-foreground">Last updated: February 2025</p>
        <div className="prose prose-sm mt-8 max-w-none text-foreground">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">1. Data we collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>We collect account information (name, email, organization), usage data (boards, nodes, collaboration events), and technical data (IP, device) necessary to provide and improve the service.</p>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">2. Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>We retain your data for as long as your account is active. Deleted data is removed within 30 days except where required for legal or compliance purposes.</p>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">3. Your rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>You may access, correct, export, or delete your data from the Settings and Profile pages. For requests or questions, contact our data protection officer at privacy@flowboard.example.</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12">
          <Link to="/"><Button type="button" variant="outline">Back to home</Button></Link>
        </div>
      </main>
    </div>
  )
}
