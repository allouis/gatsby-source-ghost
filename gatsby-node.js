const GhostAPI = require('./api');
const {PostNode, PageNode, TagNode, AuthorNode} = require('./nodes');

exports.sourceNodes = ({boundActionCreators}, configOptions) => {
    const {createNode} = boundActionCreators;

    return GhostAPI
        .fetchAllPosts(configOptions)
        .then(([posts, pages]) => {
            posts.forEach((post) => {
                createNode(PostNode(post));

                if (post.tags) {
                    post.tags.forEach((tag) => {
                        createNode(TagNode(tag));
                    });
                }

                if (post.authors) {
                    post.authors.forEach((author) => {
                        createNode(AuthorNode(author));
                    });
                }
            });
            pages.forEach((post) => {
                createNode(PageNode(post));

                if (post.tags) {
                    post.tags.forEach((tag) => {
                        createNode(TagNode(tag));
                    });
                }

                if (post.authors) {
                    post.authors.forEach((author) => {
                        createNode(AuthorNode(author));
                    });
                }
            });
        });
};
