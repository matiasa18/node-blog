module.exports = function(app) {
  app.get('/admin/posts', function(req, res) {
    res.render('admin/posts/index', {title: 'Posts index'});
  });
}
