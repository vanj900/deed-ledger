'use client'

import { useState, useEffect } from 'react'

interface InfluenceStats {
  totalScore: number
  deedCount: number
  status: string
  decayRate: number
}

export default function InfluenceDashboard() {
  const [stats, setStats] = useState<InfluenceStats>({
    totalScore: 0,
    deedCount: 0,
    status: 'invite_pending',
    decayRate: 0.05
  })

  useEffect(() => {
    // Stub: In production, fetch from Ceramic
    setStats({
      totalScore: 42.5,
      deedCount: 3,
      status: 'observer',
      decayRate: 0.05
    })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'node': return 'text-green-700 bg-green-100'
      case 'observer': return 'text-blue-700 bg-blue-100'
      case 'signal_sent': return 'text-yellow-700 bg-yellow-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-trust-600">
            {stats.totalScore.toFixed(1)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Total Score</p>
        </div>
        
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900">
            {stats.deedCount}
          </p>
          <p className="text-sm text-gray-600 mt-1">Deeds</p>
        </div>
        
        <div className="text-center">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(stats.status)}`}>
            {stats.status}
          </span>
          <p className="text-sm text-gray-600 mt-1">Status</p>
        </div>
        
        <div className="text-center">
          <p className="text-3xl font-bold text-orange-600">
            {(stats.decayRate * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600 mt-1">Decay Rate</p>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          ⚠️ <strong>Demurrage active:</strong> Your influence decays {(stats.decayRate * 100).toFixed(1)}% per week without contribution.
          Complete deeds or verify others&apos; work to maintain reputation.
        </p>
      </div>
    </div>
  )
}
