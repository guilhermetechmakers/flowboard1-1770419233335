import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="container mx-auto flex max-w-3xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
            <LayoutGrid className="h-6 w-6 text-primary" />
            FlowBoard
          </Link>
          <Link to="/privacy"><Button type="button" variant="ghost" size="sm">Privacy</Button></Link>
        </div>
      </header>
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold text-foreground">Terms of Service</h1>
        <p className="mt-2 text-muted-foreground">Last updated: February 2025</p>
        <div className="prose prose-sm mt-8 max-w-none text-foreground">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">1. Acceptance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>By using FlowBoard you agree to these terms. If you are using the service on behalf of an organization, you represent that you have authority to bind that organization.</p>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">2. Acceptable use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>You must not misuse the service, attempt to gain unauthorized access, or use it for illegal or harmful purposes. We may suspend or terminate accounts that violate these terms.</p>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">3. Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>To the extent permitted by law, FlowBoard is provided &quot;as is&quot;. We are not liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount you paid in the twelve months preceding the claim.</p>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">4. Versioning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>We may update these terms. Continued use after changes constitutes acceptance. Archived versions are available on request.</p>
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
