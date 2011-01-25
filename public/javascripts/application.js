var PasswordDatabase = Backbone.Model.extend({
  url: function() {
    identifier = '';
    if (this.get('id') != undefined) {
      identifier = id;
    }
    return '/dbs/' + identifier;
  },

  addPassword: function(password) {
    this.set({passwords: this.get("passwords").concat([password])});
  },

  lock: function(masterPassword) {

  },

  unlock: function(masterPassword) {

  },

  localSave: function() {
    localStorage.setItem("pwdkeeper", JSON.stringify(this.toJSON()));
  }

}, {
  localFetch: function() {
    var local = localStorage.getItem('pwdkeeper')
    if (local != null) {
      var json = JSON.parse(local);
      return new PasswordDatabase(json)
    }
    return new PasswordDatabase();
  }
});


var DatabaseView = Backbone.View.extend({
  events: {
    'click #add': 'add',
    'click #save': 'save'
  },

  render: function() {
    var html = Mustache.to_html($('#db_template').html(), this.model.toJSON());
    $(this.el).html(html);
    return this;
  },

  add: function() {
    var password = {
      title: $(this.el).find('.new .title').val(),
      username: $(this.el).find('.new .username').val(),
      password: $(this.el).find('.new .password').val()
    };
    this.model.addPassword(password);
    this.render();
  },

  save: function() {
    this.model.localSave();
  }
});

$(function() {
  var storage = localStorage.getItem('pwdkeeper');
  // var db = new PasswordDatabase({ passwords: [{title: 'github', username: 'pitluga', password: 'password'}]});
  var db = PasswordDatabase.localFetch();
  var view = new DatabaseView({model: db, el: $('#db')});
  view.render();
});
