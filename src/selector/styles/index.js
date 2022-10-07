import { styled } from '@mui/material/styles';
import { Box, AppBar, Button } from '@mui/material';

const StyledHeader = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#F2CC96'
}));

const StyledFooter = styled(Box)(({ theme }) => ({
    backgroundColor: '#F7EBC9'
  }));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#D35823',
    variant: 'contained',
    color: 'white',
    '&:hover': {
        backgroundColor: '#D35823'
  },
    
}));  

  export {StyledFooter, StyledHeader, StyledButton }