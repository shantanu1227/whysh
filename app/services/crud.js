import * as firebase from 'firebase';

export default class Crud {

  async getHeaders() {
    let header = {
      'Content-Type': 'application/json'
    };
    if (firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous) {
      try {
        const authorization = await firebase.auth().currentUser.getIdToken();
        header.authorization = authorization;
        console.debug(authorization);
      } catch (error) {
        console.error('Error while fetching authorization token', error);
      }
    }
    return new Headers(header)
  }

  getCall = async (url) => {
    const headers = await this.getHeaders();
    console.debug('crud', {method:'get', url, headers});
    const result = await fetch(url, {
      headers
    });
    return result.json();
  }

  patchCall = async (url, data) => {
    const headers = await this.getHeaders();
    console.debug('crud', {method:'patch', url, headers, data});
    const result = await fetch(url, {
      method: 'PATCH',
      data,
      headers
    });
    return result.json();
  }

  postCall = async (url, body) => {
    const headers = await this.getHeaders();
    console.debug('crud', {method:'post', url, headers, body});
    const result = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    });
    return result.json();
  }
}