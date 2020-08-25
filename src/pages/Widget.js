import { h } from 'preact'
import { ArrowLeft, X} from 'preact-feather'
import WidgetStart from '../components/WidgetStart'
import WidgetAccountLoading from '../components/WidgetAccountLoading'
import WidgetAccount from '../components/WidgetAccount'
import WidgetSuccess from '../components/WidgetSuccess'
import { useState, useEffect } from 'preact/hooks'


function Widget() {
    const [level, setLevel] = useState(0);

    const currentWidget = () => {
        switch(level) {
            case 0:
                return <WidgetStart next={next} />
            case 1:
                return <WidgetAccountLoading next={next} />
            case 2:
                return <WidgetAccount next={next} />
            default:
                return <WidgetSuccess />
        }
    }

    const hideBack = () => {
        return level === 0 || level === 3;
    }

    const next = () => {
        setLevel(level + 1);
    }

    const goBack = () => {
        setLevel(level - 1);
    }

    useEffect(() => {
        const openWidgetBtns = [...document.querySelectorAll('[data-open-widget]')];
        const closeWidgetBtns = [...document.querySelectorAll('[data-close-widget]')];

        openWidgetBtns[0].forEach(btn => {
            btn.addEventListener('click', () => {
                const widget = document.getElementById(`widget-${btn.dataset.openWidget}`);
                widget.classList.add('open');
            });
        });

        closeWidgetBtns[0].forEach(btn => {
            btn.addEventListener('click', () => {
                const widget = document.getElementById(`widget-${btn.dataset.closeWidget}`);
                widget.classList.remove('open');
                setLevel(0);
            });
        });

        return () => {
            openWidgetBtns[0].forEach(btn => {
                btn.removeEventListener('click', () => {});
            });

            closeWidgetBtns[0].forEach(btn => {
                btn.removeEventListener('click', () => {});
            });
        }
    }, [level, setLevel])

    return (
        <div className="m-main">
            <button className="m-btn m-btn--primary" data-open-widget="gtb-barter">Open Widget</button>
            <div className="m-widget__overlay" id="widget-gtb-barter">
                <div className="m-widget">
                    <div className={`m-widget__nav ${hideBack() ? 'm-widget__nav--right' : ''}`}>
                        {
                            hideBack() ?
                            null :
                            <button className="m-widget__nav__btn" onClick={goBack}>
                                <ArrowLeft size={20} />
                            </button>
                        }
                        <button className="m-widget__nav__btn" data-close-widget="gtb-barter">
                            <X size={20} />
                        </button>
                    </div>
                    {currentWidget()}
                </div>
                <p className="m-widget__brand mt-2">Powered with <img src="../assets/images/with-mono.svg" /></p>
            </div>
        </div>
    )
}

export default Widget
