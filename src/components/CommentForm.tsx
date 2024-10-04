import { Avatar, Box, Button, HStack, Text, Textarea, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CommentSectionProps } from './CommentSection';
import { getDatabase, push, ref, set } from 'firebase/database';
import Stars from './Stars';

function CommentForm({ userId, currentUserId, currentUserName }: CommentSectionProps) {
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);

    async function handleCommentSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (commentText.trim()) {
            const db = getDatabase();
            const commentsRef = ref(db, `users/${userId}/comments`);
            const newCommentRef = push(commentsRef);
            await set(newCommentRef, {
                text: commentText.trim(),
                createdAt: new Date().toISOString(),
                authorId: currentUserId,
                authorName: currentUserName,
                rating: rating,
            });

            setCommentText('');
            setRating(0);
        }
    }

    if (userId === currentUserId) {
        return null;
    }

    return (
        <Box my={4}>
            <VStack spacing={3} align="start">
                <HStack align="start" spacing={3} width="100%">
                    <Avatar name={currentUserName || ''} />
                    <Textarea
                        placeholder="Write a message..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        size="md"
                        resize="none"
                        width="100%"
                    />
                </HStack>

                <HStack spacing={1}>
                    <Text fontSize="sm" fontWeight="bold">
                        Rating:
                    </Text>

                    <Stars
                        saveRating={setRating}
                        size={5}
                        rating={rating}
                        disabled={false}
                    />
                </HStack>

                <Button
                    onClick={handleCommentSubmit}
                    bg="#e02bd5"
                    isDisabled={!commentText.trim() || rating === 0}>
                    Submit
                </Button>
            </VStack>
        </Box>
    );
}

export default CommentForm;
