import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Bookmark from './Bookmark';
import './css/bookmarks.css';
import { Collapse } from 'react-bootstrap';
import DataAccess from '../accessLayer/DataAccess';
import ReactWordcloud from 'react-wordcloud';
import TypeContext from './TypeContext';

const dataAccess = new DataAccess();

const SearchHistory = ({ userid }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState('wordCloud'); // 'wordCloud' or 'list'
  const {types} = useContext(TypeContext);

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const historyData = await dataAccess.fetchSearchHistory(userid);
      console.log('Received data:', historyData);
      setSearchHistory(historyData);
    } catch (error) {
      // Handle errors here
      console.error('Error fetching search history:', error);
    }
  };

  

  useEffect(() => {
    fetchData();
  }, [userid]);

  const [selectedWord, setSelectedWord] = useState(null);
  const [wordCloudData, setWordCloudData] = useState([]);
  const navigate = useNavigate();


useEffect(() => {
  const searchCountMap = new Map();

  searchHistory.forEach((entry) => {
    const searchStr = entry.search_string;
    const sanitizedSearchStr = searchStr.replace(/[{}]/g, '').replace(/,/g, ' ');
    searchCountMap.set(sanitizedSearchStr, (searchCountMap.get(sanitizedSearchStr) || 0) + 1);
  });

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

  const SearchHistoryList = ({ searchHistory }) => {
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

  return viewMode === 'wordCloud' ? (
    <SearchHistoryWordCloud searchHistory={searchHistory} />
  ) : (
    <SearchHistoryList searchHistory={searchHistory} />
  );
};

export default SearchHistory;
