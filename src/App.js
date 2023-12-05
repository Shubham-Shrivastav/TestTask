import './App.css';
import CountCard from './components/CountCard';
import Featcher from './components/Featcher';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Data from the API</h1>
        <Featcher />
        <CountCard />
      </header>
    </div>
  );
}

export default App;
