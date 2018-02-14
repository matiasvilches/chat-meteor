Meteor.subscribe("messages", {
  onReady: function() {
    scrollToBottom();
    autoScrollingIsActive = true;
  }
});

Template.body.helpers({
  recentMessages: function() {
    return Messages.find({}, {
      sort: {
        createdAt: 1
      }
    });
  },
  thereAreUnreadMessages: function() {
    return thereAreUnreadMessages.get();
  }
});

Template.message.onRendered(function() {
  if (autoScrollingIsActive) {
    scrollToBottom(250);
  } else {
    if (Meteor.user() && this.data.username !== Meteor.user().username) {
      thereAreUnreadMessages.set(true);
    }
  }
});

Template.body.events({
  "submit .new-message": function(event) {
    var text = event.target.text.value;

    Meteor.call("sendMessage", text);

    event.target.text.value = "";
    event.preventDefault();
  },
  "submit .new-message": function(event) {
    var messageText = event.target.text.value;

    Meteor.call("sendMessage", messageText);
    scrollToBottom(250); // <--add this line

    event.target.text.value = "";
    event.preventDefault();
  },
  "scroll .message-window": function() {
    var howClose = 80; // # pixels leeway to be considered "at Bottom"
    var messageWindow = $(".message-window");
    var scrollHeight = messageWindow.prop("scrollHeight");
    var scrollBottom = messageWindow.prop("scrollTop") + messageWindow.height();
    var atBottom = scrollBottom > (scrollHeight - howClose);
    autoScrollingIsActive = atBottom
      ? true
      : false;
    if (atBottom) {
      thereAreUnreadMessages.set(false);
    }
  },
  "click .more-messages": function() {
    scrollToBottom(500);
    thereAreUnreadMessages.set(false);
  }
});

Accounts.ui.config({passwordSignupFields: "USERNAME_ONLY"});
