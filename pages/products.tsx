import Navbar from "../components/navbar";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import Box from "@mui/material/Box";
import { Grid, ImageList, Toolbar } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { useSession } from "@supabase/auth-helpers-react";
import React from "react";
import ProductCard from "../components/productCard";

const Products = (props: any) => {
  const session = useSession();

  console.log(props);
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />

        <ProductCard itemData={props.products.data} />
      </Box>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session

  // disabled the RLS for products table
  const products = await supabase.from("products").select("*");

  return {
    props: {
      products,
    },
  };
};

export default Products;
