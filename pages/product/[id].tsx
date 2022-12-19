import { Grid, Toolbar, Typography, Stack, Button } from "@mui/material";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Navbar from "../../components/navbar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
const ComicBook = (props: any) => {


  const data = props.product.data[0];


  const dispatch = useDispatch();

  const handleClick = (item: any) => {
    dispatch(addToCart(data));
  };
  return (
    <>
      <Navbar />
      <Toolbar />
      <Grid container p={3}>
        <Grid item xs={12}>
          <img
            src={data.image}
            alt={data.name}
            style={{ width: "20%", maxWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography component="h1" fontWeight="bold">
            {data.name}
          </Typography>
          <Typography component="p" paddingTop={2}>
            {data.description}
          </Typography>

          <Typography component="span" paddingTop={2} fontSize="2rem">
            ₹ {Number.parseInt(data.price) * 70}
          </Typography>
          <Stack direction="row" spacing={4} paddingTop={4}>
            <Button
              sx={{ fontWeight: "bold" }}
              onClick={handleClick}
              startIcon={<ShoppingCartOutlinedIcon />}
              variant="contained"
            >
              Add to cart
            </Button>
          </Stack>
        </Grid>
      </Grid>
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

export default ComicBook;
