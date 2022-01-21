const buttons = [];

const modal = document.getElementById('myModal');
const title = document.querySelector('.modal-title');
const content = document.querySelector('.modal-body');
const image = document.querySelector('#modal-img');

const lazyL = () => {
  let observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
      let card = document.getElementById(movie.imdbID);
      observer.observe(card.img);
        if (entry.isIntersecting) {
            const lazyImage = entry.target
            lazyImage.src = lazyImage.dataset.src
        };
    });
  });
};

// lazyL();

const showFeedPost = (movie) => {
    const placeholder = document.getElementsByClassName('articlesList')[0];
  const feedPost = document.createElement("article")
  feedPost.className = 'content-movie'
  feedPost.innerHTML = `
            <h2>${movie.Title}</h2>
            <img src="${movie.Poster}">
            <p>${movie.Year}</p>
            <button class="btn btn-secondary" id="${movie.imdbID}">Read More</button>
    `;

    placeholder.appendChild(feedPost);

  let card = document.getElementById(movie.imdbID);
  card.addEventListener("click", () => {
    getDetails(movie.imdbID);
  });
};

const getDetails = (id) => {
    const url = `http://www.omdbapi.com/?i=${id}&apikey=${API}`;

    fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          openModal(response);
        })
        .catch((error) => {
          console.error(error);
        });
};

const openModal = (movie) => {
    const close = document.querySelector('#close');
    close.addEventListener('click', () => { closeModal() });
    title.innerHTML = `${movie.Title}`;
    content.innerHTML = `${movie.Plot}`;
    image.src = `${movie.Poster}`
    modal.style.display = "block";
};

const closeModal = () => {
    modal.style.display = "none";
};

const cleanedKeyword = (keyword) => {
  const cleanedKeyword = keyword;

  return cleanedKeyword.replace(/[^a-zA-Z ]/g, "").toLowerCase();
};

const cleanAll = () => {
  document.querySelector(".articlesList").innerHTML = "";
};

const search = (input) => {
  const url = `http://www.omdbapi.com/?s=${input}&apikey=${API}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      response.Search.forEach((movies) => showFeedPost(movies));
    })
    .catch((error) => {
      console.error(error);
    });
};

const submit = () => {
  return search(inputElement);
};

window.addEventListener("DOMContentLoaded", () => {
  const inputElement = document.querySelector('input[type="text"]');

  document
    .querySelector(".addKeywordsForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const keywordInputValue = inputElement.value;
      search(cleanedKeyword(keywordInputValue));
      cleanAll();
    });
});