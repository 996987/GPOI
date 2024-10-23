const langButtons = document.querySelectorAll(".lang-button");
const textInput = document.querySelector(".text-input");
const translationText = document.querySelector(".translation-text");
const translationFlag = document.querySelector(".translation-flag");
const resetButton = document.querySelector(".reset-button");
const startingLangButtons = document.querySelectorAll(".starting-lang-button");
const panel = document.querySelectorAll(".panel");
const accuracyScore = document.querySelector(".accuracy-score");

async function translate(text, lang, flag, startingLang) {
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${startingLang}|${lang}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    const result = jsonData.responseData.translatedText;
    const match = jsonData.matches[0].match;

    translationText.innerText = result;
    translationFlag.innerText = flag;

    // Aggiungi il match sotto la traduzione
    
    accuracyScore.innerText = "Accuracy: " + (match * 100).toFixed(2) + '%';
}


startingLangButtons.forEach(function(startingLangButton) {
    startingLangButton.addEventListener('click', function () {
        const lang = startingLangButton.dataset.lang;
        console.log(lang);
        fullTranslator(lang);
    });
});


function changeWindow(mode) {
    if(mode===1){
        panel[1].classList.add("hidden");
        panel[2].classList.remove("hidden");
        panel[3].classList.remove("hidden");
        panel[4].classList.remove("hidden");
    }else{
        panel[1].classList.remove("hidden");
        panel[2].classList.add("hidden");
        panel[3].classList.add("hidden");
        panel[4].classList.add("hidden");
    }
    
}

function fullTranslator(startingLang) {
    changeWindow(1);

    // Disabilita il bottone della lingua selezionata come lingua di partenza
    langButtons.forEach(function(langButton) {
        if (langButton.dataset.lang === startingLang) {
            langButton.disabled = true; // Disabilita il bottone
            langButton.style.opacity = 0.5; // Cambia l'opacità per rendere visibile che è disabilitato
        } else {
            langButton.disabled = false;
            langButton.style.opacity = 1;
        }
    });

    langButtons.forEach(function(langButton) {
        langButton.addEventListener('click', function () {
            const text = textInput.value.trim();
            if (text === '') {
                alert("Inserisci del testo da tradurre");
                return;
            }
            const lang = langButton.dataset.lang;
            const flag = langButton.innerText;
            translate(text, lang, flag, startingLang);
        });
    });
}


resetButton.addEventListener('click', function() {
    textInput.value = '';
    translationText.innerText = 'Traduzione';
    translationFlag.innerText = '';
    accuracyScore.innerText = '';
    changeWindow(0);
});
