const apiKey = '46ff8bbd0e2d47739c69516027ee4204';
const blog = document.querySelector('blog-container');
const searchBox = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');

// Fetching random news articles
async function fetchRandomNews() {
    apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    try {   
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles || []
    }catch(error){
        console.error('Error fetching random news:', error);
        return [];
    }
}

// Displaying news articles
function showNews(articles){
 blogCon.innerHTML = '';
    articles.forEach(article => {
        blogCon.innerHTML += `
        <div class="blog-card">
            <img src="${article.urlToImage}" alt="Blog Image">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        </div>
        `
    });
}

// loaded page on news
(async ()=>{
    try{
        const articles = await getRandomNews();
        showNews(articles);
    }catch(error){
    console.error('Error for fetching random news',error); 
}

})();

// getting news  by query
async function getnewsquery(){
  apiUrl = 'https://newsapi.org/v2/everything?q=${query}&pagesize=10&apiKey=${apiKey}'
  try {   
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles || []
    }catch(error){
        console.error('Error getting News by query', error);
        return [];
    }
}
// add event listener
searchBtn.addEventListener("click",async()=>{
    const query = searchBox.ariaValueMax.trim();
    if(query!==''){
        try{
            const articles= await getnewsquery(query);
            showNews(articles);
        }catch(error){
            console.error('eror fetching news by query');
        }
    }
}
)
    


