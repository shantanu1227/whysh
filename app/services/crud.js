import * as firebase from 'firebase';

export default class Crud {

  async getHeaders() {
    let header = {
      'Content-Type': 'application/json'
    };
    if (firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous) {
      try {
        let authorization = await firebase.auth().currentUser.getIdToken();
        header.authorization = authorization;
      } catch (error) {
        console.error('Error while fetching authorization token', error);
      }
    }
    return new Headers(header)
  }

  getCall = async (url) => {
    const headers = await this.getHeaders();
    const result = await fetch(url, {
      headers
    });
    return result.json();
  }

  patchCall = async (url, data) => {
    const headers = await this.getHeaders();
    const result = await fetch(url, {
      method: 'PATCH',
      data,
      headers
    });
    return result.json();
  }

  postCall = async (url, body) => {
    const headers = await this.getHeaders();
    const result = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    });
    return result.json();
  }
}
