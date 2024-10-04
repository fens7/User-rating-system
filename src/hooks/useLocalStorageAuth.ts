import { useEffect, useState } from 'react';
import { useAppDispatch } from './redux-hooks';
import { setUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const useLocalStorageAuth = (isAuth: boolean) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loadingLocalStorage, setLoadingLocalStorage] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const user = JSON.parse(storedUser);
            dispatch(setUser(user));
        }

        setLoadingLocalStorage(false);
    }, [dispatch]);

    useEffect(() => {
        if (!loadingLocalStorage && !isAuth) {
            navigate('/login');
        }
    }, [isAuth, loadingLocalStorage]);

    return loadingLocalStorage;
};

export default useLocalStorageAuth;
