import { Avatar, Button, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { User } from '../store/slices/userSlice';
import Stars from './Stars';

interface UserCardProps {
    user: User;
}

function UserCard({ user }: UserCardProps) {
    return (
        <Flex
            gap={2}
            direction="column"
            justify="center"
            align="center"
            bg="brand.300"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="4"
            textAlign="center"
            boxShadow="md">
            <Avatar size="xl" name={user.firstName || ''} mb="2" />
            <Heading size="md">
                {user.firstName} {user.lastName}
            </Heading>
            <Stars size={5} rating={user.rating} disabled={true} />

            <Link to={`/profile/${user.id}`}>
                <Button mt="2" bg="brand.200">
                    Go to user profile
                </Button>
            </Link>
        </Flex>
    );
}
export default UserCard;
