import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { LayoutTemplate, Search, Eye, Check } from 'lucide-react'
const mockTemplates = [
  { id: '1', name: 'Product Roadmap', category: 'Product', description: 'Goals, features, and timeline' },
  { id: '2', name: 'Research Board', category: 'Research', description: 'Sources, insights, and synthesis' },
  { id: '3', name: 'User Flow', category: 'Design', description: 'Steps and decision points' },
  { id: '4', name: 'Sprint Board', category: 'Engineering', description: 'Tasks, status, and assignees' },
]

export function TemplatesPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string | null>(null)
  const [previewId, setPreviewId] = useState<string | null>(null)

  const categories = Array.from(new Set(mockTemplates.map((t) => t.category)))

  return (
    <div className="space-y-6 animate-in-up">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Templates</h1>
        <p className="text-muted-foreground">Starter boards and onboarding examples</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={filter === null ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter(null)}
          >
            All
          </Button>
          {categories.map((c) => (
            <Button
              key={c}
              type="button"
              variant={filter === c ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockTemplates
          .filter((t) => {
            const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase())
            const matchFilter = !filter || t.category === filter
            return matchSearch && matchFilter
          })
          .map((t) => (
            <Card
              key={t.id}
              className="transition-all duration-200 hover:shadow-card-hover overflow-hidden"
            >
              <div className="aspect-video bg-muted flex items-center justify-center">
                <LayoutTemplate className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t.name}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
                <Badge variant="secondary" className="w-fit mt-1">{t.category}</Badge>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewId(previewId === t.id ? null : t.id)}
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <Button type="button" variant="primary" size="sm">
                  <Check className="h-4 w-4" />
                  Apply template
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      {previewId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Preview</CardTitle>
              <Button type="button" variant="ghost" size="sm" onClick={() => setPreviewId(null)}>
                Close
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Interactive preview placeholder for template.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
