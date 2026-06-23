
// ─── CANVAS PARTICLES ───
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W,H;
function rsz(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
rsz(); window.addEventListener('resize',rsz);
const CHARS=['</>','{}','()','&&','||','fn','const','let','var','=>','[]','Git','npm','React','Next','async','return','true','01','10'];
class P{
  constructor(){this.reset()}
  reset(){this.x=Math.random()*W;this.y=Math.random()*-100;this.ch=CHARS[Math.floor(Math.random()*CHARS.length)];this.spd=.25+Math.random()*.9;this.op=.03+Math.random()*.1;this.sz=10+Math.random()*6;this.col=Math.random()>.5?'0,212,255':'139,92,246'}
  update(){this.y+=this.spd;if(this.y>H+40)this.reset()}
  draw(){ctx.font=`${this.sz}px 'JetBrains Mono',monospace`;ctx.fillStyle=`rgba(${this.col},${this.op})`;ctx.fillText(this.ch,this.x,this.y)}
}
const particles=Array.from({length:90},()=>new P());
(function loop(){ctx.clearRect(0,0,W,H);particles.forEach(p=>{p.update();p.draw()});requestAnimationFrame(loop)})();

// ─── TYPEWRITER ───
const roles=['Full Stack Developer','React.js Engineer','UI/UX Enthusiast','Frontend Developer','JavaScript Wizard'];
let ri=0,ci=0,del=false;
const tw=document.getElementById('typewriter');
function type(){
  const s=roles[ri];const disp=del?s.slice(0,ci--):s.slice(0,ci++);
  tw.innerHTML=disp+'<span class="cursor"></span>';
  let d=del?55:95;
  if(!del&&ci>s.length){d=2200;del=true}
  if(del&&ci<0){del=false;ci=0;ri=(ri+1)%roles.length;d=280}
  setTimeout(type,d);
}
type();

// ─── NAV SCROLL ───
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',scrollY>40);
  document.getElementById('scrollTop').classList.toggle('show',scrollY>500);
});
function toggleMenu(){/* mobile future */}

// ─── INTERSECTION REVEAL ───
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis')});
},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv,.sec-label,.sec-title,.scat,.tli,.ab-text,.str-wrap,.c-link,.terminal,.ftag,.mini-card').forEach(el=>io.observe(el));

// ─── COUNT UP ───
const cio=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,t=+el.dataset.count;let cur=0;
    const step=Math.ceil(t/30);
    const tmr=setInterval(()=>{cur=Math.min(cur+step,t);el.textContent=cur+(t>=20?'+':'');if(cur>=t)clearInterval(tmr)},40);
    cio.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

// ─── ORBIT VISUAL ───
(function buildOrbit(){
  const viz=document.getElementById('orbitViz');
  const items=[
    {img:'./assets/react.svg',tip:'React.js'},
    {img:'./assets/ts-logo.webp',tip:'TypeScript'},
    {img:'./assets/js.png',tip:'JavaScript'},
    {img:'./assets/nextjs.svg',tip:'Next.js'},
    {img:'./assets/tailwindcss.svg',tip:'Tailwind CSS'},
    {img:'./assets/firebase.svg',tip:'Firebase'},
    {img:'./assets/mongodb.svg',tip:'MongoDB'},
    {img:'./assets/nodejs.svg',tip:'Node.js'},
    {img:'./assets/github.svg',tip:'GitHub'},
    {img:'./assets/bootstrap.svg',tip:'Bootstrap'},
    {img:'./assets/redux.svg',tip:'Redux'},
    {img:'./assets/gitlab.webp',tip:'GitLab'},
  ];
  const ring=document.createElement('div');ring.className='orbit-ring';viz.appendChild(ring);
  const ctr=document.createElement('div');ctr.className='orbit-center';
  const ctrImg=document.createElement('img');ctrImg.src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg';ctrImg.style.width='100%';ctrImg.style.height='100%';ctr.appendChild(ctrImg);
  viz.appendChild(ctr);
  items.forEach((item,i)=>{
    const angle=(i/items.length)*2*Math.PI;
    const r=130;
    const x=Math.cos(angle)*r;const y=Math.sin(angle)*r;
    const el=document.createElement('div');el.className='orbit-item';
    const img=document.createElement('img');img.src=item.img;img.alt=item.tip;img.style.width='100%';img.style.height='100%';img.style.filter='drop-shadow(0 0 8px rgba(0,212,255,.6))';
    el.appendChild(img);
    const tip=document.createElement('span');tip.className='tip';tip.textContent=item.tip;el.appendChild(tip);
    el.style.transform=`translate(calc(${x}px - 27px), calc(${y}px - 27px))`;
    // counter-rotate to keep upright
    el.style.animation=`counterSpin 20s linear infinite`;
    viz.appendChild(el);
  });
  // Add keyframe dynamically
  const style=document.createElement('style');
  style.textContent='@keyframes counterSpin{from{transform-origin:center;} }';
  document.head.appendChild(style);
})();

