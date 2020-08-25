import { h } from 'preact'

function Account({account, selectAccount, id}) {
    return (
        <>
            <input type="radio" name="account" value={`account-${id}`} id={`account-${id}`} onChange={selectAccount} />
            <label className="m-widget__account__account" for={`account-${id}`}>
                <div className="m-widget__account__account__icon">₦</div>
                <div className="m-widget__account__account__info">
                    <p className="m-widget__account__account__info__name">{account.name}</p> 
                    <p className="m-widget__account__account__info__number">{account.number}</p>
                    <p className="m-widget__account__account__info__balance">{account.balance}</p>
                </div>
            </label>
        </>
    )
}

export default Account
