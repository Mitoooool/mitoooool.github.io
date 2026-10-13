(() => {
 const link=document.querySelector('.back-to-top');
 if(!link)return;
 const update=()=>{link.hidden=window.scrollY<600;};
 window.addEventListener('scroll',update,{passive:true});update();
 // Native anchor navigation also works with JavaScript disabled.
})();
