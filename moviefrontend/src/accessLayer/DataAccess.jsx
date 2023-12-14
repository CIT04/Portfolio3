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
  async fetchMediaDetails(mediaId) {
    const endpoint = `api/media/${mediaId}`;
    return this.fetchData(endpoint);
  }

  async fetchSearchHistory(uid) {
    const endpoint = `api/searchhistory/${uid}`;
    return this.fetchData(endpoint);
  }

  async fetchTeamData(mediaId) {
    const endpoint = `api/media/team/${mediaId}`;
    return this.fetchData(endpoint);
  }

  async fetchBookmarks(userId) {
    const endpoint = `api/bookmark/${userId}`;
    return this.fetchData(endpoint);
  }

  
  async createBookmark(mediaId, userId) {
    const endpoint = 'api/bookmark/create';
    const method = 'POST';
    const body = JSON.stringify({ M_id: mediaId, U_id: userId });

    return this.fetchData(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
  }

  async deleteBookmark(mediaId, userId) {
    const endpoint = 'api/bookmark/delete';
    const method = 'DELETE';
    const body = JSON.stringify({ M_id: mediaId, U_id: userId });

    return this.fetchData(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
  }
}

export default DataAccess;
