import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import UserPage from './pages/UserPage';
import Header from './components/Header';
import Error from './pages/Error';
import useLocalStorageAuth from './hooks/useLocalStorageAuth';
import LoadingSpinner from './components/Spinner';
import { useAuth } from './hooks/useAuth';

function App() {
    const { isAuth } = useAuth();
    const loadingLocalStorage = useLocalStorageAuth(isAuth);

    if (loadingLocalStorage) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {isAuth && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthLogin />} />
                <Route path="/register" element={<AuthRegister />} />
                <Route path="/profile/:id" element={<UserPage />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
