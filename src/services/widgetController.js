// this handles opening and closing of widget
class WidgetController {
    constructor(widgetId) {
        this.widget = document.getElementById(`widget-${widgetId}`);
    }

    watchWidgets(){
        const openWidgetBtns = document.querySelectorAll('[data-open-widget]');
        const closeWidgetBtns = document.querySelectorAll('[data-close-widget]');

        openWidgetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.widget.classList.add('open');
            });
        });

        closeWidgetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.widget.classList.remove('open');

                const widgetClosed = new Event('widget-closed');
                this.widget.dispatchEvent(widgetClosed);
            });
        });
    }
}

export default WidgetController;