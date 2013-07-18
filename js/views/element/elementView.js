define([
    "underscore",
    "backbone"
], function(_, Backbone) {
    var ElementView = Backbone.View.extend({
        initialize: function(options) {
            this.model = options.model;
            this.el = options.el;
            this.optionsView = options.optionsView;
            this.previewView = options.previewView;
            this.bindEvents;
        },
        events: {
            "click .toggle-visual-settings": "toggleVisualSettings",
            "click .toggle-settings": "toggleSettings",
            "click .delete": "removeField",
            "sort:start": "startSorting",
            "sort:stop": "stopSorting"
        },
        bindEvents: function() {
            this.listenTo();
        },
        toggleSettings: function(e) {
            if (!this.optionToggle) {
                this.settingsToggle = this.$el.find(".field-settings");
                this.settingsToggle.html(this.optionsView.render().el);
            };
            this.optionToggle.slideToggle(160);
        }
    });
    return ElementView;
});