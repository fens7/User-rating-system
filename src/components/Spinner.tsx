import { Box, Spinner } from '@chakra-ui/react';

function LoadingSpinner() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Spinner size="xl" color="brand.200" />
        </Box>
    );
}

export default LoadingSpinner;
