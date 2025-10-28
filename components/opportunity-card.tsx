import Link from "next/link"
import { Calendar, MapPin, DollarSign } from "lucide-react"

interface OpportunityCardProps {
  id: string
  title: string
  institution: string
  type: "scholarship" | "admission" | "program"
  description: string
  deadline: string
  amount?: string
}

const typeColors = {
  scholarship: "bg-blue-100 text-blue-800",
  admission: "bg-green-100 text-green-800",
  program: "bg-purple-100 text-purple-800",
}

export function OpportunityCard({ id, title, institution, type, description, deadline, amount }: OpportunityCardProps) {
  const isDeadlineSoon = new Date(deadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  return (
    <Link href={`/opportunities/${id}`}>
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${typeColors[type] || "bg-gray-100 text-gray-800"}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
          <MapPin size={16} />
          {institution}
        </p>

        <p className="text-sm text-foreground mb-4 flex-1 line-clamp-2">{description}</p>

        <div className="space-y-2 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Calendar size={16} />
              Deadline: {new Date(deadline).toLocaleDateString()}
            </span>
            {isDeadlineSoon && <span className="text-red-600 font-semibold text-xs">Closing Soon</span>}
          </div>
          {amount && (
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <DollarSign size={16} />
              {amount}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
