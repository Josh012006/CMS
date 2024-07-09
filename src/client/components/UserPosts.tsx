import axios from "axios";
import Post from "./Post";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import User from "../../server/interfaces/userInterface";
import PostInterface from "../../server/interfaces/postInterface";


function UserPosts() {
    const [posts, setPosts] = useState<PostInterface[] | []>([]);

    useEffect(() => {   
        console.log(posts);
    }, [posts]);

    useEffect(() => { 

        const user: User = JSON.parse(Cookies.get("user") as string);

        async function fetchPosts() {   
            try {
                const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}getPosts/`, JSON.stringify({email: user.email}), { headers: { 'Content-Type': 'application/json' }, validateStatus: (status: any) => status >= 200 });
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchPosts();
    }, []);


    return (
        <>
            <h1 className='text-center font-bold text-2xl my-2'>My Posts</h1>
            <div className="flex flex-col items-center justify-around">
                {posts.length !== 0 && posts.map((post: any) => {return <Post key={post._id} postID={post._id} mediaType={post.mediaType} Content={post.content} mediaID={post.mediaID} Title={post.title} Likes={post.likes} Comments={post.comments} date={post.createdAt} Author={post.author} />} )}
            </div>
        </>
    );
}



export default UserPosts;