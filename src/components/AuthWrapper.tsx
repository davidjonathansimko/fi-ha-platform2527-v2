'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { User } from '@supabase/supabase-js'

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl font-[Tektur,monospace]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          Loading...
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthPage />
  }

  return <>{children}</>
}

function AuthPage() {
  const [authMode, setAuthMode] = useState<'sign_in' | 'sign_up'>('sign_in')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            <h1 className="text-4xl sm:text-5xl font-bold font-[Tektur,monospace] mb-2">
              FI-HA
            </h1>
            <p className="text-xl font-[Tektur,monospace]">Platform</p>
          </div>
          <p className="text-gray-300 mt-4 text-sm font-[Tektur,monospace]">
            Multilingual Business Analytics Platform
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white font-[Tektur,monospace] mb-2">
              {authMode === 'sign_in' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400 text-sm font-[Tektur,monospace]">
              {authMode === 'sign_in' 
                ? 'Sign in to access your analytics dashboard' 
                : 'Join us to start analyzing business data'
              }
            </p>
          </div>

          {/* Supabase Auth Component */}
          <div className="auth-container">
            <Auth
              supabaseClient={supabase}
              view={authMode}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#10b981',
                      brandAccent: '#059669',
                      brandButtonText: 'white',
                      defaultButtonBackground: '#374151',
                      defaultButtonBackgroundHover: '#4b5563',
                      defaultButtonBorder: '#6b7280',
                      defaultButtonText: 'white',
                      dividerBackground: '#6b7280',
                      inputBackground: '#1f2937',
                      inputBorder: '#6b7280',
                      inputBorderHover: '#10b981',
                      inputBorderFocus: '#10b981',
                      inputText: 'white',
                      inputLabelText: '#d1d5db',
                      inputPlaceholder: '#9ca3af',
                      messageText: '#ef4444',
                      messageTextDanger: '#ef4444',
                      anchorTextColor: '#10b981',
                      anchorTextHoverColor: '#059669',
                    },
                    space: {
                      spaceSmall: '4px',
                      spaceMedium: '8px',
                      spaceLarge: '16px',
                      labelBottomMargin: '8px',
                      anchorBottomMargin: '4px',
                      emailInputSpacing: '4px',
                      socialAuthSpacing: '4px',
                      buttonPadding: '10px 15px',
                      inputPadding: '10px 15px',
                    },
                    fontSizes: {
                      baseBodySize: '14px',
                      baseInputSize: '14px',
                      baseLabelSize: '14px',
                      baseButtonSize: '14px',
                    },
                    fonts: {
                      bodyFontFamily: `'Tektur', monospace`,
                      buttonFontFamily: `'Tektur', monospace`,
                      inputFontFamily: `'Tektur', monospace`,
                      labelFontFamily: `'Tektur', monospace`,
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '8px',
                      buttonBorderRadius: '8px',
                      inputBorderRadius: '8px',
                    },
                  },
                },
                className: {
                  anchor: 'font-[Tektur,monospace] text-green-400 hover:text-green-300',
                  button: 'font-[Tektur,monospace] bg-green-600 hover:bg-green-700 transition-colors duration-200',
                  container: 'font-[Tektur,monospace]',
                  divider: 'font-[Tektur,monospace] text-gray-400',
                  input: 'font-[Tektur,monospace] bg-gray-700 border-gray-600 text-white placeholder-gray-400',
                  label: 'font-[Tektur,monospace] text-gray-300',
                  loader: 'text-green-400',
                  message: 'font-[Tektur,monospace] text-red-400',
                },
              }}
              providers={['github']}
              redirectTo={`${window.location.origin}/auth/callback`}
              onlyThirdPartyProviders={false}
              magicLink={true}
              showLinks={true}
            />
          </div>

          {/* Toggle Auth Mode */}
          <div className="text-center mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={() => setAuthMode(authMode === 'sign_in' ? 'sign_up' : 'sign_in')}
              className="text-green-400 hover:text-green-300 font-[Tektur,monospace] text-sm transition-colors duration-200"
            >
              {authMode === 'sign_in' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="text-gray-400 font-[Tektur,monospace]">
              <div className="text-green-400 mb-1">🌍</div>
              14 Languages
            </div>
            <div className="text-gray-400 font-[Tektur,monospace]">
              <div className="text-blue-400 mb-1">📊</div>
              Analytics Tools
            </div>
            <div className="text-gray-400 font-[Tektur,monospace]">
              <div className="text-purple-400 mb-1">📱</div>
              Mobile Ready
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
