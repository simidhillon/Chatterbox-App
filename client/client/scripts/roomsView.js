var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    this.$button.click(() => {
      var newRoom = Rooms.add();
      this.renderRoom(newRoom);
      MessagesView.render(messages, newRoom);
    });

    this.$select.change(() => {
      var roomname = $('select').val();
      console.log('roomname:', roomname);
      MessagesView.render(messages, roomname);
    });
  },

  render: function(messages) {
    var existingRooms = this.$select.children().map((i, elem) => $(elem).attr('value'));
    var html = "";
    var roomsInAllMessages = [];
    for (var i = 0; i < messages.length; i++) {
      roomsInAllMessages.push(messages[i]['roomname']);
    }

    var existingRoomsSet = new Set([...existingRooms]);
    var roomsInAllMessagesSet = new Set(roomsInAllMessages);
    var uniqueRooms = [...new Set([...existingRoomsSet, ...roomsInAllMessagesSet])];

    this.$select.empty();
    uniqueRooms.forEach(room => this.renderRoom(room));

    this.$select.change();
  },

  renderRoom: function(room) {
    this.$select.append(this.renderTemplate({room: room}));
  },

  renderTemplate: _.template(`
      <option value="<%-room%>"><%-room%></option>
    `)

};
