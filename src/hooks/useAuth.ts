import { useAppSelector } from './redux-hooks';

export function useAuth() {
    const { email, token, id, firstName, lastName, isAdmin } = useAppSelector(
        (state) => state.user,
    );

    return {
        isAuth: !!email,
        email,
        token,
        id,
        firstName,
        lastName,
        isAdmin,
    };
}
