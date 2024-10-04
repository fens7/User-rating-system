import { useRef } from 'react';

type Callback<T> = (value: T) => void;

export default function useDebounce<T>(callback: Callback<T>, delay: number) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    return (value: T) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback(value);
        }, delay);
    };
}
