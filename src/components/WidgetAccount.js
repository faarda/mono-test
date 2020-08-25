import { h } from 'preact'
import { useState } from 'preact/hooks'
import Account from './Account';

function WidgetAccount({next}) {
    const [account, setAccount] = useState(null);

    const selectAccount = (e) => {
        setAccount(e.target.value);
    }

    const accounts = [
        {
            name: 'Agboola, Olugbenga',
            number: '0001557337',
            balance: 'NGN 144.57'
        },
        {
            name: 'Agboola, Olugbenga',
            number: '0001557337',
            balance: 'NGN 23,621.64'
        },
        {
            name: 'Agboola, Olugbenga',
            number: '0001557337',
            balance: 'NGN 1,602.89'
        }
    ]

    return (
        <div className="m-widget__account">
            <div className="m-widget__account__header">
                <figure className="m-widget__account__logo">
                    <img src="../assets/images/gtb.svg" />
                </figure>
                <h5 className="m-widget__account__title">Choose Account</h5>
                <span className="m-widget__account__sub-text">Please select an account to continue</span>
            </div>
            <div className="m-widget__account__body accounts">
                {
                    accounts.map((account, id) => <Account key={id} id={id} selectAccount={selectAccount} account={account} />)
                }
                <button disabled={account === null} className="m-btn m-btn--gtb" onClick={next}>Continue</button>
            </div>
        </div>
    )
}

export default WidgetAccount
