import { h } from 'preact'
import { AlertCircle } from 'preact-feather'

function WidgetStart({ next }) {
    return (
        <div className="m-widget__start">
            <div className="m-widget__start__insts">
                <figure className="m-widget__start__insts__logo">
                    <img src="../assets/images/barter.svg" />
                </figure>
                <figure className="m-widget__start__insts__logo mono">
                    <img src="../assets/images/mono.svg" />
                </figure>
                <figure className="m-widget__start__insts__logo">
                    <img src="../assets/images/gtb.svg" />
                </figure>
                <figure className="m-widget__start__insts__connector">
                    <img src="../assets/images/dashed-wavy-stroke.svg" />
                </figure>
            </div>
            <h2 className="m-widget__start__title"><b>Barter</b> needs your permission to read:</h2>
            <ul className="m-widget__start__info">
                <li className="m-widget__start__info__item">
                    <span className="m-widget__start__info__item__text">Your personal infromation</span>
                    <span><AlertCircle size={15} /></span>
                </li>
                <li className="m-widget__start__info__item">
                    <span className="m-widget__start__info__item__text">Your accounts</span>
                    <span><AlertCircle size={15} /></span>
                </li>
                <li className="m-widget__start__info__item">
                    <span className="m-widget__start__info__item__text">Your transactions</span>
                    <span><AlertCircle  size={15} /></span>
                </li>
                <li className="m-widget__start__info__item">
                    <span className="m-widget__start__info__item__text">Your balance</span>
                    <span><AlertCircle  size={15} /></span>
                </li>
            </ul>
            <button className="m-btn m-btn--primary mt-1" onClick={next}>Allow</button>
            <button className="m-btn m-btn--text mt-1" data-close-widget="gtb-barter">Cancel</button>
        </div>
    )
}

export default WidgetStart
