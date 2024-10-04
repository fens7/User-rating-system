import { Text, VStack } from '@chakra-ui/react';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';

export type CommentSectionProps = {
    userId: string | undefined;
    currentUserId: string | null;
    currentUserName: string | null;
};

export interface Comment {
    authorName: string;
    id: string;
    text: string;
    createdAt: string;
    authorId: string;
    rating: number;
}

function CommentSection({ userId, currentUserId, currentUserName }: CommentSectionProps) {
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
                (comment) => comment.authorId === currentUserId,
            );

            setCanSubmitComment(!hasUserCommented);
        });
    }, [userId]);

    function handleDeleteComment(id: string) {
        const db = getDatabase();
        const commentRef = ref(db, `users/${userId}/comments/${id}`);
        remove(commentRef);
    }

    return (
        <>
            {canSubmitComment && (
                <CommentForm
                    currentUserName={currentUserName}
                    userId={userId}
                    currentUserId={currentUserId}
                />
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
