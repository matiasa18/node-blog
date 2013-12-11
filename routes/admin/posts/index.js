console.log('blog/index.js');

module.exports = function(app) {
  app.get('/admin/posts/add', function(req, res) {
    res.render('admin/posts/add', {title: "Add a post"});
  });
}