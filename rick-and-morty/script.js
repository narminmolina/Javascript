const apiURL = "https://rickandmortyapi.com/api/character";

async function getCharacter() {
  let res = await fetch(`${apiURL}`);
  let data = await res.json();

  return data;
}

async function getEpisode(parametr) {
  let res = await fetch(parametr);
  let data = await res.json();

  return data;
}

async function applyCardInfoSingle() {
  let image = document.querySelector(".image img");
  let title = document.querySelector("h2");
  let firstSeen = document.querySelector(".first-seen");
  let statusIcon = document.querySelector(".status-icon");

  let { results } = await getCharacter();
  console.log(
    "🚀 ~ file: script.js ~ line 35 ~ applyCardInfo ~ results",
    results
  );
  const [firstElement] = results;

  //   const [{ name, image: imageSrc, episode: episodes, status }] = results;

  title.innerHTML = firstElement.name;
  image.src = firstElement.image;
  let episodeUrl = firstElement.episode[0];

  let episode = await getEpisode(episodeUrl);
  firstSeen.innerHTML = episode.name;

  let status = firstElement.status;

  status === "Alive"
    ? (statusIcon.style.backgroundColor = "green")
    : (statusIcon.style.backgroundColor = "red");
}

let container = document.querySelector(".grid-container");
const more = document.querySelector(".more");

export async function applyCardInfo(results) {
  results.forEach(async (element) => {
    const episode = await getEpisode(element.episode[0]);

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

let { results } = await getCharacter();

applyCardInfo(results);

async function getNewCharacters(url) {
  console.log("🚀 ~ file: script.js ~ line 92 ~ getNewCharacters ~ url", url);
  let res = await fetch(url);
  let data = await res.json();

  return data;
}

async function getMoreCharacters(url) {
  let { info } = await getCharacter();
  // const next = await getNewCharacters(info.next);
  // const prev = await getNewCharacters(info.next);

  if (info.next || info.prev) {
    more.innerHTML = `
		     ${
           info.prev
             ? `<button class="btn" onclick=""getNewCharacters('${info.prev}')"">Prev</button>`
             : ""
         }
		     ${
           info.next
             ? `<button class="btn" onclick="getNewCharacters('${info.next}')">Next</button>`
             : ""
         }
		`;
  } else {
    more.innerHTML = "";
  }
}

getMoreCharacters();
