 // Mobile nav handler
    (function(){
      var toggle = document.querySelector('.menu-toggle');
      var menu = document.getElementById('menu');
      if(toggle && menu){
        toggle.addEventListener('click', function(){
          var opened = menu.classList.toggle('open');
          toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
        });
      }
    })();
    
    document.getElementById('yr').textContent=new Date().getFullYear()