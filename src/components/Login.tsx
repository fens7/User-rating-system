import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Form, { FormData } from './Form';
import { useAppDispatch } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';
import { get, getDatabase, ref } from 'firebase/database';

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    async function handleLoginSubmit(data: FormData) {
        const auth = getAuth();
        const db = getDatabase();

        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );

            const idToken = await user.getIdToken();

            const userRef = ref(db, `users/${user.uid}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();

                const userToStore = {
                    email: userData.email,
                    token: idToken,
                    id: user.uid,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    isAdmin: userData.isAdmin,
                };

                localStorage.setItem('user', JSON.stringify(userToStore));

                dispatch(setUser(userToStore));
            }

            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    return (
        <>
            <Form onSubmitHandler={handleLoginSubmit} isRegister={false} />
        </>
    );
}

export default Login;
