/**
 * Created with WebStorm.
 * User: Va Nuwa
 * Date: 12/2/13
 * Time: 7:21 PM
 * To change this template use File | Settings | File Templates.
 */
(function ($LAB) {
	$LAB.setGlobalDefaults({
		BasePath: "/static/"
	});
	$LAB
	.script('libs/jquery-1.10.2.js').wait()
	.script('libs/jquery.cookie.js').wait()
	.script('libs/bootstrap/js/bootstrap.min.js')
	.script('libs/underscore.js')
	.script('libs/backbone.js')
	.script('js/user/user.model.js')
	.script('js/message/message.model.js')
	.script('js/user/user.view.js')
	.script('js/message/message.view.js')
	.script('js/room.view.js')
	.wait(function () {
			/* let me start my app */

			var loadTemplate = function (url, callback) {
				$.ajax({
					url: url,
					method: 'get',
					dataType: 'html',
					async: false
				}).success(function (data) {
						if (typeof callback === 'function') {
							callback(data);
						}
					});
			};
			var makeMessageViewModel = function (messages, users) {
				_.each(messages, function (item) {
					item.authorName = _.findWhere(users, {id: item.author});
				});
				return new Messages().parse(messages);
			};

			var roomView = new RoomView({
				users: new Users(),
				messages:new Messages()
			});

			loadTemplate('/static/js/user/user.template.html', function (data) {
				UserView = UserView.extend({template: _.template(data)});
				roomView.users.fetch({reset: true});
			});

			loadTemplate('/static/js/message/message.template.html', function (data) {
				MessageView = MessageView.extend({template: _.template(data)});
				roomView.messages.fetch({reset: true});
			});

			window.roomView = roomView;

		});
}($LAB));
