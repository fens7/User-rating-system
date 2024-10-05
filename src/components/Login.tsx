import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Form, { FormData } from './Form';
import { useAppDispatch } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';
import { get, getDatabase, ref } from 'firebase/database';
import { useToast } from '@chakra-ui/react';

export interface ServerError {
    code: number;
    message: string;
    errors?: Array<{ message: string; domain: string; reason: string }>;
}

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const toast = useToast();

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
        } catch (err: unknown) {
            const serverError = err as ServerError;

            if (serverError.message === 'Firebase: Error (auth/invalid-credential).') {
                toast({
                    title: 'Wrong email adress or password.',
                    description: 'Try again.',
                    status: 'error',
                    duration: 4000,
                    isClosable: false,
                    position: 'top',
                });
            } else if (
                serverError.message ===
                'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'
            ) {
                toast({
                    title: 'Too many requests.',
                    description: 'Try again later.',
                    status: 'error',
                    duration: 4000,
                    isClosable: false,
                    position: 'top',
                });
            }
        }
    }

    return (
        <>
            <Form onSubmitHandler={handleLoginSubmit} isRegister={false} />
        </>
    );
}

export default Login;
