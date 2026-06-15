import { useEffect } from 'react'
import { supabase } from './lib/supabase'

function App() {
  useEffect(() => {
    async function testSupabase() {
      const { data, error } = await supabase.auth.getSession()

      console.log('Supabase sessie:', data)
      console.log('Supabase fout:', error)
    }

    testSupabase()
  }, [])

  return (
    <main>
      <h1>Ledenplatform GDO & vSKBN</h1>
      <p>Supabase is gekoppeld. De basisapp werkt.</p>
    </main>
  )
}

export default App