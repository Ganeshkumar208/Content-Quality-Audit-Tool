"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, ChevronDown } from "lucide-react"

interface OverallScoreProps {
  score: number
  alerts?: number
  maxScore?: number
  onArrowClick?: () => void
}

export default function OverallScore({ score, alerts = 3, maxScore = 100, onArrowClick }: OverallScoreProps) {
  const gaugeData = [
    { name: "score", value: score },
    { name: "remaining", value: 100 - score },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 85) return "#10b981"
    if (score >= 70) return "#3b82f6"
    if (score >= 50) return "#f59e0b"
    if (score >= 30) return "#ef4444"
    return "#dc2626"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Excellent"
    if (score >= 70) return "Very Good"
    if (score >= 50) return "Good"
    if (score >= 30) return "Fair"
    return "Needs Improvement"
  }

  const roundedScoreNumber = Number(score.toFixed(2))
  const roundedScoreString = score.toFixed(2)



  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="w-full h-screen flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12">
        {/* Header with greeting */}
        <motion.div
          className="text-center mb-8 w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">Hey User 👋</h2>
          <motion.div
            className="flex items-center justify-center gap-2 text-sm text-orange-600 bg-orange-50 rounded-lg py-2 px-3 w-fit mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Check Last Update 9th Oct</span>
          </motion.div>
        </motion.div>

        {/* Gauge Chart */}
        <motion.div
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={70}
                outerRadius={110}
                dataKey="value"
                stroke="none"
                isAnimationActive
                animationDuration={1500}
                animationEasing="ease-out"
              >
                <Cell fill={getScoreColor(roundedScoreNumber)} />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="text-center mb-8 -mt-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-7xl sm:text-8xl md:text-9xl font-bold text-foreground">{roundedScoreString}°/o</p>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 font-medium">
            Your IT Score {roundedScoreString}/{maxScore} - {getScoreLabel(roundedScoreNumber)}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            variant="default"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 sm:px-8"
            size="sm"
          >
            Devices
          </Button>
          <Button variant="outline" className="rounded-full px-6 sm:px-8 bg-transparent" size="sm">
            Apps
          </Button>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-4 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm text-muted-foreground">Check Last Update 9th Oct</p>
          <motion.button
            onClick={onArrowClick}
            className="text-orange-600 hover:text-orange-700 transition-colors cursor-pointer focus:outline-none"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
