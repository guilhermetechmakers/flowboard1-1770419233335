import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Plug, Bell, Trash2, Download } from 'lucide-react'

export function ProfilePage() {
  return (
    <div className="space-y-8 animate-in-up max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Account management and connected apps</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile summary
          </CardTitle>
          <CardDescription>Name, avatar, email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2 flex-1">
              <Label htmlFor="profile-name">Name</Label>
              <Input id="profile-name" placeholder="Your name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input id="profile-email" type="email" placeholder="you@example.com" />
          </div>
          <Button type="button" variant="outline">Change password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            Connected apps
          </CardTitle>
          <CardDescription>Manage linked accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No connected apps.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Preferences
          </CardTitle>
          <CardDescription>Theme, notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Notification and theme options.</p>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>Account deletion, export data</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button type="button" variant="outline">
            <Download className="h-4 w-4" />
            Export my data
          </Button>
          <Button type="button" variant="destructive">
            <Trash2 className="h-4 w-4" />
            Delete account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
