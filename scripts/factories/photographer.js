function photographerFactory(photographers, medias) {
    //console.log(photographers);

    const {city, country, name, portrait, price, tagline, id} = photographers;
    const picture = `./assets/photographers/${portrait}`;
    function getUserCardDOM() {
        const article = document.createElement('article');

        const aHrefArticle = document.createElement('a');
        aHrefArticle.classList.add('aboutPhotographer--href');
        aHrefArticle.href= `photographer.html?id=${id}`;

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(aHrefArticle);
        aHrefArticle.appendChild(img);
        aHrefArticle.appendChild(h2);

        const url_string = window.location.href;
        const url = new URL(url_string);
        const getUrlParams = url.searchParams.get("id");
        console.log(getUrlParams);
        if (getUrlParams) {
            PhotographerInput(photographers, medias, getUrlParams);
        }else{
            const divInAHref = document.createElement('div');
            divInAHref.classList.add('aboutPhotographer');

            const cityCountry = document.createElement('span');
            cityCountry.classList.add('inlineElements','cityCountry');
            cityCountry.textContent = `${city}, ${country}`;

            const taglineElement = document.createElement('span');
            taglineElement.classList.add('inlineElements');
            taglineElement.textContent = tagline;

            const priceElement = document.createElement('span');
            priceElement.classList.add('inlineElements','pricePerDay');
            priceElement.textContent = `${price}€ /jour`;
            article.appendChild(divInAHref);

            divInAHref.appendChild(cityCountry);
            divInAHref.appendChild(taglineElement);
            divInAHref.appendChild(priceElement);
        }

        return (article);
    }
    return {name, picture, getUserCardDOM }
}