import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();
    return (
        <Flex direction="column" align="center" mt={40} height="100%" bg="brand.400">
            <Box textAlign="center" bg="brand.300" borderRadius={20} py={20} px={8}>
                <Icon
                    as={IoIosInformationCircleOutline}
                    boxSize={'70px'}
                    color={'brand.200'}
                />
                <Text fontSize="3xl" mt={3} mb={2} fontWeight="bold">
                    Page not found
                </Text>
                <Text fontSize={'lg'} color={'brand.0'} mb={6}>
                    The page you are looking for has been removed or doesn't exist.
                </Text>

                <Button bg="brand.200" onClick={() => navigate('/')}>
                    Go to Homepage
                </Button>
            </Box>
        </Flex>
    );
}

export default Error;
