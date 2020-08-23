import RequestLoan from './pages/RequestLoan'
import MyLoan from './pages/MyLoan'

export default [
    {
        name: "request-loan",
        path: "/",
        component: RequestLoan
    },
    {
        name: "my-loan",
        path: "/my-loan",
        component: MyLoan
    }
]