import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, TrendingUp } from "lucide-react"
import { MOCK_READING_STATS } from "@/types"

export function ReadingStats() {
  const stats = MOCK_READING_STATS

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="h-4 w-4 text-muted-foreground" />
      case "TrendingUp":
        return <TrendingUp className="h-4 w-4 text-muted-foreground" />
      case "Clock":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {getIcon(stat.icon)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
