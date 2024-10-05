import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import AuthIcon from './AuthIcon';

function Header() {
    const navigate = useNavigate();

    return (
        <Box
            as="header"
            borderBottom="1px solid rgba(222, 141, 213, 0.3)"
            // px={16}
            color="white"
            shadow="md">
            <Flex justify="space-evenly" align="center" padding="12px" bg="brand.400">
                <IconButton
                    icon={<AiOutlineHome />}
                    bg="none"
                    aria-label="Home"
                    fontSize="30px"
                    size="sm"
                    color="brand.500"
                    cursor="pointer"
                    _hover={{
                        background: 'none',
                        color: 'brand.200',
                    }}
                    onClick={() => navigate('/')}
                />

                <Text as={'h1'} fontSize={32} fontWeight={'bold'}>
                    User Rating System
                </Text>

                <AuthIcon />
            </Flex>
        </Box>
    );
}

export default Header;
