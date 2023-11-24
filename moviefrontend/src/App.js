import logo from './logo.svg';
import './App.css';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieCardList from './MovieCard.jsx';


function App() {
  
  // Background color and padding
  const appStyle = {
    backgroundColor: '#8484B0', // Set your desired color
    padding: '0px', // Set your desired padding
  };

  return (
    <div className="App" style={appStyle}>
      {/* Render the Header component */}
      <Header />

      {/* Render the Header component */}
      <MovieCardList />

      </div>
    
  );
}

export default App;