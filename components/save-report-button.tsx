"use client"

import { useState } from "react"
import { FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getSupabaseClient } from "@/lib/supabase/client"
import type { GeneratedReport } from "@/app/actions/generate-report"

interface SaveReportButtonProps {
  report: GeneratedReport | null
  keyword: string
  geographicArea?: string
}

export function SaveReportButton({ report, keyword, geographicArea = "Worldwide" }: SaveReportButtonProps) {
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  const handleSaveReport = async () => {
    if (!report) {
      setMessage({ text: "Aucun rapport à enregistrer", type: "error" })
      setTimeout(() => setMessage(null), 3000)
      return
    }

    setSaving(true)
    setMessage(null)

    try {
      console.log("Début du processus de sauvegarde manuelle...")
      const supabase = getSupabaseClient()

      // Vérifier si l'utilisateur est connecté (optionnel)
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // Tronquer le keyword s'il est trop long (limite de 100 caractères dans la BD)
      let truncatedKeyword = keyword;
      if (keyword.length > 100) {
        // Si c'est une URL, essayer d'extraire le domaine
        if (keyword.startsWith('http')) {
          try {
            const url = new URL(keyword);
            truncatedKeyword = url.hostname.replace('www.', '');
          } catch (e) {
            // En cas d'échec, simplement tronquer
            truncatedKeyword = keyword.substring(0, 97) + '...';
          }
        } else {
          // Sinon tronquer avec des points de suspension
          truncatedKeyword = keyword.substring(0, 97) + '...';
        }
      }

      // Créer un objet simplifié pour la sauvegarde
      const reportData = {
        user_id: session?.user?.id || null, // user_id est maintenant optionnel
        keyword: truncatedKeyword,
        title: report.title,
        summary: report.summary,
        market_size: report.marketSize,
        growth_rate: report.growthRate,
        created_at: new Date().toISOString(),
        content: report, // Stocker le rapport complet dans un champ 'content'
        geographic_area: geographicArea // Ajouter la zone géographique
      }

      console.log("Données du rapport préparées:", reportData)

      // Sauvegarder le rapport dans Supabase
      const { error } = await supabase.from("reports").insert(reportData)

      if (error) {
        console.error("Erreur lors de la sauvegarde:", error)
        throw new Error(error.message)
      }

      console.log("Rapport enregistré avec succès!")
      setMessage({ text: "Rapport enregistré avec succès!", type: "success" })
    } catch (error: any) {
      console.error("Erreur complète:", error)
      setMessage({
        text: `Erreur: ${error.message || "Impossible d'enregistrer le rapport"}`,
        type: "error",
      })
    } finally {
      setSaving(false)
      // Effacer le message après 3 secondes
      setTimeout(() => setMessage(null), 3000)
    }
  }

  return (
    <div className="w-full">
      <Button className="w-full mb-2" onClick={handleSaveReport} disabled={saving}>
        {saving ? (
          <>
            <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
            Enregistrement...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Enregistrer le rapport
          </>
        )}
      </Button>

      {message && (
        <div
          className={`text-sm text-center p-2 rounded ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  )
}
