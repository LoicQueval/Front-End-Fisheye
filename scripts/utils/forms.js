// Affiche la modal contact
export function displayModal() {
    const contact = document.getElementById('contact_modal_section');
    contact.style.display = 'flex';
    const close = document.getElementById('close_modal');
    close.onclick = closeModal;
    const button = document.getElementById('validate');
    button.onclick = validate;
}

// Ferme la modal contact
export function closeModal() {
    const modal = document.getElementById('contact_modal_section');
    modal.style.display = 'none';
}

// Affiche le contenu des inputs du formulaire dans la console de dev
function validate() {
    const form = document.forms['contact'];
    const first = document.forms['contact'] ['first'];
    const last = document.forms['contact'] ['last'];
    const mail = document.forms['contact'] ['mail'];
    const message = document.forms['contact'] ['message'];
    console.log('Formulaire : ' + form.name);
    console.log('Prénom : ' + first.value);
    console.log('Nom : ' + last.value);
    console.log('Email : ' + mail.value);
    console.log('Message : ' + message.value);
    return false;
}

// Affiche la modal lightbox
export function displayLightbox() {
    const close = document.getElementById('close_lightbox');
    close.onclick = closeLightbox;
    const lightbox = document.getElementById('lightbox_modal_section');
    lightbox.style.display = 'flex';
    const lightboxImg = document.getElementById('lightbox_img');
    while (lightboxImg.firstChild) {
        lightboxImg.removeChild(lightboxImg.lastChild);
    }
}

// Ferme la modal lightbox
export function closeLightbox() {
    const lightbox = document.getElementById('lightbox_modal_section');
    lightbox.style.display = 'none';
}
