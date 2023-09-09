import {useState} from 'react';

export default function useToggle() {
    const [toggle, setToggle] = useState(0);

    const flipToggle = () => {
        setToggle((toggle + 1) % 2);
    };

    return [toggle, flipToggle];
};