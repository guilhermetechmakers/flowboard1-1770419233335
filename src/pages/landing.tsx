import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Bot,
  LayoutGrid,
  Users,
  Plug,
  Quote,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Bot,
    title: 'AI Agent',
    description: 'Context-aware AI that summarizes, proposes next steps, detects gaps, and generates content for your board.',
  },
  {
    icon: LayoutGrid,
    title: 'Visual Board',
    description: 'Infinite canvas for nodes and edges. Organize ideas, research, data, and workflows as connected flowcharts.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Real-time presence, cursors, comments, and assignments. Work together seamlessly.',
  },
  {
    icon: Plug,
    title: 'Integrations',
    description: 'Connect with Google Drive, Notion, Slack, GitHub, and more. Import and export with ease.',
  },
]

const tiers = [
  { name: 'Free', price: '$0', desc: 'For individuals and small teams', cta: 'Get Started' },
  { name: 'Pro', price: '$12', period: '/user/mo', desc: 'Advanced AI and collaboration', cta: 'Start trial' },
  { name: 'Enterprise', price: 'Custom', desc: 'SSO, compliance, dedicated support', cta: 'Contact sales' },
]

const testimonials = [
  { quote: 'FlowBoard transformed how we map product flows. The AI suggestions save hours.', author: 'Sarah K.', role: 'Product Lead' },
  { quote: 'Best visual collaboration tool we\'ve used. Real-time and reliable.', author: 'Mike T.', role: 'Engineering Manager' },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/30 to-background px-4 py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgb(var(--primary)/0.15),transparent)]" />
        <div className="container relative mx-auto max-w-5xl text-center">
          <h1 className="text-hero font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl animate-in-up">
            AI-assisted visual boards for teams
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed animate-in-up" style={{ animationDelay: '0.1s' }}>
            Organize ideas, research, data, and workflows as connected flowchart nodes. Summarize, propose, and generate with a context-aware AI agent.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-in-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/signup"><Button type="button" variant="primary" size="lg" className="min-w-[140px]">Get Started</Button></Link>
            <Link to="/login"><Button type="button" variant="secondary" size="lg" className="min-w-[140px]">Request Demo</Button></Link>
          </div>
        </div>
      </section>

      {/* Feature cards - bento-style */}
      <section className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="text-center text-2xl font-semibold text-foreground mb-12">Why FlowBoard</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Card
              key={f.title}
              className={cn(
                'transition-all duration-200 hover:shadow-card-hover hover:scale-[1.02]',
                i === 0 && 'lg:col-span-2 lg:row-span-2'
              )}
            >
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{f.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{f.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Live demo teaser */}
      <section className="border-y border-border bg-muted/30 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-semibold text-foreground">See it in action</h2>
          <p className="mt-4 text-muted-foreground">Explore a read-only sample board.</p>
          <div className="mt-8 rounded-lg border border-border bg-card p-8 shadow-card min-h-[320px] flex items-center justify-center">
            <p className="text-muted-foreground">Live demo embed placeholder — sample board viewer</p>
          </div>
          <Link to="/signup"><Button type="button" variant="secondary" size="lg" className="mt-6">Create your own board</Button></Link>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
        <h2 className="text-center text-2xl font-semibold text-foreground mb-12">Simple pricing</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <Card key={t.name} className="flex flex-col transition-all duration-200 hover:shadow-card-hover">
              <CardHeader>
                <CardTitle>{t.name}</CardTitle>
                <CardDescription>{t.desc}</CardDescription>
                <p className="text-2xl font-semibold text-foreground">
                  {t.price}
                  {t.period && <span className="text-sm font-normal text-muted-foreground">{t.period}</span>}
                </p>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <Link to={t.name === 'Free' ? '/signup' : '/dashboard/checkout'}>
                  <Button type="button" variant={t.name === 'Pro' ? 'primary' : 'outline'} className="w-full">{t.cta}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials carousel */}
      <section className="border-t border-border bg-muted/20 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-semibold text-foreground mb-10">What teams say</h2>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" aria-label="Previous testimonial">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 space-y-6">
              {testimonials.map((t) => (
                <Card key={t.author}>
                  <CardContent className="pt-6">
                    <Quote className="h-8 w-8 text-primary/40 mb-2" />
                    <p className="text-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <p className="mt-4 text-sm font-medium text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="ghost" size="icon" aria-label="Next testimonial">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-12">
        <div className="container mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <LayoutGrid className="h-5 w-5 text-primary" />
            FlowBoard
          </div>
          <nav className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <a href="#docs" className="hover:text-foreground transition-colors">Docs</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
