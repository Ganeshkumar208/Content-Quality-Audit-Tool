"use client"

import { useState } from "react"
import AuditForm from "@/components/audit-form"
import AuditResults from "@/components/audit-results"
import type { AuditData } from "@/lib/types"

export default function Home() {
  const [auditData, setAuditData] = useState<AuditData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (content: string, keyword: string) => {
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:5008/api/audit/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          keyword,
        }),
      })

      if (!response.ok) {
        throw new Error("API request failed")
      }

      const data: AuditData = await response.json()

      setAuditData(data)
    } catch (error) {
      console.error("Audit failed:", error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-background">
      {!auditData ? (
        <AuditForm onSubmit={handleSubmit} isLoading={isLoading} />
      ) : (
        <AuditResults data={auditData} onBack={() => setAuditData(null)} />
      )}
    </div>
  )
}
