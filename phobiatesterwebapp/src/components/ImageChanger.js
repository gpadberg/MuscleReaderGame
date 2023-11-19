import React, { useState, useEffect } from "react";

const formatResults = (list1, list2) => {
  const stringArray = list2.replace(/[\[\]']+/g, "").split(", ");

  const numbersArray = stringArray
    .map((str) => parseInt(str.replace(/\n/g, ""), 10))
    .filter((value) => !isNaN(value));

  let newList = [];
  for (let i = 0; i < list1.length; i++) {
    newList.push({ phobia: list1[i], avgBpm: numbersArray[i] });
  }

  newList.sort((a, b) => b.avgBpm - a.avgBpm);

  return newList;
};

const ImageChanger = () => {
  const images = [
    "Coulrophobia",
    "Ophidiophobia",
    "Arachnophobia",
    "Trypophobia",
    "Galeophobia",
    "Claustrophobia",
  ];

  const [start, setStart] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [changeCount, setChangeCount] = useState(0);
  const [tests, setTests] = useState([]);
  const [results, setResults] = useState([]);

  const handleRunPythonScript = async (command) => {
    try {
      const url = new URL("http://localhost:3001/run-python");
      url.searchParams.append("command", command);

      const response = await fetch(url);

      const data = await response.text();
      console.log("Command sent", command);
      if (changeCount === 6) {
        setTests(data);
        setResults(formatResults(images, data));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleRunPythonScript("reset");
  }, []);

  useEffect(() => {
    if (changeCount < 6 && start) {
      handleRunPythonScript("advance");
      const timeout = setTimeout(() => {
        setStart(false);
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setChangeCount((prevCount) => prevCount + 1);
      }, 1000);

      return () => clearTimeout(timeout);
    } else if (changeCount === 6) {
      handleRunPythonScript("display");
    }
  }, [start]);

  useEffect(() => {
    if (results.length > 0) {
      setFinished(true);
    }
  }, [tests, results]);

  return (
    <div class="h-screen flex items-center justify-center">
      {changeCount < 6 ? (
        <div>
          {!start ? (
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
              onClick={() => setStart(true)}
            >
              Next
            </button>
          ) : (
            <img
              src={"ImagesForSlideshow/" + images[currentImageIndex] + ".jpeg"}
              alt={`Image ${currentImageIndex + 1}`}
              class="object-contain h-4/5 w-4/5"
            />
          )}
        </div>
      ) : (
        <div>
          {finished ? (
            <div>
              <div className="text-6xl mb-8">
                Congratulations! You have {results[0].phobia}!
              </div>
              {results.map((result) => (
                <div key={result.phobia}>
                  {result.phobia}: {result.avgBpm}
                </div>
              ))}{" "}
              <div className="text-sm mt-4 text-gray-400">
                Higher BPM = greater phobia
              </div>
            </div>
          ) : (
            <div>LOADING RESULTS</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageChanger;
