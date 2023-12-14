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

  
  async fetchRatings(userId) {
    const endpoint = `api/localrating/${userId}`;
    return this.fetchData(endpoint);
  }

  async fetchRatingsForMedia(userId, mediaId) {
    const endpoint = `api/localrating/${userId}/${mediaId}`;
    return this.fetchData(endpoint);
  }
  
  async saveLocalRating(userId, mediaId, hasRated, localScore) {
    console.log("localscore:"+hasRated)
    const baseEndpoint = 'api/localrating';
    const endpoint = hasRated ? `${baseEndpoint}/update` : `${baseEndpoint}/create`;
    const method = hasRated ?'PUT': 'POST'; 

    return this.fetchData(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        U_id: userId,
        M_id: mediaId,
        LocalScore: localScore,
      }),
    });
  }

  
}

export default DataAccess;
