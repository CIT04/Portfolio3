class DataAccess {
  constructor() {
    this.apiBaseUrl = 'http://localhost:5001';
  }

  async fetchData(endpoint, options) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/${endpoint}`, options);
      if (!response.ok) {
        throw new Error(`Error fetching data from ${endpoint}: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  async fetchSearchHistory(uid) {
    const endpoint = `api/searchhistory/${uid}`;
    return this.fetchData(endpoint);
  }

  async fetchTeamData(mediaId) {
    const endpoint = `api/media/team/${mediaId}`;
    return this.fetchData(endpoint);
  }
}

export default DataAccess;
