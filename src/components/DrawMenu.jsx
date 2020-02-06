import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BusinessIcon from "@material-ui/icons/Business";
import ClientDetails from "./ClientDetails";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import AuthService from "./auth/auth-service";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Axios from "axios";
import NewClient from "./NewClient";
import DefaultPage from "./DefaultPage";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [logout, handleLogout] = React.useState(props.loggedInCompany);
  const [company, handleCompany] = React.useState(false);
  const [selectedClient, handleSelectClient] = React.useState(null);
  const [client, handleClient] = React.useState(false);
  const [clientDetail, handeClientDetail] = React.useState(false);
  const [resetState, handlState] = React.useState(false);

  useEffect(() => {
     function getAllClient() {
      Axios.get(process.env.REACT_APP_API_URL + "/client", {
        withCredentials: true
      }).then(responseFromApi => {
        handleCompany(responseFromApi.data);
      }).catch(error => console.log(error))
    }
    if (!company) {
      getAllClient();
    }
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangeClient = () => {
    handleClient(true);
    handeClientDetail(false);
  };

  const handleClientView = selectedClient => {
    handleSelectClient(selectedClient);
    handeClientDetail(true);
    handleClient(false);
    handlState(true);
    props.getTheClient(selectedClient)
  };

  const handleDeleteClient = () => {
    Axios.get(process.env.REACT_APP_API_URL + "/client", {
      withCredentials: true
    }).then(responseFromApi => {
      handleCompany(responseFromApi.data);
      handleSelectClient(null);
      handeClientDetail(false);
      handleClient(false);
    });
  };

  const service = new AuthService();
  const logoutCompany = props => {
    if (logout) {
      service.logout().then(response => {
        handleLogout(null);
      });
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Divider />
        <List>
          {company && company.map((text, index) => {
            const { name } = text;
            const key = text + "-" + index;
            return (
              <ListItem button key={key} onClick={() => handleClientView(text)}>
                <ListItemIcon>{<BusinessIcon />}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleChangeClient}>
            <ListItemIcon>
              {" "}
              <AddToPhotosIcon />{" "}
            </ListItemIcon>
            <ListItemText>Criar cliente</ListItemText>
          </ListItem>

          <ListItem
            component={Link}
            to="/"
            button
            onClick={() => logoutCompany(props)}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>Sair</ListItemText>
          </ListItem>
          <Divider />
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />

        {client ? (
          <NewClient handleClientView={handleClientView} />
        ) : clientDetail && selectedClient ? (
          <ClientDetails
            selectedClient={selectedClient}
            handleDeleteClient={handleDeleteClient}
            resetState={resetState}
          />
        ) : (
          <DefaultPage />
        )}
      </main>
    </div>
  );
}
