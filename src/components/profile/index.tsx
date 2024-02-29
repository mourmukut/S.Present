"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { User } from "@/types";
import toast from "@/util/toast";
import { getRandomNumber } from "@/util/helper";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { DataState } from "@/lib/slices/data";
import { baseurl } from "@/util/url";

const defaultTheme = createTheme();

export default function () {

  const dataState = useSelector((state: RootState) => state.data);


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <h4>{dataState.user.email}</h4>
              </Grid>
            </Grid>
         
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

async function getUserByEmail(email: string) {
  try {
    const resFind = await fetch(`${baseurl}/users?email=${email}`);
    const dataFind = await resFind.json();
    console.log("data", dataFind);
    return dataFind.length
  } catch (error) {
    console.log("Error while signup : ", error);
    toast(String(error));
    return null;
  }
}

async function addUserApi(user: User) {
  try {
    console.log("hey inside addUserApi")
    if (await getUserByEmail(user.email)) {
      toast("Email already exists!, please try another email");

      return null;
    }
    const resCreate = await fetch(`${baseurl}/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const dataCreated = await resCreate.json();
    console.log("dataCreated : ",dataCreated)
    toast("User created successfully");
    return dataCreated;
  } catch (error) {
    console.log("Error while signup : ", error);
    toast(String(error));
    return null;
  }
}
