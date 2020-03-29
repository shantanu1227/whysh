export default class Crud {
  getCall = async (url) => {
    const result = await fetch(url);
    return result.json();
  }
}
