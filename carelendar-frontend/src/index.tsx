import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';

// root 엘리먼트 가져오기
const container = document.getElementById('root');

// null 체크 및 렌더링
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  throw new Error("❌ 'root' DOM element not found");
}
