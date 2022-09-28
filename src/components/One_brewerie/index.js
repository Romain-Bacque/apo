import './style.scss';
import logo from './logo.svg';
import Events from '../Events';

function One_brewerie () {
    return(
        <div className='brewery'>
            <div className='brewery-header'>
                <section className='section-img'>
                 <img className='brewery-img' src={logo} alt="logo"></img>
                </section>
                <section className='section-adress'>
                    <h1 className='brewery-title'>Nom de la brasserie</h1>
                    <span className='span-info'>adresse</span>
                    <span className='span-info'>téléphone</span>
                </section>
            </div>

            <p className='brawery-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a rutrum justo, non
            consequat quam. </p>

            <div className='event-list'>
                <Events />
            </div>
        </div>
    );
}

export default One_brewerie;