import { Box, Text, VStack } from '@chakra-ui/react';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import { User } from '../store/slices/userSlice';

export type CommentSectionProps = {
    userId: string | undefined;
    profileUser: User | null;
    authUser: User | null;
};

export interface Comment {
    authorName: string;
    id: string;
    text: string;
    createdAt: string;
    authorId: string;
    rating: number;
}

function CommentSection({ authUser, profileUser, userId }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [canSubmitComment, setCanSubmitComment] = useState<boolean>(true);

    useEffect(() => {
        const db = getDatabase();
        const commentsRef = ref(db, `users/${userId}/comments`);

        onValue(commentsRef, (snapshot) => {
            const data = snapshot.val() || {};

            const commentsArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));

            setComments(commentsArray);

            const hasUserCommented = commentsArray.some(
                (comment) => comment.authorId === authUser?.id,
            );

            setCanSubmitComment(!hasUserCommented);
        });
    }, [userId]);

    function handleDeleteComment(id: string | undefined) {
        const db = getDatabase();
        const commentRef = ref(db, `users/${userId}/comments/${id}`);
        remove(commentRef);
    }

    console.log('profileUser', profileUser);
    console.log('authUser', authUser);

    return (
        <>
            {canSubmitComment ? (
                <CommentForm
                    authUser={authUser}
                    profileUser={profileUser}
                    userId={userId}
                />
            ) : (
                <Box textAlign={'center'}>
                    <Text color={'brand.100'} fontSize={20} as={'h1'}>
                        You have already rated this user.
                    </Text>
                </Box>
            )}

            <Text fontWeight="bold" fontSize="lg" mt={8} mb={5}>
                {comments.length > 1 || comments.length < 1
                    ? `${comments.length} Comments`
                    : `${comments.length} Comment`}
            </Text>

            <VStack spacing={4} align="start">
                {comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        onDelete={handleDeleteComment}
                    />
                ))}
            </VStack>
        </>
    );
}

export default CommentSection;
