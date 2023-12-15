import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Bookmark from './Bookmark';
import './css/bookmarks.css';
import { Collapse , Button, Modal} from 'react-bootstrap';
import DataAccess from '../accessLayer/DataAccess';
import ReactWordcloud from 'react-wordcloud';
import TypeContext from './TypeContext';

const dataAccess = new DataAccess();

const SearchHistory = ({ userid }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState('wordCloud'); // 'wordCloud' or 'list'
  const { types } = useContext(TypeContext);
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordCloudData, setWordCloudData] = useState([]);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const historyData = await dataAccess.fetchSearchHistory(userid);
      console.log('Received data:', historyData);
      setSearchHistory(historyData);
    } catch (error) {
    
      console.error('Error fetching search history:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userid]);



  useEffect(() => {
    const searchCountMap = new Map();

    //mappin searchstrungs to seachhistory 
    searchHistory.forEach((entry) => {
      const searchStr = entry.search_string;
      //sanitising search sting for better formatting in search history. also makes injection harder/impossible
      const sanitizedSearchStr = searchStr.replace(/[{}]/g, '').replace(/,/g, ' ');
      searchCountMap.set(sanitizedSearchStr, (searchCountMap.get(sanitizedSearchStr) || 0) + 1);
    });

    //wordcloud data get
    const updatedWordCloudData = Array.from(searchCountMap).map(
      ([searchStr, count]) => {
        const sanitizedSearchStr = searchStr.replace(/[{}]/g, '');
        return {
          text: sanitizedSearchStr,
          value: count,
          fontSize: count * 100,
        };
      }
    );

    setWordCloudData(updatedWordCloudData);
  }, [searchHistory]);
  
  const clearSearchHistory = async () => {
    try {
      console.log('Clearing search history...');
      await dataAccess.deleteSearchHistory(userid);
      console.log('Search history cleared.');
      setMessage('Search History Cleared');
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
        setMessage('');
      }, 1000);

      fetchData();
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };
  

  const SearchHistoryWordCloud = ({ searchHistory }) => {
    return (
      <div style={{ fontSize: '20px' }}>
        <h2>Your Searches</h2>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => setOpen(!open)}
          aria-controls="searchHistoryCollapse"
          aria-expanded={open}
        >
          Click to expand or collapse
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setViewMode('list')}
        >
          Switch to List
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={clearSearchHistory}
        >
          Clear Search History
        </button>
        <br />
        <br />

        <Collapse in={open} id="searchHistoryCollapse">
          <div>

            {viewMode === 'wordCloud' ? (
              Array.isArray(searchHistory) && searchHistory.length > 0 ? (
                <>
                  <ReactWordcloud
                    words={wordCloudData}
                    options={{
                      rotations: 0,
                      rotationAngles: [0],
                      scale: 'sqrt',
                      minSize: 16,
                      transitionDuration: 1000,
                      fontFamily: 'impact',
                      fontSizes: [20, 150],
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                    }}
                    callbacks={{
                      onWordClick: (word) => {
                        const searchPath = `/search/0/10/${encodeURIComponent(word.text)}${types ? `/${types}` : ''}`;
                        navigate(searchPath);
                      },
                    }}
                  />
                  {selectedWord && (
                    <div style={{ marginTop: '10px' }}>{selectedWord}</div>
                  )}
                </>
              ) : (
                <p>No search history found.</p>
              )

            ) : (
              <p>Switch to List view to see details.</p>
            )}
          </div>
        </Collapse>
      </div>
    );
  };

  const SearchHistoryList = () => {
    return (
      <div>
        <h2>Your Searches</h2>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => setOpen(!open)}
          aria-controls="searchHistoryCollapse"
          aria-expanded={open}
        >
          Click to expand or collapse
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setViewMode('wordCloud')}
        >
          Switch to Word Cloud
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={clearSearchHistory}
        >
          Clear Search History
        </button>
        <br />
        <br />

        <Collapse in={open} id="searchHistoryCollapse">
          <div>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th>Search Strings</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(searchHistory) && searchHistory.length > 0 ? (
                  searchHistory.map((entry, index) => (
                    <tr key={index}>
                      <td>
                        <NavLink
                          to={`/search/${entry.search_string}`}
                          style={{ textDecoration: 'none', color: '#e0d612' }}

                          key={entry.search_string}
                        >

                          {entry.search_string.replace(/[{}]/g, '')}
                        </NavLink>
                      </td>
                      <td style={{ color: '#e0d612' }}>{entry.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No search history found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Collapse>
      </div>
    );
  };
  
  return (
    <>
  
      <Modal show={showMessage} onHide={() => setShowMessage(false)}>
        <Modal.Header closeButton>
        <Modal.Title style={{ color: 'black' }}>Search History Status</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'black' }}>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMessage(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {viewMode === 'wordCloud' ? (
        <SearchHistoryWordCloud searchHistory={searchHistory} />
      ) : (
        <SearchHistoryList />
      )}
    </>
  );
};

export default SearchHistory;