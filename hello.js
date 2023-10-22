const loadData = url => {
  const dataUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${url}`;
  fetch(dataUrl)
    .then(res => res.json())
    .then(data => showData(data));
};

const showData = data => {
  const showResult = document.getElementById('showResult');
  const element = data[0];
  console.log(data[0]);
  showResult.innerHTML = `
       <audio  id="stAudio" src="${element.phonetics[0]?.audio}"></audio>
      <div>
         <div id="playAudio" class="w-fit ms-auto text-white cursor-pointer">
           <i class="fa-solid fa-play text-2xl"></i>
         </div>
        <h3 class="font-semibold text-3xl ">${element.word}</h3>
        <small> ${element.license.name} </small>
        <p class=" mt-3 font-semibold">${element.meanings[0]?.partOfSpeech}</p> 
        Meaning:
        <p> ${element.meanings[0]?.definitions[0]?.definition}</p>
        <p class="my-5">Synonyms: <em>${
          element.meanings[0]?.synonyms[0]
            ? element.meanings[0]?.synonyms[0]
            : 'Not Available'
        }</em></p>
        <p class="mt-5  font-semibold">${element.meanings[1]?.partOfSpeech}</p>
        Meaning:
        <p>${element.meanings[1].definitions[0].definition}</p>
      </div>
  `;
  const audio = document.getElementById('stAudio');
  document.getElementById('playAudio').addEventListener('click', () => {
    document.getElementById(
      'playAudio'
    ).innerHTML = `<i class="fa-solid fa-pause text-2xl"></i>`;
    setTimeout(() => {
      document.getElementById(
        'playAudio'
      ).innerHTML = `<i class="fa-solid fa-play text-2xl"></i>`;
    }, 1100);
    audio.play();
  });
};

document.getElementById('searchBtn').addEventListener('click', () => {
  let searchTerm = document.querySelector('#inputSearch').value;
  document.getElementById('showResult').innerHTML = '';
  loadData(`${searchTerm}`);
});

loadData('hello');
