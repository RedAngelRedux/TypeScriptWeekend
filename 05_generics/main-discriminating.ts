// This does the same as main.js, but uses "Discriminating Unions" to make Result more accurate

import { fetchPosts } from "./data/posts.js";
import { fetchTags } from "./data/tags.js";
import {type Page, type Post, type Tag, type TagName, type Result} from "./types.js";

// Possible Improvements:
// 1. Check return valule of API Call
// 2. Use Type Narrowing to ensure posts did return type Page<Post>
async function getPosts(): Promise<Result<Page<Post>>> {
    try {
        const rsp = await fetchPosts();    
        const posts = await rsp.json() as Page<Post>;
        return {
            success: true,
            value: posts
        }
        
    }
    catch(error) {
        console.error("Error fetching posts: ",error);
        return {
            success: false,
            error: "Failed to fetch posts"
        }
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

    const {success, value:posts, error} = await getPosts();

    let matchingPosts: Post[] = [];
    if(success) {
        matchingPosts = posts.data.filter(post => post.content.includes(tag));
    }

    return matchingPosts;
}

// // Both of these lines do the same thing, the second is a shorter version
// getPosts().then(posts => console.log(posts));
// getTags().then(console.log);
getPostsForTag('#NoExcuses').then(posts => console.log(posts));
