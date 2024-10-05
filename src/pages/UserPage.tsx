import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { User } from '../store/slices/userSlice';
import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';
import StarRating from '../components/StarRating';
import CommentSection from '../components/CommentSection';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/Spinner';

type Rating = {
    rating: number;
};

function UserPage() {
    const [isLoading, setLoading] = useState(true);

    const { id } = useParams();
    const [profileUser, setProfileUser] = useState<User | null>(null);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [usersRated, setUsersRated] = useState<number>(0);
    const authUser = useAuth();

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, `users/${id}`);

        onValue(userRef, async (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setProfileUser(data);
                const rating = calculateAverageRating(data.comments);

                setAverageRating(rating);
                await set(ref(db, `users/${id}/rating`), rating);
                setLoading(false);
            }
        });
    }, [id]);

    function calculateAverageRating(comments: Record<string, Rating> | undefined) {
        if (!comments) return 0;
        const ratingArr: number[] = [];
        Object.values(comments).map((comment) => {
            if (comment.rating !== undefined) {
                ratingArr.push(comment.rating);
            }
        });

        setUsersRated(ratingArr.length);

        const total = ratingArr.reduce((sum, rating) => sum + rating, 0);
        return ratingArr.length > 0 ? total / ratingArr.length : 0;
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Box
            maxW="800px"
            mx="auto"
            p={6}
            mt={8}
            padding={8}
            bg="brand.300"
            shadow="md"
            borderRadius="lg">
            <VStack align="center" mb={5}>
                <Avatar size="xl" name={profileUser?.firstName || ''} />
                <Text fontSize="2xl" fontWeight="bold">
                    {profileUser?.firstName} {profileUser?.lastName}
                </Text>
                <Text fontSize="md">{profileUser?.email}</Text>

                <HStack spacing={1}>
                    <StarRating
                        userId={id}
                        ratedUserId={profileUser?.id}
                        rating={averageRating}
                        usersRated={usersRated}
                    />
                </HStack>
            </VStack>

            <CommentSection userId={id} profileUser={profileUser} authUser={authUser} />
        </Box>
    );
}

export default UserPage;
