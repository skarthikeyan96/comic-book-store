import * as React from "react";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  IconButton,
  Toolbar,
  LinearProgress,
} from "@mui/material";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import AdminNavbar from "../components/adminNavbar";
import supabase from "../lib/supabase";

import CircularProgress from "@mui/material/CircularProgress";

const ViewProducts = (props: any) => {
  const router = useRouter();

  const [products, setProducts] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (!error) {
      toast("deletion success");
    }
  };

  const handleViewEditForm = (id: number) => {
    router.push(`/product/edit/${id}`);
  };

  React.useEffect(() => {
    (async () => {
      // disabled the RLS for products table
      setLoading(true);
      const products = await supabase.from("products").select("*");
      setProducts(products.data);
      setLoading(false);
    })();
  }, []);
  return (
    <>
      <AdminNavbar />
      <Toolbar />

      {loading && products.length === 0 ? (
        <CircularProgress />
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "90%", margin: "0 auto", marginTop: "4rem" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Product</TableCell>
                <TableCell align="right">description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row: any) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img src={row.image} height="90" width="65" />{" "}
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    ₹ {Number.parseInt(row.price) * 70}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell>
                    <Stack direction="row">
                      <IconButton onClick={() => handleViewEditForm(row.id)}>
                        <EditOutlined />
                      </IconButton>

                      <IconButton onClick={() => handleDelete(row.id)}>
                        <DeleteForeverOutlined />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Toaster />
        </TableContainer>
      )}
    </>
  );
};

export default ViewProducts;
