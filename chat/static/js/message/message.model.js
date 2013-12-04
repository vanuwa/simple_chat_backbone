/**
 * Created with WebStorm.
 * User: Va Nuwa
 * Date: 12/2/13
 * Time: 11:37 PM
 * To change this template use File | Settings | File Templates.
 */
(function (scope) {
	"use strict";

	var Message = Backbone.Model.extend({
		url: 'post_message',
		sync: function (method, model, options) {
			options = options || {};
            if (method === 'create') {
				model.set('csrfmiddlewaretoken', $.cookie('csrftoken'));
				options.beforeSend = function (xhr) {
					xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));
				};
			}
			return Backbone.sync.apply(this, arguments);
		}
	});

	var Messages = Backbone.Collection.extend({
		model: Message,
		url: 'last_messages_json',
		parse: function (response) {
			var self = this;
			return response.messages || [];
		}
	});

	/* export */
	scope.Message = Message;
	scope.Messages = Messages;
}(this));
