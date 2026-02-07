'use client'

import { useState } from 'react'
import { useDID } from '../lib/did'

export default function DIDConnect() {
  const { did, connect, disconnect, isConnecting } = useDID()

  return (
    <div className="space-y-4">
      {!did ? (
        <>
          <p className="text-sm text-gray-600">
            Connect your DID to interact with the reputation ledger.
          </p>
          <button
            onClick={connect}
            disabled={isConnecting}
            className="btn btn-primary w-full disabled:opacity-50"
          >
            {isConnecting ? 'Connecting...' : 'Connect DID'}
          </button>
          <p className="text-xs text-gray-500">
            A keypair will be generated for you. In production, use a proper wallet.
          </p>
        </>
      ) : (
        <>
          <div className="p-3 bg-trust-50 rounded border border-trust-200">
            <p className="text-xs font-mono text-trust-800 break-all">
              {did}
            </p>
          </div>
          <button
            onClick={disconnect}
            className="btn btn-secondary w-full"
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  )
}
