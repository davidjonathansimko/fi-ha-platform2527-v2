'use client'

import React from 'react'
import { User } from '@supabase/supabase-js'
import { isAdmin } from '@/lib/admin'

interface AdminPanelProps {
  user: User
}

export default function AdminPanel({ user }: AdminPanelProps) {
  if (!isAdmin(user.email || '')) {
    return null // Don't show admin panel for non-admin users
  }

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 w-80 z-50">
      {/* Glassmorphism Admin Panel */}
      <div className="bg-gradient-to-br from-green-900/20 via-gray-900/30 to-green-800/20 backdrop-blur-xl rounded-2xl border border-green-500/30 shadow-2xl overflow-hidden">
        {/* Animated Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-transparent to-green-600/20 rounded-2xl blur-sm"></div>
        
        <div className="relative p-6">
          {/* Header with Pulsing Effect */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-30"></div>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent font-[Tektur,monospace]">
                🔧 ADMIN CONTROL
              </h2>
            </div>
          </div>
          
          {/* User Info with Glass Effect */}
          <div className="mb-6 p-4 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-green-500/20">
            <div className="text-sm text-green-300 font-mono">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 font-semibold">Administrator</span>
              </div>
              <div className="mt-1 text-gray-300 text-xs">{user.email}</div>
            </div>
          </div>
          
          {/* Control Cards with Hover Effects */}
          <div className="space-y-3">
            <div className="group p-4 bg-gradient-to-r from-gray-900/50 to-green-900/30 backdrop-blur-sm rounded-xl border border-green-600/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📊</span>
                </div>
                <div>
                  <h3 className="text-green-400 font-semibold text-sm">Analytics Control</h3>
                  <p className="text-gray-400 text-xs">Full system insights</p>
                </div>
              </div>
            </div>
            
            <div className="group p-4 bg-gradient-to-r from-gray-900/50 to-green-900/30 backdrop-blur-sm rounded-xl border border-green-600/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">👥</span>
                </div>
                <div>
                  <h3 className="text-green-400 font-semibold text-sm">User Management</h3>
                  <p className="text-gray-400 text-xs">Control all accounts</p>
                </div>
              </div>
            </div>
            
            <div className="group p-4 bg-gradient-to-r from-gray-900/50 to-green-900/30 backdrop-blur-sm rounded-xl border border-green-600/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">⚙️</span>
                </div>
                <div>
                  <h3 className="text-green-400 font-semibold text-sm">System Config</h3>
                  <p className="text-gray-400 text-xs">Platform settings</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Status Footer */}
          <div className="mt-6 pt-4 border-t border-green-500/20">
            <div className="text-xs text-green-300 font-mono opacity-75 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span>ADMIN ACCESS ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
