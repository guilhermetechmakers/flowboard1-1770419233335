import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Plus,
  LayoutTemplate,
  FileInput,
  MessageSquare,
  Bot,
  FolderKanban,
  Activity,
} from 'lucide-react'
// Mock data for UI
const mockProjects = [
  { id: '1', name: 'Product Roadmap', lastActivity: '2 hours ago', collaborators: 3 },
  { id: '2', name: 'Research Board', lastActivity: 'Yesterday', collaborators: 2 },
]
const mockActivity = [
  { type: 'comment', text: 'Sarah commented on "Q1 Goals"', time: '1h ago' },
  { type: 'ai', text: 'AI suggested 3 next steps for "User Flow"', time: '2h ago' },
]

export function DashboardPage() {
  const isLoading = false

  return (
    <div className="space-y-8 animate-in-up">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Your projects and recent activity</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/dashboard">
            <Button type="button" variant="primary">
              <Plus className="h-4 w-4" />
              New Board
            </Button>
          </Link>
          <Link to="/dashboard/import-export">
            <Button type="button" variant="outline">
              <FileInput className="h-4 w-4" />
              Import
            </Button>
          </Link>
          <Link to="/dashboard/templates">
            <Button type="button" variant="outline">
              <LayoutTemplate className="h-4 w-4" />
              Templates
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick actions</CardTitle>
          <CardDescription>New Board, Import, or start from a template</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <button
              type="button"
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-6 text-center transition-all duration-200 hover:shadow-card-hover hover:scale-[1.02]"
            >
              <FolderKanban className="h-10 w-10 text-primary" />
              <span className="font-medium">New Board</span>
              <span className="text-sm text-muted-foreground">Start from scratch</span>
            </button>
            <Link to="/dashboard/import-export">
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-6 text-center transition-all duration-200 hover:shadow-card-hover hover:scale-[1.02]">
                <FileInput className="h-10 w-10 text-primary" />
                <span className="font-medium">Import</span>
                <span className="text-sm text-muted-foreground">CSV or JSON</span>
              </div>
            </Link>
            <Link to="/dashboard/templates">
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-6 text-center transition-all duration-200 hover:shadow-card-hover hover:scale-[1.02]">
                <LayoutTemplate className="h-10 w-10 text-primary" />
                <span className="font-medium">Templates</span>
                <span className="text-sm text-muted-foreground">Pre-built boards</span>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Project grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Projects</h2>
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockProjects.map((p) => (
              <Link key={p.id} to={`/dashboard/projects/${p.id}/boards/board-1`}>
                <Card className="transition-all duration-200 hover:shadow-card-hover hover:scale-[1.01] h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{p.name}</CardTitle>
                    <CardDescription>Last activity {p.lastActivity} · {p.collaborators} collaborators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-24 rounded-md bg-muted flex items-center justify-center">
                      <FolderKanban className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            <Card className="border-dashed flex items-center justify-center min-h-[180px] transition-all hover:border-primary/50">
              <Link to="/dashboard" className="p-4 text-center">
                <Plus className="mx-auto h-8 w-8 text-muted-foreground" />
                <span className="mt-2 block text-sm font-medium text-muted-foreground">New project</span>
              </Link>
            </Card>
          </div>
        )}
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent activity
          </CardTitle>
          <CardDescription>Comments and AI suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {mockActivity.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                {a.type === 'ai' ? (
                  <Bot className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                ) : (
                  <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                )}
                <div>
                  <p className="text-foreground">{a.text}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
          {mockActivity.length === 0 && (
            <p className="text-sm text-muted-foreground py-4">No recent activity.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
