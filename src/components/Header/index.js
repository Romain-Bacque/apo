// == Import
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// == Composant
import React from 'react';
import Input from '../Input';
import { Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import {Box, Toolbar, IconButton, AppBar, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import classes from "./index.module.css";
import Logo from '../../asset/images/biere-sans-fond.png'

import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

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
    width: '100%',
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const isLogged = useSelector(state => state.user.logged);
  const role = useSelector(state => state.user.role);

  const handleLogout = (evt) => {
    dispatch({
      type: 'LOGOUT'      

  function onPlaceSelect(value) {
    console.log(value);
  }
  
  function onSuggectionChange(value) {
    console.log(value);
  }
  
  function preprocessHook(value) {
    return `${value}, Munich, Germany`;
  }
  
  function postprocessHook(feature) {
    return feature.properties.street;
  }
  
  function suggestionsFilter(suggestions) {
    const processedStreets = [];
  
    const filtered = suggestions.filter((value) => {
      if (
        !value.properties.street ||
        processedStreets.indexOf(value.properties.street) >= 0
      ) {
        return false;
      } else {
        processedStreets.push(value.properties.street);
        return true;
      }
    });
  
    return filtered;
  }
  
  const handleLogout = (evt) => {
    dispatch({
      type: 'RESET_USER',
      
    });
  };

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
    setSelectedIndex(index);
  };
  
//============================================== MENU ==========================================
  const list = (anchor) => (
    <Box
      component="form"
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

        {isLogged && <Link to='/events'>
          <ListItem
           button
           selected={selectedIndex === 4}
           onClick={(event) => handleListItemClick(event, 4)}
           >
            <ListItemText primary={"Evenements"}>Evenements</ListItemText>
          </ListItem>
        </Link>}

        {isLogged && <Link to='/breweries'>
          <ListItem
           button
           selected={selectedIndex === 5}
           onClick={(event) => handleListItemClick(event, 5)}
           >
            <ListItemText primary={"Mes brasseries"}>Mes brasseries</ListItemText>
          </ListItem>
        </Link>}

        {isLogged && <Link to='/profil'>
          <ListItem
           button
           selected={selectedIndex === 6}
           onClick={(event) => handleListItemClick(event, 1)}
           >
            <ListItemText primary={"Profil"}>Profil</ListItemText>
          </ListItem>
        </Link>}
        
        {!isLogged && <Link to='/Login'>
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
           onClick={handleLogout}
           >
            <ListItemText primary={"Se déconnecter"}>Se déconnecter</ListItemText>
          </ListItem>
        </Link>}

      </List>
      <Divider />
    </Box>
  );
  //============================================== /MENU ======================================================================================

  
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
      <AppBar>
        <Toolbar >
        <Box>
        <Link to='/'>
          <Box component='img' src={Logo} alt='' sx={{width: '4rem'}}/>
        </Link>
        </Box>

           <Search onSubmit={handleSubmit}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <GeoapifyContext apiKey="99188fa618354504b3ba9155a71fb817">
                <StyledInputBase
                  component={GeoapifyGeocoderAutocomplete}
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  name='search'
                  type='search'
                  sx={{width: '100%'}}
                  onKeyUp={handleKeyUp}
                  // value={value}
                  // type={type}
                  // lang={language}
                  // position={position}
                  // countryCodes={countryCodes}
                  // limit={limit}
                  // filterByCountryCode={filterByCountryCode}
                  // filterByCircle={filterByCircle}
                  // filterByRect={filterByRect}
                  // biasByCountryCode={biasByCountryCode}
                  // biasByCircle={biasByCircle}
                  // biasByRect={biasByRect}
                  // biasByProximity={biasByProximity}
                  // placeSelect={onPlaceSelect}
                  // suggestionsChange={onSuggectionChange}
                  // preprocessHook={preprocessHook}
                  // postprocessHook={postprocessHook}
                  // suggestionsFilter={suggestionsFilter}
                />
              </GeoapifyContext>

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
