var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
  },

  render: function(messages, roomname) {
    this.$chats.empty();

    var html = '';
    for (var i = messages.length - 1; i >= 0; i--) {
      if (roomname !== undefined && messages[i]['roomname'] !== roomname) {
        continue;
      }
      this.renderMessage(messages[i]);
    }
    Friends.initialize();
  },

  renderMessage: function(message) {

    var html = MessageView.render({username: message['username'], message: message['message']});
    this.$chats.prepend(html);
    Friends.toggleStatus(message.username);
  }

};


