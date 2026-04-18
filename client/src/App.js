import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AppRouter from './Components/AppRouter';

function App() {
  return (
    <div className="App">
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
