import { Avatar, Box, Button, HStack, Text, Textarea, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CommentSectionProps } from './CommentSection';
import { getDatabase, push, ref, set } from 'firebase/database';
import Stars from './Stars';

function CommentForm({ userId, profileUser, authUser }: CommentSectionProps) {
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
                authorId: authUser?.id,
                authorName: authUser?.firstName,
                rating: rating,
            });

            setCommentText('');
            setRating(0);
        }
    }

    if (userId === authUser?.id) {
        return null;
    }

    return (
        <Box my={4}>
            <VStack spacing={3} align="start">
                <HStack align="start" spacing={3} width="100%">
                    <Avatar name={authUser?.firstName || ''} />
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
                        Rate {profileUser?.firstName}:
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
                    bg="brand.200"
                    isDisabled={
                        !commentText.trim() || rating === 0 || commentText.length <= 3
                    }>
                    Submit
                </Button>
            </VStack>
        </Box>
    );
}

export default CommentForm;
