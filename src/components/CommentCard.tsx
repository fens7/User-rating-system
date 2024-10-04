import { Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { Comment } from './CommentSection';
import { useAuth } from '../hooks/useAuth';
import Stars from './Stars';

export type CommentProps = {
    comment: Comment;
    onDelete: (id: string) => void;
};

function CommentCard({ comment, onDelete }: CommentProps) {
    const user = useAuth();

    return (
        <Box p={2} borderRadius={10} bg="brand.200" key={comment.id} shadow="lg" w="100%">
            <Flex justify="space-between" align="start" mb={2}>
                <Flex>
                    <Avatar name={comment.authorName} mr={3} />
                    <Box>
                        <Flex gap="6px" alignItems="center">
                            <Text fontSize="sm" fontWeight="bold">
                                {comment.authorName}
                            </Text>
                            <Stars disabled={true} rating={comment.rating} size={3} />
                            <Text textAlign="center" fontSize="xs" color="brand.50">
                                {new Date(comment.createdAt).toLocaleString()}
                            </Text>
                        </Flex>

                        <Box>
                            <Text wordBreak="break-word">{comment.text}</Text>
                        </Box>
                    </Box>
                </Flex>

                {user.isAdmin && (
                    <IconButton
                        aria-label="Delete"
                        icon={<FaTrashAlt />}
                        size="md"
                        color={'brand.500'}
                        onClick={() => onDelete(comment.id)}
                    />
                )}
            </Flex>
        </Box>
    );
}

export default CommentCard;
