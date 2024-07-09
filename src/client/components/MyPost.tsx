import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import NewPost from "./NewPost";
import UserPosts from "./UserPosts";
import Header from "./Header";


function MyPost() {

    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="flex flex-col items-center w-full">
                <h1 className="font-bold text-xl my-3 mx-auto">Posts</h1>
                <div className="flex justify-around mx-auto items-center">
                    <button type="button" className="text-white mx-2 bg-black p-2 rounded-lg my-3" onClick={()=> {navigate('/posts/myposts')}}>See my posts</button>
                    <button type="button" className="text-white mx-2 bg-black p-2 rounded-lg my-3" onClick={()=> {navigate('/posts/newPost')}}>Add new post</button>
                </div>
                <Outlet />
            </div>

            <Routes>
                <Route path="/newPost" element={<NewPost />} />
                <Route path="/myposts" element={<UserPosts />} />
            </Routes>
        </>
    );
}

export default MyPost;