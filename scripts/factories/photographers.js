import {displayLightbox, displayModal} from '../../scripts/utils/forms.js';

export function photographerFactory(data, template, path, index, updateLightboxData, updateLikesModalData) {
    const {name, portrait, city, country, tagline, price, id, title, image, video, likes} = data;
    const pictures = `../assets/photos/Photographers ID Photos/${portrait}`;
    const photographer = `./photographer/photographer.html?id=${id}`;

    // Users
    function getUsersCardDOM() {
        const article = document.createElement('article');
        article.setAttribute('aria-label', name)
        const a = document.createElement('a');
        a.setAttribute('href', photographer);
        a.setAttribute('aria-label', 'to ' + name + ' page')
        const img = document.createElement('img');
        img.setAttribute('src', pictures);
        img.setAttribute('alt', name)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const location = document.createElement('p');
        location.textContent = city + ', ' + country;
        location.className = ' location';
        location.setAttribute('aria-label', 'location');
        const quote = document.createElement('p');
        quote.textContent = tagline;
        quote.className = ' quote';
        quote.setAttribute('aria-label', 'quote')
        const rate = document.createElement('p');
        rate.textContent = price + '€ par jour';
        rate.className = ' price';
        rate.setAttribute('aria-label', 'rate')
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(location);
        article.appendChild(quote);
        article.appendChild(rate);
        return (article);
    }

    const picture = `../../assets/photos/Photographers ID Photos/${portrait}`;

    // User detail
    function getUserCardDOM() {
        const section = document.getElementById('photographer');
        section.setAttribute('aria-label', name + ' contact section');
        const article = document.createElement('article');
        article.setAttribute('aria-label', name + ' contact content');
        const photographer = document.createElement('h1');
        photographer.innerText = name;
        const div = document.createElement('div')
        const location = document.createElement('p');
        location.textContent = city + ', ' + country;
        location.className = ' location';
        location.setAttribute('aria-label', 'location');
        const quote = document.createElement('p');
        quote.textContent = tagline;
        quote.className = ' quote';
        quote.setAttribute('aria-label', 'quote');
        const button = document.createElement('button');
        button.className = 'contact_button';
        button.innerText = 'Contactez-moi';
        button.onclick = displayModal;
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name);
        article.appendChild(div);
        article.appendChild(button);
        article.appendChild(img);
        div.appendChild(photographer);
        div.appendChild(location);
        div.appendChild(quote);
        return (article);
    }

    const media = `../../assets/photos/${path}/${image}`;
    const mp4Path = `../../assets/photos/${path}/${video}`;

    // Media
    function getMediaByUser() {
        const section = document.getElementById('media');
        section.setAttribute('aria-label','media section');
        const article = document.createElement('article');
        article.setAttribute('aria-label', '' + title);
        const button = document.createElement('button');
        button.setAttribute('aria-label', 'to lighbox-modal')
        button.onclick = () => {
            displayLightbox();
            updateLightboxData(index);
        };
        if (image) {
            const img = document.createElement('img');
            img.setAttribute('src', media);
            img.setAttribute('alt', title);
            button.appendChild(img);
        }
        if (video) {
            const mp4 = document.createElement('video');
            mp4.setAttribute('src', mp4Path);
            mp4.setAttribute('aria-label', title);
            button.appendChild(mp4);
        }
        const content = document.createElement('div');
        content.setAttribute('aria-label', 'content');
        const compter = document.createElement('div');
        compter.setAttribute('aria-label', 'compter');
        const div = document.createElement('div');
        div.className = ' heart';
        const description = document.createElement('p');
        description.innerHTML = title;
        description.setAttribute('aria-label', 'title');
        description.className = ' description';
        const like = document.createElement('p');
        like.innerText = likes;
        like.setAttribute('aria-label', 'likes');
        like.className = ' like';
        const icon = document.createElement('i');
        icon.className = ' fa-regular fa-heart';
        icon.setAttribute('aria-label', 'click to like');
        icon.onclick = () => {
            updateLikesModalData(data, index);
        };
        const ico = document.createElement('i');
        ico.className = ' fa-solid fa-heart';
        ico.setAttribute('aria-label', 'click to unlike');
        ico.onclick = () => {
            updateLikesModalData(data, index);
        };
        article.appendChild(button);
        article.appendChild(content);
        content.appendChild(description);
        content.appendChild(compter);
        compter.appendChild(like);
        compter.appendChild(div);
        div.appendChild(ico);
        div.appendChild(icon);
        return (article);
    }

    if (template === 'detail') {
        return getUserCardDOM();
    }
    if (template === 'media') {
        return getMediaByUser();
    }
    if (template === 'index') {
        return getUsersCardDOM();
    } else {
        console.error('Template suivant incorrect :', template);
    }
}
