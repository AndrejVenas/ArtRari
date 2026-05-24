import { useEffect, useState } from 'react';

import './App.css';

import Header from './Components/Section/Header/Header';
import Footer from './Components/Section/Footer/Footer';
import AppRouter from './Components/AppRouter';
import Loader from './Components/UI/Loader/Loader';

function App() {

    const [loading, setLoading] = useState(true);
    const [hideLoader, setHideLoader] = useState(false);

    useEffect(() => {

        setTimeout(() => {
            setHideLoader(true);

            setTimeout(() => {
                setLoading(false);
            }, 100);

        }, 500);

    }, []);

    return (
        <>
            {loading && <Loader hide={hideLoader} />}

            <div className="wrapper">
                <Header />
                <AppRouter />
                <Footer />
            </div>
        </>
    );
}

export default App;