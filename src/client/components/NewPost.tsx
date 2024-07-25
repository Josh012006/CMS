import axios from 'axios';
import Cookies from 'js-cookie';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useEffect, useState } from 'react'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)





function NewPost () {
    const [files, setFiles] = useState([] as any[]);
    const [error, setError] = useState('');

    const user = JSON.parse(Cookies.get('user') as string);

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);

            formData.append('media', files[0]);

            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}addMedia/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                validateStatus: (status: any) => status >= 200,
            });
            
            const title = formData.get('title') as string;
            const content = formData.get('content') as string;
            const mediaID = response.data._id;
            const mediaType = formData.get('mediaType') as string;
            const author = (user.email + " #" + user.username) as string;

            const post = { title, content, mediaID, mediaType, author };

            const result = await axios.post(`${import.meta.env.VITE_APP_API_URL}addPost/`, JSON.stringify(post), {
                headers: {
                    'Content-Type': 'application/json',
                },
                validateStatus: (status: any) => status >= 200,
            });

            console.log(result.data, result.status);

            if (result.status === 201) {

                const addPostToUser = await axios.post(`${import.meta.env.VITE_APP_API_URL}addUserPost/`, JSON.stringify({ email: user.email, postID: result.data._id }), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    validateStatus: (status: any) => status >= 200,
                });

                console.log(addPostToUser.data);

                form.reset();
                setFiles([]);
                setError('');
            } else {
                setError('Failed to add post');
            }



        } catch (error: Error | any) {
            setError(error.message);
        }
    }


    return (
        <>
            <h1 className='text-center font-bold text-2xl'>New Post</h1>
            {error !== '' && <p className='text-red-500 text-center p-4 rounded-lg border-red-500 bg-red-200 border w-9/12 lg:w-1/4 mt-16 mx-auto'>{error}</p>}
            <form className='flex flex-col justify-around w-9/12 lg:w-1/4 mx-auto my-14 bg-white rounded-lg p-5' onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" className="border border-black rounded-lg p-2" />
                <label htmlFor="content">Content:</label>
                <textarea id="content" name="content" className="border border-black rounded-lg p-2"></textarea>
                <label htmlFor="mediaType">Media Type:</label>
                <select id="mediaType" name="mediaType" className="border border-black rounded-lg p-2">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                </select>
                <label htmlFor="media">Media:</label>
                <FilePond
                    files={files}
                    onupdatefiles={(fileItems) => {
                        setFiles(fileItems.map((fileItem) => fileItem.file));
                    }}
                    allowMultiple={false}
                    maxFiles={1}
                    name="files" /* sets the file input name, it's filepond by default */
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
                <button type="submit" className="text-white mx-2 bg-black p-2 rounded-lg my-3">Add Post</button>
            </form>
        </>
    );
}

export default NewPost;