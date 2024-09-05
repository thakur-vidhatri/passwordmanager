import './App.css';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Manager />
      <div className='foot'>
        <Footer />
      </div>
    </>
  );
}

export default App;
