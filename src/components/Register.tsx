import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import Form, { FormData } from './Form';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import { ServerError } from './Login';
import { useToast } from '@chakra-ui/react';

function Register() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    function capitalizeFirstLetter(str?: string) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    async function handleRegisterSubmit(data: FormData) {
        const auth = getAuth();
        const db = getDatabase();
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );

            await updateProfile(user, {
                displayName: `${data.firstName} ${data.lastName}`,
            });

            const userRef = ref(db, `users/${user.uid}`);
            await set(userRef, {
                firstName: capitalizeFirstLetter(data.firstName),
                lastName: capitalizeFirstLetter(data.lastName),
                email: data.email,
                id: user.uid,
                isAdmin: false,
                comments: {},
            });

            dispatch(
                setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    isAdmin: false,
                }),
            );

            navigate('/');
        } catch (err: unknown) {
            const serverError = err as ServerError;

            if (serverError.message === 'Firebase: Error (auth/email-already-in-use).') {
                toast({
                    title: 'User with that email address already exists',
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
            <Form onSubmitHandler={handleRegisterSubmit} isRegister={true} />
        </>
    );
}

export default Register;
