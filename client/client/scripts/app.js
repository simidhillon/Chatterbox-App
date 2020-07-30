var App = {

  $spinner: $('.spinner img'),

  username: 'anonymousTest',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    window.setInterval(Parse.readAll, 1000, function(data) {
      messages = data;
    });
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      messages = data;
      RoomsView.render(messages);
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
