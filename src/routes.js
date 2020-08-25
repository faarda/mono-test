import RequestLoan from './pages/RequestLoan'
import MyLoan from './pages/MyLoan'
import Widget from './pages/Widget'

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
    },
    {
        name: "widget",
        path: "/widget",
        component: Widget
    }
]