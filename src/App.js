import React, { useState, useEffect } from 'react';

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const usernameParam = urlParams.get('username');
    if (usernameParam) {
      setUsername(usernameParam);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = "/auth";
  };

  return (
    <div>
      <h1>NewsNow</h1>
      {username ? (
        <p>欢迎, {username}！</p>
      ) : (
        <button onClick={handleLogin}>Login with GitHub</button>
      )}
    </div>
  );
}

export default App;
