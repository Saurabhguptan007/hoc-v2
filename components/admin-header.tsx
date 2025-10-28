import Link from "next/link"
import { LogOut } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">HC</span>
          </div>
          <span className="font-bold text-lg text-foreground">HOC Cell Admin</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={20} />
          Back to Site
        </Link>
      </div>
    </header>
  )
}
