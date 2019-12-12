import React from 'react';

export default Resolutions = ({ resolutions = [] }) => {
  return (
    <ul>
      {resolutions.map(resolution => (
        <li key={resolution._id}>{resolution.name}</li>
      ))}
    </ul>
  );
};