// ─── TAGS CLOUD ───
const tags=[
  {t:'HTML5',c:'#F97316'},{t:'CSS3',c:'#3B82F6'},{t:'React.js',c:'#00D4FF'},{t:'Next.js',c:'#fff'},
  {t:'TypeScript',c:'#3B82F6'},{t:'JavaScript',c:'#FCD34D'},{t:'Node.js',c:'#22C55E'},{t:'Redux',c:'#8B5CF6'},{t:'Context API',c:'#C084FC'},
  {t:'MongoDB',c:'#22C55E'},{t:'Firebase',c:'#F97316'},{t:'MySQL',c:'#3B82F6'},{t:'PHP',c:'#8B5CF6'},
  {t:'Tailwind CSS',c:'#06B6D4'},{t:'Bootstrap',c:'#8B5CF6'},{t:'Framer Motion',c:'#F472B6'},{t:'Git',c:'#F97316'},
  {t:'GitHub',c:'#fff'},{t:'GitLab',c:'#F97316'},{t:'WordPress',c:'#3B82F6'},{t:'SEO',c:'#22C55E'},{t:'Python',c:'#bd3dfd'},
  {t:'JWT Auth',c:'#FCD34D'},{t:'MVC',c:'#C084FC'},{t:'Responsive Design',c:'#00D4FF'},
];
const cloud=document.getElementById('tagsCloud');
tags.forEach((tag,i)=>{
  const el=document.createElement('span');el.className='ftag rv';
  el.textContent=tag.t;
  el.style.color=tag.c;el.style.borderColor=tag.c+'44';el.style.background=tag.c+'11';
  el.style.transitionDelay=(i*.035)+'s';
  cloud.appendChild(el);
  io.observe(el);
});

