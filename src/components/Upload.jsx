import React, { useState, useEffect } from 'react';
import { storage } from './firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage'; // Correct import path
import { v4 as uuidv4 } from 'uuid';
import './Upload.css'

import './Upload.css'
import Profile from './Profile';

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
      }
    };

    fetchImages();
  }, [imageListRef]);

  const uploadImage = () => {
    if (!image || image.length === 0) return; // Check if images are selected

    // Add the spin class to the button
    const button = document.querySelector('button[type="submit"]');
    button.classList.add('spin');

    const uploadPromises = Array.from(image).map((file) => {
      const imageName = file.name + uuidv4(); // Generate unique name using uuidv4
      const imageRef = ref(storage, `images/${imageName}`);
      return uploadBytes(imageRef, file);
    });

    Promise.all(uploadPromises)
      .then(() => {
        console.log('Images uploaded successfully');
        // Remove the spin class from the button
        button.classList.remove('spin');
      })
      .catch((error) => {
        console.error('Error uploading images:', error);
        // Remove the spin class from the button
        button.classList.remove('spin');
      });
  };

  return (
    <div className=''>
      <div class="image-uploader">
        <label for="image-upload" class="custom-file-upload">
          <i class="fas fa-cloud-upload-alt"></i>
        </label>
        <input type="file" id="image-upload" className="hidden" onChange={(event) => setImage(event.target.files)} multiple />
<button type="submit" onClick={uploadImage}>Add</button>
      </div>

      <div className="image-container">

        <div className='image-gallery'>

          {imageList.map((url, index) => (
            <div className='images'>
              <div className='card'>
                <img key={index} src={url} alt="" />
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}

export default Upload;