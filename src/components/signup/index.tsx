"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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

const defaultTheme = createTheme();

export default function () {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      id: getRandomNumber().toString(),
      email: data.get("email")?.toString() || "",
      password: data.get("password")?.toString() || "",
      firstName: data.get("firstName")?.toString() || "",
      lastName: data.get("lastName")?.toString() || "",
      role: data.get("role")?.toString() || "",
    };
    const params = Object.keys(formData)
    for(let param in params){
      if(!param){
        toast(`Please fill all the fields`)
        return
      }
    }
    const success = await addUserApi(formData)
    if(!success){
      // TODO
    }
    console.log(formData);
  };

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-select-currency"
                  select
                  name="role"
                  label="Select Role"
                  defaultValue="reader"
                  helperText="Please select your role"
                >
                  {[
                    {
                      value: "reader",
                      label: "Reader",
                    },
                    {
                      value: "author",
                      label: "author",
                    },
                    {
                      value: "collaborator",
                      label: "collaborator",
                    },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              className="text-white bg-black"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
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
    const resFind = await fetch(`http://localhost:5000/users?email=${email}`);
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
    const resCreate = await fetch("http://localhost:5000/users", {
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
