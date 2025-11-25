"use client"

import { useState } from "react"
import AuditForm from "@/components/audit-form"
import AuditResults from "@/components/audit-results"
import type { AuditData } from "@/lib/types"

interface AuditRequest {
  content?: string;
  url?: string;
  keyword?: string;
}

export default function Home() {
  const [auditData, setAuditData] = useState<AuditData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: AuditRequest) => {
    setIsLoading(true)
    console.log("Sending data to backend:", data) // Debug log

    try {
      const response = await fetch("http://localhost:5008/api/audit/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API request failed: ${errorText}`)
      }

      const result: AuditData = await response.json()
      setAuditData(result)
    } catch (error) {
      console.error("Audit failed:", error)
      // Show error to user
      alert(`Audit failed: ${error}`)
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