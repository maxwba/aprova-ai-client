import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormDetail from "./Renderform";
import NewForm from "./NewForm";

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

export default function ClienteDetails(props) {
  const { selectedClient } = props;
  const classes = useStyles();
  const [form, setForm] = React.useState(false);

  const handleDrawerOpen = () => {
    setForm(true);
  };

  return (
    <div>
      {form ? (
        <NewForm selectedClient = {selectedClient} />
      ) : (
        <div>
          <h1>{selectedClient.name} </h1>
          <br />
          <Typography className={classes.root}>
            <Link href="#" variant="body2">
              {selectedClient.shareLink}
            </Link>
          </Typography>
          <br />
          <br />
          <br />
          <br />
          <Button color="primary" onClick={handleDrawerOpen}>
            Criar formulário
          </Button>
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
    </div>
  );
}
