import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_ACTIVITIES } from "@/types"

export function RecentActivity() {
  const activities = MOCK_ACTIVITIES

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest reading activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.image || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user.name}</span>{" "}
                  {activity.type === "finished" && <>finished reading </>}
                  {activity.type === "started" && <>started reading </>}
                  {activity.type === "progress" && <>updated progress on </>}
                  {activity.type === "added" && <>added </>}
                  <span className="font-semibold">{activity.book}</span>
                  {activity.type === "progress" && activity.pages && <> (+{activity.pages} pages)</>}
                </p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
