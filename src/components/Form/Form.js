import React , { useState, useEffect, useContext} from 'react';
import {TextField, Button, Typography , Paper } from '@material-ui/core';
import FileBase64 from  'react-file-base64';
import { PostContext } from '../../Contexts/PostContext';

import useStyles from './styles';

const Form = () => {
      const { PostApi , currentPost, UpdatePostApi, setCurrentPost} = useContext(PostContext);

      const [postData, setPostData] = useState({ creator: '', title: '', message:'', tags:'', selectedFile: ''});
    const classes = useStyles();

      useEffect(() => {
            if(currentPost != null) setPostData(currentPost)
      },[currentPost])

    const handleSubmit = (e) => {
            e.preventDefault();
      if(currentPost != null) {
            console.log(currentPost._id)
        UpdatePostApi(currentPost._id,postData);
      } else {
           PostApi(postData);
      }
      clear();
      }
      const clear = () => {
            setCurrentPost(null);
            setPostData({ creator: '', title: '', message:'', tags:'', selectedFile: ''})
      }

    return (
          <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                        <Typography variant="h6">{currentPost ? 'Editing' : 'Creating' } a Memory</Typography>
                        <TextField  name="creator"  variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => {setPostData({...postData, creator: e.target.value })}} />
                        <TextField  name="title"  variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => {setPostData({...postData, title: e.target.value })}} />
                        <TextField  name="message"  variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => {setPostData({...postData, message: e.target.value })}} />
                        <TextField  name="tags"  variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => {setPostData({...postData, tags: e.target.value.split(',') })}} />
                        <div className={classes.fileInput}>
                              <FileBase64 type="file" multiple={false} onDone={({base64}) => setPostData({...postData , selectedFile: base64 })} />
                        </div>
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
          </Paper>
    )
}

export default Form;

