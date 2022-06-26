(()=>{"use strict";function e(e){document.querySelector(e).classList.add("show"),document.body.style.overflow="hidden"}window.addEventListener("DOMContentLoaded",(()=>{var t;(function(e,t,s,o){const a=document.querySelectorAll(e),c=document.querySelectorAll(t),r=document.querySelector(s);function i(){c.forEach((e=>{e.classList.add("hide"),e.classList.remove("show")})),a.forEach((e=>{e.classList.remove(o)}))}function n(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;c[e].classList.add("show"),c[e].classList.remove("hide"),a[e].classList.add(o)}i(),n(0),r.addEventListener("click",(t=>{const s=t.target;s&&s.classList.contains(e.slice(1))&&a.forEach(((e,t)=>{s==e&&(i(),n(t))}))}))})(".tabheader__item",".tabcontent",".tabheader__items","tabheader__item_active"),function(){class e{constructor(e,t,s,o,a,c){this.title=e,this.desciption=t,this.price=s,this.img=a,this.parent=document.querySelector(c),this.currency=o,this.currencyValue=3;for(var r=arguments.length,i=new Array(r>6?r-6:0),n=6;n<r;n++)i[n-6]=arguments[n];this.classes=i,this.convertToUAH()}convertToUAH(){this.price=this.price*this.currencyValue}render(){const e=document.createElement("div");this.classes.length>=1?this.classes.forEach((t=>e.classList.add(t))):(this.block="menu__item",e.classList.add(this.block)),e.innerHTML=`\n            <img src="${this.img}" alt="${this.title}">\n            <h3 class="menu__item-subtitle">${this.title}</h3>\n            <div class="menu__item-descr">${this.desciption}</div>\n            <div class="menu__item-divider"></div>\n            <div class="menu__item-price">\n                <div class="menu__item-cost">Цена:</div>\n                <div class="menu__item-total"><span>${this.price}</span> ${this.currency}/дней</div>\n            </div>\n        `,this.parent.append(e)}}(async e=>{const t=await fetch("http://localhost:3000/menu");if(!t.ok)throw new Error(`Could not feth $\n       {url}, status: ${t.status}`);return await t.json()})().then((t=>{t.forEach((t=>{let{img:s,title:o,descr:a,price:c}=t;new e(o,a,c,"грн",s,".menu__field .container","menu__item").render()}))}))}(),function(){const e=document.querySelector(".calculating__result span");let t,s,o,a,c;function r(){e.textContent=t&&s&&o&&a&&c?"female"===t?Math.round((447.6+9.2*o+3.1*s-4.3*a)*c):Math.round((88.36+13.4*o+4.8*s-5.7*a)*c):"0"}localStorage.getItem("sex")?t=localStorage.getItem("sex"):(t="female",localStorage.setItem("sex","female")),localStorage.getItem("ratio")?c=localStorage.getItem("ratio"):(c=1.375,localStorage.setItem("ratio",1.375)),document.querySelectorAll(".calculating__choose-item").forEach((e=>{e.hasAttribute("data-ratio")&&localStorage.getItem("ratio")?(e.classList.remove("calculating__choose-item_active"),e.getAttribute("data-ratio")===localStorage.getItem("ratio")&&e.classList.add("calculating__choose-item_active")):(e.classList.remove("calculating__choose-item_active"),e.getAttribute("id")===localStorage.getItem("sex")&&e.classList.add("calculating__choose-item_active"))})),function(){let e=document.querySelectorAll(".calculating__choose-item");e.forEach((i=>{"INPUT"==i.tagName?i.addEventListener("input",(()=>{switch(i.value.match(/\D/g)?i.style.borderBottom="1px solid red":i.style.borderBottom="none",i.getAttribute("id")){case"height":s=+i.value;break;case"weight":o=+i.value;break;case"age":a=+i.value}r()})):i.addEventListener("click",(s=>{s.target.hasAttribute("data-ratio")?(c=+s.target.getAttribute("data-ratio"),localStorage.setItem("ratio",+s.target.getAttribute("data-ratio")),e.forEach((e=>{e.hasAttribute("data-ratio")&&e.classList.remove("calculating__choose-item_active"),s.target.classList.add("calculating__choose-item_active")}))):(t=s.target.getAttribute("id"),localStorage.setItem("sex",s.target.getAttribute("id")),e.forEach((e=>{e.hasAttribute("data-ratio")||e.classList.remove("calculating__choose-item_active"),s.target.classList.add("calculating__choose-item_active")}))),r()}))}))}()}(),t="form",document.querySelectorAll(t).forEach((t=>{!function(t){function s(t){const s=document.querySelector(".modal__dialog");s.classList.add("hide"),e(".modal");const o=document.createElement("div");o.classList.add("modal__dialog"),o.innerHTML=`\n            <div class="modal__content">\n                <div data-close="" class="modal__close">×</div>\n                <div class="modal__title">${t}</div>\n            </div>`,document.querySelector(".modal").append(o),setTimeout((()=>{o.remove(),s.classList.remove("hide"),document.querySelector(void 0).classList.remove("show"),document.body.style.overflow="",clearInterval(e)}),3e3)}t.addEventListener("submit",(e=>{e.preventDefault();const o=document.createElement("img");o.setAttribute("src","img/spinner.svg"),o.style.cssText="\n            display: block;\n            margin: 0 auto;\n            ",t.insertAdjacentElement("afterend",o);const a=new FormData(t);(async(e,t)=>{const s=await fetch("http://localhost:3000/requests",{method:"POST",body:t,headers:{"Content-type":"application/json"}});return await s.json()})(0,JSON.stringify(Object.fromEntries(a.entries()))).then((e=>{console.log(e),s("Спасибо! Мы скоро с Вами свяжемся"),o.remove()})).catch((()=>{s("Что-то пошло не так")})).finally((()=>{t.reset()}))}))}(t)})),fetch("http://localhost:3000/menu").then((e=>e.json())).then((e=>console.log(e))),function(t,s){const o=document.querySelectorAll(t),a=document.querySelector(s);o.forEach((t=>{t.addEventListener("click",(()=>{e(s)}))})),a.addEventListener("click",(e=>{let t=e.target;t.closest(".modal__content")&&!t.hasAttribute("data-close")||(a.classList.remove("show"),document.body.style.overflow="")})),document.addEventListener("keydown",(e=>{"Escape"===e.key&&a.classList.contains("show")&&(a.classList.remove("show"),document.body.style.overflow="")})),window.addEventListener("scroll",(function t(){window.pageYOffset+document.documentElement.clientHeight>=document.documentElement.scrollHeight-10&&(e(s),window.removeEventListener("scroll",t))}))}("[data-modal]",".modal"),function(e){let{selector:t,slideSelector:s,slideToScroll:o,slidePrev:a,slideNext:c,wrapper:r,field:i,transform:n,dots:l}=e;const d=document.querySelector(t),u=d.querySelector("#current"),m=d.querySelector("#total"),h=d.querySelectorAll(s),f=d.querySelector(a),g=d.querySelector(c),v=d.querySelector(r),_=d.querySelector(i),y=d.querySelector(".offer__slide").offsetWidth;let L=1,p=o,S=0;if(n&&(_.style.width=h.length*y+"px",_.classList.add("slider-track"),h.forEach((e=>{e.style.width=y+"px"}))),l){const e=document.createElement("div");e.classList.add("carousel-indicators");for(let t=0;t<h.length;t++){const s=document.createElement("button");s.classList.add("dot"),s.setAttribute("data-index",t+1),e.append(s)}v.append(e),v.addEventListener("click",(e=>{let t=+e.target.getAttribute("data-index");e.target.classList.contains("dot")&&b(t)}))}function b(e){if(L=e,L>h.length?L=1:L<1&&(L=h.length),h.length<10?(u.textContent=`0${L}`,m.textContent=`0${h.length}`):(u.textContent=L,m.textContent=h.length),v.setAttribute("data-current-slide",L),l){const e=d.querySelectorAll(".dot"),t=v.getAttribute("data-current-slide");e.forEach(((e,s)=>{+t!==s+1?e.classList.remove("active"):e.classList.add("active")}))}n?(S=y*(L-1),_.style.transform=`translateX(${-S}px)`):h.forEach(((e,t)=>{t!==L-1?e.classList.add("hide"):e.classList.remove("hide")}))}f.addEventListener("click",(()=>{b(+v.getAttribute("data-current-slide")-p)})),g.addEventListener("click",(()=>{b(+v.getAttribute("data-current-slide")+p)})),b(1)}({selector:".offer__slider",slideSelector:".offer__slide",slidePrev:".offer__slider-prev",slideNext:".offer__slider-next",wrapper:".offer__slider-wrapper",field:".offer__slider-inner",slideToScroll:1,transform:!0,dots:!0}),function(e,t){function s(e){return e>=0&&e<10?`0${e}`:e}!function(t){const o=document.querySelector(e),a=o.querySelector("#days"),c=o.querySelector("#hours"),r=o.querySelector("#minutes"),i=o.querySelector("#seconds"),n=setInterval((function(){const e=function(e){let t,s,o,a;const c=Date.parse(e)-Date.parse(new Date);return c<=0?(t=0,s=0,o=0,a=0):(t=Math.floor(c/864e5),s=Math.floor(c/36e5%24),o=Math.floor(c/1e3/60%60),a=Math.floor(c/1e3%60)),{total:c,days:t,hours:s,minutes:o,seconds:a}}(t);a.innerHTML=s(e.days),c.innerHTML=s(e.hours),r.innerHTML=s(e.minutes),i.innerHTML=s(e.seconds),e.total<=0&&clearInterval(n)}),1e3)}(t)}("2022-07-20")}))})();
//# sourceMappingURL=bundle.js.map