import "./style.css";

const userURL = "http://localhost:3000/api/users/";
export const articleURL = "http://localhost:3000/api/articles/";

const app = document.querySelector("#app");
export const articles = document.createElement("div");
articles.className = "articles";
app.appendChild(articles);

const getArticles = async () => {
  const response = await fetch(articleURL);
  const data = await response.json();
  console.log(data);
  data.map((article) => {
    articles.innerHTML += renderArticles(article.id, article.title, article.content);
  })
};

getArticles();

const renderArticles = (id, title, content) => {
  const element = `
  <div class="article">
    <h1>${title}</h1>
    <p>${content}</p>
    <button onclick="deleteArticle(${id})">Delete</button>
  </div>
  `;
  return element;
};

window.deleteArticle = (id) => {
  del(id);

}

const del = async (id) => {
  const url = articleURL + id;
  const response = await fetch(url, {
    method: "DELETE",
  }); 
  const status = await response.status;
  console.log(status);
  if(status === 204){
    articles.innerHTML = "";
    getArticles();
  }
}

const button = document.querySelector("#submit");
button.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title");
  const content = document.querySelector("#content");
  if(!title.value || !content.value){
    alert("please add a title and content");
  } else {
    postArticle(title.value, content.value);
    title.value = "";
    content.value = "";
  }
})

const postArticle = async (title, content) => {
  const response = await fetch(articleURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ title: title, content: content })
  });
  
  const status = response.status; 
  console.log(status);
  if(response.status === 200){
    articles.innerHTML = "";
    getArticles();
  }
};