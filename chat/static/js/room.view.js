/**
 * Created by ivan on 12/3/13.
 */
(function (scope) {
	"use strict";

	var RoomView = Backbone.View.extend({
		el: $(".b-chat-room"),
		input: $(".b-chat-room__enter-new-message input[type='text']"),
		events: {
			/*"submit .b-chat-room__enter-new-message > form": "createMessage"*/
		},
		initialize: function () {
			this.users = arguments[0].users;
			this.messages = arguments[0].messages;

			this.listenTo(this.users, 'reset', this.renderUsers);
			this.listenTo(this.messages, 'reset', this.renderMessages);
			this.listenTo(this.messages, 'add', function () {
				this.messages.fetch('reset');
			});
		},
		render: function () {},
		renderUsers: function () {
			$(".b-chat-room__users").html("");
			this.users.each(function (item) {
				var view = new UserView({model: item});
				$(".b-chat-room__users").append(view.render().el);
			});
			return this;
		},
		renderMessages: function () {
			var self = this;
			$(".b-chat-room__messages").html("");
			this.messages.each(function (item) {
				self.appendMessage(item);
			});
			return this;
		},
		appendMessage: function (model) {
			var view = new MessageView({model: model});
			$(".b-chat-room__messages").append(view.render().el);
			return this;
		},
		createMessage: function (e) {
			if (this.input.val()) {
				this.messages.create({message: this.input.val()});
			}
			e.preventDefault();
			e.stopImmediatePropagation();
			return this;
		}
	});

	/* export */
	scope.RoomView = RoomView;
}(this));
