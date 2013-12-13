module.exports = function(app) {
  app.get('/admin/users/add', function(req, res) {
    res.render('admin/users/add', {title: 'Add blog post'});
  });

  app.post('/admin/users/add', function(req, res) {
    console.log('Adding post');
  });
}
