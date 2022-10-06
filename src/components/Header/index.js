// == Import
import './style.scss';
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
import { useDispatch, useSelector  } from 'react-redux';
import  { useNavigate }  from "react-router-dom";



const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  const dispatch = useDispatch()
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ color: 'black' }}>
        {['Les brasseries autour de moi', 'Accueil', 'Connection', 'Mes Brasseries', 'Evènements', 'Profil', 'Se déconnecter'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText>
                { text === 'Accueil' &&  <Link to='/'> {text} </Link>}
                { text === 'Connection' &&  <Link to='/Login'> {text} </Link>}
                { text === 'Mes Brasseries' &&  <Link to='/breweries'> {text} </Link>}
                { text === 'Evènements' &&  <Link to='/events'> {text} </Link>}
                { text === 'Profil' &&  <Link to='/profil'> {text} </Link>}
                { text === 'Se déconnecter' &&  <Button>{text}</Button>}
                { text === 'Les brasseries autour de moi' &&  <Button>{text}</Button>}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  
  const handleSubmit = (e) => {
    e.preventDefault()
  
  }
  const handleKeyUp = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      const value = e.target.value;
      dispatch({
        type: 'SEARCH_VALUE',
        value: e.target.value,
      })
      navigate(`/search/${value}`)
     
  }
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
                  type='search'
                  sx={{width: '100%'}}
                  onKeyUp={handleKeyUp}
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
