'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import AdminPanel from '@/components/AdminPanel'
import UserProfile from '@/components/UserProfile'
import SiriusMarketShare from '@/app/SiriusMarketShareClean'

export default function AuthenticatedApp() {
  const [user, setUser] = useState<User | null>(null)

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

    return () => subscription.unsubscribe()
  }, [])

  if (!user) {
    return null // This should never happen since AuthWrapper handles this
  }

  return (
    <div>
      <UserProfile />
      {user && <AdminPanel user={user} />}
      <SiriusMarketShare />
    </div>
  )
}
