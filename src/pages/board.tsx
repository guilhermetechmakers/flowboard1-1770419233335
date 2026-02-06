import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  MousePointer2,
  Hand,
  Link2,
  Square,
  LayoutGrid,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Minimize2,
  Grid3X3,
  Type,
  Link as LinkIcon,
  FileText,
  Image,
  CheckSquare,
  Table,
  Code,
  StickyNote,
  Bot,
  Users,
  Share2,
  History,
} from 'lucide-react'

const nodeTypes = [
  { type: 'text', label: 'Text', icon: Type },
  { type: 'research', label: 'Research link', icon: LinkIcon },
  { type: 'file', label: 'File', icon: FileText },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'task', label: 'Task', icon: CheckSquare },
  { type: 'table', label: 'Table', icon: Table },
  { type: 'code', label: 'Code', icon: Code },
  { type: 'note', label: 'Note', icon: StickyNote },
]

export function BoardPage() {
  const { projectId, boardId } = useParams()

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col rounded-lg border border-border bg-card overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-border p-2 flex-wrap">
        <Button variant="ghost" size="icon" title="Select" aria-label="Select">
          <MousePointer2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Pan" aria-label="Pan">
          <Hand className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Connect" aria-label="Connect">
          <Link2 className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button variant="ghost" size="icon" title="Create node" aria-label="Create node">
          <Square className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Auto-layout" aria-label="Auto-layout">
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Undo" aria-label="Undo">
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Redo" aria-label="Redo">
          <Redo2 className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button variant="ghost" size="icon" title="Zoom in" aria-label="Zoom in">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Zoom out" aria-label="Zoom out">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Fit view" aria-label="Fit view">
          <Minimize2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Grid" aria-label="Toggle grid">
          <Grid3X3 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Node types palette */}
        <div className="hidden lg:flex w-14 flex-col border-r border-border p-2 gap-1">
          {nodeTypes.map(({ type, label, icon: Icon }) => (
            <Button
              key={type}
              variant="ghost"
              size="icon"
              title={label}
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        {/* Canvas area */}
        <div className="flex-1 relative bg-muted/30 overflow-auto">
          <div className="min-w-[800px] min-h-[600px] p-8">
            <div className="grid gap-4 place-items-start" style={{ gridTemplateColumns: 'repeat(3, 200px)' }}>
              {[1, 2, 3].map((i) => (
                <Link
                  key={i}
                  to={`/dashboard/projects/${projectId}/boards/${boardId}/nodes/node-${i}`}
                >
                  <Card className="w-[200px] p-3 shadow-card hover:shadow-card-hover transition-all cursor-pointer border-2 border-transparent hover:border-primary/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Node {i}</span>
                      <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">text</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">Sample content for node {i}.</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          {/* Minimap placeholder */}
          <div className="absolute bottom-4 right-4 w-24 h-24 rounded border border-border bg-card/90 shadow-card" title="Minimap">
            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Minimap</div>
          </div>
        </div>

        {/* Right: Inspector + AI panel */}
        <div className="hidden xl:flex w-80 flex-col border-l border-border">
          <div className="border-b border-border p-2 flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span className="font-medium text-sm">AI Agent</span>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            <Card className="p-3">
              <p className="text-sm font-medium mb-1">Suggestions</p>
              <p className="text-xs text-muted-foreground">Summarize, next steps, or generate content for selected nodes.</p>
              <Button variant="outline" size="sm" className="mt-2 w-full">Apply suggestion</Button>
            </Card>
            <Card className="p-3">
              <p className="text-sm font-medium mb-1">Action cards</p>
              <p className="text-xs text-muted-foreground">AI-generated actions will appear here.</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom: collaboration + timeline */}
      <div className="flex items-center justify-between border-t border-border px-4 py-2 text-sm">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Collaboration</span>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Version history</span>
        </div>
      </div>
    </div>
  )
}
