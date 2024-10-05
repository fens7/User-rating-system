import {
    IconButton,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux-hooks';
import { removeUser } from '../store/slices/userSlice';
import { useAuth } from '../hooks/useAuth';

function AuthIcon() {
    const [isLogged, setLogged] = useState(false);
    const { id } = useAuth();

    const dispatch = useAppDispatch();

    return (
        <Menu  isOpen={isLogged} onClose={() => setLogged(false)}>
            <MenuButton
                as={IconButton}
                icon={<FiUser />}
                aria-label="Menu"
                fontSize="30px"
                size="sm"
                bg={'none'}
                color="brand.500"
                cursor="pointer"
                _active={{ bg: 'none' }}
                _hover={{ color: 'brand.200' }}
                onClick={() => setLogged(!isLogged)}
            />
            <MenuList bg="brand.300">
                <MenuGroup>
                    <MenuItem
                        _hover={{ bg: 'brand.200' }}
                        bg="brand.300"
                        onClick={() => {
                            setLogged(false);
                        }}>
                        <Link to={`/profile/${id}`}>My Account</Link>
                    </MenuItem>
                    <MenuItem
                        _hover={{ bg: 'brand.200' }}
                        bg="brand.300"
                        onClick={() => {
                            setLogged(false);
                            dispatch(removeUser());
                            localStorage.removeItem('user');
                        }}>
                        Log Out
                    </MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
}

export default AuthIcon;
