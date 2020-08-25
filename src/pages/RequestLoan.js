import { h } from 'preact'
import { useContext, useCallback, useState, useEffect} from 'preact/hooks'
import userDataContext from '../contexts/userDataContext'
import { route } from 'preact-router'
import { getRealValue, getNaira } from '../services/utilities';
import { monthlyRepayable } from '../services/loanCalculator'

function RequestLoan() {
    const {data, setData} = useContext(userDataContext);

    // create state to store the widget
    const [monoWidget, setMonoWidget] = useState(null);

    //determine is button is disabled
    const buttonDisabled = useCallback(() => {
        return data.name == "" || data.requestedAmount.toString() === "0" 
        || data.requestedAmount === null || data.requestedAmount === "";
    }, [data.name, data.requestedAmount]);

    // callback function when the widget is done
    const handleSuccess = (response) => {
        const code = response.code;

        setData.code(code);
        closeWidget();
        
        route('/my-loan', true);
    }

    // callback function when widget is closed
    const handleClose = () => {
        console.log("widget closed")
    }

    // function with hack to force close widget
    const closeWidget = () => {
        const widgetBg = document.querySelector("#app-loader").parentElement;
        const widget = document.getElementById("mono-connect--widget");

        widgetBg.style.display = "none";
        widget.style.display = "none"
    }

    // initiialize widget
    useEffect(() => {
        const widget = new window.Connect(process.env.PREACT_APP_MONO_API_PUBLIC_KEY, {
            onSuccess: handleSuccess,
            onClose: handleClose
        })

        widget.setup();

        setMonoWidget(widget);
    }, [])

    // open widget
    const connectToBank = useCallback(e => {
        monoWidget.open();
        e.preventDefault();
    }, [monoWidget])

    // reset data stored in local storage
    const clearStoredData = useCallback(() => {
        setData.name(null);
        setData.id(null);
        setData.requestedAmount(0);
        setData.stored(false);

        localStorage.removeItem('mono_user');
    }, []);

    //prevent amount input from accepting non digits
    const handleAmountInput = useCallback((e) => {
        const keyCode = e.keyCode;
        if(keyCode !== 8 && !e.code.includes("Digit") && keyCode !== 37 && keyCode !== 39){
            e.preventDefault();
        }
    }, []);

    // format and store the amount value
    const storeAmountInput = useCallback((e) => {
        const value = getNaira(getRealValue(e.target.value) * 100);

        setData.requestedAmount(value);
    }, []);

    const calcRepayable = useCallback(() => {
        return getNaira(monthlyRepayable(getRealValue(data.requestedAmount.toString()) * 100 , 3));
    }, [data.requestedAmount]);

    return (
        <div className="m-main">
            <h1 className="m-title mb-1">Hello, There 👋🏾</h1>
            <p>Welcome to our loan service, please note that all loans are for a 3 month tenure and come at a 10% interest rate.</p>
            {
                data.stored ?
                <>
                    <p className="mt-2">Would you like to proceed with your current loan request?</p>
                    <button type="button" className="m-btn m-btn--primary mt-2" onClick={() => route('/my-loan', true)} >Proceed</button>
                    <button type="button" className="m-btn m-btn--text mt-2" onClick={clearStoredData}>Request a new one</button>
                </> :
                <form className="m-form" onSubmit={connectToBank}>
                    <div className="m-form__group">
                        <label className="m-form__label" for="name">What is your name?</label>
                        <input type="text" className="m-form__input" name="name" id="name" 
                        value={data.name} placeholder="Enter Name" onInput={e => setData.name(e.target.value)} />
                    </div>
                    <div className="m-form__group">
                        <label className="m-form__label" for="name">How much do you want?</label>
                        <input type="text" className="m-form__input" name="amount" id="amount" value={data.requestedAmount} 
                        placeholder="Enter Amount" onKeyDown={handleAmountInput} onInput={storeAmountInput} />
                        {
                            data.requestedAmount.toString() === "0" || data.requestedAmount === null || data.requestedAmount === "" ?
                            null :
                            <span className="m-form__sub-text">Repay ₦{calcRepayable()} monthly for 3 months</span>
                        }
                    </div>
                    <div className="m-alert">
                        <p>We need to connect with your bank, so we can determine how much to give you</p>
                    </div>
                    <button type="submit" className="m-btn m-btn--primary" disabled={buttonDisabled()}>Connect to bank</button>
                </form>
            }
        </div>
    )
}

export default RequestLoan
