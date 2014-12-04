(function (root, factory) {
    root.squid_api.view.OrderByView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        
        format : null,

        initialize : function(options) {
            if (this.model) {
                this.model.on('change', this.render, this);
            }
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_orderby_widget;
            }
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (d3) {
                    this.format = d3.format(",.1f");
                } else {
                    this.format = function(f){
                        return f;
                    };
                }
            }
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            "change": function(event) {
                if (event.target.checked !== undefined) {
                    if (event.target.checked) {
                        this.model.set({"orderbyDirection" : "DESC"});
                        console.log("ORDER BY: " + this.model.get("orderbyDirection"));
                    } else {
                        this.model.set({"orderbyDirection" : "ASC"});
                        console.log("ORDER BY: " + this.model.get("orderbyDirection"));
                    }
                } else {
                    var limit = parseInt($(event.target).val());
                    this.model.set({"limit" : limit});
                    console.log("LIMIT: " + this.model.get("limit"));
                }
            }
        },

        render : function() {

            var html = this.template();
            this.$el.html(html);
            this.$el.show();

            return this;
        }
    });

    return View;
}));