import { Box, Grid } from '@chakra-ui/react';
import { get, getDatabase, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { User } from '../store/slices/userSlice';
import LoadingSpinner from './Spinner';
import SearchInput from './SearchInput';

function UsersList() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        const db = getDatabase();

        const fetchUsers = async () => {
            setLoading(true);
            const usersRef = ref(db, 'users');
            try {
                const snapshot = await get(usersRef);
                if (snapshot.exists()) {
                    const userList: User[] = Object.values(snapshot.val());
                    setUsers(userList);
                    setFilteredUsers(userList);
                } else {
                    console.log('No users available');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (searchText) {
            const filtered = users.filter((user) => {
                return (
                    user.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
                    user.lastName?.toLowerCase().includes(searchText.toLowerCase())
                );
            });
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchText, users]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Box>
            <SearchInput setSearchText={setSearchText} />
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                }}
                gap={6}
                p={8}>
                {filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </Grid>
        </Box>
    );
}

export default UsersList;
