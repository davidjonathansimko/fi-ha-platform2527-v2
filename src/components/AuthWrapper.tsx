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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-800 flex items-center justify-center">
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
  const [language, setLanguage] = useState<'de' | 'en' | 'tr' | 'fr'>('de')

  // Language options for auth page
  const authLanguages = {
    de: { name: '🇩🇪 Deutsch', welcome: 'Willkommen zurück', create: 'Konto erstellen', signin: 'Anmelden', signup: 'Registrieren', signText: 'Melden Sie sich an, um auf Ihr Analytics-Dashboard zuzugreifen', createText: 'Treten Sie uns bei, um Geschäftsdaten zu analysieren', noAccount: 'Noch kein Konto? Registrieren', hasAccount: 'Bereits ein Konto? Anmelden', platform: 'Plattform', subtitle: 'Multilingual FI-DAA Hausaufgaben Platform', languages: '14 Sprachen', analytics: 'Analytics Tools', mobile: 'Mobil-Bereit' },
    en: { name: '🇬🇧 English', welcome: 'Welcome Back', create: 'Create Account', signin: 'Sign In', signup: 'Sign Up', signText: 'Sign in to access your analytics dashboard', createText: 'Join us to start analyzing business data', noAccount: "Don't have an account? Sign up", hasAccount: 'Already have an account? Sign in', platform: 'Platform', subtitle: 'Multilingual FI-DAA Hausaufgaben Platform', languages: '14 Languages', analytics: 'Analytics Tools', mobile: 'Mobile Ready' },
    tr: { name: '🇹🇷 Türkçe', welcome: 'Tekrar Hoş Geldiniz', create: 'Hesap Oluştur', signin: 'Giriş Yap', signup: 'Kayıt Ol', signText: 'Analitik panonuza erişmek için giriş yapın', createText: 'İş verilerini analiz etmeye başlamak için bize katılın', noAccount: 'Hesabınız yok mu? Kayıt olun', hasAccount: 'Zaten hesabınız var mı? Giriş yapın', platform: 'Platform', subtitle: 'Multilingual FI-DAA Hausaufgaben Platform', languages: '14 Dil', analytics: 'Analitik Araçları', mobile: 'Mobil Hazır' },
    fr: { name: '�� Français', welcome: 'Bon retour', create: 'Créer un compte', signin: 'Se connecter', signup: "S'inscrire", signText: 'Connectez-vous pour accéder à votre tableau de bord analytique', createText: 'Rejoignez-nous pour commencer à analyser les données commerciales', noAccount: 'Pas de compte? Inscrivez-vous', hasAccount: 'Déjà un compte? Connectez-vous', platform: 'Plateforme', subtitle: 'Multilingual FI-DAA Hausaufgaben Platform', languages: '14 Langues', analytics: 'Outils d\'analyse', mobile: 'Mobile Ready' }
  }

  const currentLang = authLanguages[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-800 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Language Selector with Glassmorphism */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-900/30 backdrop-blur-xl rounded-2xl p-2 border border-green-500/20 shadow-2xl">
              {Object.entries(authLanguages).map(([code, lang]) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-[Tektur,monospace] transition-all duration-300 ${
                    language === code
                      ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Logo/Title Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
            <h1 className="text-4xl sm:text-5xl font-bold font-[Tektur,monospace] mb-2">
              FI-HA
            </h1>
            <p className="text-xl font-[Tektur,monospace]">{currentLang.platform}</p>
          </div>
          <p className="text-gray-300 mt-4 text-sm font-[Tektur,monospace]">
            {currentLang.subtitle}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white font-[Tektur,monospace] mb-2">
              {authMode === 'sign_in' ? currentLang.welcome : currentLang.create}
            </h2>
            <p className="text-gray-400 text-sm font-[Tektur,monospace]">
              {authMode === 'sign_in' ? currentLang.signText : currentLang.createText}
            </p>
          </div>

          {/* Glassmorphism Auth Container */}
          <div className="bg-gray-900/30 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20 shadow-2xl shadow-green-500/5">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white font-[Tektur,monospace] mb-2">
                {authMode === 'sign_in' ? currentLang.welcome : currentLang.create}
              </h2>
              <p className="text-gray-300 text-sm">
                {authMode === 'sign_in' ? currentLang.signText : currentLang.createText}
              </p>
            </div>
            
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
                      defaultButtonBackground: 'rgba(55, 65, 81, 0.6)',
                      defaultButtonBackgroundHover: 'rgba(75, 85, 99, 0.8)',
                      defaultButtonBorder: 'rgba(34, 197, 94, 0.3)',
                      defaultButtonText: 'white',
                      dividerBackground: 'rgba(107, 114, 128, 0.5)',
                      inputBackground: 'rgba(31, 41, 55, 0.6)',
                      inputBorder: 'rgba(34, 197, 94, 0.3)',
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
              {authMode === 'sign_in' ? currentLang.noAccount : currentLang.hasAccount}
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="text-gray-400 font-[Tektur,monospace]">
              <div className="text-green-400 mb-1">🌍</div>
              {currentLang.languages}
            </div>
            <div className="text-gray-400 font-[Tektur,monospace]">
              <div className="text-green-400 mb-1">📊</div>
              {currentLang.analytics}
            </div>
            <div className="text-gray-400 font-[Tektur,monospace]">
              <div className="text-green-400 mb-1">📱</div>
              {currentLang.mobile}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
