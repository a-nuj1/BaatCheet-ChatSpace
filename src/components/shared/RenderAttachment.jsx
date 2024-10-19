import React from 'react'
import { transformUrl } from '../../lib/features';
import { FileOpen as FileOpenIcon} from '@mui/icons-material';

function RenderAttachment({file,url}) {
  switch(file){
    case 'video':
      return <video src={url} controls width='200px' height='200px' preload='none'/>

    case 'audio':
        return <audio src={url} controls preload='none'/>

    case 'image':
        return <img src={transformUrl(url,200)} alt='attachment' width='200px' height='150px' style={{objectFit: 'contain'}}/>;

        
    default:
        return <FileOpenIcon/>
  }
}

export default RenderAttachment