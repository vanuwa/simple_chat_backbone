/**
 * Created with WebStorm.
 * User: Va Nuwa
 * Date: 12/2/13
 * Time: 11:38 PM
 * To change this template use File | Settings | File Templates.
 */
(function (scope) {
	"use strict";

	var UserView = Backbone.View.extend({
		render: function () {
			this.el = this.template(this.model.toJSON());
			return this;
		}
	});

	/* export */
	scope.UserView = UserView;
}(this));