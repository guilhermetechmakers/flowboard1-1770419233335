import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { HelpCircle, BookOpen, Video, Mail, ExternalLink } from 'lucide-react'
const faqs = [
  { q: 'How do I create my first board?', a: 'From the Dashboard, click "New Board" or use a template. Name your project and start adding nodes.' },
  { q: 'How does the AI agent work?', a: 'The AI agent has access to your board context. Use the right panel to request summaries, next steps, or content generation.' },
  { q: 'Can I invite collaborators?', a: 'Yes. Use the Share button on a board to invite by email. Roles (viewer, editor, admin) are available on paid plans.' },
  { q: 'What formats can I import?', a: 'CSV and JSON. Use the Import / Export page to map columns to node fields.' },
]

export function HelpPage() {
  return (
    <div className="space-y-8 animate-in-up">
      <div>
        <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          <HelpCircle className="h-7 w-7 text-primary" />
          Help &amp; Documentation
        </h1>
        <p className="text-muted-foreground">Guides, FAQ, and support</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Getting started
            </CardTitle>
            <CardDescription>Quick guides to set up your first board</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#guide-1" className="text-primary hover:underline">Create a project and board</a></li>
              <li><a href="#guide-2" className="text-primary hover:underline">Add nodes and connect them</a></li>
              <li><a href="#guide-3" className="text-primary hover:underline">Use the AI agent</a></li>
              <li><a href="#guide-4" className="text-primary hover:underline">Invite collaborators</a></li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Video tutorials
            </CardTitle>
            <CardDescription>Watch step-by-step walkthroughs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Video tutorials will be linked here.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
          <CardDescription>Frequently asked questions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6">
            {faqs.map((f, i) => (
              <li key={i}>
                <h3 className="font-medium text-foreground">{f.q}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact support
          </CardTitle>
          <CardDescription>Send a message or link to docs and status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Brief subject" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Describe your issue or question" rows={4} />
          </div>
          <Button type="button">Send message</Button>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            <a href="#docs" className="text-primary hover:underline">Documentation</a>
            {' · '}
            <a href="#status" className="text-primary hover:underline">Status page</a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
