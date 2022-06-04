const apiKey = "27775752-b90a2892c91517bf7619ab756"
const apiHref = "https://pixabay.com/api"

export function fetchImages(name, page) {
    return fetch(`${apiHref}?key=${apiKey}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
        .then(response => response.json())
}

