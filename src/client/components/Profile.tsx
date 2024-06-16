import { useNavigate } from "react-router-dom";
import Header from "./Header";

import Cookies from "js-cookie";
import User from "../../server/interfaces/userInterface";




function Profile() {


    const navigate = useNavigate();

    const user: User = JSON.parse(Cookies.get("user") as string);

    return(
        <>
            <Header />
            <div className="flex flex-col items-center w-full">
                <h1 className="font-bold text-xl my-3 mx-auto">My Profile</h1>
                <form className='flex flex-col justify-around w-9/12 lg:w-1/4 mx-auto mt-28 bg-white rounded-lg p-5'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={user.username} readOnly className="border border-black rounded-lg p-2" />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={user.email} readOnly className="border border-black rounded-lg p-2" />
                    <label htmlFor="password">Password:</label>
                    <input type="text" id="password" value={user.password} readOnly className="border border-black rounded-lg p-2" />
                    <button type="button" className="text-white mx-2 bg-black p-2 rounded-lg my-3" onClick={() => {
                        navigate('/logout');
                    }}>Logout</button>
                </form>
            </div>
        </>
    )
}


export default Profile;