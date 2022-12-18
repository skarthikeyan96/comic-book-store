import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import supabase from "../lib/supabase";

const LoginWithMagicLink = () => {
  const [email, setEmail] = useState("");
  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
    }
  };

  return (
    <Stack maxWidth={"30%"} margin="0 auto">
      <TextField
        variant="outlined"
        size="small"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleLogin} variant="contained" sx={{ mt: 2 }}>
        Log in
      </Button>
      <Toaster />
    </Stack>
  );
};

export default LoginWithMagicLink;