// ─── PROJECT DATA ───
const projectCategories=[
  {
    id:'featured',title:'Featured Projects',emoji:'⭐',
    color:'var(--cyan)',badge:'Main Work',badgeBg:'rgba(0,212,255,.12)',badgeColor:'var(--cyan)',
    projects:[
      {title:'Tesla',desc:'A Tesla-inspired landing page with premium visuals and smooth animated sections.',tech:['React.js','Framer Motion','CSS3'],emoji:'./assets/tesla.jpg',bg:'linear-gradient(135deg,#0D2137,#0A3D62)',link:'https://kevin-2810.github.io/Tesla'},
      {title:'Music-Player',desc:'An interactive music player built for clean controls, playlists, and a polished listening experience.',tech:['React.js','CSS3'],emoji:'./assets/music-player.jpg',bg:'linear-gradient(135deg,#0A1628,#1A2D5A)',link:'https://github.com/Kevin-2810/music-player'},
      {title:'3D-Room',desc:'A 3D-style showcase concept focused on immersive visuals and modern UI design.',tech:['React.js','CSS3','Animations'],emoji:'./assets/3d-room.jpg',bg:'linear-gradient(135deg,#0A1628,#1A2D5A)',link:'https://github.com/Kevin-2810/3d-Game-Room'},
      {title:'Squid Game',desc:'A Squid Game themed project with bold graphics and suspenseful interactive styling.',tech:['React.js','Framer Motion','CSS3'],emoji:'./assets/squid3.png',bg:'linear-gradient(135deg,#0D2137,#0A3D62)',link:'https://github.com/Kevin-2810/squid-game2'},
      {title:'Wresler-Mania',desc:'A wrestling-themed landing page created to highlight action, energy, and strong branding.',tech:['React.js','Firebase','Context API'],emoji:'./assets/wwe.png',bg:'linear-gradient(135deg,#1A0533,#3D0066)',link:'https://github.com/Kevin-2810/WWE'},
      {title:'BEN10',desc:'A BEN10-inspired concept featuring bright colors, playful visuals, and animated content.',tech:['React.js','CSS3','Animations'],emoji:'./assets/ben10.png',bg:'linear-gradient(135deg,#0A1628,#1A2D5A)',link:'https://github.com/Kevin-2810/ben-10'},
      {title:'Piono',desc:'A piano-themed interface designed for keyboard-friendly interaction and simple controls.',tech:['React.js','Framer Motion','CSS3'],emoji:'./assets/piono.jpg',bg:'linear-gradient(135deg,#0D2137,#0A3D62)',link:'https://github.com/Kevin-2810/piono'},
      {title:'Map Puzzle',desc:'A map puzzle project built around logic, navigation, and interactive discovery.',tech:['React.js','Firebase','Context API'],emoji:'./assets/map-puzzle.jpg',bg:'linear-gradient(135deg,#1A0533,#3D0066)',link:'https://github.com/Kevin-2810/map-puzzle'},
      {title:'IPL-Auction',desc:'An IPL auction experience with player cards, bidding logic, and a dynamic dashboard.',tech:['React.js','CSS3','Animations'],emoji:'./assets/IPLauction.png',bg:'linear-gradient(135deg,#0A1628,#1A2D5A)',link:'https://github.com/Kevin-2810/ipl-auction-game'},
      {title:'Marvel',desc:'A Marvel-inspired project with comic-style visuals and a dramatic hero layout.',tech:['React.js','Framer Motion','CSS3'],emoji:'./assets/marvel.jpg',bg:'linear-gradient(135deg,#0D2137,#0A3D62)',link:'https://github.com/Kevin-2810/marvel'},
      {title:'Squid Game Invitation',desc:'A themed invitation page designed for a creative and visually engaging event reveal.',tech:['React.js','Firebase','Context API'],emoji:'./assets/squid4.png',bg:'linear-gradient(135deg,#1A0533,#3D0066)',link:'https://github.com/Kevin-2810/squid-game-invitation'},
      {title:'Valorant',desc:'A Valorant-inspired UI concept with sharp gaming aesthetics and modern presentation.',tech:['React.js','CSS3','Animations'],emoji:'./assets/valorant.jpg',bg:'linear-gradient(135deg,#0A1628,#1A2D5A)',link:'https://github.com/Kevin-2810/valorant-characters'}
    ]
  },
  {
    id:'ecommerce',title:'E-Commerce Projects',emoji:'🛒',
    color:'#22C55E',badge:'E-Commerce',badgeBg:'rgba(34,197,94,.12)',badgeColor:'#22C55E',
    projects:[
      {title:'Zwigato',desc:'A food delivery platform concept with restaurant browsing, cart actions, and order flow.',tech:['React.js','CSS3'],emoji:'./assets/zwigato.jpg',bg:'linear-gradient(135deg,#1A1A00,#3D3D00)',link:'https://github.com/Kevin-2810/food-website'},
      {title:'Food Man',desc:'A food ordering website focused on menu discovery, filtering, and quick checkout.',tech:['HTML','CSS','JS'],emoji:'./assets/foodman.jpg',bg:'linear-gradient(135deg,#1A0A00,#3D1500)',link:'https://github.com/Kevin-2810/foodman-e-commerce'},
      {title:'Fruitkha',desc:'A fruit store landing page built for fresh branding, product display, and clean navigation.',tech:['React.js','Bootstrap'],emoji:'./assets/fruitkha.jpg',bg:'linear-gradient(135deg,#001A05,#003D0F)',link:'https://github.com/Kevin-2810/fruitkha'},
      {title:'GenZ Footware',desc:'A trendy footwear store concept with modern visuals and product-focused layout.',tech:['React.js','Tailwind'],emoji:'./assets/genz.jpg',bg:'linear-gradient(135deg,#0A001A,#1A0033)',link:'https://github.com/Kevin-2810/GenZ-Footwear'},
      {title:'Responsive Chips',desc:'A snack brand website designed for responsive browsing and engaging product presentation.',tech:['HTML','CSS','JS'],emoji:'./assets/chips.jpg',bg:'linear-gradient(135deg,#1A1000,#3D2800)',link:'https://github.com/Kevin-2810/responsive-chips-website'},
      {title:'Fashion Shop',desc:'A fashion e-commerce project built around product discovery, cart, and checkout flow.',tech:['React.js','CSS3'],emoji:'./assets/fashion-shop.jpg',bg:'linear-gradient(135deg,#1A1A00,#3D3D00)',link:'https://github.com/Kevin-2810/fashion-shop'},
      {title:'Tourist Website',desc:'A travel booking website created for destination discovery, visuals, and smooth browsing.',tech:['HTML','CSS','JS'],emoji:'./assets/tourist.jpg',bg:'linear-gradient(135deg,#1A0A00,#3D1500)',link:'https://github.com/Kevin-2810/Tourist-Responsive-Website/'},
      {title:'Fashion Corner',desc:'A fashion storefront concept focused on style presentation and user-friendly shopping.',tech:['React.js','Bootstrap'],emoji:'./assets/fashion-corner.jpg',bg:'linear-gradient(135deg,#001A05,#003D0F)',link:'https://github.com/Kevin-2810/fashion-corner'}
    ]
  },
  {
    id:'clones',title:'App Clones',emoji:'📺',
    color:'#F472B6',badge:'Clones',badgeBg:'rgba(244,114,182,.12)',badgeColor:'#F472B6',
    projects:[
      {title:'Hotstar Clone',desc:'A Hotstar-style streaming UI with hero banners, category sections, and hover interactions.',tech:['HTML','CSS','JS'],emoji:'./assets/hotstar.jpg',bg:'linear-gradient(135deg,#000D1A,#001A3D)',link:'https://github.com/Kevin-2810/hotstar-clone'},
      {title:'Blinkit Clone',desc:'A quick-commerce clone focused on grocery browsing, search, and cart experience.',tech:['React.js','CSS3'],emoji:'./assets/blinkit.jpg',bg:'linear-gradient(135deg,#1A1A00,#3A3A00)',link:'https://github.com/Kevin-2810/blinkit-clone'},
      {title:'YouTube Clone',desc:'A YouTube-inspired layout built around video cards, search flow, and responsive content.',tech:['React.js','YouTube API'],emoji:'./assets/youtube.jpg',bg:'linear-gradient(135deg,#1A0000,#3D0808)',link:'https://github.com/Kevin-2810/youtube-clone'},
      {title:'Amazon Clone',desc:'An Amazon-inspired shopping interface with product listing and checkout-style sections.',tech:['React.js','Firebase'],emoji:'./assets/amazon.png',bg:'linear-gradient(135deg,#0D0A00,#2B2100)',link:'https://github.com/Kevin-2810/amazon-clone'},
      {title:'Instagram Clone',desc:'An Instagram-style social UI designed for posts, stories, and interactive engagement.',tech:['React.js','Firebase'],emoji:'./assets/instagram.jpg',bg:'linear-gradient(135deg,#0D0015,#1A003D)',link:'https://github.com/Kevin-2810/instagram-clone'}
    ]
  },
  {
    id:'games',title:'Games',emoji:'🎮',
    color:'#FCD34D',badge:'Games',badgeBg:'rgba(252,211,77,.12)',badgeColor:'#FCD34D',
    projects:[
      {title:'Mario Game',desc:'A Mario-style platformer with running, jumping, and obstacle gameplay.',tech:['JavaScript','Canvas'],emoji:'./assets/mario-game.jpg',bg:'linear-gradient(135deg,#0D0D0D,#2A1A00)',link:'https://github.com/Kevin-2810/mario-game'},
      {title:'Hill Climb',desc:'A hill-climbing game built around speed, control, and endless obstacle challenges.',tech:['JavaScript','CSS3'],emoji:'./assets/hill-climb.jpg',bg:'linear-gradient(135deg,#0A1A00,#1A3300)',link:'https://github.com/Kevin-2810/hill-climb-game'},
      {title:'Magic Cube',desc:'A cube puzzle game focused on logic, timing, and quick reactions.',tech:['JavaScript','Canvas'],emoji:'./assets/cube.png',bg:'linear-gradient(135deg,#001A0D,#003D1A)',link:'https://github.com/Kevin-2810/rubric-cube'},
      {title:'Subway Surfers',desc:'A fast-paced runner game inspired by endless city obstacle challenges.',tech:['JavaScript','Three.js'],emoji:'./assets/subway-surfer.png',bg:'linear-gradient(135deg,#0A0A1A,#1A1A3D)',link:'https://github.com/Kevin-2810/subway-surfers-game'},
      {title:'Bubble Game',desc:'A bubble popping game designed for score chasing and quick reflexes.',tech:['HTML','CSS','JS'],emoji:'./assets/bubble-game.jpg',bg:'linear-gradient(135deg,#00101A,#00253D)',link:'https://github.com/Kevin-2810/bubble-game'},
      {title:'Tic Tac Toe',desc:'A classic Tic Tac Toe game with win detection and restart functionality.',tech:['HTML','CSS','JS'],emoji:'./assets/tic-tac-toe.jpg',bg:'linear-gradient(135deg,#1A001A,#3D003D)',link:'https://github.com/Kevin-2810/tic-tac-toe'},
      {title:'Chess',desc:'A strategic chess game featuring move logic, captures, and turn-based play.',tech:['JavaScript','Canvas'],emoji:'./assets/chess.jpg',bg:'linear-gradient(135deg,#0D0D0D,#2A1A00)',link:'https://github.com/Kevin-2810/chess'},
      {title:'Rabbit Run',desc:'A rabbit-themed endless runner with timing-based movement and obstacle dodging.',tech:['JavaScript','CSS3'],emoji:'./assets/rabbit-run.png',bg:'linear-gradient(135deg,#0A1A00,#1A3300)',link:'https://github.com/Kevin-2810/rabbit-run'},
      {title:'Cross Road',desc:'A road-crossing game built around patience, timing, and safe movement.',tech:['JavaScript','Canvas'],emoji:'./assets/crossy-road.jpg',bg:'linear-gradient(135deg,#001A0D,#003D1A)',link:'https://github.com/Kevin-2810/crossy-road-game'},
      {title:'Tower Blocks',desc:'A tower stacking challenge focused on balance, precision, and scoring.',tech:['JavaScript','Three.js'],emoji:'./assets/tower-block.jpg',bg:'linear-gradient(135deg,#0A0A1A,#1A1A3D)',link:'https://github.com/Kevin-2810/tower-blocks-game'},
      {title:'Squid Game',desc:'A Squid Game-inspired mini game with simple rules and playful challenge design.',tech:['HTML','CSS','JS'],emoji:'./assets/squid1.jpg',bg:'linear-gradient(135deg,#00101A,#00253D)',link:'https://github.com/Kevin-2810/squid-game'}
    ]
  },
  {
    id:'landing',title:'Landing Pages & Themes',emoji:'🚀',
    color:'#8B5CF6',badge:'UI / Themes',badgeBg:'rgba(139,92,246,.12)',badgeColor:'#8B5CF6',
    projects:[
      {title:'Waterland',desc:'A water-themed landing page with vibrant colors, smooth scrolling, and modern sections.',tech:['HTML','CSS','JS'],emoji:'./assets/waterland.jpg',bg:'linear-gradient(135deg,#0A0A0A,#1A1A1A)',link:'https://github.com/Kevin-2810/waterland'},
      {title:'Clash Of Clans',desc:'A game-inspired landing theme with bold visuals and immersive content blocks.',tech:['HTML','CSS','JS'],emoji:'./assets/coc.jpg',bg:'linear-gradient(135deg,#0A1500,#1A2E00)',link:'https://github.com/Kevin-2810/clash-of-clans'},
      {title:'Free Fire',desc:'A Free Fire-inspired landing page built for energetic design and fast visual impact.',tech:['HTML','CSS','JS'],emoji:'./assets/freefire.jpg',bg:'linear-gradient(135deg,#1A0A00,#3D1500)',link:'https://github.com/Kevin-2810/Free-Fire-Responsive-Website'},
      {title:'SII Landing Page',desc:'A corporate landing page designed for clean storytelling and polished presentation.',tech:['HTML','CSS','JS'],emoji:'./assets/SII-LP.jpg',bg:'linear-gradient(135deg,#0A001A,#1A003D)',link:'https://github.com/Kevin-2810/SII-Landing-Page'},
      {title:'Manav-Rachna Dual-Degree',desc:'A university-themed landing page focused on information hierarchy and readability.',tech:['JavaScript','CSS3'],emoji:'./assets/manav-rachna.jpg',bg:'linear-gradient(135deg,#1A0900,#3D1A00)',link:'https://github.com/Kevin-2810/Manav-Rachna-Dual-Degree-'},
      {title:'Squid-Game Landing Page',desc:'A landing page themed around suspenseful visuals and high-contrast design.',tech:['JavaScript','SVG'],emoji:'./assets/squid2.jpg',bg:'linear-gradient(135deg,#00101A,#00253D)',link:'https://github.com/Kevin-2810/SQUID-GAME2'},
      {title:'Movies-Landing Page',desc:'A movie-themed landing page designed for posters, highlights, and strong branding.',tech:['HTML','CSS','JS'],emoji:'./assets/movies-website.jpg',bg:'linear-gradient(135deg,#0D0D0D,#1A1A1A)',link:'https://github.com/Kevin-2810/movies-website'}
    ]
  }
];

