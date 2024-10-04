import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import Form, { FormData } from './Form';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';

function Register() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    return (
        <>
            <Form onSubmitHandler={handleRegisterSubmit} isRegister={true} />
        </>
    );
}

export default Register;
