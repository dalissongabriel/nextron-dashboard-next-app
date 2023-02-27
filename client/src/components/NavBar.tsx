import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { useAuthContext } from "@contexts/AuthContext";
import { useRouter } from "next/router";
import { getNameInitial } from "src/utils";

const drawerWidth = 240;
const navItems = ["Overview", "Customers"];

export default function NavBar() {
  const { handleLogout, userInfo } = useAuthContext();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const isCurrentRoute = (navItemLabel: string) => {
    const routesByLabel: Record<string, string> = {
      Customers: "customers",
      Overview: "overview",
      default: "customers",
    };

    const currentRoute = routesByLabel[navItemLabel] || routesByLabel.default;

    return router.pathname.includes(currentRoute);
  };

  const handleLinkItemBgColor = (navItemLabel: string) => {
    return isCurrentRoute(navItemLabel) ? "#178787" : "inherit";
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", position: "relative", height: "100vh" }}
    >
      <Typography variant="h6" color="primary" sx={{ my: 2 }}>
        Nextron
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item}
            disablePadding
            sx={{
              bgcolor: handleLinkItemBgColor(item),
              borderEndEndRadius: "20px",
              borderStartEndRadius: "20px",
            }}
          >
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box position="absolute" bottom={25} textAlign="center" width="100%">
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{ background: "linear-gradient(90deg, #37E1C2 0%, #22C1C1 100%)" }}
      >
        <Toolbar sx={{ display: "flex", width: "100%" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              marginRight: "14rem",
              display: { xs: "none", sm: "block" },
              color: "white",
            }}
          >
            Nextron
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "#fff",
                  bgcolor: handleLinkItemBgColor(item),
                  marginRight: "2rem",
                  "&:hover": {
                    backgroundColor: "#178787",
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
          <Box marginLeft="auto">
            <Avatar sx={(theme) => ({ bgcolor: theme.palette.primary.dark })}>
              {getNameInitial(userInfo?.name)}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
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
      </Box>
    </Box>
  );
}
