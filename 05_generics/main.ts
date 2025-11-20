import { fetchPosts } from "./data/posts.js";
import { fetchTags } from "./data/tags.js";
import {type Page, type Post, type Tag, type TagName} from "./types.js";

// Possible Improvements:
// 1. Check return valule of API Call
// 2. Use Type Narrowing to ensure posts did return type Page<Post>
async function getPosts() {
    try {
        const rsp = await fetchPosts();    
        const posts = await rsp.json() as Page<Post>;
        return posts;
    }
    catch(error) {
        console.error("Error fetching posts: ",error);
    }
}

// Example of older asyncronous calls
function getTags() {
    const tagsPromise = fetchTags()
        .then(rsp => rsp.json()as Promise<Page<Tag>>)
        .catch(error => console.error("Error fetching tags: ", error));
    return tagsPromise;
}

async function getPostsForTag(tag: TagName): Promise<Post[]> {

    const allPosts = await getPosts();
    let matchingPosts: Post[] = [];
    if(allPosts) {
        matchingPosts = allPosts.data.filter(post => post.content.includes(tag));
    }

    return matchingPosts;
}

// // Both of these lines do the same thing, the second is a shorter version
// getPosts().then(posts => console.log(posts));
// getTags().then(console.log);
getPostsForTag('#AI').then(posts => console.log(posts));
