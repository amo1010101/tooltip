"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Here you can trigger your conversion event
    // For example: analytics.track('subscription_completed')
    console.log('Subscription completed - tracking conversion event')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Souscription confirmée !
              </h1>
              <p className="text-muted-foreground">
                Merci pour votre confiance. Votre souscription a été activée avec succès.
              </p>
              <Button
                onClick={() => router.push('/dashboard')}
                className="mt-4"
                size="lg"
              >
                Accéder au tableau de bord
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 