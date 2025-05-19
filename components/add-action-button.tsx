"use client"

import { useState } from "react"
import { Plus, Camera, Mic, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

export function AddActionButton() {
  const [open, setOpen] = useState(false)
  const [energyLevel, setEnergyLevel] = useState([50])

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-teal-600 hover:bg-teal-700 shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800">Add a Moment</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="photo" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="photo">
                <Camera className="h-4 w-4 mr-2" />
                Photo
              </TabsTrigger>
              <TabsTrigger value="voice">
                <Mic className="h-4 w-4 mr-2" />
                Voice
              </TabsTrigger>
              <TabsTrigger value="feeling">
                <Smile className="h-4 w-4 mr-2" />
                Feeling
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photo" className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="h-8 w-8 mx-auto text-slate-400" />
                  <p className="text-sm text-slate-500 mt-2">Tap to take a photo</p>
                  <p className="text-xs text-slate-400 mt-1">AI will analyze what it represents</p>
                </div>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">Capture Moment</Button>
            </TabsContent>

            <TabsContent value="voice" className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <Mic className="h-8 w-8 mx-auto text-slate-400" />
                  <p className="text-sm text-slate-500 mt-2">Tap and hold to record</p>
                  <p className="text-xs text-slate-400 mt-1">Max 20 seconds</p>
                </div>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">Save Voice Note</Button>
            </TabsContent>

            <TabsContent value="feeling" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-center text-sm font-medium">How's your energy today?</h3>
                <Slider value={energyLevel} onValueChange={setEnergyLevel} max={100} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">Save Feeling</Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
