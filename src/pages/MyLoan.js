import { h } from 'preact'
import { useContext, useEffect, useCallback} from 'preact/hooks'
import userDataContext from '../contexts/userDataContext'
import useCreateState from '../hooks/useCreateState'
import { route } from 'preact-router'
import monoApi from '../services/monoApi'
import loanCalculator, {getNaira} from '../services/loanCalculator'
import Transaction from '../components/Transaction'

function MyLoan() {
    const {data: {name, code, requestedAmount, id}, setData} = useContext(userDataContext);

    const [state, setState] = useCreateState({
        loading: true,
        error: false,
        bankData: {},
        transactionHistory: [],
        loan: {}
    })

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("mono_user") || "{}");

        if(Object.keys(storedData).length > 0 && !code){
            //retrieve user id from local storage
           setData.id(storedData.id);
           setData.name(storedData.name);
           setData.requestedAmount(storedData.requestedAmount);
        }else if(!code){
            route("/", true);
        }
        
    }, []);

    useEffect(() => {
        if(code & !id){
            monoApi.GET_USER_ID(code)
                .then(res => {
                    const id = res.data.id;
                    setData.id(id); 

                    // store user data in localStorage so we can access it later
                    const userDetails = { name, requestedAmount, id } 
                    localStorage.setItem('mono_user', JSON.stringify(userDetails));
                })
                .catch(err => {
                    setState.error(true);
                    console.log(err)
                })
        }
    }, [code, id]);

    useEffect(() => {
        if(id){
            monoApi.GET_ACCOUNTS(id)
                .then(res => {
                    setState.bankData(res.data.account)
                })
                .catch(err => {
                    setState.error(true);
                    console.log(err)
                })
        }
    }, [id]);

    useEffect(() => {
        if(id){
            monoApi.GET_TRANSACTIONS(id, 6)
                .then(res => {
                    const history = res.data.data;
                    setState.transactionHistory(history);
                    console.log(history)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [id]);

    useEffect(() => {
        if(state.transactionHistory.length > 0){
            loanCalculator(state.transactionHistory, requestedAmount)
                .then(res => {
                    setState.loan(res);
                    setState.loading(false);
                })
        }
    }, [state.transactionHistory, requestedAmount]);

    return (
        <div className="m-main">
            {
                state.loading ? 
                <>
                    <p className="text-center">loading...</p>
                </> :
                (
                    state.error ? 
                    <p className="text-center">Sorry something went wrong</p> :
                    <>
                        <h1 className="m-title mb-1">Hello, {name} 👋🏾</h1>
                        <div className="m-alert mb-1">
                            <span className="icon">🎉</span>
                            <p>Congratulations, we’re willing to offer you <b>{getNaira(state.loan.amount)}</b> for three months, with a monthy repayment of <b>{getNaira(state.loan.monthlyRepayable)}</b>.</p>
                        </div>
                        <p className="mt-2">Here's what we got from your bank</p>
                        <div className="m-card mt-1 text-center">
                            <p className="mb-1"><span className="text-grey">Account Name:</span> {state.bankData.name}</p>
                            <p className="mb-1"><span className="text-grey">Account Number:</span> {state.bankData.accountNumber}</p>
                            <p className="mb-1"><span className="text-grey">Balance:</span> <span className="text-success">{getNaira(state.bankData.balance)}</span></p>
                        </div>
                        <h3 className="m-title mb-1 mt-2">Recent Transactions</h3>
                        <div className="m-card">
                            <ul className="m-trans">
                                {
                                    state.transactionHistory.slice(0, 100).map(transaction => <Transaction transaction={transaction} />)
                                }
                            </ul>   
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default MyLoan
