import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography, Button, Stack } from "@mui/material";
import { initateCheckout } from "../lib/stripe";
import { decrementQuantity, incrementQuantity } from "../redux/cart.slice";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDispatch, useSelector } from "react-redux";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useSession } from "@supabase/auth-helpers-react";
import toast, {Toaster} from "react-hot-toast";

export default function ProductListComponent() {
  // Extracting cart state from redux store
  const cart = useSelector((state: any) => state.cart);

  // Reference to the dispatch function from redux store
  const dispatch = useDispatch();

  const session = useSession();
  
  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator: number, item: { quantity: number; price: number }) =>
        accumulator + item.quantity * item.price,
      0
    );
  };

  const handleCheckout = () => {
    if(session){
      initateCheckout(cart)
    }

    toast('Please login to checkout the products')
   
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Product&nbsp;(g)</TableCell>
            <TableCell align="right">Quantity&nbsp;(g)</TableCell>
            <TableCell align="right">Actions&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={row.image} height="90" width="65" />{" "}
              </TableCell>
              <TableCell align="right"> ₹ {Number.parseInt(row.price) * 70}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={3}>
                  <IconButton
                    aria-label="increase"
                    onClick={() => dispatch(incrementQuantity(row.id))}
                  >
                    <AddOutlinedIcon />
                   
                  </IconButton>
                  <Typography component="p" > {row.quantity} </Typography>
                  <IconButton
                    aria-label="decrease"
                    onClick={() => dispatch(decrementQuantity(row.id))}
                  >
                    <RemoveOutlinedIcon />
                  </IconButton>
                </Stack>
              </TableCell>
              <Toaster/>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box p={4} textAlign={"right"}>
        <Typography> Grand Total: ₹ {Number.parseInt(getTotalPrice()) * 70} </Typography>
        <Button variant="contained" sx={{marginTop: "1rem"}} onClick={handleCheckout}>Checkout</Button>
      </Box>
    </TableContainer>
  );
}
