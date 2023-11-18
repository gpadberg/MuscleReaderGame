import React, { useState, useEffect } from "react";

const ImageChanger = () => {
  const images = [
    "Coulrophobia.jpeg",
    "Ophidiophobia.jpeg",
    "Arachnophobia.jpeg",
    "Trypophobia.jpeg",
    "Galeophobia.jpeg",
    "Claustrophobia.jpeg",
  ];

  const [start, setStart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [changeCount, setChangeCount] = useState(0);
  const [tests, setTests] = useState([]);

  const record = (phobia) => {
    let avgBpm;
    // send signal to receive data (simulated by timeout)
    const timeout = setTimeout(() => {
      // receive data
      console.log("finished");
      setTests((tests) => [...tests, { name: phobia, avgBpm }]);
    }, 6000);
  };

  useEffect(() => {
    if (changeCount < 6 && start) {
      record(images[currentImageIndex].slice(0, -5));
      const timeout = setTimeout(() => {
        setStart(false);
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setChangeCount((prevCount) => prevCount + 1);
      }, 6000);

      return () => clearTimeout(timeout);
    } else if (changeCount === 6) {
      console.log("finished");
      console.log(tests);
    }
  }, [start]);

  return (
    <div class="h-screen flex items-center justify-center">
      {!start ? (
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          onClick={() => setStart(true)}
        >
          Next
        </button>
      ) : (
        <img
          src={"ImagesForSlideshow/" + images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          class="object-contain h-4/5 w-4/5"
        />
      )}
    </div>
  );
};

export default ImageChanger;
