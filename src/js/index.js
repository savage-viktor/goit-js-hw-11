import { fetchImages } from "./fetch"

let request = "Cats"
let page = 1

fetchImages(request, page)
    .then(renderGallery)
    .catch(showError)


function renderGallery(res) {
    console.log(res.hits)
    res.hits.map(image => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image

        console.log(webformatURL, largeImageURL, tags, likes, views, comments, downloads)
    })
}

function showError(err) {
    console.log(err)
}