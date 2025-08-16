'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { isAdmin } from '@/lib/admin'

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showProfile && !target.closest('.user-profile-dropdown')) {
        setShowProfile(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      subscription.unsubscribe()
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfile])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setShowProfile(false)
  }

  if (!user) return null

  return (
    <div className="fixed top-4 right-32 z-[100] user-profile-dropdown">

  return (
    <div className="fixed top-4 right-32 z-[100] user-profile-dropdown">>
      {/* User Avatar */}
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center text-white font-bold font-[Tektur,monospace] text-sm hover:scale-110 transition-transform duration-200 shadow-lg"
      >
        {user.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span>{(user.email?.[0] || user.user_metadata?.full_name?.[0] || 'U').toUpperCase()}</span>
        )}
      </button>

      {/* Profile Dropdown */}
      {showProfile && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[105]" onClick={() => setShowProfile(false)}></div>
          
          {/* Dropdown */}
          <div className="absolute top-12 right-0 w-64 bg-gray-800/95 backdrop-blur-lg rounded-xl border border-gray-700 shadow-2xl overflow-hidden z-[110]">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-green-700/20 to-green-800/20 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center text-white font-bold">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-lg">{(user.email?.[0] || user.user_metadata?.full_name?.[0] || 'U').toUpperCase()}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-white font-medium font-[Tektur,monospace] text-sm truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                  </p>
                  {isAdmin(user.email || '') && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-600 text-white">
                      ADMIN
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-xs font-[Tektur,monospace] truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 space-y-3">
            <div className="text-xs text-gray-400 font-[Tektur,monospace]">
              <div className="flex justify-between mb-1">
                <span>Provider:</span>
                <span className="text-green-400 capitalize">
                  {user.app_metadata?.provider || 'email'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Signed in:</span>
                <span className="text-gray-400">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last login:</span>
                <span className="text-green-400">
                  {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full p-3 text-left text-red-400 hover:bg-red-600/10 hover:text-red-300 transition-colors duration-200 font-[Tektur,monospace] text-sm flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
        </>
      )}
    </div>
  )
}
