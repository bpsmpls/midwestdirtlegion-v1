import $ from 'jquery';
import NavToggleView from 'views/navToggleView';

// Use container object instead
const SELECTORS = {
    NAV_TOGGLE: '[data-nav-toggle-target-id]',
};

/**
 * Application setup
 *
 * @class App
 */
export default class App {

    constructor() {
        return this.init();
    }

    init() {
        this.createChildren()
            .enable();
        return this;
    }

    /**
     * Create any child objects or references to DOM elements
     * Should only be run on initialization of the view
     *
     * @method createChildren
     * @public
     * @chainable
     */
    createChildren() {
        const navToggles = [];
        const slickCarousel = [];

        $(SELECTORS.NAV_TOGGLE).each(function(i) {
            navToggles[i] = new NavToggleView($(this));
        });

        return this;
    }

    /**
     * Enables the component
     * Performs any event binding to handlers
     *
     * @method enable
     * @public
     * @chainable
     */
    enable() {
        return this;
    }
}
