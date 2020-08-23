import { createContext } from 'preact';

const user = {
    data: {},
    setData: () => {}
}

const userContext = createContext(user)

export default userContext;