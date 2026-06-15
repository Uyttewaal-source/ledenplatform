import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from './lib/supabase'

function App() {
  const [email, setEmail] = useState('')
  const [session, setSession] = useState(null)
  const [message, setMessage] = useState('')
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
    } else {
      setMessage('Check je e-mail voor de loginlink.')
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (loading) {
    return <p>Laden...</p>
  }

  if (!isSupabaseConfigured) {
    return (
      <main>
        <h1>Ledenplatform GDO en vSKBN</h1>
        <p>Supabase is nog niet goed geconfigureerd.</p>
        <p>Controleer in Netlify de variabelen VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY.</p>
      </main>
    )
  }

  if (!session) {
    return (
      <main>
        <h1>Ledenplatform GDO en vSKBN</h1>
        <p>Log in met je e-mailadres om toegang te krijgen tot het ledenplatform.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="jouw@email.nl"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <button type="submit">Stuur loginlink</button>
        </form>

        {message && <p>{message}</p>}
      </main>
    )
  }

  return (
    <main>
      <h1>Ledenplatform GDO en vSKBN</h1>
      <p>Je bent ingelogd als:</p>
      <p>{session.user.email}</p>

      <nav>
        <button>Dashboard</button>
        <button>Mijn profiel</button>
        <button>Organisaties</button>
        <button>Werkgroepen</button>
        <button>Bronnen</button>
      </nav>

      <section>
        <h2>Dashboard</h2>
        <p>Welkom op de eerste versie van het ledenplatform.</p>
      </section>

      <button onClick={handleLogout}>Uitloggen</button>
    </main>
  )
}

export default App