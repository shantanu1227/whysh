export default class Crud {
  getCall = async (url) => {
    const result = await fetch(url, {
      headers: new Headers({
        'authorization': 12345,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    return result.json();
  }

  patchCall = async (url) => {
    const result = await fetch(url, {
      method: 'PATCH',
      headers: new Headers({
        'authorization': 12345,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    return result.json();
  }
}
