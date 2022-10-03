// == Import
import './style.scss';
// == Composant
import Profil from '../Profil';

import AccountMenu from './AccountMenu';

function Account() {
  return (
    <> 
      <AccountMenu />

      <main className='main'>
      <Profil />    
      </main>
     </>

  );
}

// == Export
export default Account;
