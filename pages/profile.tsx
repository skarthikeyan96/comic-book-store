import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { GetServerSidePropsContext } from "next"

const Profile = () => {
    return(
        <> Profile </>
    )
}


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx)
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession()
  
    console.log(session)
    if (!session)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
  
    return {
      props: {
        initialSession: session,
        user: session.user,
      },
    }
  }

  
export default Profile