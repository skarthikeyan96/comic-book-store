import Box from "@mui/material/Box";
import Navbar from "../components/navbar";
import { Toolbar } from "@mui/material";
import ProductListComponent from "../components/productListComponent";

const Cart = () => {
  return (
    <>
      <Navbar />
      <Toolbar />

      <Box p={3}>
        <ProductListComponent />
      </Box>
    </>
  );
};

export default Cart;
