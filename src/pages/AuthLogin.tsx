import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';

function AuthLogin() {
    return (
        <Box
            maxW="lg"
            mx="auto"
            mt={8}
            padding={8}
            bg="brand.300"
            shadow="lg"
            borderRadius="lg">
            <Stack spacing={4}>
                <Heading as="h1" size="lg" textAlign="center">
                    Login
                </Heading>
                <Text fontSize="lg" textAlign="center">
                    Login to your account
                </Text>

                <Login />

                <Box textAlign="center">
                    <Text as="span" color="brand.0">
                        Dont have account?{' '}
                    </Text>
                    <Link
                        to="/register"
                        style={{ color: 'brand.50', textDecoration: 'underline' }}>
                        Register
                    </Link>
                </Box>
            </Stack>
        </Box>
    );
}

export default AuthLogin;
