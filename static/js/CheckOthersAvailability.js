function addUser() {
    var select = document.getElementById("search");
    var user = select.value;
    if (user.trim() !== '') {
      var list = document.getElementById("user-list");
      var item = document.createElement("li");
      item.appendChild(document.createTextNode(user));
      list.appendChild(item);
      select.selectedIndex = 0;
    }
  }