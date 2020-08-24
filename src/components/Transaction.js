import { h } from 'preact'
import { getNaira } from '../services/loanCalculator'

function Transaction({transaction}) {
    return (    
        <li className="m-trans__tran">
            <div className="m-trans__tran__info">
                <p className="m-trans__tran__info__desc">{transaction.narration}</p>
                <span className="text-grey m-trans__tran__info__time">19/10/2020 8:45pm</span>
            </div>
            <span className={`m-trans__tran__amount ${transaction.type}`}>+{getNaira(transaction.amount)}</span>
        </li>
    )
}

export default Transaction
