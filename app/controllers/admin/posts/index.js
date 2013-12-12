module.exports = function(app) {
  app.get('/admin/blog/index', function(req, res) {
    res.render('blog/index', {blog_title: "Blog title"});
  });
}
