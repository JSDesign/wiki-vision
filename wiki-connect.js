// https://www.mediawiki.org/wiki/API:Query

'use strict';

// PREP FETCH
async function getWikiData(url) {
  document.getElementById('searchForm')
    .addEventListener('submit', (event) => {
      event.preventDefault();
    });
  try {
    let response = await fetch(url);
    return await response.text();
  } catch (err) {
    console.error(err.message);
  }
}

// FETCH (on input keyup)
document.getElementById('searchInput').addEventListener('keyup', (event) => {
  let inputText = event.target.value;
  getWikiData(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${inputText}&origin=*&format=json`)
    .then((data) => {
      data = JSON.parse(data);
      document.getElementById('searched')
        .innerHTML = `${inputText}`;
      document.getElementById('responseList')
        .innerHTML = '';
      data.query.search.forEach(function(article) {
        let responseListItem = document.createElement('li');
        responseListItem.innerHTML = `
          <span class="result-title">${article.title}</span>
          ${article.snippet} ...
          <a href="https://en.wikipedia.org/wiki/${article.title}" class="result-link" target="_blank">read on</a>
        `;
        document.getElementById('responseList')
          .appendChild(responseListItem);
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
});
