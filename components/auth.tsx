import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Box } from '@mui/material'
import Products from '../pages/products'

const AuthComponent = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  console.log(session)
  return (
    <Box maxWidth="30%" paddingTop={4}margin="0 auto" sx={{ minHeight: '100vh' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }}/>
      ) : (
       <Products session={session}/>
      )}
    </Box>
  )
}

export default AuthComponent