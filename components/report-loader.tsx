"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, FileText, PieChart, LineChart, Download, Brain, Search, Database } from "lucide-react"

import { Progress } from "@/components/ui/progress"

interface ReportLoaderProps {
  keyword: string
  mode: "generating" | "loading"
  geographicArea?: string
}

export function ReportLoader({ keyword, mode, geographicArea = "Worldwide" }: ReportLoaderProps) {
  const [extractionProgress, setExtractionProgress] = useState(0)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState<'extracting' | 'generating'>(keyword.includes('http') ? 'extracting' : 'generating')
  const [statusMessage, setStatusMessage] = useState("")
  const [currentIcon, setCurrentIcon] = useState(0)
  const [showFinalAnimation, setShowFinalAnimation] = useState(false)

  // Différentes icônes selon le mode
  const generatingIcons = [
    <FileText key="file" className="h-6 w-6 sm:h-8 sm:w-8" />,
    <BarChart3 key="bar" className="h-6 w-6 sm:h-8 sm:w-8" />,
    <PieChart key="pie" className="h-6 w-6 sm:h-8 sm:w-8" />,
    <LineChart key="line" className="h-6 w-6 sm:h-8 sm:w-8" />,
    <Download key="download" className="h-6 w-6 sm:h-8 sm:w-8" />,
  ]

  const loadingIcons = [
    <Search key="search" className="h-6 w-6 sm:h-8 sm:w-8" />,
    <Brain key="brain" className="h-6 w-6 sm:h-8 sm:w-8" />,
    <Database key="database" className="h-6 w-6 sm:h-8 sm:w-8" />,
    <BarChart3 key="chart" className="h-6 w-6 sm:h-8 sm:w-8" />,
    <FileText key="file" className="h-6 w-6 sm:h-8 sm:w-8" />,
  ]

  const icons = mode === "generating" ? generatingIcons : loadingIcons

  // Messages pour l'extraction de données
  const extractingMessages = [
    "Initializing data extraction...",
    "Connecting to website...",
    "Fetching website data...",
    "Analyzing page structure...",
    "Extracting relevant information...",
    "Preparing data for analysis...",
  ]

  // Messages pour la génération de rapport
  const generatingMessages = [
    "Initializing report generation...",
    keyword.includes("http") 
      ? "Analyzing extracted website data..." 
      : `Analyzing market data for ${keyword} in ${geographicArea}...`,
    "Generating market segments visualization...",
    "Creating regional distribution charts...",
    "Preparing forecast projections...",
    "Compiling market insights...",
    "Finalizing report layout...",
    "Almost done! Compiling report...",
    "Final compilation of your report..."
  ]

  useEffect(() => {
    // For URL mode, start with extraction. For keyword mode, skip straight to generation
    if (keyword.includes('http')) {
      // Initialiser le message pour l'extraction
      setStatusMessage(extractingMessages[0])

      // Simuler la progression de l'extraction (10 secondes)
      const extractionInterval = setInterval(() => {
        setExtractionProgress((prev) => {
          if (prev >= 100) {
            clearInterval(extractionInterval)
            setCurrentStage('generating')
            setStatusMessage(generatingMessages[0])
            return 100
          }

          // Incrément pour atteindre 100% en 10 secondes (50ms * 200 steps)
          const increment = 0.5
          const newProgress = Math.min(prev + increment, 100)

          // Mettre à jour le message d'extraction
          const messageIndex = Math.floor((newProgress / 100) * (extractingMessages.length - 1))
          if (messageIndex !== Math.floor((prev / 100) * (extractingMessages.length - 1))) {
            setStatusMessage(extractingMessages[messageIndex])
          }

          return newProgress
        })
      }, 50)

      return () => clearInterval(extractionInterval)
    } else {
      // Skip extraction phase for keywords and start with generation messages
      setStatusMessage(generatingMessages[0])
    }
  }, [])

  useEffect(() => {
    // Ne commencer la génération que lorsque l'extraction est terminée pour les URLs
    // Ou immédiatement pour les keywords
    if (currentStage !== 'generating') return

    // Simuler la progression de la génération (20 secondes)
    const generationInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(generationInterval)
          setShowFinalAnimation(true)
          setStatusMessage(generatingMessages[generatingMessages.length - 1])
          return 100
        }

        // Incrément pour atteindre 100% en 20 secondes (50ms * 400 steps)
        const increment = 0.25
        const newProgress = Math.min(prev + increment, 100)

        // Mettre à jour le message de génération
        const messageIndex = Math.floor((newProgress / 100) * (generatingMessages.length - 2)) // -2 to reserve last message for 100%
        if (messageIndex !== Math.floor((prev / 100) * (generatingMessages.length - 2))) {
          setStatusMessage(generatingMessages[messageIndex])
        }

        // Mettre à jour l'icône
        const iconIndex = Math.floor((newProgress / 100) * (icons.length - 1))
        if (iconIndex !== currentIcon) {
          setCurrentIcon(iconIndex)
        }

        return newProgress
      })
    }, 50)

    return () => clearInterval(generationInterval)
  }, [currentStage])

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
      <div className="bg-card border rounded-lg shadow-lg p-4 sm:p-8 max-w-md w-full mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
          {/* Show either simple dot loader or the regular icon */}
          {showFinalAnimation && generationProgress === 100 ? (
            <div className="w-32 h-16 mx-auto mb-2 flex items-center justify-center">
              <div className="flex space-x-3">
                <motion.div
                  className="h-4 w-4 bg-primary rounded-full"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0,
                  }}
                />
                <motion.div
                  className="h-4 w-4 bg-primary rounded-full"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />
                <motion.div
                  className="h-4 w-4 bg-primary rounded-full"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
              {/* Cercle animé */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary/20"
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Icône animée */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  color: ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="text-primary"
              >
                {icons[currentIcon]}
              </motion.div>
            </div>
          )}

          <div className="space-y-4 sm:space-y-5 w-full">
            <h3 className="text-lg sm:text-xl font-semibold">
              {showFinalAnimation && generationProgress === 100 
                ? "Finalizing Your Report" 
                : "Creating Your Market Report"}
            </h3>
            
            {/* Barre d'extraction de données (jaune) - seulement affichée pour les URLs */}
            {keyword.includes('http') && (
              <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Extracting Website Data</span>
                  <span>{Math.round(extractionProgress)}%</span>
                </div>
                <Progress 
                  value={extractionProgress} 
                  className="h-2 transition-all duration-300 ease-out bg-gray-100"
                >
                  <div 
                    className="h-full bg-amber-500" 
                    style={{ width: `${extractionProgress}%` }}
                  ></div>
                </Progress>
              </div>
            )}
            
            {/* Barre de génération de rapport (bleue) */}
            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs">
                <span>Generating Market Report</span>
                <span>{Math.round(generationProgress)}%</span>
              </div>
              <Progress 
                value={generationProgress} 
                className="h-2 transition-all duration-300 ease-out" 
              />
            </div>
            
            <p className="text-xs sm:text-sm text-muted-foreground">{statusMessage}</p>
          </div>

          <div className="text-xs sm:text-sm text-muted-foreground italic">
            {showFinalAnimation && generationProgress === 100 
              ? "Final compilation in progress. Please wait..."
              : (keyword.includes('http')
                ? "Our AI is analyzing the latest market data to create a comprehensive report based on the extracted website information."
                : `Our AI is analyzing the latest market data for ${geographicArea} to create a comprehensive report based on your keyword search.`)}
          </div>
        </div>
      </div>
    </div>
  )
}
