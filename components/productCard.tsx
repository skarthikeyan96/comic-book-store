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

export default function MediaCard(props: any) {
  const { itemData } = props;

  return (
    <Grid container spacing={4}>
      {itemData.map(({ image, name, price, id }: any) => {
        return (
          <Grid item key={id}>
            <Card>
              <CardMedia component="img" image={image} alt={name} />
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
                    $ {price}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" disableRipple>
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
