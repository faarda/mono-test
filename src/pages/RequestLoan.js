import { h } from 'preact'
import { useContext, useCallback, useState, useEffect} from 'preact/hooks'
import userDataContext from '../contexts/userDataContext'
import { route } from 'preact-router'

function RequestLoan() {
    const data = useContext(userDataContext);

    const [monoWidget, setMonoWidget] = useState(null);

    const buttonDisabled = useCallback(() => {
        return data.data.name == "" || data.data.requestedAmount == null || data.data.requestedAmount <= 0;
    }, [data.data.name, data.data.requestedAmount]);

    const handleSuccess = (response) => {
        const code = response.code;

        data.setData.code(code);

        closeWidget();
        
        route('/my-loan', true);

    }

    const handleClose = () => {
        console.log("widget closed")
    }

    const closeWidget = () => {
        const widgetBg = document.querySelector("#app-loader").parentElement;
        const widget = document.getElementById("mono-connect--widget");

        widgetBg.style.display = "none";
        widget.style.display = "none"
    }

    useEffect(() => {
        const widget = new window.Connect(process.env.PREACT_APP_MONO_API_PUBLIC_KEY, {
            onSuccess: handleSuccess,
            onClose: handleClose
        })

        widget.setup();

        setMonoWidget(widget);
    }, [])

    const connectToBank = useCallback(e => {
        monoWidget.open();
        e.preventDefault();
    }, [monoWidget])

    return (
        <div className="m-main">
            <h1 className="m-title mb-1">Hello, There 👋🏾</h1>
            <p>Welcome to our loan service, please note that all loans are for a 3 month tenure and come at a 10% interest rate.</p>
            <form className="m-form" onSubmit={connectToBank}>
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
