import './style.scss';
import logo from './logo.svg';

function OneBrewerie () {
    return(
        <div className='brewery-detail'>
            <div className='brewery-header'>
                <section className='section-img'>
                 <img className='brewery-img' src={logo} alt="logo"></img>
                </section>
                <section className='section-adress'>
                    <h1 className='brewery-title'>Nom de la brasserie</h1>
                    <span className='span-info'>adresse</span>
                    <span className='span-info'>téléphone</span>
                    <button className='detail-button' type='button'>Voir le détail</button>
                </section>
            </div>
        </div>
    );
}

export default OneBrewerie;