import React, { useState, useEffect } from 'react';
import Video from './Video'; // Make sure the import path is correct

const VideoWithEffects = ({data, setData, originalData, videoUrl}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentEffect, setCurrentEffect] = useState(null);
  const [effectsData, setEffectsData] = useState(data); // Loaded from sampleData.json
  

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds); // Update currentTime
  };

  useEffect(() => {
    const effect = effectsData.find(effect => Math.floor(currentTime) === effect.time);
    setCurrentEffect(effect);
  }, [currentTime, effectsData]);

  useEffect(() => {
    if (currentTime == 0 || currentEffect == null ){
      setData([]);
    }
    setData(originalData);
    const filteredData = originalData.filter(effect => Math.floor(currentTime) >= effect.time);
    console.log(filteredData);
    setData(filteredData);
  }, [currentTime]);

    return (
    <div className="VideoWithEffects">
      <Video onProgress={handleProgress} url={videoUrl} />
      <div>
        {/* <h1>Current Time: {Math.floor(currentTime)}s</h1> */}
        {/* <h2>All Data:</h2>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <h3>{item.name}</h3>
              <p>UV: {item.uv}</p>
              <p>PV: {item.pv}</p>
              <p>AMT: {item.amt}</p>
              <p>Time: {item.time}</p>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default VideoWithEffects;
