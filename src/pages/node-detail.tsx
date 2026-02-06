import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  MoreVertical,
  Bot,
  Sparkles,
  Link2,
  ListTodo,
  Calendar,
  User,
  Tag,
} from 'lucide-react'

export function NodeDetailPage() {
  const { projectId, boardId, nodeId } = useParams()

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in-up">
      <div className="flex items-center gap-4">
        <Link to={`/dashboard/projects/${projectId}/boards/${boardId}`}>
          <Button type="button" variant="ghost" size="icon" aria-label="Back to board">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold truncate">Node detail</h1>
          <p className="text-sm text-muted-foreground truncate">Editing {nodeId}</p>
        </div>
        <Button variant="ghost" size="icon" aria-label="More actions">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base">Title & type</CardTitle>
          <Badge variant="secondary">text</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Node title" defaultValue="Sample node" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" placeholder="Rich text or type-specific editor" rows={6} defaultValue="Edit content here." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm">
              <Sparkles className="h-3 w-3" />
              Summarize
            </Button>
            <Button type="button" variant="outline" size="sm">Expand</Button>
            <Button type="button" variant="outline" size="sm">
              <Link2 className="h-3 w-3" />
              Suggest links
            </Button>
            <Button type="button" variant="outline" size="sm">
              <ListTodo className="h-3 w-3" />
              Generate next steps
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">AI suggestions and generated content will appear here with citations.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Activity & history</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Comments and revision history for this node.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Tags:</span>
            <Badge variant="outline">tag1</Badge>
            <Badge variant="outline">tag2</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Assignees</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Due date</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link2 className="h-4 w-4" />
            <span>Source links</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
