import { Box } from '@chakra-ui/react';

import UsersList from '../components/UsersList';

import { useAuth } from '../hooks/useAuth';
import useLocalStorageAuth from '../hooks/useLocalStorageAuth';
import LoadingSpinner from '../components/Spinner';

function Home() {
    const { isAuth } = useAuth();

    const loadingLocalStorage = useLocalStorageAuth(isAuth);

    if (loadingLocalStorage) {
        return <LoadingSpinner />;
    }

    return (
        <Box textAlign="center" py={10} px={6}>
            <UsersList />
        </Box>
    );
}

export default Home;
