
'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/


const titleClickHandler = function (event) {
  event.preventDefault();// Nie zmienia adresu strony po hashu
  const clickedLink = this;
  console.log('Link was clicked!');
  console.log(event);
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active')
  }
  /* add class 'active' to the clicked link */
  clickedLink.classList.add('active');
  console.log(clickedLink);
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedLink.getAttribute('href');
  console.log(articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */
  const article = document.querySelector(articleSelector);
  console.log(article);
  /* add class 'active' to the correct article */
  article.classList.add('active');

}




const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.list.tags',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  console.log(titleList);
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(optArticleSelector + customSelector);
  console.log(articles);
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /* find the title element */ /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; //innerHTML wyciąga sam tekst HTML
    console.log(articleTitle);
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }


}
generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { max: '0', min: '999999' };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    } else if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  let classNumber = Math.floor(0.5 * 5 + 1);

  classNumber = Math.floor(0.5 * optCloudClassCount + 1);

  classNumber = Math.floor((4 / 8) * optCloudClassCount + 1);

  classNumber = Math.floor(((6 - 2) / (10 - 2)) * optCloudClassCount + 1);

  classNumber = Math.floor(((count - 2) / (10 - 2)) * optCloudClassCount + 1);

  classNumber = Math.floor(((count - 2) / (params.max - 2)) * optCloudClassCount + 1);

  classNumber = Math.floor(((count - params.min) / (params.max - 2)) * optCloudClassCount + 1);

  classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);
  return optCloudClassPrefix + classNumber;

}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const wrapperTags = article.querySelector(optArticleTagsSelector);
    console.log(wrapperTags);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */
      const tagHtml = '<li><a href=#tag-' + tag + ">" + tag + "</a></li >";
      console.log(tagHtml);
      /* add generated code to html variable */
      html = html + tagHtml;
      console.log(html);
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    console.log(allTags);
    /* insert HTML of all the links into the tags wrapper */
    wrapperTags.innerHTML = html;
    console.log(wrapperTags);
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* obliczanie parametrów*/
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += '<li><a href= #tag-' + tag + '><span>' + tag + '(' + allTags[tag] + ')</span></a></li>';
    const tagLinkHTML = '<li><a class = ' + calculateTagClass(allTags[tag], tagsParams) + ' href = #tag-' + tag + '><span>' + tag + '</span></a></li>';
    allTagsHTML += tagLinkHTML;
    console.log('tagLinkHTML:', tagLinkHTML);
  }
  console.log(allTagsHTML);
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log(allTags);
}


generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();// Nie zmienia adresu strony po hashu
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
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
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const linksHref = document.querySelectorAll('a[href="' + href + '"]');
  console.log(linksHref);
  /* START LOOP: for each found tag link */
  for (let linkHref of linksHref) {
    /* add class active */
    linkHref.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }

}

addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);
    let html = '';
    const authorTags = article.getAttribute('data-author');
    console.log(allAuthors);
    const authorHtml = '<li><a href= "#author-' + authorTags + '">' + authorTags + '</a></li>';
    console.log(authorHtml);
    console.log(html);
    /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthors[authorTags]) {
      /* [NEW] add tag to allTags object */
      allAuthors[authorTags] = 1;
    } else {
      allAuthors[authorTags]++;
    }
    authorWrapper.innerHTML = authorHtml;
  }

  /* [NEW] find list of author in right column */
  const authorList = document.querySelector(optAuthorsListSelector);
  console.log(authorList);
  /* [NEW] create variable for all links HTML code */
  let allAuthorsLink = '';
  for (let authorTags in allAuthors) {
    const authorLinkHtml = '<li><a href="#author-' + authorTags + '"><span class="author-name">' + authorTags + '(' + allAuthors[authorTags] + ')</span>';
    allAuthorsLink += authorLinkHtml;
    console.log(authorLinkHtml);
  }
  console.log(allAuthorsLink);
  authorList.innerHTML = allAuthorsLink;


}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('clicked', clickedElement);
  const href = clickedElement.getAttribute('href');
  console.log(href);
  const author = href.replace('#author-', '');
  console.log(author);
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks);
  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }
  const authorsHref = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorsHref);
  for (let authorHref of authorsHref) {
    authorHref.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('[href^="#author-"]')
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();



