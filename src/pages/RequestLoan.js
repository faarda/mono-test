import { h } from 'preact'
import { useContext, useCallback} from 'preact/hooks'
import userDataContext from '../contexts/userDataContext'

function RequestLoan() {
    const data = useContext(userDataContext);

    console.log(process.env.PREACT_APP_MONO_API_SECRET_KEY);

    const buttonDisabled = useCallback(() => {
        return data.data.name == "" || data.data.requestedAmount == null || data.data.requestedAmount <= 0;
    }, [data.data.name, data.data.requestedAmount]);

    return (
        <div className="m-main">
            <h1 className="m-title mb-1">Hello, There 👋🏾</h1>
            <p>Welcome to our loan service, please note that all loans are for a 3 month tenure and come at a 10% interest rate.</p>
            <form className="m-form">
                <div className="m-form__group">
                    <label className="m-form__label" for="name">What is your name?</label>
                    <input type="text" className="m-form__input" name="name" id="name" 
                    value={data.data.name} placeholder="Enter Name" onInput={e => data.setData.name(e.target.value)} />
                </div>
                <div className="m-form__group">
                    <label className="m-form__label" for="name">How much do you want?</label>
                    <input type="number" className="m-form__input" name="amount" id="amount" value={data.data.requestedAmount} 
                    placeholder="Enter Amount" onInput={e => data.setData.requestedAmount(Number(e.target.value))} />
                </div>
                <div className="m-alert">
                    <p>We need to connect with your bank, so we can determine how much to give you</p>
                </div>
                <button type="submit" className="m-btn m-btn--primary" disabled={buttonDisabled()}>Connect to bank</button>
            </form>
        </div>
    )
}

export default RequestLoan