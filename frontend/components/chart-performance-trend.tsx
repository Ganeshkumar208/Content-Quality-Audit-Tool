"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface ChartPerformanceTrendProps {
  data: Array<{
    dimension: string
    score: number
  }>
}

export default function ChartPerformanceTrend({ data }: ChartPerformanceTrendProps) {
  const avgScore = Math.round(data.reduce((a, b) => a + b.score, 0) / data.length)
  const maxScore = Math.max(...data.map((d) => d.score))

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="border border-border p-6 shadow-sm hover:shadow-lg transition-all bg-gradient-to-br from-card to-card/50">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-chart-2/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Performance Trend</h3>
              <p className="text-sm text-muted-foreground">Score progression across all dimensions</p>
            </div>
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="dimension"
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                stroke="var(--color-border)"
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                label={{ value: "Score (%)", angle: -90, position: "insideLeft", offset: 10 }}
                stroke="var(--color-border)"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "2px solid var(--color-primary)",
                  borderRadius: "12px",
                  padding: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
                formatter={(value) => [`${value}%`, "Score"]}
                cursor={{ stroke: "var(--color-primary)", strokeWidth: 2 }}
              />
              <ReferenceLine
                y={avgScore}
                stroke="var(--color-muted-foreground)"
                strokeDasharray="5 5"
                label={{
                  value: `Avg: ${avgScore}%`,
                  position: "right",
                  fill: "var(--color-muted-foreground)",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 6, strokeWidth: 2, stroke: "var(--color-card)" }}
                activeDot={{ r: 8, strokeWidth: 2 }}
                isAnimationActive
                animationDuration={1800}
                animationEasing="easeInOut"
                fillOpacity={1}
                fill="url(#lineGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{avgScore}%</p>
              <p className="text-xs text-muted-foreground mt-1">Average</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{maxScore}%</p>
              <p className="text-xs text-muted-foreground mt-1">Highest</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{data.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Dimensions</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
