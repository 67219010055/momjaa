/* =========================================
   MUSIC SYSTEM
========================================= */

let music = null;


function getMusic() {

    if (!music) {

        music =
            document.getElementById(
                "backgroundMusic"
            );

    }

    return music;
}


function startMusic() {

    const audio = getMusic();

    if (!audio) return;

    audio.volume = 0.45;

    audio.loop = true;

    const playPromise = audio.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                updateMusicButton();

            })
            .catch(() => {

                // Chrome อาจบล็อก autoplay
                // ไม่ต้องทำอะไรตรงนี้
                updateMusicButton();

            });

    }

}


/* =========================================
   AUTOPLAY FALLBACK
========================================= */

function waitForUserInteraction() {

    const unlock = () => {

        const audio = getMusic();

        if (!audio) return;


        audio.play()
            .then(() => {

                updateMusicButton();

            })
            .catch(() => {});


    };


    document.addEventListener(
        "click",
        unlock,
        { once: true }
    );


    document.addEventListener(
        "touchstart",
        unlock,
        { once: true }
    );


    document.addEventListener(
        "pointerdown",
        unlock,
        { once: true }
    );

}


/* =========================================
   MUSIC BUTTON
========================================= */

function updateMusicButton() {

    const audio = getMusic();


    const button =
        document.querySelector(
            ".music-button"
        );


    if (!button || !audio) return;


    button.textContent =
        audio.paused
            ? "🔇"
            : "🔊";

}


function toggleMusic() {

    const audio = getMusic();

    if (!audio) return;


    if (audio.paused) {

        audio.play()
            .then(() => {

                updateMusicButton();

            })
            .catch(() => {});

    } else {

        audio.pause();

        updateMusicButton();

    }

}


/* =========================================
   PAGE SYSTEM
========================================= */

function showPage(page) {


    const pageOne =
        document.getElementById(
            "pageOne"
        );


    const pageJasmine =
        document.getElementById(
            "pageJasmine"
        );


    const pageLove =
        document.getElementById(
            "pageLove"
        );


    /*
       ซ่อนทุกหน้า
    */

    if (pageOne) {

        pageOne.classList.add(
            "hidden-page"
        );

        pageOne.classList.remove(
            "page-visible"
        );

    }


    if (pageJasmine) {

        pageJasmine.classList.add(
            "hidden-page"
        );

        pageJasmine.classList.remove(
            "page-visible"
        );

    }


    if (pageLove) {

        pageLove.classList.add(
            "hidden-page"
        );

        pageLove.classList.remove(
            "page-visible"
        );

    }


    /*
       แสดงหน้าที่เลือก
    */

    if (
        page === "one" &&
        pageOne
    ) {

        pageOne.classList.remove(
            "hidden-page"
        );

        pageOne.classList.add(
            "page-visible"
        );


        document.body.className =
            "page-one";

    }


    if (
        page === "jasmine" &&
        pageJasmine
    ) {

        pageJasmine.classList.remove(
            "hidden-page"
        );

        pageJasmine.classList.add(
            "page-visible"
        );


        document.body.className =
            "page-two";


        createSparkles();

    }


    if (
        page === "love" &&
        pageLove
    ) {

        pageLove.classList.remove(
            "hidden-page"
        );

        pageLove.classList.add(
            "page-visible"
        );


        document.body.className =
            "page-three";


        createLoveParticles();

    }

}


/* =========================================
   PAGE 1 → PAGE 2
========================================= */

function goToJasmine() {

    const audio = getMusic();

    // ถ้าเพลงยังไม่เล่น ให้เริ่มเพลงจากการกดหัวใจ
    if (audio && audio.paused) {

        audio.volume = 0.45;

        audio.play()
            .then(() => {
                updateMusicButton();
            })
            .catch(() => {});
    }

    createSparkles();

    setTimeout(() => {

        showPage("jasmine");

    }, 500);
}


/* =========================================
   PAGE 2 → PAGE 3
========================================= */

function goToLove() {


    createSparkles();


    setTimeout(() => {

        showPage("love");

    }, 500);

}


/* =========================================
   SPARKLES
========================================= */

function createSparkles() {


    const colors = [
        "#ffffff",
        "#f6eacb",
        "#fff4a8"
    ];


    for (
        let i = 0;
        i < 18;
        i++
    ) {


        const sparkle =
            document.createElement(
                "div"
            );


        sparkle.style.position =
            "fixed";


        sparkle.style.width =
            "5px";


        sparkle.style.height =
            "5px";


        sparkle.style.borderRadius =
            "50%";


        sparkle.style.background =
            colors[
                Math.floor(
                    Math.random()
                    * colors.length
                )
            ];


        sparkle.style.boxShadow =
            "0 0 10px rgba(255,255,255,.9)";


        sparkle.style.pointerEvents =
            "none";


        sparkle.style.left =
            "50%";


        sparkle.style.top =
            "42%";


        sparkle.style.zIndex =
            "9999";


        document.body.appendChild(
            sparkle
        );


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            60 +
            Math.random() * 130;


        const x =
            Math.cos(angle)
            * distance;


        const y =
            Math.sin(angle)
            * distance;


        sparkle.animate(

            [

                {

                    transform:
                        "translate(-50%,-50%) scale(1)",

                    opacity: 1

                },


                {

                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(0)`,

                    opacity: 0

                }

            ],


            {

                duration:
                    800 +
                    Math.random() * 600,

                easing:
                    "cubic-bezier(.2,.8,.3,1)"

            }

        );


        setTimeout(
            () => sparkle.remove(),
            1500
        );

    }

}


/* =========================================
   LOVE PARTICLES
========================================= */

function createLoveParticles() {


    for (
        let i = 0;
        i < 15;
        i++
    ) {


        const heart =
            document.createElement(
                "div"
            );


        heart.textContent =
            Math.random() > .5
                ? "♡"
                : "🤍";


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() * 100
            + "%";


        heart.style.bottom =
            "-30px";


        heart.style.fontSize =
            12 +
            Math.random() * 18
            + "px";


        heart.style.opacity =
            .2 +
            Math.random() * .5;


        heart.style.pointerEvents =
            "none";


        heart.style.zIndex =
            "2";


        document.body.appendChild(
            heart
        );


        heart.animate(

            [

                {

                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 0

                },


                {

                    transform:
                        `translateY(-110vh)
                         rotate(${Math.random() * 180}deg)`,

                    opacity: 1

                }

            ],


            {

                duration:
                    7000 +
                    Math.random() * 5000,

                delay:
                    Math.random() * 4000,

                iterations:
                    Infinity

            }

        );

    }

}


/* =========================================
   TYPING TEXT
========================================= */

const text =
    "สงสัยมั้ยจ้ะว่าในนี้มีอะไร";


let typingIndex = 0;


function typeText() {


    const typingText =
        document.getElementById(
            "typingText"
        );


    const heart =
        document.getElementById(
            "heartButton"
        );


    if (
        !typingText ||
        !heart
    ) return;


    if (
        typingIndex <
        text.length
    ) {


        typingText.textContent +=
            text.charAt(
                typingIndex
            );


        typingIndex++;


        setTimeout(
            typeText,
            110
        );


    } else {


        setTimeout(() => {


            heart.classList.remove(
                "hidden"
            );


            heart.classList.add(
                "heart-show"
            );


        }, 500);

    }

}


/* =========================================
   START WEBSITE
========================================= */

window.addEventListener("load", () => {

    showPage("one");

    typeText();

    // พยายามเปิดเพลงทันที
    startMusic();

    updateMusicButton();

});