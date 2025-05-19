import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import type { GeneratedReport } from "@/app/actions/generate-report"

export async function generateReportPDF(report: GeneratedReport, keyword: string) {
  // Créer un nouveau document PDF
  const pdf = new jsPDF("p", "mm", "a4")
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - 2 * margin

  // Fonction pour ajouter du texte avec retour à la ligne automatique
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const lines = pdf.splitTextToSize(text, maxWidth)
    pdf.text(lines, x, y)
    return y + lineHeight * lines.length
  }

  // Ajouter l'en-tête
  pdf.setFontSize(22)
  pdf.setTextColor(44, 62, 80)
  let y = 20
  y = addWrappedText(report.title, margin, y, contentWidth, 10)

  // Ajouter la date et le mot-clé
  pdf.setFontSize(10)
  pdf.setTextColor(100, 100, 100)
  y += 5
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, y)
  y += 5
  pdf.text(`Keyword: ${keyword}`, margin, y)
  y += 10

  // Ajouter le résumé
  pdf.setFontSize(12)
  pdf.setTextColor(0, 0, 0)
  pdf.setFont(undefined, "bold")
  pdf.text("Summary", margin, y)
  y += 7
  pdf.setFont(undefined, "normal")
  y = addWrappedText(report.summary, margin, y, contentWidth, 6)
  y += 10

  // Ajouter les informations clés
  pdf.setFontSize(12)
  pdf.setFont(undefined, "bold")
  pdf.text("Key Information", margin, y)
  y += 7
  pdf.setFont(undefined, "normal")
  pdf.setFontSize(10)
  pdf.text(`Market Size: ${report.marketSize}`, margin, y)
  y += 6
  pdf.text(`Growth Rate: ${report.growthRate}`, margin, y)
  y += 10

  // Ajouter les acteurs clés
  pdf.setFontSize(12)
  pdf.setFont(undefined, "bold")
  pdf.text("Key Players", margin, y)
  y += 7
  pdf.setFont(undefined, "normal")
  pdf.setFontSize(10)
  report.keyPlayers.forEach((player) => {
    pdf.text(`• ${player}`, margin, y)
    y += 6
  })
  y += 5

  // Capturer et ajouter le graphique des acteurs clés
  try {
    const keyPlayersChart = document.getElementById("key-players-chart")
    if (keyPlayersChart) {
      const canvas = await html2canvas(keyPlayersChart)
      const imgData = canvas.toDataURL("image/png")

      // Vérifier si nous avons besoin d'une nouvelle page
      if (y + 80 > pageHeight) {
        pdf.addPage()
        y = 20
      }

      pdf.addImage(imgData, "PNG", margin, y, contentWidth, 60)
      y += 70
    }
  } catch (error) {
    console.error("Error capturing key players chart:", error)
  }

  // Ajouter les tendances
  if (y + 50 > pageHeight) {
    pdf.addPage()
    y = 20
  }

  pdf.setFontSize(12)
  pdf.setFont(undefined, "bold")
  pdf.text("Trends", margin, y)
  y += 7
  pdf.setFont(undefined, "normal")
  pdf.setFontSize(10)
  report.trends.forEach((trend) => {
    y = addWrappedText(`• ${trend}`, margin, y, contentWidth, 6)
    y += 2
  })
  y += 5

  // Ajouter les défis
  if (report.challenges && report.challenges.length > 0) {
    if (y + 40 > pageHeight) {
      pdf.addPage()
      y = 20
    }

    pdf.setFontSize(12)
    pdf.setFont(undefined, "bold")
    pdf.text("Challenges", margin, y)
    y += 7
    pdf.setFont(undefined, "normal")
    pdf.setFontSize(10)
    report.challenges.forEach((challenge) => {
      if (y + 10 > pageHeight) {
        pdf.addPage()
        y = 20
      }
      pdf.text(`• ${String(challenge)}`, margin, y)
      y += 6
    })
    y += 4
  }

  // Ajouter l'analyse SWOT
  if (report.swot) {
    if (y + 60 > pageHeight) {
      pdf.addPage()
      y = 20
    }

    pdf.setFontSize(14)
    pdf.setFont(undefined, "bold")
    pdf.text("SWOT Analysis", margin, y)
    y += 10

    // Strengths
    if (report.swot.strengths && report.swot.strengths.length > 0) {
      pdf.setFontSize(12)
      pdf.setFont(undefined, "bold")
      pdf.setTextColor(34, 139, 34) // Green color
      pdf.text("Strengths", margin, y)
      y += 7
      pdf.setFont(undefined, "normal")
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(10)
      report.swot.strengths.forEach((strength) => {
        if (y + 10 > pageHeight) {
          pdf.addPage()
          y = 20
        }
        pdf.text(`• ${String(strength)}`, margin, y)
        y += 6
      })
      y += 4
    }

    // Weaknesses
    if (report.swot.weaknesses && report.swot.weaknesses.length > 0) {
      pdf.setFontSize(12)
      pdf.setFont(undefined, "bold")
      pdf.setTextColor(220, 20, 60) // Red color
      pdf.text("Weaknesses", margin, y)
      y += 7
      pdf.setFont(undefined, "normal")
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(10)
      report.swot.weaknesses.forEach((weakness) => {
        if (y + 10 > pageHeight) {
          pdf.addPage()
          y = 20
        }
        pdf.text(`• ${String(weakness)}`, margin, y)
        y += 6
      })
      y += 4
    }

    // Opportunities
    if (report.swot.opportunities && report.swot.opportunities.length > 0) {
      pdf.setFontSize(12)
      pdf.setFont(undefined, "bold")
      pdf.setTextColor(30, 144, 255) // Blue color
      pdf.text("Opportunities", margin, y)
      y += 7
      pdf.setFont(undefined, "normal")
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(10)
      report.swot.opportunities.forEach((opportunity) => {
        if (y + 10 > pageHeight) {
          pdf.addPage()
          y = 20
        }
        pdf.text(`• ${String(opportunity)}`, margin, y)
        y += 6
      })
      y += 4
    }

    // Threats
    if (report.swot.threats && report.swot.threats.length > 0) {
      pdf.setFontSize(12)
      pdf.setFont(undefined, "bold")
      pdf.setTextColor(255, 165, 0) // Amber color
      pdf.text("Threats", margin, y)
      y += 7
      pdf.setFont(undefined, "normal")
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(10)
      report.swot.threats.forEach((threat) => {
        if (y + 10 > pageHeight) {
          pdf.addPage()
          y = 20
        }
        pdf.text(`• ${String(threat)}`, margin, y)
        y += 6
      })
      y += 6
    }
  }

  // Ajouter les opportunités
  if (y + 50 > pageHeight) {
    pdf.addPage()
    y = 20
  }

  pdf.setFontSize(12)
  pdf.setFont(undefined, "bold")
  pdf.text("Opportunities", margin, y)
  y += 7
  pdf.setFont(undefined, "normal")
  pdf.setFontSize(10)
  report.opportunities.forEach((opportunity) => {
    y = addWrappedText(`• ${opportunity}`, margin, y, contentWidth, 6)
    y += 2
  })
  y += 10

  // Ajouter une nouvelle page pour les segments
  pdf.addPage()
  y = 20

  // Ajouter les segments
  pdf.setFontSize(16)
  pdf.setFont(undefined, "bold")
  pdf.setTextColor(44, 62, 80)
  pdf.text("Market Segments", margin, y)
  y += 10

  // Capturer et ajouter le graphique des segments
  try {
    const segmentsChart = document.getElementById("segments-chart")
    if (segmentsChart) {
      const canvas = await html2canvas(segmentsChart)
      const imgData = canvas.toDataURL("image/png")
      pdf.addImage(imgData, "PNG", margin, y, contentWidth, 80)
      y += 90
    }
  } catch (error) {
    console.error("Error capturing segments chart:", error)
  }

  // Ajouter les détails des segments
  pdf.setFontSize(12)
  pdf.setTextColor(0, 0, 0)
  report.segments.forEach((segment) => {
    if (y + 30 > pageHeight) {
      pdf.addPage()
      y = 20
    }

    pdf.setFont(undefined, "bold")
    pdf.text(segment.name, margin, y)
    y += 5
    pdf.setFont(undefined, "normal")
    pdf.setFontSize(10)
    pdf.text(`Market Share: ${segment.share}`, margin, y)
    y += 5
    y = addWrappedText(segment.description, margin, y, contentWidth, 6)
    y += 8
  })

  // Ajouter une nouvelle page pour les régions
  pdf.addPage()
  y = 20

  // Ajouter les régions
  pdf.setFontSize(16)
  pdf.setFont(undefined, "bold")
  pdf.setTextColor(44, 62, 80)
  pdf.text("Regional Analysis", margin, y)
  y += 10

  // Capturer et ajouter le graphique des régions
  try {
    const regionsChart = document.getElementById("regions-chart")
    if (regionsChart) {
      const canvas = await html2canvas(regionsChart)
      const imgData = canvas.toDataURL("image/png")
      pdf.addImage(imgData, "PNG", margin, y, contentWidth, 80)
      y += 90
    }
  } catch (error) {
    console.error("Error capturing regions chart:", error)
  }

  // Ajouter les détails des régions
  pdf.setFontSize(12)
  pdf.setTextColor(0, 0, 0)
  report.regions.forEach((region) => {
    if (y + 30 > pageHeight) {
      pdf.addPage()
      y = 20
    }

    pdf.setFont(undefined, "bold")
    pdf.text(region.name, margin, y)
    y += 5
    pdf.setFont(undefined, "normal")
    pdf.setFontSize(10)
    pdf.text(`Market Share: ${region.share}`, margin, y)
    y += 5
    y = addWrappedText(region.description, margin, y, contentWidth, 6)
    y += 8
  })

  // Ajouter une nouvelle page pour les prévisions
  pdf.addPage()
  y = 20

  // Ajouter les prévisions
  pdf.setFontSize(16)
  pdf.setFont(undefined, "bold")
  pdf.setTextColor(44, 62, 80)
  pdf.text("Market Forecast", margin, y)
  y += 10

  // Capturer et ajouter le graphique des prévisions
  try {
    const forecastChart = document.getElementById("forecast-chart")
    if (forecastChart) {
      const canvas = await html2canvas(forecastChart)
      const imgData = canvas.toDataURL("image/png")
      pdf.addImage(imgData, "PNG", margin, y, contentWidth, 80)
      y += 90
    }
  } catch (error) {
    console.error("Error capturing forecast chart:", error)
  }

  // Ajouter les détails des prévisions
  pdf.setFontSize(12)
  pdf.setTextColor(0, 0, 0)
  pdf.setFont(undefined, "normal")
  y = addWrappedText(report.forecast, margin, y, contentWidth, 6)
  y += 10

  // Ajouter le tableau des prévisions
  if (report.forecastData && report.forecastData.length > 0) {
    if (y + 50 > pageHeight) {
      pdf.addPage()
      y = 20
    }

    pdf.setFontSize(12)
    pdf.setFont(undefined, "bold")
    pdf.text("Market Evolution by Year", margin, y)
    y += 10

    // En-têtes du tableau
    pdf.setFillColor(240, 240, 240)
    pdf.rect(margin, y, contentWidth, 8, "F")
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(10)
    pdf.text("Year", margin + 5, y + 5)
    pdf.text("Market Size ($ Billions)", margin + 40, y + 5)
    pdf.text("Growth (%)", margin + 100, y + 5)
    y += 8

    // Lignes du tableau
    report.forecastData.forEach((item, index) => {
      const prevValue = index > 0 ? report.forecastData?.[index - 1].value : item.value
      const growthPercent = prevValue ? (((item.value - prevValue) / prevValue) * 100).toFixed(1) : "N/A"

      pdf.setFont(undefined, "normal")
      pdf.text(item.year.toString(), margin + 5, y + 5)
      pdf.text(`$${item.value}`, margin + 40, y + 5)
      pdf.text(index === 0 ? "Base Year" : `+${growthPercent}%`, margin + 100, y + 5)

      // Ligne de séparation
      pdf.setDrawColor(200, 200, 200)
      pdf.line(margin, y + 8, margin + contentWidth, y + 8)

      y += 8
    })
  }

  // Ajouter une page de conclusion
  pdf.addPage()
  y = 20

  // Ajouter la conclusion
  pdf.setFontSize(16)
  pdf.setFont(undefined, "bold")
  pdf.setTextColor(44, 62, 80)
  pdf.text("Conclusion", margin, y)
  y += 10

  pdf.setFontSize(12)
  pdf.setFont(undefined, "normal")
  pdf.setTextColor(0, 0, 0)
  y = addWrappedText(
    `This report on ${keyword} was generated by Insytra's AI. ` +
      `It provides an overview of the market based on available data at the time of creation. ` +
      `For a more in-depth analysis or customized data, please contact our team of analysts.`,
    margin,
    y,
    contentWidth,
    6,
  )
  y += 15

  // Ajouter le pied de page
  pdf.setFontSize(10)
  pdf.setTextColor(100, 100, 100)
  pdf.text("© Insytra - AI Generated Report", margin, pageHeight - 10)

  // Télécharger le PDF
  pdf.save(`Report_${keyword.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`)
}
