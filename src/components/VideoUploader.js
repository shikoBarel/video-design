import React from 'react';
import {Button} from '@mui/material';

const VideoUploader = ({ onUpload  }) => {
  return (
      <div style={{ margin: '20px' }}>
      <input
        accept="video/*"
        style={{ display: 'none' }}
        id="contained-button-file"
        type="file"
        onChange={onUpload}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload Video &ensp;
          <i class="fa fa-upload"></i>
        </Button>
      </label>
    </div>
  );
};


export default VideoUploader;
