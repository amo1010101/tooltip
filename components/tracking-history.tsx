import { Card, CardContent } from "@/components/ui/card"
import { Camera, Mic, Smile } from "lucide-react"
import Image from "next/image"

export function TrackingHistory() {
  const history = [
    {
      id: "1",
      date: "Today, 10:30 AM",
      type: "photo",
      title: "Morning walk",
      category: "Health & Energy",
      imageUrl: "/morning-walk.png",
    },
    {
      id: "2",
      date: "Today, 8:15 AM",
      type: "feeling",
      title: "Energy level: 75%",
      category: "Mental & Emotions",
    },
    {
      id: "3",
      date: "Yesterday, 7:45 PM",
      type: "voice",
      title: "Reflection on work project",
      category: "Work & Finance",
      duration: "0:15",
    },
    {
      id: "4",
      date: "Yesterday, 1:20 PM",
      type: "photo",
      title: "Lunch with Sarah",
      category: "Relationships",
      imageUrl: "/placeholder.svg?key=lunch",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recent Activity</h3>

      <div className="space-y-3">
        {history.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  {item.type === "photo" && <Camera className="h-5 w-5 text-slate-500" />}
                  {item.type === "voice" && <Mic className="h-5 w-5 text-slate-500" />}
                  {item.type === "feeling" && <Smile className="h-5 w-5 text-slate-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{item.title}</h4>
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{item.category}</p>

                  {item.type === "photo" && item.imageUrl && (
                    <div className="mt-3 rounded-md overflow-hidden h-32 relative">
                      <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                  )}

                  {item.type === "voice" && item.duration && (
                    <div className="mt-3 bg-slate-100 rounded-full px-3 py-1.5 flex items-center w-fit">
                      <Mic className="h-3 w-3 text-slate-500 mr-2" />
                      <span className="text-xs text-slate-600">{item.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
