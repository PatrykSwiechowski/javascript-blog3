'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log(event);
    console.log('Link was clicked!');

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log('Clicked article' + articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */

    const correctArticle = document.querySelector(articleSelector);
    console.log(correctArticle);

    /* add class 'active' to the correct article */
    correctArticle.classList.add('active');

  };


  /*const links = document.querySelectorAll('.titles a');
  console.log(links);
  
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }*/
  (function () {
    const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';

    function generateTitleLinks() {

      /* remove contents of titleList */

      const titleList = document.querySelector(optTitleListSelector);
      console.log(titleList);


      titleList.innerHTML = '';

      /* for each article */
      const articles = document.querySelectorAll(optArticleSelector);
      console.log(articles);
      let html = '';
      for (let article of articles) {

        /* get the article id */
        const articleId = article.getAttribute('id');
        console.log(articleId);

        /* find the title element */  /* get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle);

        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log(linkHTML);

        /* insert link into titleList */
        html = html + linkHTML;

      }
      titleList.innerHTML = html;
      console.log(html);

      const links = document.querySelectorAll('.titles a');
      console.log(links);

      for (let link of links) {
        link.addEventListener('click', titleClickHandler);
      }


      /* get the article id */

      /* find the title element */

      /* get the title from the title element */

      /* create HTML of the link */

      /* insert link into titleList */
      // generateTitleLinks();
    }
    generateTitleLinks();
  })();

  const optArticleTagsSelector = '.post-tags .list';


  function generateTags() {

    /* find all articles */

    const articles = document.querySelectorAll('article');
    console.log(articles);


    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const optWrapperTag = article.querySelector(optArticleTagsSelector);
      console.log(optWrapperTag);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const optDataTags = article.getAttribute('data-tags');
      console.log(optDataTags);

      /* split tags into array */
      const articleTagsArray = optDataTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* generate HTML of the link */
        const tagHTML = article.querySelectorAll = '<li><a href="#tag-' + tag + '>' + tag + '</a></li>'

        /* add generated code to html variable */
        html = html + tagHTML;
        console.log(tagHTML);

        /* END LOOP: for each tag */
      }
      optWrapperTag.innerHTML = html;
    }





    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
  }

  generateTags();
}




