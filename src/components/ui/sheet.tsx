import * as React from 'react'
import { cn } from '@/lib/utils'

interface SheetContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

function useSheet() {
  const ctx = React.useContext(SheetContext)
  if (!ctx) throw new Error('Sheet components must be used within Sheet')
  return ctx
}

export interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function Sheet({ open = false, onOpenChange, children }: SheetProps) {
  const [openState, setOpenState] = React.useState(open)
  const isControlled = open !== undefined && onOpenChange !== undefined
  const isOpen = isControlled ? open : openState
  const setIsOpen = isControlled ? onOpenChange! : setOpenState
  return (
    <SheetContext.Provider value={{ open: isOpen, onOpenChange: setIsOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

function SheetTrigger({
  children,
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  children: React.ReactNode
}) {
  const { onOpenChange } = useSheet()
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => onOpenChange(true),
    })
  }
  return (
    <button type="button" onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  )
}

function SheetContent({
  side = 'right',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { side?: 'left' | 'right' }) {
  const { open, onOpenChange } = useSheet()
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, onOpenChange])
  if (!open) return null
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-foreground/40 animate-in"
        aria-hidden
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          'fixed top-0 z-50 h-full w-full max-w-lg bg-card shadow-card animate-in',
          side === 'right' && 'right-0',
          side === 'left' && 'left-0',
          className
        )}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        {children}
      </div>
    </>
  )
}

function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 p-4', className)} {...props} />
}

function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn('text-lg font-semibold text-foreground', className)} {...props} />
  )
}

function SheetClose({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useSheet()
  return (
    <button type="button" onClick={() => onOpenChange(false)} className={className} {...props}>
      {children}
    </button>
  )
}

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose }
