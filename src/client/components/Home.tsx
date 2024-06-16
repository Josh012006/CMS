import { useEffect, useState } from "react";
import Header from "./Header";

import Cookies from "js-cookie";

import axios from "axios";
import Post from "./Post";



function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(() => { 

        async function fetchPosts() {   
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}getAllPosts/`, { headers: { 'Content-Type': 'application/json' }, validateStatus: (status: any) => status >= 200 });
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchPosts();
    }, []);


    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-around">
                {posts && posts.map((post: any) => {return <Post key={post._id} postID={post._id} mediaType={post.mediaType} Content={post.content} mediaID={post.mediaID} Title={post.title} Likes={post.likes} Comments={post.comments} date={post.createdAt} Author={post.author} />} )}
            </div>
        </>
    );
}



export default Home;