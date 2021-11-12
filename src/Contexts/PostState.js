import React ,{ useState}  from 'react';
import { PostContext }  from './PostContext';
import { fetchPosts, createPost, updatePost, deletePost, likePost} from '../api';

export const PostState = ({children}) => {

    const [posts,setPosts] = useState([])

    const [currentPost,setCurrentPost] = useState(null);

    const getPosts = async () => {
        await fetchPosts()
        .then(res => setPosts(res.data))
        .catch(err => console.log(err))
        }

    const PostApi = async(postData) => {
        await createPost(postData)
       .then((res) => {
        console.log(res)   
        setPosts([...posts,res.data]) } )
       .catch((err) => {
             console.log(err)
       });
}
    const UpdatePostApi = async(id,updatedPost) => {

        await updatePost(id,updatedPost)
        .then((res) => { console.log(res);
        getPosts();
        } )
        .catch((err) => console.log(err));
    };
    const deletePostApi = async(id) => {
       await deletePost(id)
       .then((res) => {
           console.log(res)
           getPosts();
       }).catch(err => console.log(err))
    };

    const likePostApi = async(id) => {
        await likePost(id)
        .then(res => {
            console.log(res)
            getPosts()
        })
        .catch(err => console.log(err));
    }
return(
    <PostContext.Provider value={{
        posts,
        setPosts,
        getPosts,
        PostApi,
        UpdatePostApi,
        currentPost,
        setCurrentPost,
        deletePostApi,
        likePostApi
    }}>
        {children}
    </PostContext.Provider>
)

}