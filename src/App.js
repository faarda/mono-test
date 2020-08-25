import { h } from 'preact'
import useCreateState from './hooks/useCreateState'
import userDataContext from "./contexts/userDataContext";
import { Router, Route } from 'preact-router';
import routes from './routes'
import { useEffect } from 'preact/hooks';

function App() {
    const [userData, setUserData] = useCreateState({
        id: null,
        code: null,
        name: "",
        requestedAmount: 0,
        stored: false
    });

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("mono_user") || "{}");

        if(storedData.name){
            setUserData.name(storedData.name);
            setUserData.id(storedData.id);
            setUserData.requestedAmount(storedData.requestedAmount);
            setUserData.stored(true);
        }
    }, []);

    return (
        <userDataContext.Provider value={{data: userData, setData: setUserData}}>
            <div className="app">
                <Router>
                    {routes.map(route => <Route path={route.path} exact key={route.name} component={route.component} />)}
                </Router>
            </div>
        </userDataContext.Provider>
    )
}

export default App
