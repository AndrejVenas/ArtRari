import logo from './logo.svg';
import './App.css';
import Header from './Components/Section/Header/Header';
import Footer from './Components/Section/Footer/Footer';
import AppRouter from './Components/AppRouter';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
