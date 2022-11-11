const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const container = document.querySelector(".grid-container");
const input = document.querySelector("input");
const button = document.querySelector(".find");
const select = document.querySelector("select");

async function getCharacter() {
  const response = await fetch("https://rickandmortyapi.com/api/character", {
    method: "GET",
  });
  const data = await response.json();

  return data;
}

async function getEpisode(episodeURL) {
  const response = await fetch(episodeURL);
  const data = await response.json();
  return data;
}

async function applyCardInfo(results) {
  container.innerHTML = "";

  results.forEach(async (element) => {
    const episode = await getEpisode(element.episode[0]);
    console.log(element);
    container.innerHTML += `
  <div class="grid-item">
   <div class="image">
     <img src=${element.image} alt="photo" width="220px" height="220px" />
   </div>
   <div class="description">
     <h2>${element.name}</h2>
     <span class="status">
       <span class="status-icon ${element.status}"></span>
     </span>
     <div class="section">
       <span class="text-gray">Last known location:</span>
       <a href="" class="location">
         ${element.location.name}
       </a>
     </div>
     <div class="section">
       <span class="text-gray">First seen in:</span>
        <a class="first-seen">${episode.name}</a>
     </div>
   </div>
 </div>`;
  });
}

async function getNextPage(nextPageURL) {
  const response = await fetch(nextPageURL);
  const data = await response.json();

  return data;
}

async function paginationButtons({ next, prev }) {
  if (next) {
    nextButton.style.display = "block";
    nextButton.setAttribute("data-url", next);
  } else {
    nextButton.style.display = "none";
  }
  if (prev) {
    prevButton.style.display = "block";
    prevButton.setAttribute("data-url", prev);
  } else {
    prevButton.style.display = "none";
  }
}

async function searchCharacter(name, status) {
  let res = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${name}${
      status ? `&status=${status}` : ""
    }`
  );
  let data = await res.json();

  return data;
}

button.addEventListener("click", async () => {
  let value = input.value;
  let selectedStatus = select.value;

  let { info, results } = await searchCharacter(value, selectedStatus);
  applyCardInfo(results);
  paginationButtons(info);
});

async function initializePage() {
  let { info, results } = await getCharacter();
  applyCardInfo(results);
  paginationButtons(info);
}

initializePage();

nextButton.addEventListener("click", async (e) => {
  const { info, results } = await getNextPage(e.target.dataset.url);
  applyCardInfo(results);
  paginationButtons(info);
});

prevButton.addEventListener("click", async (e) => {
  const { info, results } = await getNextPage(e.target.dataset.url);
  applyCardInfo(results);
  paginationButtons(info);
});
