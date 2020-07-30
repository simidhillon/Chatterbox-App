var MessageView = {

  render: _.template(`

      <div class="chat">
        <div class="username" from="<%-username%>"><a href="#"><%-username%></a></div>
        <div from="<%-username%>"><%-message%></div>
      </div>

    `)

};




