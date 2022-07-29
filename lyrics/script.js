const apiURL = 'https://api.lyrics.ovh';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

function searchSongs() {
  fetch(`${apiURL}/suggest/${term}`)
    .then((res) => res.json())
    .then((data) => showData(data));
}

function showData(data) {
  result.innerHTML = `<ul class="songs">
		${data.data
      .map(
        (song) => `<li>
		    			 <span><strong>${song.artist.name}</strong> - ${song.title}</span>
		    			 <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
					   </li>`
      )
      .join('')}</ul>
	`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let searchTerm = search.value.trim();

  if (searchTerm) {
    //search songs
    searchSongs(searchTerm);
  }
});

result.addEventListener('click' (e)=>)