var Friends = {
  toggleStatus: function(username) {
    $(`[from="${username}"]`).toggleClass("friendsList");
  },


  initialize: function() {
    $('.username').click(function() {
      var username = $(this).message();
    });
  }

};
