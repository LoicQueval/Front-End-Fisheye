import {photographerFactory} from '../../scripts/factories/photographers.js';

// Récupère les données d'un photographe en particulier
async function getPhotographer(id) {
    const getPhotographer = fetch('../../data/photographers.json')
        .then(response => {
            if (response.ok) {
                return response.json()
                    .then(data => {
                            for (let valeur of data.photographers) {
                                if (valeur.id.toString() === id) {
                                    return valeur;
                                }
                            }
                        }
                    )
            } else {
                console.error('Retour du serveur : ', response.status);
            }
        })
    return (
        await getPhotographer
    )
}

// Récupère l'id du photographe dans l'url
function getPhotographerId() {
    const url = window.location.href;
    const DOM_url = new URL(url);
    const search_params = new URLSearchParams(DOM_url.search);

    if (search_params.has('id')) {
        return search_params.get('id')
    }
}

// Récupère les images et vidéo en fonction du photographe
async function getMedia(id) {
    const getMedia = fetch('../../data/photographers.json')
        .then(response => {
            if (response.ok) {
                return response.json()
                    .then(data => {
                        return data.media.filter(value => value.photographerId.toString() === id);
                    })
            } else {
                console.error('Retour du serveur : ', response.status);
            }
        })
    return (
        await getMedia
    )
}

// Affiche les données du photographer
async function displayPhotographerData(photographer) {
    const photographerProfile = document.getElementById('photographer');
    const userCardDOM = photographerFactory(photographer, 'detail', null, null, updateLightboxData);
    photographerProfile.appendChild(userCardDOM);
    updateContactModalData(photographer);
}

// Modifie le nom du modal contact en fonction du photographe
function updateContactModalData(photographer) {
    const photographerName = document.getElementById('photographer-modal-name');
    photographerName.setAttribute('aria-label', photographer.name);
    photographerName.innerHTML = photographer.name;
}

// Affiche les likes totals et le prix du photographe
function displayLikesModalData(photographer) {
    const price = document.getElementById('price');
    price.innerHTML = photographer.price + '€ / jour';

    let likes = 0;
    for (let i = 0; i < media.length; i++) {
        likes += media[i].likes;
    }

    const likesModal = document.getElementById('likes');
    likesModal.innerHTML = likes.toString();
    likesModal.setAttribute('aria-label', photographer.name + ' likes')
}

let like = [];

// Met à jour les likes
function updateLikesModalData(data, index) {
    const regular_heart = document.querySelectorAll('.fa-regular');
    const solid_heart = document.querySelectorAll('.fa-solid');
    const likes = document.querySelectorAll('.like');

    if (like[index]) {
        regular_heart[index].style.display = 'flex';
        solid_heart[index].style.display = 'none';
        likes[index].innerHTML = data.likes - 1;
        data.likes = data.likes - 1;
        like[index] = false;
    } else {
        regular_heart[index].style.display = 'none';
        solid_heart[index].style.display = 'flex';
        likes[index].innerHTML = data.likes + 1;
        data.likes = data.likes + 1;
        like[index] = true;
    }
    displayLikesModalData(photographer);
}

// Affiche les medias du photographe
async function displayMediaData(media, name) {
    const photos = document.getElementById('photo');
    while (photos.firstChild) {
        photos.removeChild(photos.lastChild);
    }
    like = new Array(media.length).fill(false)
    media.forEach((photo, index) => {
        const userPhoto = photographerFactory(photo, 'media', name, index, updateLightboxData, updateLikesModalData);
        photos.appendChild(userPhoto);
    })
}

// Met à jour la lightbox modal
function updateLightboxData(index) {
    const photo = media[index];
    const lightbox = document.getElementById('lightbox_img');
    while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.lastChild);
    }
    const close = document.getElementById('close_modal')
    close.focus()
    const leftArrow = document.getElementById('lightbox_left');
    leftArrow.setAttribute('aria-label', 'previous');
    leftArrow.onclick = () => {
        if (index === 0) index = media.length;
        updateLightboxData(index - 1);
    };
    if (photo.image) {
        const media = document.createElement('img');
        media.setAttribute('src', `../../assets/photos/${photographer.name}/${photo.image}`);
        media.setAttribute('aria-label', photo.title);
        lightbox.appendChild(media);
    } else {
        const media = document.createElement('video');
        media.setAttribute('src', `../../assets/photos/${photographer.name}/${photo.video}`);
        media.setAttribute('aria-label', photo.title);
        lightbox.appendChild(media);
    }
    const rightArrow = document.getElementById('lightbox_right');
    rightArrow.setAttribute('aria-label', 'next')
    rightArrow.onclick = () => {
        if (index === media.length - 1) index = -1;
        updateLightboxData(index + 1);
    };
    const title = document.getElementById('title');
    title.innerHTML = photo.title;
}

// Trie-les medias du photographe par likes/data/titre
async function sort(media) {
    const option = document.querySelectorAll('option')
    option.forEach(option => option.onclick = updateSort)


    function sortPopular(media) {
        return media.sort((value1, value2) => value2.likes - value1.likes);
    }

    function sortDate(media) {
        return media.sort((value1, value2) => new Date(value2.date) - new Date(value1.date))
    }

    function sortTitle(media) {
        return media.sort((value1, value2) => {
            if (value1.title < value2.title) {
                return -1;
            } else if (value1.title > value2.title) {
                return 1;
            } else {
                return 0;
            }
        })
    }

    // Gère l'affichage des options
    function hideSelected() {
        const option = document.querySelectorAll('option')
        option.forEach(value => {
            if (value.selected === true) {
                value.hidden = true;
            } else if (value.selected === false) {
                value.hidden = false;
            }
        })
    }

    if (option[0].selected) {
        hideSelected();
        return sortPopular(media);
    }
    if (option[1].selected) {
        hideSelected();
        return sortDate(media);
    }
    if (option[2].selected) {
        hideSelected();
        return sortTitle(media);
    }
    return media;
}

export let media = [];
let photographer = undefined;
const id = getPhotographerId();

async function updateSort() {
    media = await sort(media);
    await displayMediaData(media, photographer.name)
}

async function init() {
    // Récupère les datas des photographes
    photographer = await getPhotographer(id);
    media = await getMedia(id);
    await displayPhotographerData(photographer);
    await displayLikesModalData(photographer)
    await updateSort();
}

init()
