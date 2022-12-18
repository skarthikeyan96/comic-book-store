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
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function TableComponent(props: any) {
  // Extracting cart state from redux store
  const cart = useSelector((state: any) => state.cart);

  // Reference to the dispatch function from redux store
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator: number, item: { quantity: number; price: number }) =>
        accumulator + item.quantity * item.price,
      0
    );
  };

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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box p={4} textAlign={"right"}>
        <Typography> Grand Total: ₹ {Number.parseInt(getTotalPrice()) * 70} </Typography>
        <Button variant="contained" sx={{marginTop: "1rem"}} onClick={() => initateCheckout(cart)}>Checkout</Button>
      </Box>
    </TableContainer>
  );
}
