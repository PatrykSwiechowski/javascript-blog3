
'use strict';

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
//(function () {
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);


  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector);
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

//}//)();

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
      const tagHTML = article.querySelectorAll = '<li><a href= #tag-' + tag + '>' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + tagHTML;
      console.log(tagHTML);

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    optWrapperTag.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('Clicked tag' + href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {

    /* remove class active */
    activeTagLink.classList.remove('active');
    console.log(activeTagLink);
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const linksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let linkHref of linksHref) {

    /* add class active */
    linkHref.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  //generateTitleLinks(optArticleSelector);
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  //const clickedElement = this;
  //const href = clickedElement.getAttribute('href');
  /* find all links to tags */
  const linksTags = document.querySelectorAll('[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let linkTag of linksTags) {
    /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }


}

addClickListenersToTags();

const optArticleAuthorSelector = '.post-author';

function generateAuthors() {
  const articles = document.querySelectorAll('article');
  console.log(articles);
  for (let article of articles) {
    const wrapperAuthorTag = article.querySelector(optArticleAuthorSelector);
    console.log(wrapperAuthorTag);
    const dataAuthor = article.getAttribute('data-author');
    console.log(dataAuthor);
    const authorHTML = wrapperAuthorTag.querySelectorAll = '<li><a href= "#author-' + dataAuthor + '>' + dataAuthor + '"</a></li>';
    wrapperAuthorTag.innerHTML = authorHTML;
    console.log(authorHTML);

  }

}

generateAuthors();

function authorClickHandler(event) {

  event.preventDefault();


  const clickedElement = this;
  console.log(event);


  const href = clickedElement.getAttribute('href');
  console.log('Clicked author' + href);


  const author = href.replace('#author-', '');
  console.log(author);


  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks);


  for (let activeAuthorLink of activeAuthorLinks) {


    activeAuthorLink.classList.remove('active');
    console.log(activeAuthorLink);

  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let authorLinkHref of authorLinksHref) {


    authorLinkHref.classList.add('active');

  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorsTags = document.querySelectorAll('[href^="#author-"]');
  for (let authorTag of authorsTags) {
    authorTag.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();