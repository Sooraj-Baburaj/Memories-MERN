import React, {useContext} from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { PostContext } from '../../../Contexts/PostContext';

const Post = ({ post }) => {
    const { setCurrentPost, deletePostApi, likePostApi } = useContext(PostContext);
    const classes = useStyles();

    const handleUpdate = () => {
        setCurrentPost(post)
    }

    const handleDelete = () => {
        deletePostApi(post._id);
    };

    const handleLike = () => {
        likePostApi(post._id)
    };

    return (
       <Card className={classes.card}>
           <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
           <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
           </div>
           <div className={classes.overlay2}>
                <Button style={{color : 'white'}} size="small" onClick={() => handleUpdate()}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
           </div>
           <div className={classes.details}>
           <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag}`)}</Typography>
           </div>
           <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
           <CardContent>
           <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
           </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {handleLike()}}>
                    <ThumbUpIcon fontSize="small" />
                    &nbsp;Like&nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => handleDelete()}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>

       </Card>
    )
}

export default Post;
