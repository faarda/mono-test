import { useState } from 'react'

const createState = (initialState) => {
    let state = {};
    let setState = {};

    Object.keys(initialState).forEach(key => {
        const [ item, setItem ] = useState(initialState[key]);
        
        state[key] = item;
        setState[key] = setItem;
    });

    return [state, setState];
}

export default createState;