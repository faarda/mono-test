import { h } from 'preact'
import { getNaira, getTime } from '../services/utilities'

function Transaction({transaction}) {
    return (    
        <li className="m-trans__tran">
            <div className="m-trans__tran__info">
                <p className="m-trans__tran__info__desc">{transaction.narration}</p>
                <span className="text-grey m-trans__tran__info__time">{getTime(transaction.date)}</span>
            </div>
            <span className={`m-trans__tran__amount ${transaction.type}`}>{transaction.type === 'debit' ? '-' : '+'}{getNaira(transaction.amount)}</span>
        </li>
    )
}

export default Transaction
