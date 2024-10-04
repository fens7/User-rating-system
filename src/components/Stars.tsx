import { Box, Flex } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

type StarsProps = {
    saveRating?: (rating: number) => void;
    size?: number;
    rating: number;
    disabled: boolean;
};

function Stars({ saveRating, rating, disabled, size }: StarsProps) {
    function handleRating(index: number) {
        if (!disabled) {
            const newRating = index + 1;

            saveRating?.(newRating);
        }
    }
    return (
        <Flex alignItems="center">
            {Array.from({ length: 5 }, (_, index) => (
                <Box
                    cursor={disabled ? 'default' : 'pointer'}
                    as={FaStar}
                    key={index}
                    type="radio"
                    boxSize={size}
                    color={index < Math.floor(rating) ? 'yellow.400' : 'gray.300'}
                    onClick={() => handleRating(index)}
                />
            ))}
        </Flex>
    );
}

export default Stars;
