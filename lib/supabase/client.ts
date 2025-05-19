import { createClient } from "@supabase/supabase-js"

// Créer un singleton pour le client Supabase côté client
let supabaseClient: ReturnType<typeof createClient> | null = null
let supabaseAdminClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (supabaseClient === null) {
    console.log('[SUPABASE] Creating new client instance')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('[SUPABASE] Missing environment variables', { 
        hasUrl: !!supabaseUrl, 
        hasKey: !!supabaseKey 
      })
    }
    
    supabaseClient = createClient(supabaseUrl, supabaseKey)
    console.log('[SUPABASE] Client created successfully')
  } else {
    console.log('[SUPABASE] Using existing client instance')
  }
  return supabaseClient
}

// Nouveau client avec la clé de service pour contourner les RLS
export function getSupabaseAdminClient() {
  if (supabaseAdminClient === null) {
    console.log('[SUPABASE] Creating new admin client instance')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[SUPABASE] Missing admin environment variables', { 
        hasUrl: !!supabaseUrl, 
        hasServiceKey: !!supabaseServiceKey,
        env: typeof process.env.SUPABASE_SERVICE_ROLE_KEY,
        // Pour déboguer en environnement serveur uniquement
        serviceKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
        firstChars: process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 10) || ''
      })
      
      // En mode développement, utiliser la clé directement si elle n'est pas accessible via les variables d'environnement
      // Ne faites jamais cela en production !
      if (process.env.NODE_ENV === 'development' && !supabaseServiceKey) {
        console.log('[SUPABASE] Using hardcoded service key for development only')
        const hardcodedServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZmdxeXNocG9hcW9ibWhqY3JhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mzg4MDc0MywiZXhwIjoyMDU5NDU2NzQzfQ.wrDabBAsdu5pfzEQIuW162X9nj635sm8mh9enhNQyzA"
        supabaseAdminClient = createClient(supabaseUrl, hardcodedServiceKey)
        console.log('[SUPABASE] Admin client created successfully with hardcoded key')
        return supabaseAdminClient
      }
    }
    
    supabaseAdminClient = createClient(supabaseUrl, supabaseServiceKey)
    console.log('[SUPABASE] Admin client created successfully')
  } else {
    console.log('[SUPABASE] Using existing admin client instance')
  }
  return supabaseAdminClient
}
