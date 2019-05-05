function getImages(term) {
  return fetch(`icon?term=${term}`, {
    method: 'GET',
  })
    .then(response => response.json());
}
const NounProject = { getImages };
export default NounProject;
