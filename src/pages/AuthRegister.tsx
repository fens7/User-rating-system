import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Register from '../components/Register';

function AuthRegister() {
    return (
        <Box
            maxW="lg"
            mx="auto"
            mt={8}
            padding={8}
            bg="brand.300"
            shadow="md"
            borderRadius="lg">
            <Stack spacing={4}>
                <Heading as="h1" size="lg" textAlign="center">
                    Register
                </Heading>
                <Text fontSize="lg" textAlign="center">
                    Create new account
                </Text>

                <Register />

                <Box textAlign="center">
                    <Text as="span" color="brand.0">
                        Already have an account?{' '}
                    </Text>
                    <Link
                        to="/login"
                        style={{ color: 'brand.50', textDecoration: 'underline' }}>
                        Login
                    </Link>
                </Box>
            </Stack>
        </Box>
    );
}

export default AuthRegister;
