async function fetchSearchHistory(uid) {
    try {
      const response = await fetch(`http://localhost:5001/api/searchhistory/${uid}`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching search history:', error);
      throw error; // Re-throw the error to handle it elsewhere, if needed
    }
  }
  
  export default fetchSearchHistory;
  