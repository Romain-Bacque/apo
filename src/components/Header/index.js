// == Import
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
// == Composant
import * as React from 'react';
import Input from '../Input'
import { Link } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import SportsBarTwoToneIcon from '@mui/icons-material/SportsBarTwoTone';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';


import classes from "./index.module.css";

import  { useNavigate }  from "react-router-dom";




const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
        border: '0px'
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(Input)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Header() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const isLogged = useSelector(state => state.user.isLoggedIn);
  const role = useSelector(state => state.user.role);

  const dispatch = useDispatch();

  const handleLogout = (evt) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
  const navigate = useNavigate()


  const [state, setState] = React.useState({
    top: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
      
      setState({ ...state, [anchor]: open });
    };

  const handleListItemClick = (event, index) => {
    event.preventDefault();

    setSelectedIndex(index);
  };
    
    
  const list = (anchor) => (
    <Box
      component="form"
      onSubmit={handleLogout}
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ color: 'black' }} className={classes.header__link}>
        <Link to='/'>
          <ListItem
           button
           selected={selectedIndex === 1}
           onClick={(event) => handleListItemClick(event, 1)}
           >
            <ListItemText primary={"Accueil"}></ListItemText>
          </ListItem>
        </Link>
        {!isLogged && <Link to='/events'>
          <ListItem
           button
           selected={selectedIndex === 4}
           onClick={(event) => handleListItemClick(event, 4)}
           >
            <ListItemText primary={"Evenements"}>Evenements</ListItemText>
          </ListItem>
        </Link>}
        {!isLogged && role === "brewer" && <Link to='/breweries'>
          <ListItem
           button
           selected={selectedIndex === 5}
           onClick={(event) => handleListItemClick(event, 5)}
           >
            <ListItemText primary={"Mes brasseries"}>Mes brasseries</ListItemText>
          </ListItem>
        </Link>}
        {!isLogged && <Link to='/profil'>
          <ListItem
           button
           selected={selectedIndex === 6}
           onClick={(event) => handleListItemClick(event, 1)}
           >
            <ListItemText primary={"Profil"}>Profil</ListItemText>
          </ListItem>
        </Link>}
        {!isLogged && <Link end to='/Login'>
          <ListItem
           button
           selected={selectedIndex === 2}
           onClick={(event) => handleListItemClick(event, 2)}
           >
            <ListItemText primary={"Connexion"}>Connexion</ListItemText>
          </ListItem>
        </Link>}
        {isLogged && <Link>
          <ListItem
           button
           selected={selectedIndex === 3}
           onClick={(event) => handleListItemClick(event, 3)}
           >
            <ListItemText primary={"Se déconnecter"}>Se déconnecter</ListItemText>
          </ListItem>
        </Link>}
      </List>
      <Divider />
    </Box>
  );

  
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/search");
  }

  
  return (
      <AppBar sx={{}}>
        <Toolbar sx={{ justifyContent: 'space-between'}}>
        <Box sx={{p: 1}}>
        <Link to='/'>
          <SportsBarTwoToneIcon fontSize="large" />
        </Link>
        </Box>

           <Search onSubmit={handleSubmit}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  name='search'
                  sx={{width: '100%'}}
                />
            </Search> 
        
              <IconButton
                size="large"
              >
              <div>
                {['top'].map((anchor) => (

                  <React.Fragment key={anchor}>

                    <MenuIcon 
                      onClick={toggleDrawer(anchor, true)}
                      fontSize='large'
                      sx={{ color: 'white' }}
                      >
                        {anchor}
                    </MenuIcon>

                    <SwipeableDrawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                      onOpen={toggleDrawer(anchor, true)}
                    >
                      {list(anchor)}
                    </SwipeableDrawer>
                  </React.Fragment>
                ))}
              </div>

              </IconButton>
              
          {/* <Navbar className='header-navbar'/> */}
        </Toolbar>
      </AppBar>
  );
}
  
// == Export
export default Header;
