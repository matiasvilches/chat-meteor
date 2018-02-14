Messages = new Mongo.Collection("msgs");

Meteor.methods({
  sendMessage: function (message) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Messages.insert({
      messageText: message,
      createdAt: new Date(),
      username: Meteor.user().username
    });
  }
});

var autoScrollingIsActive = false;

thereAreUnreadMessages = new ReactiveVar(false);

scrollToBottom = function scrollToBottom (duration) {
  var messageWindow = $(".message-window");
  var scrollHeight = messageWindow.prop("scrollHeight");
  messageWindow.stop().animate({scrollTop: scrollHeight}, duration || 0);
};
