module.exports = function(app, mongoose) {
let User = require('../models/User');
let Blog = require('../models/Blog');
let Post = require('../models/Post');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
};

//CREATE BLOG
app.get('/blog/create', isLoggedIn, (req, res, next) => {
	res.render('blog/blog_create');
})

app.post('/blog/create', (req, res, next) => {
	User.findOne({username: req.user.username}, (err, owner) => {
		if(err) console.error(err);
		let newBlog = new Blog();
		newBlog.name = req.body.blog_title;
		newBlog.desc = req.body.blog_desc;
		newBlog.owner = owner._id;
		newBlog.save( (err, blog) => {
			if(err) console.error(err);
			owner.blogs.push(newBlog);
			owner.save();
		});
	})
	res.redirect(`/profile/${req.user.username}`);
});

//VIEW BLOG
app.get('/blog/:blog_id', (req, res, next) => {
	Blog.
	findOne({_id: req.params.blog_id}).
	populate('owner').
	populate({
		path: 'posts',
		populate: {path: 'author'}
	}).
	exec((err, blog) => {
		if(err) console.error(err);
		let owner_username = blog.owner.username;
		if(req.user) {//USER view
			User.findOne({_id: req.user._id}, (err, user) => {
				if(user.username === owner_username) {
					res.render('blog/blog_owner_view', {
						blog: blog,
						user: user,
						posts: blog.posts,
					});
				} else {
					res.render('blog/blog_regular_view', {
						blog: blog, posts: blog.posts,
					});
				}
			}); //end of User.findOne()
		} else {//GUEST view
			res.render('blog/blog_regular_view', {
				blog: blog, posts: blog.posts,
			});
		}

	}); //end of exec()
}); //end of app.get()


//CREATE BLOG POST
app.get('/blog/:blog_id/post', isLoggedIn, function(req, res, next) {
	res.render('blog/blog_create_post', {
		blog_id: req.params.blog_id,
	});
})

app.post('/blog/:blog_id/post', isLoggedIn, function(req, res, next) {
	Blog.findOne({_id: req.params.blog_id}, (err, blog) => {
		if(err) console.log(err);
		let newPost = new Post();
		newPost.title = req.body.post_title;
		newPost.author = req.user._id;
		newPost.body = req.body.post_body.split(/[\r\n]+/);
		newPost.save( (err, post) => {
			blog.posts.push(newPost);
			blog.save();
		});
	})
	res.redirect(`/blog/${req.params.blog_id}`);
})
}
