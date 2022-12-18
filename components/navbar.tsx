import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Stack
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import NextLink from 'next/link'
const navItems = ["Home", "About", "Contact"];

const Navbar = () => {
  const session = useSession();

  const supabase = useSupabaseClient()
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast("something went wrong");
    }

    router.push("/");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>

        {session && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          // bgcolor: "white",
          // color: "black",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link
              href="/"
              component={NextLink}
              sx={{ textDecoration: "none", color: "#fff",                   fontWeight: "bold",
            }}
            >
              {" "}
              Comic ⚡️ Store{" "}
            </Link>
          </Typography>
          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Link
              href="/products"
              component={NextLink}
              sx={{ textDecoration: "none", color: "#fff",                  fontWeight: "bold",
            }}
            >
              {" "}
              Products{" "}
            </Link>

            {session ? (

              <> 
               <Link
              href="/profile"
              component={NextLink}
              sx={{ textDecoration: "none", color: "#fff",                   fontWeight: "bold",
            }}
              >
              Profile
              </Link>

              <Link
                onClick={handleLogout}
                LinkComponent={NextLink}
                sx={{
                  
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "captialize"
                }}
              >
                Logout
              </Link>
              </>
             
            ) : (
              <Link
                href="/auth"
                component={NextLink}
                sx={{ textDecoration: "none", color: "#fff" }}
              >
                Login
              </Link>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toaster />
    </Box>
  );
};

export default Navbar;
