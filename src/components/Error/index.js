import './style.scss';
import { Link } from 'react-router-dom';

function Error() {
    return (
    <div className='errorimg'>
<svg className='imgsvg'
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="750"
      x="0"
      y="0"
      enableBackground="new 0 0 560 960"
      version="1.1"
      viewBox="0 0 560 960"
      xmlSpace="preserve"
    >
      <path
        d="M147 386.582s.833 235.875.833 257.209S168.333 668 172.667 668H327c8.666 0 17-11 17-28V387l-197-.418z"
        className="beer"
      ></path>
      <path
        d="M344 387l-132-.418V422s-2 16.75-20.75 16.75S171 428.25 171 423.5V387s-12.25-.334-24-.418c-19.625-2.457-23-25.332-3.625-38.832-7.5-30.25 64.063-94.25 107.896-16.418 15.333-15.5 39.781-19 49.115 14.168 3.666-24.834 10.437-43.25 42.974-43.25 28.668 0 41.457 27.082 41.457 41.422C384.814 375 356.732 387 346.215 387H344z"
        className="schaum"
      ></path>
      <path
        d="M348 597h53c14 0 20.5-16.5 20.5-25.5 0-4.25.355-99 .355-113.75S407.75 437 399.25 437H348"
        className="handle"
      ></path>
      <path
        d="M147 385.481s.833 235.875.833 257.209 20.5 24.209 24.834 24.209H327c8.666 0 17-11 17-28v-253l-132-.418v35.418s-2 16.75-20.75 16.75-20.25-10.5-20.25-15.25v-36.5s-12.25-.334-24-.418c-19.625-2.457-23-25.332-3.625-38.832-7.5-30.25 64.063-94.25 107.896-16.418 15.332-15.5 39.78-19 49.114 14.168 3.666-24.834 10.437-43.25 42.974-43.25 28.668 0 41.457 27.082 41.457 41.422-.002 31.328-28.084 43.328-38.602 43.328"
        className="outline"
      ></path>
      <path d="M196 480L196 562" className="lines"></path>
      <path d="M250 480L250 562" className="lines"></path>
      <path d="M304 480L304 562" className="lines"></path>
    </svg>
       
    <section class="error">
  <div class="error__content">
    <div class="error__message message">
      <h1 class="message__title">404</h1>
      <p class="message__text">Oops,  This page not found!</p>
    </div>
    <div class="error__nav e-nav">
      <Link to="/" class="e-nav__link">Accueil</Link>
    </div>
  </div>
</section>
</div> 
    );
  }
  
  export default Error;