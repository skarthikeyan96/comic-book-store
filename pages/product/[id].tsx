import { Grid, Toolbar, Typography,Stack,Button } from "@mui/material";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import Navbar from "../../components/navbar";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { ArrowRight } from "@mui/icons-material";
const ComicBook = (props: any) => {
  const session = useSession();

  console.log(props.product);

  const data = props.product.data[0];

  return (
    <>
      <Navbar />
      <Toolbar />
      <Grid container   p={3}>
        <Grid item xs={12}>
          <img src={data.image} alt={data.name} />
        </Grid>

        <Grid item xs={12}>
          <Typography component="h1" fontWeight="bold">{data.name}</Typography>
          <Typography component="p" paddingTop={2}>
            {data.description}
          </Typography>

          <Typography component="span" paddingTop={2} fontSize="2rem">
            $ {data.price}
          </Typography>
          <Stack direction="row" spacing={4} paddingTop={4}> 
            <Button sx={{fontWeight:"bold"}} startIcon={<ShoppingCartOutlinedIcon/> } variant="contained"> 
              Add to cart
            </Button>
            <Button  sx={{fontWeight:"bold"}} variant="outlined" endIcon={<ArrowRight/>}> 
              Buy now
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
