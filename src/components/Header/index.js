// == Import
import './style.scss';
// == Composant
import Input from '../Input'
import { Link } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import { AppBar, InputBase, Box, Toolbar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SportsBarTwoToneIcon from '@mui/icons-material/SportsBarTwoTone';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  
  return (
    <Box>
      <AppBar>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{p: 1}}>
        <Link to='/'>
          <SportsBarTwoToneIcon fontSize="large" />
        </Link>
        </Box>
      
            <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  components={<Input 
                    placeholder=" Rechercher.."
                    name='search' 
                  />}  
                />
              </Search>
              <IconButton
                size="large"
              >
              <Link to='/profil'>
                <AccountCircle fontSize="large"/>
              </Link>
              </IconButton>
               
              
          {/* <Navbar className='header-navbar'/> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
  
// == Export
export default Header;
