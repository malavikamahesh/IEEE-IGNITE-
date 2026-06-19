  // ----- starfield -----
  (function(){
    const field = document.getElementById('stars');
    const count = 70;
    for(let i=0;i<count;i++){
      const s = document.createElement('span');
      s.style.top = Math.random()*100+'%';
      s.style.left = Math.random()*100+'%';
      s.style.animationDelay = (Math.random()*4)+'s';
      s.style.animationDuration = (3+Math.random()*4)+'s';
      field.appendChild(s);
    }
  })();

  // ----- mobile nav -----
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', ()=>{
    const open = navLinks.classList.toggle('mobile-open');
    if(open){
      navLinks.style.display='flex';
      navLinks.style.flexDirection='column';
      navLinks.style.position='absolute';
      navLinks.style.top='68px';
      navLinks.style.right='28px';
      navLinks.style.background='rgba(15,10,28,0.97)';
      navLinks.style.border='1px solid rgba(255,255,255,.09)';
      navLinks.style.borderRadius='14px';
      navLinks.style.padding='18px 26px';
      navLinks.style.gap='16px';
    } else {
      navLinks.style.display='none';
    }
  });

  // close mobile nav + active link highlight on click
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click', ()=>{
      document.querySelectorAll('.nav-links a').forEach(x=>x.classList.remove('active'));
      a.classList.add('active');
      if(window.innerWidth<=980){ navLinks.style.display='none'; navLinks.classList.remove('mobile-open'); }
    });
  });

  // ----- events filter + search -----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  const searchInput = document.getElementById('eventSearch');
  const noResults = document.getElementById('noResults');
  let activeFilter = 'all';

  function applyFilters(){
    const term = searchInput.value.trim().toLowerCase();
    let visible = 0;
    eventCards.forEach(card=>{
      const matchesFilter = activeFilter==='all' || card.dataset.category===activeFilter;
      const matchesSearch = card.dataset.name.includes(term) || card.querySelector('h3').textContent.toLowerCase().includes(term);
      const show = matchesFilter && matchesSearch;
      card.style.display = show ? '' : 'none';
      if(show) visible++;
    });
    noResults.style.display = visible===0 ? 'block' : 'none';
  }

  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });
  searchInput.addEventListener('input', applyFilters);

  // ----- FAQ accordion -----
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if(item.classList.contains('open')){ a.style.maxHeight = a.scrollHeight+'px'; }
    q.addEventListener('click', ()=>{
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(other=>{
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight+'px';
      }
    });
  });

  // ----- header background on scroll -----
  const header = document.querySelector('header');
  window.addEventListener('scroll', ()=>{
    header.style.background = window.scrollY>10 ? 'rgba(10,6,19,.9)' : 'rgba(10,6,19,.65)';
  });
