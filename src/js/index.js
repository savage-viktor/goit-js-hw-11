import { fetchImages } from "./fetch"

const galleryDiv = document.querySelector(".gallery")
const formRef = document.querySelector(".search-form")

formRef.addEventListener("submit", onSubmit)

let request = "Cats"
let page = 1

// fetchImages(request, page)
//     .then(renderGallery)
//     .catch(showError)



function renderGallery(res) {
    console.log(res.hits)

    const cardsArray = []

    res.hits.map(image => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image
        cardsArray.push(
            `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                    <b>Likes: ${likes}</b>
                    </p>
                    <p class="info-item">
                    <b>Views: ${views}</b>
                    </p>
                    <p class="info-item">
                    <b>Comments: ${comments}</b>
                    </p>
                    <p class="info-item">
                    <b>Downloads: ${downloads}</b>
                    </p>
                 </div>
             </div>`
        )
    })

    galleryDiv.innerHTML = cardsArray.join("")
}

function showError(err) {
    console.log(err)
}

function onSubmit(ev) {

    ev.preventDefault()

    console.dir(ev.currentTarget.elements.searchQuery.value)

    let request = ev.currentTarget.elements.searchQuery.value

    fetchImages(request, page)
        .then(renderGallery)
        .catch(showError)

}