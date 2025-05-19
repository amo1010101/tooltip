import { View, Text, StyleSheet } from "react-native"
import { ProgressBar } from "./ProgressBar"
import { type LifePillar, calculateLifeBalance } from "../../shared"

interface LifeCompassProps {
  pillars: LifePillar[]
}

export function LifeCompass({ pillars }: LifeCompassProps) {
  const overallScore = calculateLifeBalance(pillars)

  return (
    <View style={styles.container}>
      {pillars.map((pillar) => (
        <View key={pillar.id} style={styles.pillarContainer}>
          <View style={styles.pillarHeader}>
            <Text style={styles.pillarName}>{pillar.name}</Text>
            <Text style={styles.pillarValue}>{pillar.value}%</Text>
          </View>
          <ProgressBar progress={pillar.value} color={pillar.color} height={8} />
        </View>
      ))}

      <View style={styles.overallContainer}>
        <View style={styles.pillarHeader}>
          <Text style={styles.overallTitle}>Life Balance Score</Text>
          <Text style={styles.overallValue}>{overallScore}%</Text>
        </View>
        <ProgressBar progress={overallScore} color="#14b8a6" height={12} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  pillarContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pillarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  pillarName: {
    fontSize: 14,
    fontWeight: "500",
  },
  pillarValue: {
    fontSize: 14,
    color: "#64748b",
  },
  overallContainer: {
    marginTop: 16,
    backgroundColor: "#f0fdfa",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccfbf1",
  },
  overallTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#115e59",
  },
  overallValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#115e59",
  },
})
