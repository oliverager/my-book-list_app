import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MOCK_READING_GOALS } from "@/types"

export function ReadingGoals() {
  const goals = MOCK_READING_GOALS

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {goals.map((goal) => (
        <Card key={goal.id}>
          <CardHeader>
            <CardTitle>{goal.title}</CardTitle>
            <CardDescription>{goal.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Progress</div>
                <div className="text-sm font-medium">
                  {goal.current}/{goal.target} {goal.unit}
                </div>
              </div>
              <Progress value={(goal.current / goal.target) * 100} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {goal.unit === "books"
                  ? `You're ${Math.round((goal.current / goal.target) * 100)}% of the way there!`
                  : `You're ${Math.round((goal.current / goal.target) * 100)}% of the way there!`}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
