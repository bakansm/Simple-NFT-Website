import axios from 'axios'

export default async function getPhotosList() {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.unsplash.com/photos?page=1&per_page=30&client_id=FXFpMYSoNFYOG8eFKRRUaNXO9LEyZ_HgEd2xkgLfQUE',
    headers: {},
  }

  await axios
    .request(config)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => console.log(error))
}
