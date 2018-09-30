import Component from '../lib/component.js';
import items from '../todo/index.js';

export default class Count extends Component {
    constructor(props={}) {
        super({
            items,
            element: document.querySelector(props.componentElement)
        });
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
      const createString = require('../templates/count-template');
      this.element.innerHTML = createString(items.state);
    }
}
