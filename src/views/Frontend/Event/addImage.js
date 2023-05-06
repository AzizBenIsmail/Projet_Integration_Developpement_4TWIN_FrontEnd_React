import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import {  Modal, Slider } from '@material-ui/core';
import { Button} from "react-bootstrap";
import { Crop } from '@material-ui/icons'; 

export default function AddImage (props) {
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspectRatio, setAspectRatio] = useState(props.aspect);
    const [showModal, setShowModal] = useState(false);
  
    const onFileChange = (event) => {
      if (event.target.files && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          setImage(reader.result);
          setShowModal(true);
        };
      }
    };
  
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedImage(croppedAreaPixels);
    }, []);
    const handleCrop = useCallback(async () => {
        const croppedImageBlob = await getCroppedImg(image, croppedImage, aspectRatio);
        const croppedImageUrl = URL.createObjectURL(croppedImageBlob);
        setCroppedImage(croppedImageUrl);
        setShowModal(false);
        props.onEvent(croppedImageUrl,croppedImageBlob);
      }, [image, croppedImage, aspectRatio]);
    
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
    const getCroppedImg = async (imageSrc, pixelCrop, aspectRatio) => {
        const image = new Image();
        image.src = imageSrc;
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const aspectWidth = pixelCrop.height * aspectRatio;
        const aspectHeight = pixelCrop.width / aspectRatio;
        let sourceX = pixelCrop.x * scaleX;
        let sourceY = pixelCrop.y * scaleY;
        let sourceWidth = pixelCrop.width * scaleX;
        let sourceHeight = pixelCrop.height * scaleY;
        if (aspectWidth <= sourceWidth && aspectHeight <= sourceHeight) {
          if (aspectWidth > aspectHeight) {
            sourceHeight = sourceWidth / aspectRatio;
          } else {
            sourceWidth = sourceHeight * aspectRatio;
          }
        }
        if (aspectWidth <= sourceWidth) {
          sourceY += (sourceHeight - aspectHeight) / 2;
          sourceHeight = aspectHeight;
        } else {
          sourceX += (sourceWidth - aspectWidth) / 2;
          sourceWidth = aspectWidth;
        }
        ctx.drawImage(
          image,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        return new Promise((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Failed to crop image'));
              return;
            }
            resolve(blob);
          }, 'image/jpeg', 1);
        });
      };
      
    return (
      <div>
        <style>
            {`.modal-content {
          
            width :600px;
            height : 500px;
            margin: 0 auto;
            }

            .cropped-image {
            max-width: 100%;
            max-height: 400px;
            margin: 0 auto;
            }
            .slider-container {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            }`}
        </style>
       
    <div className="input-group">
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="eventImage" name="event_img"  onChange={onFileChange} accept="image/*"/>
          <label className="custom-file-label" htmlFor="eventImage"><i className="ni ni-image" />  {props.holder}</label>
        </div>
    </div>
        
        <Modal open={showModal} onClose={handleCloseModal} className="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Crop Image</h2>
              <Button onClick={handleCloseModal}>Close</Button>

            </div>
            <div className="modal-body">
              {image && (
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspectRatio}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  
                />
              )}
              <div className="slider-container"  >
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => setZoom(zoom)}
                  
                />
              </div>
            </div>
            <div className="modal-footer">
              <Button variant="contained" color="primary" onClick={handleCrop}>
                <Crop /> Crop Image
              </Button>
            </div>
          </div>
        </Modal>


      </div>
    );
  };
  