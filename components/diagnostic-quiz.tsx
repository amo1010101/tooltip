"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft } from "lucide-react"

type Question = {
  id: number
  text: string
  category: string
  type: "slider" | "choice"
  choices?: string[]
}

export function DiagnosticQuiz() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [sliderValue, setSliderValue] = useState([50])

  const questions: Question[] = [
    {
      id: 1,
      text: "How satisfied are you with your overall energy levels?",
      category: "Health & Energy",
      type: "slider",
    },
    {
      id: 2,
      text: "How often do you feel overwhelmed by your emotions?",
      category: "Mental & Emotions",
      type: "slider",
    },
    {
      id: 3,
      text: "How fulfilled do you feel in your relationships?",
      category: "Relationships",
      type: "slider",
    },
    {
      id: 4,
      text: "How satisfied are you with your work-life balance?",
      category: "Work & Finance",
      type: "slider",
    },
    {
      id: 5,
      text: "How connected do you feel to your purpose?",
      category: "Spirituality",
      type: "slider",
    },
  ]

  const currentQuestion = questions[currentQuestionIndex]

  const handleNext = () => {
    // Save the current answer
    setAnswers({
      ...answers,
      [currentQuestion.id]: sliderValue[0],
    })

    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      // Reset slider to middle value for new question
      setSliderValue([50])
    } else {
      // Quiz completed, navigate to results
      router.push("/diagnostic/results")
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      // Restore previous answer if available
      if (answers[questions[currentQuestionIndex - 1].id]) {
        setSliderValue([answers[questions[currentQuestionIndex - 1].id]])
      }
    }
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="space-y-6">
      <div className="w-full bg-slate-100 h-2 rounded-full">
        <div
          className="bg-teal-500 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-2">
            <span className="text-xs font-medium text-teal-600">{currentQuestion.category}</span>
          </div>
          <h3 className="text-lg font-medium mb-6">{currentQuestion.text}</h3>

          {currentQuestion.type === "slider" && (
            <div className="space-y-6 py-4">
              <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Not at all</span>
                <span>Somewhat</span>
                <span>Very much</span>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="w-24">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button onClick={handleNext} className="w-24 bg-teal-600 hover:bg-teal-700">
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                "Finish"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-slate-400">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
    </div>
  )
}
