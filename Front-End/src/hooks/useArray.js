import {useState} from 'react';

export default function useArray(arr) {
    const [array, setArray] = useState(arr);

    const pushElement = (e) => {
        setArray([...array, e]);
    };

    const removeAtIndex = (i) => {
        setArray(array.filter((_, idx) => idx !== i));
    };

    return [array, setArray, pushElement, removeAtIndex];
};