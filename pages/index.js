async function getPhotographers() {
    const getPhotographers = fetch('../../data/photographers.json')
        .then(response => {
            if (response.ok) {
                return response.json()
                    .then(data => {
                        return data.photographers
                        }
                    )
            } else {
                console.error('Retour du serveur : ', response.status)
            }
        })
    return (
        await getPhotographers
    )
}

async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    await displayData(photographers);
}

init()

