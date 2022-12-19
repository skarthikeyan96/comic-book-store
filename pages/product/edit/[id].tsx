import { Button, Stack, TextField, Toolbar } from "@mui/material";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import supabase from "../../../lib/supabase";
import { useRouter } from "next/router";
import AdminNavbar from "../../../components/adminNavbar";

const Edit = (props: any) => {
  const data = props.product.data[0];

  const [name, setName] = React.useState(data.name || "");
  const [description, setDescription] = React.useState(data.description || "");
  const [price, setPrice] = React.useState(data.price || 0);
  const [imageUrl, setImageUrl] = React.useState(data.image || "");
  const router = useRouter();

  const handleUpdate = async () => {

    try {
      const { error } = await supabase
        .from("products")
        .update({ name, image: imageUrl, price, description })
        .eq("id", router.query.id);
      console.log(error);

      if (!error) {
        toast("product updated succesfully");
        router.push("/products_admin");
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
        <Link href="/products_admin"> Back to Products </Link>

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

        <Button variant="contained" onClick={handleUpdate}>
          Edit a product
        </Button>
        <Toaster />
      </Stack>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session

  // disabled the RLS for products table
  const product = await supabase
    .from("products")
    .select("*")
    .eq("id", ctx.query.id);

  return {
    props: {
      product,
    },
  };
};

export default Edit;
