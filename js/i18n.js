document.addEventListener("DOMContentLoaded", () => {

    const languageBtn =
        document.getElementById("languageBtn");

    const languageText =
        document.getElementById("languageText");

    let language =
        localStorage.getItem("tm_language") || "en";


    function updateLanguage() {

        document.documentElement.lang = language;

        document
            .querySelectorAll("[data-en][data-si]")
            .forEach(element => {

                element.textContent =
                    element.dataset[language];

            });


        if (languageText) {

            languageText.textContent =
                language === "en"
                    ? "සිං"
                    : "EN";

        }

    }


    if (languageBtn) {

        languageBtn.addEventListener("click", () => {

            language =
                language === "en"
                    ? "si"
                    : "en";

            localStorage.setItem(
                "tm_language",
                language
            );

            updateLanguage();

        });

    }


    updateLanguage();

});