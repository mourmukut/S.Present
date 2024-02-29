import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyTextArea from "../my text area";
import { tree } from "@/types";
import toast from "@/util/toast";
import { useDispatch } from "react-redux";
import { setEditNode } from "@/lib/slices/data";
import { baseurl } from "@/util/url";

const defaultTheme = createTheme();

export default function ({ node,handleClose }: { node: tree,handleClose:()=>void }) {
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const label = data.get("label")?.toString() || "";
    const content = data.get("content")?.toString() || "";
    const updatedNodeParams: tree = {
      ...node,
      content,
      label,
      updatedAt: new Date().toISOString(),
    };

    const updatedNode = await updateTreeApi(updatedNodeParams);
    if (!updatedNode) return;
    handleClose()
    dispatch(setEditNode(updatedNode));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        style={{
          width: "100%",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Section
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="author"
                  label="Author Name"
                  name="author"
                  autoComplete="author"
                />
              </Grid> */}

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  defaultValue={node.label}
                  id="label"
                  label="Section Title"
                  name="label"
                  autoComplete="label"
                />
              </Grid>

              <Grid item xs={12}>
                <MyTextArea defaultValue={node.content} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              className="text-white bg-black"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Chnages
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

async function updateTreeApi(node: tree) {
  try {
    const res = await fetch(`${baseurl}/trees/${node.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parentId: node.parentId,
        label: node.label,
        content: node.content,
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        autherId: node.autherId,
        autherName: node.autherName,
      }),
    });
    const data = await res.json();
    toast("Node added successfully");
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log("Error adding node : ", error);
    toast(String(error));

    return null;
  }
}
