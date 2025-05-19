import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, Users } from "lucide-react"
import { VisionBoard } from "@/components/vision-board"

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="w-full max-w-md px-4 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="text-[#2D3648]" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="h-24 w-24 rounded-full bg-[#F0F2F5] flex items-center justify-center text-3xl">😊</div>
            <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-medium text-[#2D3648]">Your Name</h2>
          <p className="text-sm text-[#4A5568]">3-month journey: Week 1</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3 text-[#2D3648]">Your Vision Board</h3>
            <VisionBoard />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3 text-[#2D3648]">Your Journey</h3>
            <div className="bg-white rounded-xl shadow-sm p-4 border border-[#E1E5EA]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-[#2D3648]">Progress</span>
                <span className="text-sm text-[#4A5568]">Week 1/12</span>
              </div>
              <div className="w-full bg-[#F0F2F5] h-2 rounded-full">
                <div className="bg-[#2D3648] h-2 rounded-full w-[8%]"></div>
              </div>
              <p className="text-xs text-[#4A5568] mt-2">
                You're at the beginning of your 3-month journey to a more balanced life.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3 text-[#2D3648]">Support & Accountability</h3>
            <Button variant="outline" className="w-full justify-start bg-white text-[#2D3648] border border-[#E1E5EA] hover:bg-[#F0F2F5]" asChild>
              <Link href="/accountability">
                <Users className="h-4 w-4 mr-2" />
                Manage Your Accountability Partners
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
