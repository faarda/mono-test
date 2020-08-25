import { h } from 'preact'
import { useEffect } from 'preact/hooks'

function WidgetAccountLoading({ next }) {

    //load for 2secs then proceed
    useEffect(() => {
         const timeout = setTimeout(() => {
            next();
        }, 2000)
        
        return () => clearTimeout(timeout)
    }, [])

    return (
        <div className="m-widget__account">
            <div className="m-widget__account__header">
                <figure className="m-widget__account__logo">
                    <img src="../assets/images/gtb.svg" />
                </figure>
                <h5 className="m-widget__account__title">Logging in...</h5>
            </div>
            <div className="m-widget__account__body">
                <div className="m-spinner m-spinner--lg" />
            </div>
        </div>
    )
}

export default WidgetAccountLoading
