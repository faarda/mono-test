import { h } from 'preact'

function MyLoan() {
    return (
        <div className="m-main">
            <h1 className="m-title mb-1">Hello, Silas 👋🏾</h1>
            <div className="m-alert mb-1">
                <span className="icon">🎉</span>
                <p>Congratulations, we’re willing to offer you <b>₦200,000</b> for three months, with a monthy repayment of <b>₦70,000</b>.</p>
            </div>
            <p className="mt-2">Here's what we got from your bank</p>
            <div className="m-card mt-1 text-center">
                <p className="mb-1"><span className="text-grey">Account Name:</span> ADEDOYIN SILAS OLUWATOBI</p>
                <p className="mb-1"><span className="text-grey">Account Number:</span> 3463708015</p>
                <p className="mb-1"><span className="text-grey">Balance:</span> <span className="text-success">₦200,000</span></p>
            </div>
            <h3 className="m-title mb-1 mt-2">Recent Transactions</h3>
            <div className="m-card">
                <ul className="m-trans">
                    <li className="m-trans__tran">
                        <div className="m-trans__tran__info">
                            <p className="m-trans__tran__info__desc">Lorem ipsuim description</p>
                            <span className="text-grey m-trans__tran__info__time">19/10/2020 8:45pm</span>
                        </div>
                        <span className="m-trans__tran__amount debit">-500.00</span>
                    </li>
                    <li className="m-trans__tran">
                        <div className="m-trans__tran__info">
                            <p className="m-trans__tran__info__desc">Lorem ipsuim description</p>
                            <span className="text-grey m-trans__tran__info__time">19/10/2020 8:45pm</span>
                        </div>
                        <span className="m-trans__tran__amount credit">+25,000.00</span>
                    </li>
                    <li className="m-trans__tran">
                        <div className="m-trans__tran__info">
                            <p className="m-trans__tran__info__desc">Lorem ipsuim description</p>
                            <span className="text-grey m-trans__tran__info__time">19/10/2020 8:45pm</span>
                        </div>
                        <span className="m-trans__tran__amount debit">-500.00</span>
                    </li>
                    <li className="m-trans__tran">
                        <div className="m-trans__tran__info">
                            <p className="m-trans__tran__info__desc">Lorem ipsuim description</p>
                            <span className="text-grey m-trans__tran__info__time">19/10/2020 8:45pm</span>
                        </div>
                        <span className="m-trans__tran__amount credit">+25,000.00</span>
                    </li>
                    <li className="m-trans__tran">
                        <div className="m-trans__tran__info">
                            <p className="m-trans__tran__info__desc">Lorem ipsuim description</p>
                            <span className="text-grey m-trans__tran__info__time">19/10/2020 8:45pm</span>
                        </div>
                        <span className="m-trans__tran__amount debit">-500.00</span>
                    </li>
                    <li className="m-trans__tran">
                        <div className="m-trans__tran__info">
                            <p className="m-trans__tran__info__desc">Lorem ipsuim description</p>
                            <span className="text-grey m-trans__tran__info__time">19/10/2020 8:45pm</span>
                        </div>
                        <span className="m-trans__tran__amount credit">+25,000.00</span>
                    </li>
                </ul>   
            </div>
        </div>
    )
}

export default MyLoan
