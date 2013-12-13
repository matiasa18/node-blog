module.exports = function(app) {
  app.get('/admin/posts/add', function(req, res) {
    res.render('admin/posts/add', {title: 'Add blog post'});
  });

  app.post('/admin/posts/add', function(req, res) {
    console.log('Adding post');
  });
}
