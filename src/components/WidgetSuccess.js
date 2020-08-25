import { h } from 'preact'

function WidgetSuccess() {
    return (
        <div className="m-widget__success">
            <div className="m-widget__success__inst">
                <figure className="m-widget__success__inst__logo left">
                    <img src="../assets/images/barter.svg" />
                </figure>
                <div className="m-widget__success__inst__checkmark" />
                <figure className="m-widget__success__inst__logo right">
                    <img src="../assets/images/gtb.svg" />
                </figure>
                <figure className="m-widget__success__inst__connector">
                    <img src="../assets/images/dashed-success-stroke.svg" />
                </figure>
            </div>
            <div className="m-widget__success__info">
                <h4 className="m-widget__success__info__title">Successful!</h4>
                <p className="m-widget__success__info__sub-text">Your bank account has been successfully linked to Barter</p>
            </div>
            <button className="m-btn m-btn--white" data-close-widget="gtb-barter">Continue</button>
        </div>
    )
}

export default WidgetSuccess
