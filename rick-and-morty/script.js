const apiURL = "https://rickandmortyapi.com/api/character";

// function getCharacter(character) {
//   fetch(`${apiURL}`)
//     .then((res) => res.json())
//     .then((data) => {
//       // show Data
//       console.log(data);
//     });
// }

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

async function applyCardInfo() {
  let gridItem = document.querySelector(".grid-item");
  let image = document.querySelector(".image img");
  let title = document.querySelector("h2");
  let location = document.querySelector(".location");
  let firstSeen = document.querySelector(".first-seen");
  let statusIcon = document.querySelector(".status-icon");

  let { results } = await getCharacter();
  console.log("🚀 ~ file: script.js ~ line 35 ~ applyCardInfo ~ results", results)
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
applyCardInfo();
