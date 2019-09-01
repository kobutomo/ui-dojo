import React from 'react';
import Home from './pages/Home'
import "./scss/common.scss"

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>フルスクラッチUI道場</h1>
        <p className="lead">いろんなUI（reactコンポーネント）をイチから頑張って作っていこう</p>
      </header>
      <Home />
    </div>
  );
}

export default App;
