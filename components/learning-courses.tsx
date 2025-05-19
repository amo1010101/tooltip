import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Clock } from "lucide-react"

export function LearningCourses() {
  const courses = [
    {
      id: "morning-routine",
      title: "5-Minute Morning Routine",
      image: "/placeholder.svg?key=jhbwz",
      duration: "10 min",
      category: "Health & Energy",
    },
    {
      id: "mindful-breathing",
      title: "Mindful Breathing Techniques",
      image: "/peaceful-meditation.png",
      duration: "15 min",
      category: "Mental & Emotions",
    },
    {
      id: "gratitude-practice",
      title: "Daily Gratitude Practice",
      image: "/placeholder.svg?key=98vak",
      duration: "5 min",
      category: "Spirituality",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Micro-Courses</h3>
        <Link href="/learning/courses" className="text-sm text-teal-600 flex items-center">
          View all
          <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <Link href={`/learning/courses/${course.id}`} key={course.id}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-32">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {course.duration}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="text-xs text-teal-300">{course.category}</span>
                    <h4 className="text-white font-medium">{course.title}</h4>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
