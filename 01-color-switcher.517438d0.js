!function(){var t=document.querySelector("body"),e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),a=null;e.addEventListener("click",(function(){e.disabled=!0,a=setInterval((function(){var e="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));t.style.backgroundColor=e}),1e3)})),n.addEventListener("click",(function(){clearInterval(a),e.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.517438d0.js.map