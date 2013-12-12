module.exports = function(app) {
  app.get('/admin/blog/add', function(req, res) {
    res.render('blog/index', {blog_title: "Blog add"});
  });
}
