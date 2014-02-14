var Billing = Class.create();

Billing.prototype = {
    stepContainer: null,

    /**
     * Required initialization
     *
     * @param id step id
     */
    initialize: function(id) {
        this.stepContainer = $('checkout-step-' + id);

        /**
         * Observe the customer choice regarding an existing address
         */
        $$('input[name="billing_address_id"]').each(
            function(element) {
                Event.observe(
                    $(element),
                    'change',
                    this.newBillingAddress.bindAsEventListener(this)
                );
            }.bind(this)
        );

        /**
         * Observe changes in the checkout method,
         */
        $$('input[name="checkout_method"]').each(
            function(element) {
                Event.observe(
                    $(element),
                    'change',
                    this.togglePassword.bindAsEventListener(this)
                );
            }.bind(this)
        );
    },

    /**
     * Toggles the new billing address form display depending on customer's
     * decision to use an existing address or to enter a new one.
     * Works for logged in customers only
     *
     * @param event
     */
    newBillingAddress: function(event) {
        var value;
        $$('input[name="billing_address_id"]').each(
            function(element) {
                if (!!element.checked) {
                    value = !!parseInt(element.value);
                }
            }
        );
        if (!value) {
            Element.show('billing-new-address-form');
        } else {
            Element.hide('billing-new-address-form');
        }
    },


    /**
     * Shows or hides the password field depending on the chosen checkout method
     *
     * @param event
     */
    togglePassword: function(event) {
        if (!$('register-customer-password')) {
            return;
        }
        if ($('billing-new-address-form').visible) {
            if ($('login:register') && $('login:register').checked) {
                Element.show('register-customer-password');
                return;
            }
        }

        Element.hide('register-customer-password');
    }

}
