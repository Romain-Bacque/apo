// == Import
import './style.scss';
// == Composant
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';

function App() {
  return (
    <div className="app">
      <Header />
        <main>
          <Home />
        </main>
      <Footer />
    </div>
  );
}

// == Export
export default App;
