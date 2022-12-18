import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import AuthComponent from "../components/auth";
import supabase from "../lib/supabase";

const Auth = () => {
  return (
   <AuthComponent/>
  );
};

export default Auth;
