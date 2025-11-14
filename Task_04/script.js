
    // ---------- Utilities ----------
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth scroll & nav active on click
    const navLinks = document.querySelectorAll('nav a.nav-link');
    navLinks.forEach(a=>{
      a.addEventListener('click', e=>{
        navLinks.forEach(x=>x.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const id = e.currentTarget.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior:'smooth',block:'start'});
        e.preventDefault();
      })
    });

    // Scrollspy: highlight nav based on section in viewport
    const sections = document.querySelectorAll('main, section');
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        const id = entry.target.id ? '#'+entry.target.id : null;
        if(!id) return;
        navLinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href')===id));
      })
    },{root:null,threshold:0.35});
    document.querySelectorAll('section, main').forEach(s=>obs.observe(s));

    // Theme toggle (simple inversion)
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', ()=>{
      const isDark = document.documentElement.style.getPropertyValue('--bg');
      document.documentElement.classList.toggle('light');
      // lightweight: invert values for demo
      if(document.documentElement.classList.contains('light')){
        document.documentElement.style.setProperty('--bg','#f7fbff');
        document.documentElement.style.setProperty('--card','#ffffff');
        document.documentElement.style.setProperty('--muted','#334155');
      } else {
        document.documentElement.style.setProperty('--bg','#0f1724');
        document.documentElement.style.setProperty('--card','#0b1220');
        document.documentElement.style.setProperty('--muted','#94a3b8');
      }
    });

    // ---------- Projects (demo data & modal) ----------
    const projects = [
      {id:1,title:'Portfolio Website',tags:['Design','Responsive'],desc:'A polished multi-page portfolio showcasing projects and resume.',img:'https://picsum.photos/seed/p1/800/500',url:'#'},
      {id:2,title:'To‑Do App',tags:['JS','localStorage'],desc:'A persistent to‑do app demonstrating localStorage and accessibility.',img:'https://picsum.photos/seed/p2/800/500',url:'#todo'},
      {id:3,title:'Product Listing',tags:['Interactive','Filtering'],desc:'Product catalog with filters, sorting and search.',img:'https://picsum.photos/seed/p3/800/500',url:'#products'}
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    function renderProjects(){
      projectsGrid.innerHTML = '';
      projects.forEach(p=>{
        const el = document.createElement('article'); el.className='project';
        el.innerHTML = `\n          <img src="${p.img}" alt="${p.title}" />\n          <h4>${p.title}</h4>\n          <p class="muted">${p.desc}</p>\n          <div class="meta">\n            <div class="chip">${p.tags.join(' • ')}</div>\n            <div class="right"> <a class=\"ghost\" href=\"${p.url}\">Open</a></div>\n          </div>`;
        projectsGrid.appendChild(el);
      })
    }
    renderProjects();

    // ---------- Contact form ----------
    const contactForm = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMsg');
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      if(!name||!email||!message){ formMsg.textContent='Please fill all fields.'; formMsg.style.color='salmon'; return}
      // Basic success simulation
      formMsg.textContent = 'Thanks! Your message has been received. I will reply soon.'; formMsg.style.color='lightgreen';
      contactForm.reset();
    });

    // ---------- To‑Do App (localStorage) ----------
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskListEl = document.getElementById('taskList');
    let tasks = JSON.parse(localStorage.getItem('ns_tasks')||'[]');

    function saveTasks(){ localStorage.setItem('ns_tasks', JSON.stringify(tasks)); }

    function renderTasks(){
      taskListEl.innerHTML='';
      if(tasks.length===0){ taskListEl.innerHTML='<li class="muted">No tasks yet.</li>'; return }
      tasks.forEach((t,i)=>{
        const li = document.createElement('li'); li.className='task';
        const left = document.createElement('div'); left.className='left';
        const cb = document.createElement('input'); cb.type='checkbox'; cb.checked = t.done; cb.addEventListener('change', ()=>{ tasks[i].done = cb.checked; saveTasks(); renderTasks();});
        const span = document.createElement('span'); span.textContent = t.text; if(t.done) span.style.textDecoration='line-through';
        left.append(cb,span);
        const right = document.createElement('div');
        const del = document.createElement('button'); del.className='small-btn del'; del.textContent='Delete'; del.addEventListener('click', ()=>{ tasks.splice(i,1); saveTasks(); renderTasks();});
        right.append(del);
        li.append(left,right); taskListEl.appendChild(li);
      })
    }
    addTaskBtn.addEventListener('click', ()=>{ const v = taskInput.value.trim(); if(!v) return; tasks.unshift({text:v,done:false}); saveTasks(); renderTasks(); taskInput.value=''; taskInput.focus(); });
    document.getElementById('clearDone').addEventListener('click', ()=>{ tasks = tasks.filter(t=>!t.done); saveTasks(); renderTasks(); });
    document.getElementById('clearAll').addEventListener('click', ()=>{ if(!confirm('Clear all tasks?')) return; tasks=[]; saveTasks(); renderTasks(); });
    taskInput.addEventListener('keydown', e=>{ if(e.key==='Enter'){ addTaskBtn.click(); } });
    renderTasks();

    // ---------- Products (filter + sort + search) ----------
    const products = [
      {id:1,name:'Wireless Headphones',category:'Electronics',price:99.99,rating:4.5,desc:'Noise-cancelling comfy headphones.'},
      {id:2,name:'Coffee Maker',category:'Home Appliances',price:49.99,rating:4.0,desc:'Compact drip coffee maker.'},
      {id:3,name:'Running Shoes',category:'Sportswear',price:79.99,rating:4.7,desc:'Lightweight running shoes.'},
      {id:4,name:'Smartwatch',category:'Electronics',price:199.99,rating:4.3,desc:'Fitness and notifications.'},
      {id:5,name:'Blender',category:'Home Appliances',price:39.99,rating:3.9,desc:'Great for smoothies.'},
      {id:6,name:'Yoga Mat',category:'Sportswear',price:29.99,rating:4.1,desc:'Non-slip yoga mat.'}
    ];

    const categoryFilter = document.getElementById('categoryFilter');
    const sortSelect = document.getElementById('sortSelect');
    const searchInput = document.getElementById('searchInput');
    const productGrid = document.getElementById('productGrid');
    const countEl = document.getElementById('count');

    function populateCategories(){
      const cats = ['all',...new Set(products.map(p=>p.category))];
      categoryFilter.innerHTML = '';
      cats.forEach(c=>{ const opt = document.createElement('option'); opt.value=c; opt.textContent = c==='all' ? 'All Categories' : c; categoryFilter.appendChild(opt); })
    }

    function renderProducts(){
      let list = [...products];
      const q = searchInput.value.trim().toLowerCase();
      if(q) list = list.filter(p=> p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
      const cat = categoryFilter.value; if(cat && cat!=='all') list = list.filter(p=>p.category===cat);
      const sort = sortSelect.value;
      if(sort==='price-asc') list.sort((a,b)=>a.price-b.price);
      if(sort==='price-desc') list.sort((a,b)=>b.price-a.price);
      if(sort==='rating-desc') list.sort((a,b)=>b.rating-a.rating);

      productGrid.innerHTML='';
      if(list.length===0){ productGrid.innerHTML='<div class="muted">No products found.</div>'; countEl.textContent=0; return }
      list.forEach(p=>{
        const card = document.createElement('article'); card.className='card-product';
        card.innerHTML = `\n          <h4>${p.name}</h4>\n          <div class=\"muted\">${p.category} • ${p.rating} ⭐</div>\n          <p class=\"muted\">${p.desc}</p>\n          <div style=\"display:flex;gap:8px;align-items:center;margin-top:8px\">\n            <div class=\"price\">$${p.price.toFixed(2)}</div>\n            <div class=\"right\"><button class=\"ghost\">View</button></div>\n          </div>`;
        productGrid.appendChild(card);
      })
      countEl.textContent = list.length;
    }

    searchInput.addEventListener('input', renderProducts);
    categoryFilter.addEventListener('change', renderProducts);
    sortSelect.addEventListener('change', renderProducts);

    populateCategories(); renderProducts();

    // Accessibility: focus management, keyboard support trivial improvements
    // All interactive controls are reachable (buttons/inputs)

    // End script
