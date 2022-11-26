// export const backendUrl = "https://amal-admin.herokuapp.com"
export const backendUrl = "http://127.0.0.1:5000"


export const Cookies = {
  set: function (name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  get: function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  delete: function (name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

export const Sidebar = {
  /**
   * Initialize the sidebar functionality.
   */
  init() {
    document.getElementById('backdrop').onclick = function () {
      this.style.display = 'none';
      document.querySelector('.sidebar.open').classList.remove('open');
      document.body.classList.remove('sidebar-open');
    }
  },
  /**
   * Opens the sidebar.
   * @param {String} id the id of the sidebar that will be opened. 
   */
  open(id) {
    document.getElementById('backdrop').style.display = 'block';
    document.getElementById(id).classList.add('open');
    document.body.classList.add('sidebar-open');
  },
  /**
   * Closes the sidebar.
   * @param {String} id the id of the sidebar that will be closed.
   */
  close(id) {
    document.getElementById('backdrop').style.display = 'none';
    document.getElementById(id).classList.remove('open');
    document.body.classList.remove('sidebar-open');
  }
}