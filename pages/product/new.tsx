import { Button, Stack, TextField, Toolbar } from "@mui/material";
import React from "react";
import supabase from "../../lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import AdminNavbar from "../../components/adminNavbar";
import { useRouter } from "next/router";

const New = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [imageUrl, setImageUrl] = React.useState("");

  const router = useRouter();

  const handleCreate = async () => {
    console.log(name, description, price, imageUrl);

    try {
      const { data, error } = await supabase
        .from("products")
        .insert({ name, image: imageUrl, price, description })
        .select();
      console.log(error);

      if (data) {
        router.push('/products_admin')
      }

      if (error) {
        toast(error.details);
      }
    } catch (e) {
      toast("something went wrong");
      console.log(e);
    }
  };

  return (
    <>
      <AdminNavbar />
      <Toolbar />
      <Stack spacing={4} maxWidth="30%" margin={"0 auto"} pt={8}>
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          maxRows={6}
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="image url"
          variant="outlined"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <TextField
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value as any)}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />

        <Button variant="contained" onClick={handleCreate}>
          Create a product
        </Button>
        <Toaster />
      </Stack>
    </>
  );
};

export default New;
