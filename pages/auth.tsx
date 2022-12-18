import { Box, Toolbar } from "@mui/material";
import { useSession } from "@supabase/auth-helpers-react";
import Navbar from "../components/navbar";
import LoginWithMagicLink from "../components/loginWithMagicLink"

const Auth = () => {
  return (
    <>
      <Navbar/>
      <Toolbar />
      <Box p={3}> 
        <LoginWithMagicLink/>
      </Box>
    </>
  );
};

export default Auth;
