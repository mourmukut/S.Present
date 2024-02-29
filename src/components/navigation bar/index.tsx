"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setIsLoggedOut } from "@/lib/slices/data";
import { getUserFromLocalStorage } from "@/util/helper";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

const navItemsDefault = [
  {
    name: "Home",
    link: "/",
    action: ""
  },
  {
    name: "About",
    link: "/about",
    action: ""
  },
  {
    name: "Contact",
    link: "/contact",
    action: ""
  },
]

export default function (props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch()
  const navigate = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [navItems, setNavItems] = React.useState(navItemsDefault);
  const dataState = useSelector((state: RootState) => state.data);

  React.useEffect(() => {
    
    if (dataState.isLoggedIn) {
      setNavItems([
        ...navItemsDefault,
        {
          name: "Profile",
          link: "/profile",
          action: ""
        },
        {
          name: "Log out",
          link: "/login",
          action: "logout"
        },
      ]);
    } else {
      setNavItems([
        ...navItemsDefault,
        {
          name: "Login",
          link: "/login",
          action: ""
        },
        {
          name: "Signup",
          link: "/signup",
          action: ""
        },
      ]);
    }
    console.log("dataState : ", dataState);
  }, [dataState]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Cloud Book Writer
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() => {
                if(item.action === 'logout'){
                  dispatch(setIsLoggedOut())
                  localStorage.clear()
                }
                navigate.push(item.link)
              }}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Cloud Book Writer
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                onClick={() => {
                  if(item.action === 'logout'){
                    dispatch(setIsLoggedOut())
                    localStorage.clear()
                  }
                  navigate.push(item.link)
                }}
                key={item.name}
                sx={{ color: "#fff" }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
