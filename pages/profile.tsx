import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Box from "@mui/material/Box";
import Navbar from "../components/navbar";
import { Toolbar } from "@mui/material";

const Profile = (props: any) => {
  return (
    <>
      <Navbar />
      <Toolbar />
      <Box p={3}>
        <> Profile </>
        {JSON.stringify(props.user)}
      </Box>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default Profile;
