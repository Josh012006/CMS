import axios from "axios";
import { useState } from "react";



function Post({ postID, mediaType, mediaID, Title, Content, Likes, Comments, date, Author }: { postID: string, mediaType: string, mediaID: string, Title: string, Content:string, Likes: number, Comments: string[], date: string, Author: string }) {

    const apiUrl = import.meta.env.VITE_APP_API_URL;

    const [comments, setComments] = useState(Comments);
    const [actualComment, setActualComment] = useState('');
    const [liked, setLiked] = useState(false);

    const [likes, setLikes] = useState(Likes);


    const handleLike = async (e: React.MouseEvent<HTMLInputElement>) => {
        try {
            const element = e.target as HTMLInputElement;

            if (!liked) {
                element.src = "/liked.png";
                setLikes(likes + 1);

                // Add a like to the post
                const addLikeResult = await axios.patch(`${apiUrl}addLike`, JSON.stringify({ postID }), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    validateStatus: (status: any) => status >= 200,
                });

                console.log(addLikeResult.data);
            } else {
                element.src = "/like.png";
                setLikes(likes - 1);

                // Remove a like from the post
                const removeLikeResult = await axios.patch(`${apiUrl}removeLike`, JSON.stringify({ postID }), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    validateStatus: (status: any) => status >= 200,
                });

                console.log(removeLikeResult.data);
            }

            setLiked(!liked);
        } catch (error) {
            console.log("Error while managing likes ", error);
        }
    }

    const handleCommentAddition = async () => {  
        try {
            // Add a comment to the post
            const addCommentResult = await axios.post(`${apiUrl}addComment`, JSON.stringify({postID, comment: actualComment}), {
                headers: {
                    'Content-Type': 'application/json',
                },
                validateStatus: (status: any) => status >= 200,
            });


            setComments([...comments, actualComment]);
            setActualComment('');
            
        } catch (error) {
            console.log("Error while adding comment ", error);
        }
    }


    return (
        <div className="rounded-lg p-3 border-1 border-black m-3 w-4/5 flex flex-col justify-around lg:w-4/12 bg-white">
            <div>
                {mediaType === "image" ? <img src={`${apiUrl}getMedia/${mediaID}`} alt="Post" style={{width: "90%"}} className="my-3 rounded-lg mx-auto" /> : <video src={`${apiUrl}getMedia/${mediaID}`} controls autoPlay style={{width: "90%"}} className="my-3 rounded-lg mx-auto" />}
                <h1 className="text-xl font-bold text-center my-3">{Title}</h1>
                <p className="text-justify my-2 min-h-28">{Content}</p>
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <span className="text-justify mr-2">{date}</span>
                    <span className="text-justify font-bold ml-2">{Author}</span>
                </div>
            </div>
            <div className="flex justify-around items-center my-4">
                <span className="font-bold">{likes} likes</span>
                <input type="image" width="24" height="24" alt="Like" src="/like.png" onClick = {handleLike} />
            </div>
            <div className="flex flex-col">
                <div className="border border-black rounded-lg my-2">{comments.map((cmt) => {return <p className="m-2 text-start" key={cmt}>- {cmt}</p>})}</div>
                <div className="flex flex-col lg:flex-row justify-around items-center my-2">
                    <input type="text" placeholder="Add a comment..." className="rounded-lg border border-black mx-2 min-h-12 p-2" value = {actualComment} onChange={(e) => {setActualComment(e.target.value)}} />
                    <button type='button' className="text-white mx-2 bg-black p-2 rounded-lg my-2" onClick = {handleCommentAddition}>Add comment</button>
                </div>
            </div>
        </div>
    );
}


export default Post;