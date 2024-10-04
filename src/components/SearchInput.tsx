import { FormControl, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import useDebounce from '../hooks/useDebounce';
import { useState } from 'react';

interface SearchProps {
    setSearchText: (text: string) => void;
}

function SearchInput({ setSearchText }: SearchProps) {
    const [value, setValue] = useState('');

    const updateSearchText = useDebounce((str: string) => {
        setSearchText(str);
    }, 300);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        updateSearchText(e.target.value);
    }

    return (
        <FormControl pl={8}>
            <InputGroup>
                <InputLeftElement color={'brand.200'} children={<BsSearch />} />
                <Input
                    borderRadius={20}
                    placeholder="Search for user..."
                    width="400px"
                    variant="filled"
                    value={value}
                    onChange={(e) => handleSearch(e)}
                />
            </InputGroup>
        </FormControl>
    );
}

export default SearchInput;
