import Component from '../lib/component.js';
import items from '../todo/index.js';

export default class Status extends Component {
    constructor() {
        super({
            items,
            element: document.querySelector('.js-status')
        });
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;
        let suffix = items.state.items.length !== 1 ? 's' : '';

        self.element.innerHTML = `${items.state.items.length} item${suffix}`;
    }
}
