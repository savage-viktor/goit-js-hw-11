import { fetchImages } from "./fetch"
import simplelightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css"

const galleryDiv = document.querySelector(".gallery")
const formRef = document.querySelector(".search-form")
const loadMoreBTN = document.querySelector(".button__load-more")


formRef.addEventListener("submit", onSubmit)
loadMoreBTN.addEventListener("click", onLoadMore)



let page = 1
let request
let lightbox

function onLoadMore(ev) {
    ev.preventDefault()

    page += 1
    fetchImages(request, page)
        .then(res => {
            renderGallery(res)
            lightbox.refresh()
        })
        .catch(showError)
}

function renderGallery(res) {
    console.log(res.hits)

    const cardsArray = []

    res.hits.map(image => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image
        cardsArray.push(
            `<a href="${largeImageURL}">
      <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>${likes}</b>
          </p>
          <p class="info-item">
            <b>${views}</b>
          </p>
          <p class="info-item">
            <b>${comments}</b>
          </p>
          <p class="info-item">
            <b>${downloads}</b>
          </p>
        </div>
      </div>
    </a>`
        )
    })

    // galleryDiv.innerHTML = cardsArray.join("")
    galleryDiv.insertAdjacentHTML("beforeend", cardsArray.join(""))



}

function showError(err) {
    console.log(err)
}

function onSubmit(ev) {

    ev.preventDefault()

    console.dir(ev.currentTarget.elements.searchQuery.value)

    request = ev.currentTarget.elements.searchQuery.value

    fetchImages(request, page)
        .then(res => {
            renderGallery(res)
            startSL()
        })
        .catch(showError)


}

function startSL() {
    lightbox = new simplelightbox('.gallery a', {
        captionsData: "alt",
        captionDelay: 250,
    })
}