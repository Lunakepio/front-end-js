import { articleURL, articles } from "./main";
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