const mongoose = require("mongoose")
const moment = require('moment');
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology:", true);
mongoose.set("createIndexes", true);
mongoose.connect('mongodb://localhost:27017/db_post');

/**
 * detine the user model used to store the user information
 */
const UserSchema = new mongoose.Schema({
    username: { type: String, default: '' },
    password: { type: String, default: '123456' },
    email: { type: String, unique: true },
    photo: { type: String, default: '/uploads/default.jpg' },
    // indicate whether or not it was acivated
    isActivated: { type: Boolean, default: false },
    // the activate code
    activateCode: { type: String, default: '' },
    createdDate: { type: Date, default: Date, get: v => moment(v).format('MMMM Do YYYY, h:mm:ss a') }
});
const User = mongoose.model("User", UserSchema);


/**
 * define the post model used to store the post information
 */
const PostSchema = new mongoose.Schema({
    // refferences the user id indicating the publisher of the post
    publisher: { type: mongoose.Types.ObjectId, ref: 'User' },
    // post title
    title: { type: String, required: true },
    //  post content
    content: { type: String, default: '' },
    like: { type: Number, default: 0 },
    unlike: { type: Number, default: 0 },
    read: { type: Number, default: 0 },
    comment: { type: Number, default: 0 },
    createdDate: { type: Date, default: Date, get: v => moment(v).format('MMMM Do YYYY, h:mm:ss a') }
});
const Post = mongoose.model('Post', PostSchema);

/**
 * define the comment model used to store the comment information
 */
const CommentSchema = new mongoose.Schema({
    // the post corresponding to the specificed comment
    post: { type: mongoose.Types.ObjectId, ref: 'Post' },
    // the user who publish the comment
    commenter: { type: mongoose.Types.ObjectId, ref: 'User' },
    // comment content
    content: { type: String },
    createdDate: { type: Date, default: Date, get: v => moment(v).format('MMMM Do YYYY, h:mm:ss a') }
});
const Comment = mongoose.model('Comment', CommentSchema);

async function userInsert() {
    let rs = await User.insertMany([{
        username: 'admin',
        password: 'admin',
        email: 'admin@sina.com',
        photo: ''
    }]);
    console.log('returned result: {}', rs);
}

async function postInsert() {
    let __rs = await Post.insertMany([
        {
            publisher: '5d99b36f42463862a5bdeed5',
            title: 'adopt a litter cat',
            content: 'I want to adopt a small cat, who have it?'
        }
    ]);
    console.log('post data insert result: {}', __rs);
}

async function insertComment() {
    let __rs = await Comment.insertMany([
        {
            post: '5d99b7604b1ebb66ef5b5cc7',
            commenter: '5d99b36f42463862a5bdeed5',
            content: 'This kink cat, I also like very much!'
        }
    ]);
    console.log('insert result: {}', __rs);
}

async function queryAllPost() {
    let __queryRs = await Post.find().populate('publisher');
    console.log('all the post are: {}', __queryRs);
    console.log('the publisher information is: {}', __queryRs.publisher_id);
}

async function queryCommentOfPost() {
    let __queryRs = await Comment.find({
        post: '5d99b7604b1ebb66ef5b5cc7'
    }).populate('commenter');
    console.log('the specificed post comment of the {} post are: {}', '5d99b7604b1ebb66ef5b5cc7', __queryRs);
}

function test() {
    // userInsert();
    // postInsert();
    // queryAllPost();
    // insertComment();
    queryCommentOfPost();
}

// test();

module.exports = { User, Post, Comment }