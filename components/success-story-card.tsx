import { Star } from "lucide-react"

interface SuccessStoryCardProps {
  name: string
  university: string
  scholarship: string
  story: string
  image?: string
}

export function SuccessStoryCard({ name, university, scholarship, story, image }: SuccessStoryCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
          {name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{university}</p>
        </div>
      </div>

      <div className="mb-4 pb-4 border-b border-border">
        <p className="text-sm font-semibold text-accent mb-1">Scholarship Awarded</p>
        <p className="text-foreground font-bold">{scholarship}</p>
      </div>

      <p className="text-foreground leading-relaxed mb-4">{story}</p>

      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    </div>
  )
}
