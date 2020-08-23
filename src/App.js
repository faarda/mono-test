import { h } from 'preact'
import createState from './hooks/createState'
import userDataContext from "./contexts/userDataContext";
import { Router, Route } from 'preact-router';
import routes from './routes'
// import "https://connect.withmono.com/connect.js";

function App() {
    const [userData, setUserData] = createState({
        id: null,
        name: "Silas",
        requestedAmount: 0,
        bankData: {},
        transactionHistory: []
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
