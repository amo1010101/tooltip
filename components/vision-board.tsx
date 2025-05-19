import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

export function VisionBoard() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="overflow-hidden">
        <CardContent className="p-0 aspect-square relative">
          <Image
            src="/placeholder.svg?key=1gqg2"
            alt="Meditation goal"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <p className="text-xs text-white">Daily mindfulness</p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0 aspect-square relative">
          <Image
            src="/placeholder.svg?key=xqkdx"
            alt="Healthy eating goal"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <p className="text-xs text-white">Nourishing meals</p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0 aspect-square relative">
          <Image
            src="/cozy-reading.png"
            alt="Reading goal"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <p className="text-xs text-white">Daily learning</p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-slate-50 border-dashed">
        <CardContent className="p-0 aspect-square flex items-center justify-center">
          <div className="text-center">
            <Plus className="h-8 w-8 mx-auto text-slate-300" />
            <p className="text-xs text-slate-400 mt-2">Add vision</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
