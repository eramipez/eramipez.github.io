document.addEventListener("DOMContentLoaded", function () {
    const textContainer = document.getElementById("text-container");
    const imageContainer = document.getElementById("image-container");
    const carouselContainer = document.getElementById("carousel-container");
    const carouselImage = document.getElementById("carousel-image");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const backgroundMusic = document.getElementById("background-music");

    function playMusic() {
        backgroundMusic.play().catch(error => console.log("Autoplay bloqueado, esperar interacción del usuario."));
        document.removeEventListener("click", playMusic);
    }

    // Iniciar música cuando el usuario haga clic en cualquier parte de la pantalla
    document.addEventListener("click", playMusic);

    const texts = [
        "Que hay personas por las que vale la pena derretirse... ❤️",
        "Feliz Cumpleaños a la niña de mi corazón 💖",
        "Feliz Cumpleaños Eli 🥳💕"
    ];

    const images = [
        "imagenes/imagen1.jpeg", "imagenes/imagen2.jpeg", "imagenes/imagen3.jpeg", "imagenes/imagen4.jpeg", "imagenes/imagen5.jpeg",
        "imagenes/imagen6.jpeg", "imagenes/imagen7.jpeg", "imagenes/imagen8.jpeg", "imagenes/imagen9.jpeg", "imagenes/imagen10.jpeg",
        "imagenes/imagen11.jpeg", "imagenes/imagen12.jpeg", "imagenes/imagen13.jpeg", "imagenes/imagen14.jpeg", "imagenes/imagen15.jpeg",
        "imagenes/imagen16.jpeg", "imagenes/imagen17.jpeg", "imagenes/imagen18.jpeg", "imagenes/imagen19.jpeg", "imagenes/imagen20.jpeg"
    ];

    let carouselIndex = 0;

    function showText(index, callback) {
        textContainer.textContent = "";
        textContainer.style.opacity = 1;
        let text = texts[index];
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < text.length) {
                textContainer.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    textContainer.style.opacity = 0;
                    setTimeout(() => {
                        if (callback) callback();
                    }, 1000);
                }, 5000);
            }
        }

        typeWriter();
    }

    function showImages() {
        imageContainer.innerHTML = "";
        let imgIndex = 0;

        function nextImage() {
            if (imgIndex < images.length) {
                let img = document.createElement("img");
                img.src = images[imgIndex];
                imageContainer.innerHTML = "";
                imageContainer.appendChild(img);
                img.style.display = "block";
                imgIndex++;
                setTimeout(nextImage, 500);
            } else {
                imageContainer.innerHTML = "";
                showText(1, () => {
                    showText(2, showCarousel);
                });
            }
        }
        nextImage();
    }

    function showCarousel() {
        carouselContainer.style.display = "flex"; // Ahora sí aparece en el momento correcto
        carouselImage.src = images[carouselIndex];

        prevButton.addEventListener("click", () => {
            carouselIndex = (carouselIndex - 1 + images.length) % images.length;
            carouselImage.src = images[carouselIndex];
        });

        nextButton.addEventListener("click", () => {
            carouselIndex = (carouselIndex + 1) % images.length;
            carouselImage.src = images[carouselIndex];
        });
    }

    // Iniciar la animación corregida
    setTimeout(() => {
        showText(0, () => {
            setTimeout(showImages, 1000);
        });
    }, 1000);
});


