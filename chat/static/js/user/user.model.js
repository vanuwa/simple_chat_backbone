/**
 * Created with WebStorm.
 * User: Va Nuwa
 * Date: 12/2/13
 * Time: 11:38 PM
 * To change this template use File | Settings | File Templates.
 */
(function (scope) {
	"use strict";

	var User = Backbone.Model.extend({});

	var Users = Backbone.Collection.extend({
		model: User,
		url: 'list_users_json',
		parse: function (response) {
			return response.users || [];
		}
	});

	/* export */
	scope.User = User;
	scope.Users = Users;
}(this));
