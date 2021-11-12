import React, { useEffect, useContext } from 'react';
import { Grid , CircularProgress } from '@material-ui/core';
import { PostContext } from '../../Contexts/PostContext';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = () => {
    const classes = useStyles();
    
    const { posts , getPosts } = useContext(PostContext);

    useEffect(() => {
        getPosts();
    },[])

    return (
       !posts.length ? <CircularProgress /> : (
           <Grid className={classes.container} >
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post}/>
                     </Grid>   
                ))}
           </Grid>
       )
    )
};

export default Posts
