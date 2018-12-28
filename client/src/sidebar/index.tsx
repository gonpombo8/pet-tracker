import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'; import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';

import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  SettingsPower,
} from '@material-ui/icons';

import { User } from 'src/api/user';

export interface PropTypes extends RouteComponentProps {
  user: User;
  children: any;
  container?: any;
  classes: any;
  theme: any;
}

const drawerWidth = 220;

const styles = (theme: any) => ({
  divider: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  items: {
    fontSize: '1.2rem'
  },
  logOut: {
    position: 'fixed' as 'fixed',
    bottom: 0,
    width: drawerWidth,
  }
});

const Tabs = [{
  icon: HomeIcon,
  text: 'Dashboard',
  to: '/',
}, {
  icon: SettingsIcon,
  text: 'Settings',
  to: '/settings',
}]

class SideBar extends React.Component<PropTypes> {
  state = {
    mobileOpen: false,
  };

  isSelected = (url: string) => {
    const { pathname } = this.props.location

    return pathname === url;
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleClick = (to: string) => () => {
    this.props.history.push(to);
  }

  render() {
    const { classes, theme, user } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {Tabs.map((v, k) =>
            <ListItem
              selected={this.isSelected(v.to)}
              button
              key={k + 1}
              onClick={this.handleClick(v.to)}
            >
              <ListItemIcon>
                <v.icon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.items }}
                primary={v.text}
              />
            </ListItem>
          )}
        </List>
        <div className={classes.logOut}>
          <List >
            <ListItem
              selected={this.isSelected('/bye')}
              button
              onClick={this.handleClick('/bye')}
            >
              <ListItemIcon>
                <SettingsPower />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.items }}
                primary="Log out"
              />
            </ListItem>
          </List>
        </div>
      </div>
    );

    return <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Opener"
            onClick={this.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" color="inherit" noWrap>
            Pet Tracker - {user.name} {user.surname}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          {this.props.children}
      </main>
    </div>
  }
}

export default withStyles(styles, { withTheme: true })(SideBar)
