'use client'

import { useState } from 'react'
import { sha256 } from '@noble/hashes/sha256'
import { bytesToHex } from '@noble/hashes/utils'

export default function SignalUpload() {
  const [signal, setSignal] = useState('')
  const [hash, setHash] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create hash proof
      const hashBytes = sha256(new TextEncoder().encode(signal))
      const hashHex = bytesToHex(hashBytes)
      setHash(hashHex)

      // In production: Submit to Ceramic/Nostr
      console.log('Signal hash:', hashHex)
      
      // Reset form
      setSignal('')
    } catch (error) {
      console.error('Error submitting signal:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Upload proof of work or expertise. A hash commitment will be created.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={signal}
          onChange={(e) => setSignal(e.target.value)}
          placeholder="Describe your signal (expertise, project, contribution)..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-transparent"
          rows={4}
          required
        />
        
        <button
          type="submit"
          disabled={!signal || isSubmitting}
          className="btn btn-primary w-full disabled:opacity-50"
        >
          {isSubmitting ? 'Creating Hash...' : 'Submit Signal'}
        </button>
      </form>

      {hash && (
        <div className="p-3 bg-green-50 rounded border border-green-200">
          <p className="text-xs font-semibold text-green-800 mb-1">
            Signal Hash Created
          </p>
          <p className="text-xs font-mono text-green-700 break-all">
            {hash}
          </p>
        </div>
      )}
    </div>
  )
}
