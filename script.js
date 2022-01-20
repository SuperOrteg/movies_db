const keywords = [];

const showFeedPost = (movie) => {
    document.querySelector('.articlesList').innerHTML += `
        <article>
            <h2>${movie.Title}</h2>
            <img src="${movie.Poster}">
            <p>${movie.Year}</p>
            <button class="btn" value="${movie.imdbID}">Read More</button>
        </article>
    `;
};

const cleanedKeyword = (keyword) => {
    const cleanedKeyword = keyword;

    return cleanedKeyword.replace(/[^a-zA-Z ]/g, "").toLowerCase();
};

const cleanAll = () => {
	document.querySelector('.articlesList').innerHTML = '';
};

const search = (input) => {

	const url = `http://www.omdbapi.com/?s=${input}&apikey=${API}`;

	fetch(url)
	  .then((response) => { return response.json(); })
	  .then((response) => { response.Search.forEach(movies => showFeedPost(movies)); })
	  .catch((error) => { console.error(error); });
};

const submit = () => {
	return search(inputElement);
}

const addNewKeyword = (label, keyword) => {
    resetInput();

    if (keywords.includes(keyword)) {
        console.warn("You already added this keyword. Nothing happens.");
        return;
    }

    if (!label || !keyword) {
        console.error("It seems you forgot to write the label or keyword in the addNewKeyword function");
        return;
    }

    keywords.push(keyword);
    currentKeywords.push(keyword);

    document.querySelector('.keywordsList').innerHTML += `
        <div>
            <input id="${label}" value="${keyword}" type="checkbox" checked onchange="toggleKeyword(this.value)">
            <label for="${label}">${label}</label>
        </div>
    `;

    reloadArticles();
    resetKeywordsUl();
};

window.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.querySelector('input[type="text"]');

    document.querySelector('.addKeywordsForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const keywordInputValue = inputElement.value;
        search(cleanedKeyword(keywordInputValue));
        cleanAll();
    });
});

// data.Search.forEach(movies => showFeedPost(movies));