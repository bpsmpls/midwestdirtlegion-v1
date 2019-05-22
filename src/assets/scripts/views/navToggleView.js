import $ from 'jquery';

/**
 * An object of events used throughout this view file
 * @property EVENTS
 * @type {Object}
 * @final
 */
const EVENTS = {
    LOAD: 'load',
    CLICK: 'click',
    FOCUS_OUT: 'focusout',
};

/**
 * An object of Classes used in this view
 * @property CLASSES
 * @type {Object}
 * @final
 */
const CLASSES = {
    IS_ACTIVE: 'isActive',
};

/**
 * An object of Classes used in this view
 * @property ARIA_MESSAGES
 * @type {Object}
 * @final
 */
const ARIA_MESSAGES = {
    IS_ACTIVE_TRIGGER: 'Navigate to the code example',
    IS_INACTIVE_TRIGGER: 'Access the code example',
};

/**
 * classDescription
 *
 * @class className.
 * @constructor
 */
export default class NavToggle {
    constructor($trigger) {
        if (!$trigger) {
            throw ('Required $trigger configuration object not passed to NavToggleView constructor');
        }

        if (!$trigger instanceof $) { // jshint ignore:line
            throw ('Required $trigger object passed to NavToggleView constructor is the wrong type');
        }

        if (!$trigger.length) {
            return;
        }

        /**
         * A reference to the containing DOM element
         *
         * @property $trigger
         * @type {jQuery}
         * @public
         */
        this.$trigger = $trigger;

        /**
         * Tracks whether the view is enabled
         *
         * @default false
         * @property isEnabled
         * @type {Boolean}
         * @public
         */
        this.isEnabled = false;

        this.init();
    };

    /**
     * Initializes methods
     *
     * @method init
     * @public
     * @chainable
     */
    init() {
        this.setupHandlers()
            .createChildren()
            .enable();

        return this;
    }
    /**
     * SetupHandlers
     *
     * @method setupHandlers
     * @public
     * @chainable
     */
    setupHandlers() {
        this.onTriggerClickHandler = this.onTriggerClick.bind(this);
        this.onFocusOutHandler = this.onFocusOut.bind(this);

        return this;
    }
    /**
     * createChildren
     *
     * @method createChildren
     * @public
     * @chainable
     */
    createChildren() {
        this.$toggleTarget = $(this.$trigger.data('nav-toggle-target-id'));

        return this;
    }

    /**
     * Enable
     *
     * @method enable
     * @public
     * @chainable
     */
    enable() {
        if (this.isEnabled) {
            return this;
        }

        this.$trigger.on(EVENTS.LOAD, this.$trigger.attr('aria-label', ARIA_MESSAGES.IS_ACTIVE_TRIGGER));
        this.$trigger.on(EVENTS.CLICK, this.onTriggerClickHandler);
        this.$toggleTarget.on(EVENTS.FOCUS_OUT, this.onFocusOutHandler);
        this.$toggleTarget.on(EVENTS.LOAD, this.$toggleTarget.attr('aria-expanded', 'false'));

        this.isEnabled = true;

        return this;
    }
    /**
     * Disable
     *
     * @method disable
     * @public
     * @chainable
     */
    disable() {
        if (!this.isEnabled) {
            return this;
        }

        this.$trigger.off(EVENTS.LOAD, this.$trigger.attr('aria-label', ARIA_MESSAGES.IS_ACTIVE_TRIGGER));
        this.$trigger.off(EVENTS.CLICK, this.onTriggerClickHandler);
        this.$toggleTarget.off(EVENTS.FOCUS_OUT, this.onFocusOutHandler);
        this.$toggleTarget.off(EVENTS.LOAD, this.$toggleTarget.attr('aria-expanded', 'false'));

        this.isEnabled = false;

        return this;
    }

    /**
     *
     * @method activate
     * @type {jQuery}
     * @public
     */
    activate() {
        if (this.isActivated) {
            return this;
        }

        this.$trigger.addClass(CLASSES.IS_ACTIVE);
        this.$trigger.attr('aria-label', ARIA_MESSAGES.IS_ACTIVE_TRIGGER);
        this.$toggleTarget.attr('aria-expanded', 'true');
        this.$toggleTarget.addClass(CLASSES.IS_ACTIVE);

        this.isActivated = true;

        return this;
    };

    /**
     *
     * @method deActivate
     * @type {jQuery}
     * @public
     */
    deActivate() {
        if (!this.isActivated) {
            return this;
        }

        this.$trigger.removeClass(CLASSES.IS_ACTIVE);
        this.$trigger.attr('aria-label', ARIA_MESSAGES.IS_INACTIVE_TRIGGER);
        this.$toggleTarget.attr('aria-expanded', 'false');
        this.$toggleTarget.removeClass(CLASSES.IS_ACTIVE);

        this.isActivated = false;

        return this;
    };

    /**
     *
     * @method switchState
     *
     * @public
     */
    switchState() {
        if (this.isActivated) {
            this.deActivate();
        } else {
            this.activate();
        }

        return this;
    };

    // EVENT HANDLERS
    /**
     * Handles toggling of the states according to interaction
     * on the target
     *
     * @method onTriggerClick
     * @public
     * @param {Object}
     */

    onTriggerClick(event) {
        event.stopPropagation();

        this.switchState();
    };

    /**
     *
     * @method onFocusOut
     *
     * @public
     */
    onFocusOut() {
        setTimeout(() => {
            if (this.$toggleTarget.find(':focus').length === 0) {
                this.deActivate();
            }
        }, 1000);
    };
}
