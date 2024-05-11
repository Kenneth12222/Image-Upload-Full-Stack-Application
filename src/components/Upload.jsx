import React, { useState, useEffect } from 'react';
import { storage } from './firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import './Upload.css';

function Upload() {
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await listAll(imageListRef);
        const urls = await Promise.all(res.items.map(async (item) => {
          return await getDownloadURL(item);
        }));
        setImageList(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
        // Handle error fetching images
      }
    };

    fetchImages();
  }, [imageListRef]);

  const handleImageChange = (event) => {
    const selectedFiles = event.target.files;
    setImage(selectedFiles);
    uploadImages(selectedFiles);
  };

  const uploadImages = async (files) => {
    if (!files || files.length === 0) return; // Check if images are selected

    try {
      const uploadPromises = Array.from(files).map((file) => {
        const imageName = file.name + uuidv4();
        const imageRef = ref(storage, `images/${imageName}`);
        return uploadBytes(imageRef, file);
      });

      await Promise.all(uploadPromises);
      
      // Clear selected images after successful upload
      setImage(null);
    } catch (error) {
      console.error('Error uploading images:', error);
      // Handle error uploading images
    }
  };

  return (
    <div className='upload-container'>
      <div className="image-uploader">
        <label htmlFor="image-upload" className="custom-file-upload">
          <i className="fas fa-cloud-upload-alt"></i> Select Images
        </label>
        <input type="file" id="image-upload" className="hidden" onChange={handleImageChange} multiple />
      </div>

      <div className="image-container">
        <div className='image-gallery'>
          {imageList.map((url, index) => (
            <div className='images' key={index}>
              <div className='card'>
                <img src={url} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upload;

