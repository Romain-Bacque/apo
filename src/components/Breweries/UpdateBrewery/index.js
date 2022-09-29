// == Import
import './style.scss';
import Input from '../../Input'
// == Composant
import logo from '../../Header/logo.svg';
import Categories from '../../Categories';
import EventsBrewery from '../EventsBrewery';

function UpdateBrewery() {
  return (
    <form className="UpdateBrewery">

      <article className='btn-section'>
        <button className='btn-delete-brewery'> Supprimer la brasserie</button>
        <button className='btn-update-brewery'> Modifier la barasserie</button>
      </article>

      <section className='one-card-brewery'> 

        <article className='info-brewery'>

          <img src={logo} alt='' className='brewery-logo'/>

          <article className='brewery-infos'>
            <Input name='title' value='Nom de la brasserie' />
            <Input name='adress' value='Adresse' />
            <Input name='phone' value='Téléphone' />
          </article>

        </article>

        <textarea name='description' value='Une déscription de la brasserie' className='brewery-description'></textarea>
        <Categories />

        <EventsBrewery />
  
       
      </section>

    </form>
  );
}

// == Export
export default UpdateBrewery;
