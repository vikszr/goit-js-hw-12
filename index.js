import{S as u,i}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();function f(t){const o="46880481-b4b8ce5da8d344b0e4ba41140",s="https://pixabay.com/api/",n=new URLSearchParams({key:o,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${s}?${n}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})}function d(t){return`
    <div class= "gallery-item">
    <a class="gallery-link" href="${t.largeImageURL}">  
    <img src="${t.webformatURL}" alt="${t.tags}" class="gallery-image" loading="lazy"/>
    <div class="image-info">
    <p class="info"> <b>Likes</b> ${t.likes}</p>
    <p class="info"> <b>Views</b> ${t.views}</p>
    <p class="info"> <b>Comments</b> ${t.comments}</p>
    <p class="info"> <b>Downloads</b> ${t.downloads}</p>
    </div>
    </a>
    </div>
    `}const p=document.querySelector(".input"),m=document.querySelector(".button"),l=document.querySelector(".gallery"),c=document.querySelector(".loader"),y=new u(".gallery a",{captionsData:"alt",captionDelay:250});m.addEventListener("click",t=>{t.preventDefault();const o=p.value;if(console.log(o),o===""){i.error({title:"Error",message:"Please enter search query"});return}l.innerHTML="",c.style.display="block",f(o).then(s=>{if(c.style.display="none",s.hits.length===0){i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}const n=s.hits.map(e=>d(e)).join("");l.innerHTML=n,y.refresh()}).catch(s=>{i.error({title:"Error",message:"An error occured while fetching images. Please try again later!"}),console.log(s)})});
//# sourceMappingURL=index.js.map
