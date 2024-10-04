import { Text, VStack } from '@chakra-ui/react';
import { getDatabase, ref, set } from 'firebase/database';
import Stars from './Stars';

type RatingProps = {
    rating: number;
    usersRated: number;
    userId?: string | null;
    ratedUserId?: string | null | undefined;
};

function StarRating({ rating, usersRated, userId, ratedUserId }: RatingProps) {
    const saveRating = async (rating: number) => {
        const db = getDatabase();
        const ratingRef = ref(db, `users/${ratedUserId}/ratings/${userId}`);

        await set(ratingRef, {
            rating: rating,
        });
    };

    return (
        <VStack justifyContent={'center'} spacing={1}>
            <Text fontWeight="bold" fontSize="2xl">
                {rating.toFixed(1)}
            </Text>
            <Stars disabled={true} rating={rating} saveRating={saveRating} size={7} />
            <Text fontSize="sm" color="gray.500">
                {usersRated > 1
                    ? `${usersRated} users rated`
                    : `${usersRated} user rated`}
            </Text>
        </VStack>
    );
}

export default StarRating;
