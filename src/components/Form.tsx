import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface FormProps {
    isRegister: boolean;
    onSubmitHandler: (data: FormData) => void;
}

export interface FormData {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

function Form({ isRegister, onSubmitHandler }: FormProps) {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        onSubmitHandler(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                {isRegister && (
                    <>
                        <FormControl isInvalid={!!errors.firstName}>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                {...register('firstName', {
                                    required: 'First name is required',
                                    maxLength: {
                                        value: 20,
                                        message: 'Max length is 20 characters',
                                    },
                                })}
                                placeholder="First Name"
                            />
                            <FormErrorMessage>
                                {errors.firstName?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.lastName}>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                {...register('lastName', {
                                    required: 'Last name is required',
                                    maxLength: {
                                        value: 20,
                                        message: 'Max length is 20 characters',
                                    },
                                })}
                                placeholder="Last Name"
                            />
                            <FormErrorMessage>
                                {errors.lastName?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </>
                )}

                <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid email address',
                            },
                        })}
                        type="email"
                        placeholder="Email Address"
                        autoComplete="current-email"
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                    />
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>

                <Button
                    mt={4}
                    type="submit"
                    isLoading={isSubmitting}
                    bg="brand.200"
                    size="lg"
                    width="full">
                    {isRegister ? 'Register' : 'Login'}
                </Button>
            </Stack>
        </form>
    );
}

export default Form;
