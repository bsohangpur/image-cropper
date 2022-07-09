import React, { useState } from 'react';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import './App.css'

const App = () => {
  const [src, setFile] = useState(null);
  const [crop, setCrop] = useState({});
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handdleFile = e => {
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  function getCroppedImg() {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(

      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    const baseImage = canvas.toDataURL('image/jpeg');
    setResult(baseImage)
  }



  return (
    <div className='container'>
      <div className="input-box">
        <label class="file">
          <input className='input-img-btn custom-file-input' type="file" accept='image/*' onChange={handdleFile}/>
            <span class="file-custom"></span>
        </label>
      </div>
      <div className="image-output">
        {src && <div className="image-box">
          <ReactCrop src={src} crop={crop} onImageLoaded={setImage} onChange={setCrop} />
          <button className='button' onClick={getCroppedImg} >Crop Image</button>
        </div>}
        {
          result && <div className="cropped-image-box">
            <img src={result} alt="cropped" />
            <a className='download-btn' href={result} download={result}>DownLoad Image</a>
          </div>
        }
      </div>

    </div>
  )
}

export default App