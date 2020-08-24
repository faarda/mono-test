import { h } from 'preact'
import useCreateState from './hooks/useCreateState'
import userDataContext from "./contexts/userDataContext";
import { Router, Route } from 'preact-router';
import routes from './routes'

function App() {
    const [userData, setUserData] = useCreateState({
        id: null,
        code: null,
        name: "Silas",
        requestedAmount: 0
    });

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
