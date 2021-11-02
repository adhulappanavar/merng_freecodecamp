const postResolvers = require ('./posts')
const userResolvers = require ('./users')
const commentsResolvers = require ('./comments')
const User = require('../models/users');
//const postUserResolver = require ('./posts_userref')


module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length,
        user: (parent, args, context) => {
            console.log("Parent ....")
            console.log(parent);
            const refuserid = parent.user;
            console.log("User ID  ....");
            console.log(refuserid);
            const refuser = User.findById(refuserid);
            // const refuser = new User({
            //     email: new String("a@b.c"),
            //     username: new String ("anil"),
            //     password: new String("aaaa"),
            //     createdAt: new Date().toISOString()
            //   });
            console.log("REF USER ....")
            console.log(refuser)
            return refuser;
        }
      },
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription: {
        ...postResolvers.Subscription
    }

}
