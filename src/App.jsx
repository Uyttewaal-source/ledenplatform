import './App.css'
import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from './lib/supabase'

function BrandHeader() {
  return (
    <div className="brand-header">
      <div className="brand-logos">
        <img
          src="/logos/gdo-logo.png"
          alt="Vereniging GDO"
          className="brand-logo brand-logo--gdo"
        />
        <img
          src="/logos/vskbn-logo.png"
          alt="vSKBN"
          className="brand-logo brand-logo--vskbn"
        />
      </div>

      <div>
        <p className="eyebrow">GDO & vSKBN</p>
        <h1>Ledenplatform</h1>
      </div>
    </div>
  )
}

function App() {
  const [email, setEmail] = useState('')
  const [session, setSession] = useState(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSession() {
      if (!isSupabaseConfigured) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setMessage(error.message)
        setMessageType('error')
      } else {
        setSession(data.session)
      }

      setLoading(false)
    }

    loadSession()

    if (!isSupabaseConfigured) return

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function handleLogin(event) {
    event.preventDefault()
    setMessage('')

    if (!email) {
      setMessage('Vul je e-mailadres in.')
      setMessageType('error')
      return
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    })

    if (error) {
      setMessage(error.message)
      setMessageType('error')
    } else {
      setMessage('Check je e-mail voor de loginlink.')
      setMessageType('success')
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (loading) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <p>Laden...</p>
        </section>
      </main>
    )
  }

  if (!isSupabaseConfigured) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <BrandHeader />

          <p className="intro">
            Het platform is nog niet volledig geconfigureerd.
          </p>

          <p className="message message--error">
            Controleer in Netlify de variabelen VITE_SUPABASE_URL en
            VITE_SUPABASE_ANON_KEY.
          </p>
        </section>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <BrandHeader />

          <p className="intro">
            Log in met je e-mailadres om toegang te krijgen tot het ledenplatform.
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="jouw@email.nl"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <button type="submit">Stuur loginlink</button>
          </form>

          {message && (
            <p className={messageType === 'error' ? 'message message--error' : 'message'}>
              {message}
            </p>
          )}
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <BrandHeader />

          <div className="user-box">
            <p>Ingelogd als</p>
            <strong>{session.user.email}</strong>
            <br />
            <button className="logout-button" onClick={handleLogout}>
              Uitloggen
            </button>
          </div>
        </header>

        <nav className="app-nav">
          <button>Dashboard</button>
          <button>Mijn profiel</button>
          <button>Organisaties</button>
          <button>Werkgroepen</button>
          <button>Bronnen</button>
        </nav>

        <section className="content-card">
          <h2>Welkom op het ledenplatform</h2>
          <p>
            Dit is de eerste werkende versie van het ledenplatform voor GDO en
            vSKBN. De komende stappen zijn profielbeheer, organisaties,
            werkgroepen en bronnen.
          </p>
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-card">
            <span className="card-label">Profiel</span>
            <h2>Mijn profiel</h2>
            <p>Vul straks je functie, organisatie en expertise aan.</p>
          </article>

          <article className="dashboard-card">
            <span className="card-label">Netwerk</span>
            <h2>Organisaties</h2>
            <p>Bekijk straks leden van GDO en vSKBN.</p>
          </article>

          <article className="dashboard-card">
            <span className="card-label">Samenwerken</span>
            <h2>Werkgroepen</h2>
            <p>Sluit straks aan bij thematische groepen en projecten.</p>
          </article>

          <article className="dashboard-card">
            <span className="card-label">Kennis</span>
            <h2>Bronnen</h2>
            <p>Vind straks documenten, links en gedeelde kennis.</p>
          </article>
        </section>
      </div>
    </main>
  )
}

export default App