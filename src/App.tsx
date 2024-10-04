import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import UserPage from './pages/UserPage';
import Header from './components/Header';
import { useAuth } from './hooks/useAuth';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './hooks/redux-hooks';
import { setUser } from './store/slices/userSlice';
import Error from './pages/Error';

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuth } = useAuth();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const user = JSON.parse(storedUser);
            dispatch(setUser(user));
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        if (!loading && !isAuth) {
            navigate('/login');
        }
    }, [isAuth]);

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
