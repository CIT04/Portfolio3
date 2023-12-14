import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Bookmark from './Bookmark';
import './css/bookmarks.css';
import { Collapse } from 'react-bootstrap';
import DataAccess from '../accessLayer/DataAccess';
import ReactWordcloud from 'react-wordcloud';

const dataAccess = new DataAccess();

const SearchHistory = ({ userid }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [open, setOpen] = useState(false);

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

  // Create a map to store the count of each search string
  const searchCountMap = new Map();
  searchHistory.forEach((entry) => {
    const searchStr = entry.search_string;
    searchCountMap.set(searchStr, (searchCountMap.get(searchStr) || 0) + 1);
  });

  // Convert search history data to word cloud format
  const wordCloudData = Array.from(searchCountMap).map(([searchStr, count]) => ({
    text: searchStr,
    value: count,
    fontSize: count * 100,
  }));

  const SearchHistoryWordCloud = ({ searchHistory }) => {
    return (
      <div style={{ fontSize: '20px' }}> {/* Set the desired font size, e.g., '20px' */}
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
        <br />
        <br />

        <Collapse in={open} id="searchHistoryCollapse">
          <div>
            {Array.isArray(searchHistory) && searchHistory.length > 0 ? (
              <ReactWordcloud
                words={wordCloudData}
                options={{
                  rotations: 0,
                  rotationAngles: [0],
                  scale: 'sqrt', // Use 'sqrt' to scale based on value
                  minSize: 16, // Set the minimum font size
                }}
              />
            ) : (
              <p>No search history found.</p>
            )}
          </div>
        </Collapse>
      </div>
    );
  };

  return <SearchHistoryWordCloud searchHistory={searchHistory} />;
};

export default SearchHistory;
