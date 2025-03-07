document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");
    const contentDiv = document.getElementById("content");
    const titleElement = document.getElementById("terms-title");
    // const descriptionElement = document.getElementById("terms-description");
    const contentElement = document.getElementById("terms-content");

    const apiUrl = "https://consent-development.farmunited.com/api/version/v2/latestVersion?projectId=3991"; // Replace with actual API URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedLang = urlParams.get("lang") || "EN"; // Default to English if no lang param
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            loader.style.display = "none"; // Hide loader
            contentDiv.style.display = "block"; // Show content

            const termsOfUse = data.documents.find(doc =>
                doc.title.some(titleObj => titleObj.content.toLowerCase() === "terms of use")
            );

            if (termsOfUse) {
                const titleObj = termsOfUse.title.find(t => t.language === selectedLang) || termsOfUse.title[0];
                const descObj = termsOfUse.description.find(d => d.language === selectedLang) || termsOfUse.description[0];
                const htmlObj = termsOfUse.htmlContent.find(h => h.language === selectedLang) || termsOfUse.htmlContent[0];

                titleElement.textContent = titleObj.content;
                // descriptionElement.textContent = descObj.content;
                contentElement.innerHTML = htmlObj.content;
            } else {
                titleElement.textContent = "No Content Found";
                // descriptionElement.textContent = "Sorry, there are no Terms of Use available.";
                contentElement.innerHTML = "Sorry, there are no Terms of Use available.";
            }
        })
        .catch(error => {
            loader.style.display = "none";
            contentDiv.style.display = "block";
            titleElement.textContent = "Error";
            // descriptionElement.textContent = "Failed to load content.";
            console.error("Error fetching data:", error);
        });
});
