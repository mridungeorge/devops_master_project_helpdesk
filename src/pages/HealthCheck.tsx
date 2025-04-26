
import React, { useEffect, useState } from 'react';

const HealthCheck: React.FC = () => {
  const [status, setStatus] = useState({
    status: 'healthy',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });

  // Return JSON response directly from the component
  useEffect(() => {
    document.title = 'API Health Check';
    
    // Add appropriate headers for JSON response
    const metaEl = document.createElement('meta');
    metaEl.httpEquiv = 'Content-Type';
    metaEl.content = 'application/json';
    document.head.appendChild(metaEl);
    
    return () => {
      document.head.removeChild(metaEl);
    };
  }, []);

  // Render as pre-formatted JSON for API consumers
  return (
    <pre style={{ 
      fontFamily: 'monospace', 
      padding: '20px' 
    }}>
      {JSON.stringify(status, null, 2)}
    </pre>
  );
};

export default HealthCheck;
