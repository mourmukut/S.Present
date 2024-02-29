"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import toast from '@/util/toast';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/slices/data';
import { useRouter } from 'next/navigation';
import CheckForLogin from '@/components/check for login';
import { baseurl } from '@/util/url';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function () {

  const dispatch = useDispatch()
  const navigate = useRouter()
  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString() || ""
    const password = data.get('password')?.toString() || ""
    const user = await getUserByEmailAndPassword(email,password)
    if(!user) return
    dispatch(setUser(user))
    localStorage.setItem("user",JSON.stringify(user))
    navigate.push("/")
  };

  return (
    <CheckForLogin forLoginPage={true}>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
             
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
          
            </Grid>
            <Button
              type="submit"
              fullWidth
              className='text-white bg-black'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </CheckForLogin>
  );
}

async function getUserByEmailAndPassword(email: string,password: string) {
  try {
    const resFind = await fetch(`${baseurl}/users?email=${email}&password=${password}`);
    const dataFind = await resFind.json();
    console.log("data", dataFind);
    if(!dataFind.length){
      toast("invalid credentials")
      return
    }
    const user = dataFind[0]
    return user
  } catch (error) {
    console.log("Error while login : ", error);
    toast(String(error));
    return null;
  }
}