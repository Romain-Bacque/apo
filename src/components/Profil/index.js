// == Import
import { Container, Typography } from '@mui/material';
import './style.scss';
// == Composant
import Input from '../Input'
function Profil() {
  return (
    <Container sx={{ position: 'fixed', top: '60px', display: 'flex', alignItems: 'center', textAlign: 'center', backgroundColor: 'white', width: '100%', justifyContent: 'space-between', p: 2}}>
      <Typography sx={{ minWidth: 100 }}>Profil</Typography>
      <Typography sx={{ minWidth: 100 }}>Brasserie</Typography>
      <Typography sx={{ minWidth: 100 }}>Evenements</Typography>

    </Container>
     
    /* <form className="profil">

      <h2 className='profil-title'> Profil </h2>
      <label for='mail'> Email : </label>
      <Input 
        name='email'
        type='email'
        className='profil-email'
        id='mail'
      />
      <label for='pass'> Mot de passe :  </label>
      <Input 
        name='password'
        type='password'
        className='profil-password'
        id='pass'
      />
      <label for='confirm-pass'> Confirmation du mot de passe :  </label>
      <Input 
        name='confirm-password'
        type='password'
        className='profil-confirm'
        id='confirm-pass'
      />
      <button type='submit' className='profil-submit'>Modifier</button>
    </form> */

  );
}

// == Export
export default Profil;
