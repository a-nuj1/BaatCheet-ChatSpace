const fileFormate = (url) =>{
    const fileExt = url.split('.').pop();

    if(fileExt === 'mp4' || fileExt === 'webm' || fileExt === 'ogg'){
        return 'video';
    }
    if(fileExt === 'mp3' || fileExt === 'wav' ){
        return 'audio';
    }
    if(fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif'){
        return 'image';
    }
    return 'file';
}

const transformUrl = (url = " ", width = 100)=>url; 


export { fileFormate , transformUrl};