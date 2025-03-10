document.addEventListener("DOMContentLoaded", function () {
    let searchSection = document.getElementById("searchSection");
    let translationSection = document.getElementById("translationSection");
    let searchForm = document.getElementById("searchForm");
    let backButton = document.getElementById("backButton");

    function getQueryParam(param) {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function searchWord(event) {
        if (event) event.preventDefault();

        let inputWord = document.getElementById("searchInput").value.trim().toLowerCase();

        if (!inputWord) return;

        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                let found = data.find(entry =>
                    entry.english.toLowerCase() === inputWord ||
                    entry.tagalog.toLowerCase() === inputWord ||
                    entry.cebuano.toLowerCase() === inputWord ||
                    entry.hiligaynon.toLowerCase() === inputWord
                );

                if (found) {
                    updateOutput("outputEnglish", found.english);
                    updateOutput("meaningEnglish", found.meaning_english);
                    updateOutput("exampleEnglish", found.example_english);

                    updateOutput("outputTagalog", found.tagalog);
                    updateOutput("meaningTagalog", found.meaning_tagalog);
                    updateOutput("exampleTagalog", found.example_tagalog);

                    updateOutput("outputCebuano", found.cebuano);
                    updateOutput("meaningCebuano", found.meaning_cebuano);
                    updateOutput("exampleCebuano", found.example_cebuano);

                    updateOutput("outputHiligaynon", found.hiligaynon);
                    updateOutput("meaningHiligaynon", found.meaning_hiligaynon);
                    updateOutput("exampleHiligaynon", found.example_hiligaynon);
                } else {
                    displayNotFound();
                }

                // Show results and hide search
                searchSection.style.display = "none";
                translationSection.style.display = "block";
            })
            .catch(error => console.error("Error loading data:", error));
    }

    function updateOutput(id, text) {
        let element = document.getElementById(id).querySelector("span");
        if (element) {
            element.innerText = text;
        }
    }

    function displayNotFound() {
        ["outputEnglish", "meaningEnglish", "exampleEnglish",
         "outputTagalog", "meaningTagalog", "exampleTagalog",
         "outputCebuano", "meaningCebuano", "exampleCebuano",
         "outputHiligaynon", "meaningHiligaynon", "exampleHiligaynon"]
        .forEach(id => updateOutput(id, "Not found"));
    }

    function searchFromURL() {
        let word = getQueryParam("word");
        if (word) {
            document.getElementById("searchInput").value = word;
            searchWord();
        }
    }

    // Handle form submission
    searchForm.addEventListener("submit", searchWord);

    // Handle back button
    backButton.addEventListener("click", function () {
        searchSection.style.display = "flex"; // Show search again
        translationSection.style.display = "none"; // Hide results
        document.getElementById("searchInput").value = ""; // Clear input
    });

    // Auto search if word is in URL
    searchFromURL();
});