// ─── BUILD SLIDERS ───
function buildSliders(){
  const sec=document.getElementById('projSection');
  projectCategories.forEach(cat=>{
    const wrap=document.createElement('div');
    // Header
    const header=document.createElement('div');header.className='proj-cat-header';
    header.innerHTML=`
      <div class="proj-cat-title">
        <span>${cat.emoji}</span> ${cat.title}
        <span class="proj-cat-badge" style="background:${cat.badgeBg};color:${cat.badgeColor};border:1px solid ${cat.badgeColor}44">${cat.badge}</span>
      </div>
      <div class="slider-controls">
        <button class="sl-btn" id="prev-${cat.id}">‹</button>
        <button class="sl-btn" id="next-${cat.id}">›</button>
      </div>`;
    wrap.appendChild(header);

    // Viewport
    const vp=document.createElement('div');vp.className='slider-viewport';
    const track=document.createElement('div');track.className='slider-track';track.id='track-'+cat.id;

    cat.projects.forEach((p,i)=>{
      const card=document.createElement('div');card.className='proj-card';
      card.innerHTML=`
        <div class="proj-thumb" style="background:${p.bg}">
          <div class="proj-thumb-inner">
            <img src="${p.emoji}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;display:block;filter:brightness(1.02)">
            <div class="proj-thumb-label">${p.tech[0]}</div>
          </div>
        </div>
        <div class="proj-body">
          <div class="proj-title">${p.title}</div>
          <div class="proj-desc">${p.desc}</div>
          <div class="proj-stack">${p.tech.map(t=>`<span class="proj-stag">${t}</span>`).join('')}</div>
          ${p.link?`<a href="${p.link}" target="_blank" class="proj-link">View Project <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>`:'<span class="proj-link" style="opacity:.4;cursor:default">github.com/Kevin-2810</span>'}
        </div>`;
      track.appendChild(card);
    });
    vp.appendChild(track);wrap.appendChild(vp);

    // Dots
    const dots=document.createElement('div');dots.className='slider-dots';
    const visible=Math.floor((window.innerWidth<600?1:window.innerWidth<900?2:3));
    const pages=Math.max(1,cat.projects.length-visible+1);
    for(let i=0;i<pages;i++){
      const d=document.createElement('div');d.className='sl-dot'+(i===0?' active':'');
      dots.appendChild(d);
    }
    wrap.appendChild(dots);
    sec.appendChild(wrap);

    // Slider logic
    let cur=0;
    const cardW=300+16; // card width + gap
    function goTo(idx){
      const max=cat.projects.length-visible;
      cur=Math.max(0,Math.min(idx,max));
      track.style.transform=`translateX(-${cur*cardW}px)`;
      dots.querySelectorAll('.sl-dot').forEach((d,i)=>d.classList.toggle('active',i===cur));
    }
    document.getElementById('prev-'+cat.id).addEventListener('click',()=>goTo(cur-1));
    document.getElementById('next-'+cat.id).addEventListener('click',()=>goTo(cur+1));
    dots.querySelectorAll('.sl-dot').forEach((d,i)=>d.addEventListener('click',()=>goTo(i)));

    // Touch/swipe
    let sx=0;
    track.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
    track.addEventListener('touchend',e=>{
      const dx=sx-e.changedTouches[0].clientX;
      if(Math.abs(dx)>40)goTo(dx>0?cur+1:cur-1);
    },{passive:true});
  });
}
buildSliders();
