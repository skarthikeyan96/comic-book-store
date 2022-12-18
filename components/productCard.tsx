import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
  ListSubheader,
  Stack,
} from "@mui/material";
import NextLink from "next/link";
import { InfoRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";


import { addToCart } from "../redux/cart.slice";

export default function MediaCard(props: any) {
  const { itemData } = props;

  const dispatch = useDispatch();

  const handleClick = (item:any) => {
    dispatch(addToCart(item));
  };


  return (
    <Grid container spacing={4}>
      {itemData.map((item: any) => {
        const { image, name, price, id } = item
        return (
          <Grid item key={id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia component="img" height="140" image={image} alt={name} />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                ></Typography>
                  <Link href={`/product/${id}`} component={NextLink}> 
                  {name} 

                  </Link>
                <Stack direction="row">
                  <Typography fontWeight={800} fontSize="1.5rem">
                  ₹ {Number.parseInt(price) * 70 }
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" disableRipple  onClick={() => handleClick(item)}>
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
