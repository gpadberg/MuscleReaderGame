import React, { useState, useEffect } from 'react';



const ImageChanger = () => {
    const images = ['clown.jpeg', 'snake.jpeg', 'spider.jpeg', 'Trypophobia.jpeg', 'shark.jpeg', 'heights.jpeg']

    const [start, setStart] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [changeCount, setChangeCount] = useState(0);

    useEffect(() => {
      if (changeCount < 5 && start) {
        const timeout = setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          setChangeCount((prevCount) => prevCount + 1);
        }, 5000);
  
        return () => clearTimeout(timeout); 
      }
    }, [start, changeCount]);    


      return (
        <div>
            <button onClick={() => setStart(true)}>Start</button>
          <img src={"ImagesForSlideshow/" + images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
        </div>
      );
};

export default ImageChanger;