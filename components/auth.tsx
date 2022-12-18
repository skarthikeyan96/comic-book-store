import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Box } from '@mui/material'
import Products from '../pages/products'

const AuthComponent = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  console.log(session)
  return (
    <Box  sx={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
       <Products session={session}/>
      )}
    </Box>
  )
}

export default AuthComponent