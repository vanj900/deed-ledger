'use client'

import { useDIDAuth } from '../../context/DIDContext'

export default function DIDConnect() {
  const { did, isAuthenticated, loading, loginWithKeypair, loginWithWallet, logout, address } = useDIDAuth()

  return (
    <div className="space-y-4">
      {!isAuthenticated ? (
        <>
          <p className="text-sm text-gray-600">
            Connect your DID to interact with the reputation ledger.
          </p>
          <button
            onClick={loginWithKeypair}
            disabled={loading}
            className="btn btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Connecting...' : '🔑 Login with Pure Keypair (recommended)'}
          </button>
          <button
            onClick={loginWithWallet}
            disabled={loading}
            className="btn btn-secondary w-full disabled:opacity-50"
          >
            {loading ? 'Connecting...' : '💰 Connect Wallet (did:pkh)'}
          </button>
          <p className="text-xs text-gray-500">
            Keypair: sovereign, effort-based, no third-party required.
          </p>
        </>
      ) : (
        <>
          <div className="p-3 bg-trust-50 rounded border border-trust-200">
            <p className="text-xs font-semibold text-trust-700 mb-1">Connected DID</p>
            <p className="text-xs font-mono text-trust-800 break-all">
              {did?.id}
            </p>
            {address && (
              <p className="text-xs text-trust-600 mt-1">
                Wallet: {address.slice(0, 6)}…{address.slice(-4)}
              </p>
            )}
          </div>
          <button
            onClick={logout}
            className="btn btn-secondary w-full"
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  )
}
