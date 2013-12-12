module.exports = function(app) {
  app.get('/admin', function(req, res) {
    res.render('blog/index', {blog_title: "Blog title"});
  });
}
