//Mettre le code JavaScript lié à la page photographer.html
function PhotographerInput(photographer, medias, urlParams){
    const main = document.querySelector("#main");
    const photographHeader = document.querySelector(".photograph-header");
    const photographeHeaderContainer = document.createElement('div');
    photographHeader.appendChild(photographeHeaderContainer);
    photographHeader.prepend(photographeHeaderContainer);

    /* Génération éléments */

    // ===== Description photographe =====
    const descriptionPhotographer = document.createElement('span');
    descriptionPhotographer.classList.add('descriptionPhotographer');
    photographeHeaderContainer.appendChild(descriptionPhotographer);
    photographeHeaderContainer.prepend(descriptionPhotographer);

    // ===== Localisation photographe =====
    const localisationPhotographer = document.createElement('h3');
    localisationPhotographer.classList.add('localisationPhotographer');
    photographeHeaderContainer.appendChild(localisationPhotographer);
    photographeHeaderContainer.prepend(localisationPhotographer);

    // ===== Nom photographe =====
    const namePhotographer = document.createElement('h1');
    namePhotographer.classList.add('namePhotographer');
    photographeHeaderContainer.appendChild(namePhotographer);
    photographeHeaderContainer.prepend(namePhotographer);

    // ===== Photo profil photographe =====
    const img = document.createElement('img');
    img.classList.add('photoProfilPhotographer');
    photographHeader.appendChild(img);

    // ===== Trier par: -section- =====
        /* -médias container- */
    const sectionMedias = document.createElement('section');
    main.appendChild(sectionMedias);
    sectionMedias.classList.add("mediasSection");

        /* -trier par- */
    const trierParContainer = document.createElement('div');
    sectionMedias.appendChild(trierParContainer);
    trierParContainer.classList.add("trierParContainer");

    const trierPar = document.createElement('span');
    trierParContainer.appendChild(trierPar);
    trierPar.textContent = "Trier par";
    trierPar.classList.add("triText");

    const section = document.createElement('select');
    trierParContainer.appendChild(section);
    section.classList.add("triSelect");

    const optionPopularite = document.createElement('option');
    optionPopularite.classList.add("popularite");
    optionPopularite.value = "popularite";
    optionPopularite.textContent = "Popularité";

    const optionDate = document.createElement('option');
    optionDate.classList.add("date");
    optionDate.value = "date";
    optionDate.textContent = "Date";

    const optionTitre = document.createElement('option');
    optionTitre.classList.add("titre");
    optionTitre.value = "titre";
    optionTitre.textContent = "Titre";

    section.appendChild(optionPopularite);
    section.appendChild(optionDate);
    section.appendChild(optionTitre);

    // ===== Génération Nom, Prénom, Description, Photo user =====
    const user = photographer.find(user => user.id == urlParams);
    namePhotographer.textContent = user.name;
    localisationPhotographer.textContent = user.city+", "+user.country;
    descriptionPhotographer.textContent = user.tagline;
    img.setAttribute("src", "./assets/photographers/"+user.portrait);

    let namePhotographerFile = user.name.split(' ');
    let nameFile = namePhotographerFile[0];
    if (nameFile.indexOf("-") !== -1) {
        const namePhotographerFileSplit = nameFile.split('-');
        nameFile = namePhotographerFileSplit[0]+" "+namePhotographerFileSplit[1];
    }

    // ===== Génération Médias user =====
    let index = 0;
    let sum = 0;

    let mediasArray = [];
    medias.forEach(media => {
        if (media.photographerId == urlParams) {
            index++;
            sum += media.likes;
            switch (media.image) {
                case undefined:
                    mediasArray.push({"id": media.id, "video": media.video, "title": media.title, "likes": media.likes, "date": media.date});
                    break;
                
                default:
                    mediasArray.push(media);
                    break;
            }
            createMedia(media, index);
        }
    });

    function createMedia(medias, i) {
        const media = document.createElement('article');
        media.classList.add("media");
        sectionMedias.appendChild(media);

        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add("mediaImageVideo");
        media.appendChild(mediaContainer);


        const infoMedia = document.createElement('div');
        infoMedia.classList.add("infoMedia");
        mediaContainer.appendChild(infoMedia);

        const nomMedia = document.createElement('span');
        nomMedia.classList.add("titleMedia");
        infoMedia.appendChild(nomMedia);
        nomMedia.textContent = medias.title;

        const likesMedia = document.createElement('span');
        likesMedia.classList.add("heartsMedia");
        infoMedia.appendChild(likesMedia);
        likesMedia.textContent = medias.likes;

        const iconHeart = document.createElement('i');
        iconHeart.classList.add('fas','fa-heart', 'heartIcon');
        likesMedia.appendChild(iconHeart);

        switch (medias.image) {
            case undefined:
                const videoMedia = document.createElement('video');
                videoMedia.classList.add("imageMedia");
                videoMedia.id = "media"+i;
                videoMedia.controls = false;
                mediaContainer.prepend(videoMedia);

                const videoSourceMedia = document.createElement('source');
                videoMedia.prepend(videoSourceMedia);
                videoSourceMedia.setAttribute("src", "./Sample Photos/"+nameFile+"/"+medias.video);
                break;
        
            default:
                const imgMedia = document.createElement('img');
                imgMedia.classList.add("imageMedia");
                imgMedia.id = "media"+i;
                mediaContainer.prepend(imgMedia);
                imgMedia.setAttribute("src", "./Sample Photos/"+nameFile+"/"+medias.image);
                break;
        }
    }

    function sortByName() {
        mediasArray.sort((a, b) => {
            switch (a.title) {
                case undefined:
                    var fa = a.title.toLowerCase();
                    var fb = b.title.toLowerCase();
                    break;
            
                default:
                    var fa = a.title.toLowerCase();
                    var fb = b.title.toLowerCase();
                    break;
            }
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        const mediaContainer = document.querySelectorAll(".mediaImageVideo");
        const imageMedia = document.querySelectorAll(".imageMedia");
        const titleMedia = document.querySelectorAll(".titleMedia");
        const heartsMedia = document.querySelectorAll(".heartsMedia");
        let sortedByTitleIndex = 0;
        imageMedia.forEach(currentMedia => {
            if (mediasArray[sortedByTitleIndex].video && mediasArray[sortedByTitleIndex].video.indexOf(".mp4") !== -1) {
                currentMedia.remove();

                const videoMedia = document.createElement('video');
                videoMedia.classList.add("imageMedia");
                videoMedia.id = "media"+sortedByTitleIndex;
                videoMedia.controls = false;
                mediaContainer[sortedByTitleIndex].prepend(videoMedia);

                const videoSourceMedia = document.createElement('source');
                videoMedia.appendChild(videoSourceMedia);
                videoSourceMedia.setAttribute("src", "./Sample Photos/"+nameFile+"/"+mediasArray[sortedByTitleIndex].video);
                titleMedia[sortedByTitleIndex].textContent = mediasArray[sortedByTitleIndex].title;
            }else{
                currentMedia.remove();

                const imgMedia = document.createElement('img');
                imgMedia.classList.add("imageMedia");
                imgMedia.id = "media"+sortedByTitleIndex;
                mediaContainer[sortedByTitleIndex].prepend(imgMedia);
                imgMedia.setAttribute("src", "./Sample Photos/"+nameFile+"/"+mediasArray[sortedByTitleIndex].image);
            }
            heartsMedia[sortedByTitleIndex].innerHTML = mediasArray[sortedByTitleIndex].likes+'<i class="fas fa-heart heartIcon" aria-hidden="true"></i>';
            sortedByTitleIndex++;
        });
    }
    // TRIER PAR DATE
    function sortByDate() {
        mediasArray.sort((a, b) => {
            switch (a.date) {
                case undefined:
                    var fa = a.date.toLowerCase();
                    var fb = b.date.toLowerCase();
                    break;
            
                default:
                    var fa = a.date.toLowerCase();
                    var fb = b.date.toLowerCase();
                    break;
            }
        
            if (fa < fb) {
                return 1;
            }
            if (fa > fb) {
                return -1;
            }
            return 0;
        });
        const mediaContainer = document.querySelectorAll(".mediaImageVideo");
        const imageMedia = document.querySelectorAll(".imageMedia");
        const titleMedia = document.querySelectorAll(".titleMedia");
        const heartsMedia = document.querySelectorAll(".heartsMedia");
        let sortedByTitleIndex = 0;
        imageMedia.forEach(currentMedia => {
            if (mediasArray[sortedByTitleIndex].video && mediasArray[sortedByTitleIndex].video.indexOf(".mp4") !== -1) {
                currentMedia.remove();

                const videoMedia = document.createElement('video');
                videoMedia.classList.add("imageMedia");
                videoMedia.id = "media"+sortedByTitleIndex;
                videoMedia.controls = false;
                mediaContainer[sortedByTitleIndex].prepend(videoMedia);

                const videoSourceMedia = document.createElement('source');
                videoMedia.appendChild(videoSourceMedia);
                videoSourceMedia.setAttribute("src", "./Sample Photos/"+nameFile+"/"+mediasArray[sortedByTitleIndex].video);
                titleMedia[sortedByTitleIndex].textContent = mediasArray[sortedByTitleIndex].title;
            }else{
                currentMedia.remove();

                const imgMedia = document.createElement('img');
                imgMedia.classList.add("imageMedia");
                imgMedia.id = "media"+sortedByTitleIndex;
                mediaContainer[sortedByTitleIndex].prepend(imgMedia);
                imgMedia.setAttribute("src", "./Sample Photos/"+nameFile+"/"+mediasArray[sortedByTitleIndex].image);
                titleMedia[sortedByTitleIndex].textContent = mediasArray[sortedByTitleIndex].title;
            }
            heartsMedia[sortedByTitleIndex].innerHTML = mediasArray[sortedByTitleIndex].likes+'<i class="fas fa-heart heartIcon" aria-hidden="true"></i>';
            sortedByTitleIndex++;
        });
    }
    // TRIER PAR POPULARITE
    function sortByPopularity() {
        mediasArray.sort((a, b) => {
            switch (a.likes) {
                case undefined:
                    var fa = a.likes;
                    var fb = b.likes;
                    break;
            
                default:
                    var fa = a.likes;
                    var fb = b.likes;
                    break;
            }
        
            if (fa < fb) {
                return 1;
            }
            if (fa > fb) {
                return -1;
            }
            return 0;
        });
        const mediaContainer = document.querySelectorAll(".mediaImageVideo");
        const imageMedia = document.querySelectorAll(".imageMedia");
        const titleMedia = document.querySelectorAll(".titleMedia");
        const heartsMedia = document.querySelectorAll(".heartsMedia");
        let sortedByTitleIndex = 0;
        imageMedia.forEach(currentMedia => {
            if (mediasArray[sortedByTitleIndex].video && mediasArray[sortedByTitleIndex].video.indexOf(".mp4") !== -1) {
                currentMedia.remove();

                const videoMedia = document.createElement('video');
                videoMedia.classList.add("imageMedia");
                videoMedia.id = "media"+sortedByTitleIndex;
                videoMedia.controls = false;
                //videoMedia.poster = "./Sample Photos/"+nameFile+"/"+mediasArray[sortedByTitleIndex].title;
                mediaContainer[sortedByTitleIndex].prepend(videoMedia);

                const videoSourceMedia = document.createElement('source');
                videoMedia.appendChild(videoSourceMedia);
                videoSourceMedia.setAttribute("src", "./Sample Photos/"+nameFile+"/"+mediasArray[sortedByTitleIndex].vidoe);
                titleMedia[sortedByTitleIndex].textContent = mediasArray[sortedByTitleIndex].title;
            }else{
                currentMedia.remove();

                const imgMedia = document.createElement('img');
                imgMedia.classList.add("imageMedia");
                imgMedia.id = "media"+sortedByTitleIndex;
                mediaContainer[sortedByTitleIndex].prepend(imgMedia);
                imgMedia.setAttribute("src", "./Sample Photos/"+nameFile+"/"+mediasArray[sortedByTitleIndex].image);
            }
            heartsMedia[sortedByTitleIndex].innerHTML = mediasArray[sortedByTitleIndex].likes+'<i class="fas fa-heart heartIcon" aria-hidden="true"></i>';
            sortedByTitleIndex++;
        });
    }
    document.querySelector(".triSelect").addEventListener("change", function(){
        if (document.querySelector(".triSelect") && document.querySelector(".triSelect").value === "popularite") {
            sortByPopularity();
        }else if(document.querySelector(".triSelect") && document.querySelector(".triSelect").value === "date") {
            sortByDate();
        }else if(document.querySelector(".triSelect") && document.querySelector(".triSelect").value === "titre") {
            sortByName();
        }else{
            alert("Une erreur est arrivé !");
        }
    });
    document.querySelector(".triSelect").value;

    const mediaModalContainer = document.querySelector(".mediaModalContainer");
    const closeMediaModal = document.querySelector(".closeImgModal");
    const previousMediaModal = document.querySelector(".leftArrowIcon");
    const nextMediaModal = document.querySelector(".rightArrowIcon");

    const mediaModal = document.querySelector(".mediaModal");
    for (let i = 0; i < mediasArray.length; i++) {
        const imageMediaContainer = document.querySelectorAll(".mediaImageVideo")[i];
        imageMediaContainer.addEventListener("click", function(){
            mediaModalContainer.classList.add("displayFlex");
            mediaModalContainer.classList.remove("displayNone");

            const imageMediaModal = document.createElement('img');
            if (mediasArray[i].image !== undefined) {
                imageMediaModal.setAttribute("src", "./Sample Photos/"+nameFile+"/"+mediasArray[i].image);
                imageMediaModal.classList.add("imageModal");
                imageMediaModal.id = "media"+i;
                mediaModal.appendChild(imageMediaModal);
            }else{
                const videoModal = document.createElement("video");
                videoModal.classList.add("imageModal");
                videoModal.id = "media"+i;
                mediaModal.appendChild(videoModal);
                videoModal.controls = true;

                const videoSourceMedia = document.createElement('source');
                document.querySelector(".imageModal").appendChild(videoSourceMedia);
                videoSourceMedia.setAttribute("src", "./Sample Photos/"+nameFile+"/"+mediasArray[i].video);
            }
        });

    }
    closeMediaModal.addEventListener("click", function(){
        const currentImageMediaModal = document.querySelector(".imageModal");
        mediaModalContainer.classList.add("displayNone");
        mediaModalContainer.classList.remove("displayFlex");
        currentImageMediaModal.remove();
    });

    previousMediaModal.addEventListener("click", function(){
        const currentImageMediaModal = document.querySelector(".imageModal");
        currentImageMediaModal.remove();
        let indexOfImage = currentImageMediaModal.id.substr(5,5);
        let index = indexOfImage - 1;
        let mediaShow = mediasArray[index];
        if (index == -Math.abs(-1)) {
            mediaShow = mediasArray[mediasArray.length - 1];
            index = mediasArray.length - 1;
        }

        if (mediaShow.image !== undefined) {
            const media = document.createElement('img');
            media.setAttribute("src", "./Sample Photos/"+nameFile+"/"+mediaShow.image);
            media.classList.add("imageModal");
            media.id = "media"+index;
            mediaModal.appendChild(media);
        }else{
            const videoModal = document.createElement("video");
            videoModal.classList.add("imageModal");
            videoModal.id = "media"+index;
            mediaModal.appendChild(videoModal);
            videoModal.controls = true;

            const videoSourceMedia = document.createElement('source');
            document.querySelector(".imageModal").appendChild(videoSourceMedia);
            videoSourceMedia.setAttribute("src", "./Sample Photos/"+nameFile+"/"+mediaShow.video);
        }
    });

    nextMediaModal.addEventListener("click", function(){
        const currentImageMediaModal = document.querySelector(".imageModal");
        currentImageMediaModal.remove();
        let indexOfImage = currentImageMediaModal.id.substr(5,5);
        let index = parseInt(indexOfImage)+1;
        if (index >= mediasArray.length) {
            index = mediasArray.length - mediasArray.length;
        }

        if (mediasArray[index].image !== undefined) {
            const media = document.createElement('img');
            media.setAttribute("src", "./Sample Photos/"+nameFile+"/"+mediasArray[index].image);
            media.classList.add("imageModal");
            media.id = "media"+index;
            mediaModal.appendChild(media);
        }else{
            const videoModal = document.createElement("video");
            videoModal.classList.add("imageModal");
            videoModal.id = "media"+index;
            mediaModal.appendChild(videoModal);
            videoModal.controls = true;

            const videoSourceMedia = document.createElement('source');
            document.querySelector(".imageModal").appendChild(videoSourceMedia);
            videoSourceMedia.setAttribute("src", "./Sample Photos/"+nameFile+"/"+mediasArray[index].video)
        }
    });

    // ===== Bottom total likes - prix/jours =====
    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add("bottomPhotographerInfo");
    main.appendChild(bottomContainer);

    const likesContainer = document.createElement('span');
    likesContainer.classList.add("heartIconUser");
    bottomContainer.appendChild(likesContainer);
    likesContainer.innerHTML = sum+'<i class="fas fa-heart heartIcon"></i>';

    const priceContainer = document.createElement('span');
    bottomContainer.appendChild(priceContainer);
    priceContainer.textContent = user.price+"€ / jour";
}