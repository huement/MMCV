!function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1)}([,function(e,t,o){e.exports=o(2)},function(e,t){var o=[],r={},n=0,i=0,a=0,s="";function l(e){e.style.display="inline-block",e.style.fontSize="1px";for(var t=e.parentNode.offsetWidth,o=(e.offsetWidth,0);e.offsetWidth<t;)o+=1,e.style.fontSize=o+"px";e.style.fontSize=o-1+"px"}function d(){$(".interests-list li").each((function(){let e=Math.floor(15*Math.random()+1);r={text:$(this).text(),weight:e},o.push(r)}))}function c(){void 0!==$("#resume_content").html()?!0:void 0!==$("#artpage").html()&&!0}function u(){$(".art-grid .masonry__item").on("click",(function(e){var t;e.preventDefault(),i=Math.floor(61*Math.random())+120,a=Math.floor(58*Math.random())+13,s="linear-gradient("+i+"deg, #f7f7f7 "+a+"%, #e4e4e4 "+a+"%)",$(".port").css("backgroundImage",s),n=$(document).scrollTop(),t=$(this).data("target"),$(t).addClass("item_open"),$("html, body").css("overflow","hidden"),$("html, body").animate({scrollTop:0},400)})),$(".close").on("click",(function(e){e.preventDefault(),f()})),$(document).keyup((function(e){"Escape"===e.key&&f()})),imagesLoaded(".js-images-loaded",()=>{new Masonry(document.querySelector(".js-masonry"),{itemSelector:".js-masonry-item"})})}function f(){return $("html, body").css("overflow","auto"),$(document).scrollTop(n),$(".art-grid .masonry__item, .art-grid .masonry, .port").removeClass("item_open"),!1}function m(){$(".slider-arrow").click((function(){$(this).hasClass("show")?($(".sidekick,.mini-overlay").removeClass("show"),$("body").css("overflowY","auto"),$(".slider-arrow .arrow-box .fa").removeClass("pressed"),$(this).removeClass("show").addClass("hide")):($(".sidekick,.mini-overlay").addClass("show"),$("body").css("overflowY","hidden"),$(".slider-arrow .arrow-box .fa").addClass("pressed"),$(this).removeClass("hide").addClass("show"))})),$(".mini-overlay").on("click",(function(){$(".slider-arrow,.sidekick,.mini-overlay").removeClass("show"),$("body").css("overflowY","auto")}))}let y="0.6rem",p="1.2rem",h=300;jQuery(document).ready((function(e){if(c(),e(".slider-arrow")[0]&&m(),e("#granim-canvas")[0])new Granim({element:"#granim-canvas",name:"granim",opacity:[1,1],states:{"default-state":{gradients:[["#834D9B","#D04ED6"],["#1CD8D2","#93EDC7"]]}}});if(e(".fittext")[0]){var t=document.querySelectorAll(".fittext span");window.onresize=function(){Array.prototype.forEach.call(t,l)},window.onresize()}e(".interests-list li")[0]&&(e(document).width()>1120&&(y="1.2rem",p="2.5rem",h=360),d(),setTimeout("rainCloud()",150)),e(".art-grid")[0]&&u()}))}]);