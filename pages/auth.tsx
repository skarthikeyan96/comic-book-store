import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import AuthComponent from "../components/auth";
import supabase from "../lib/supabase";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Navbar from "../components/navbar";
import LoginWithMagicLink from "../components/LoginWithMagicLink"

const Auth = () => {
  const session = useSession();
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
