import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { FileInput, FileOutput, Upload, Download, FileJson, FileSpreadsheet } from 'lucide-react'
import { toast } from 'sonner'

export function ImportExportPage() {
  const [importFile, setImportFile] = useState<File | null>(null)
  const [exportFormat, setExportFormat] = useState<'png' | 'pdf' | 'csv' | 'json'>('json')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImportFile(file)
      toast.success(`Selected ${file.name}`)
    }
  }

  const handleExport = () => {
    toast.success(`Export as ${exportFormat.toUpperCase()} started. Download will begin shortly.`)
  }

  return (
    <div className="space-y-8 animate-in-up">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Import / Export</h1>
        <p className="text-muted-foreground">Data ingestion and content export</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileInput className="h-5 w-5 text-primary" />
              Import
            </CardTitle>
            <CardDescription>Upload CSV or JSON and map columns to board nodes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Upload file</Label>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.json"
                  onChange={handleImport}
                  className="hidden"
                  id="import-file"
                  aria-label="Choose file"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  Choose file
                </Button>
                {importFile && (
                  <span className="text-sm text-muted-foreground truncate max-w-[200px]">{importFile.name}</span>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Column mapping and validation will appear after upload.</p>
            <Button type="button" variant="primary" disabled={!importFile}>
              Import
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileOutput className="h-5 w-5 text-primary" />
              Export
            </CardTitle>
            <CardDescription>Select area or nodes and export as PNG, PDF, CSV, or JSON</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Format</Label>
              <div className="flex flex-wrap gap-2">
                {(['png', 'pdf', 'csv', 'json'] as const).map((f) => (
                  <Button
                    key={f}
                    type="button"
                    variant={exportFormat === f ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setExportFormat(f)}
                  >
                    {f === 'json' && <FileJson className="h-3 w-3" />}
                    {f === 'csv' && <FileSpreadsheet className="h-3 w-3" />}
                    {f.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Resolution options available for PNG/PDF.</p>
            <Button type="button" variant="primary" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Import / Export history</CardTitle>
          <CardDescription>Recent imports and downloadable exports</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recent imports or exports.</p>
        </CardContent>
      </Card>
    </div>
  )
}
