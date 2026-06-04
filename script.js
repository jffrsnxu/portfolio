  emailjs.init({
    publicKey: "EHkYqd-mgH1yAP6zw",
  });

// Animated name
const nameEl = document.getElementById('hname');
const parts = [
  {text:'Jefferson', italic:false},
  {text:' ', space:true},
  {text:'Ursua', italic:true}
];
let delay = 0;
parts.forEach(p => {
  if(p.space){ const s=document.createElement('span'); s.className='space'; nameEl.appendChild(s); return; }
  [...p.text].forEach(ch => {
    const s = document.createElement('span');
    s.className='char';
    s.textContent = ch;
    if(p.italic){ s.style.fontStyle='italic'; s.style.color='var(--accent)'; }
    s.style.animationDelay = (delay*0.055)+'s';
    delay++;
    nameEl.appendChild(s);
  });
  if(p.text==='Jefferson'){ const br=document.createElement('br'); nameEl.appendChild(br); }
});

// Typewriter
const phrases = ['Building full-stack web apps.','Turning ideas into products.','From database to UI.','Writing clean, scalable code.'];
let pi=0, ci=0, deleting=false;
const tw = document.getElementById('typewriter');
const type = () => {
  const phrase = phrases[pi];
  if(!deleting){
    tw.textContent = phrase.slice(0,++ci);
    if(ci===phrase.length){ deleting=true; setTimeout(type,1800); return; }
    setTimeout(type,65);
  } else {
    tw.textContent = phrase.slice(0,--ci);
    if(ci===0){ deleting=false; pi=(pi+1)%phrases.length; setTimeout(type,300); return; }
    setTimeout(type,35);
  }
};
setTimeout(type, 1400);


// Particles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
const hero = document.getElementById('home');
let W, H, mouse={x:-999,y:-999};
const pts = Array.from({length:60},()=>({
  x:Math.random()*1400, y:Math.random()*800,
  vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25,
  r:Math.random()*1.2+0.4
}));
const resize=()=>{ W=canvas.width=hero.offsetWidth; H=canvas.height=hero.offsetHeight; };
resize(); window.addEventListener('resize',resize);
hero.addEventListener('mousemove',e=>{ const r=hero.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top; });
hero.addEventListener('mouseleave',()=>{ mouse.x=-999; mouse.y=-999; });
(function draw(){
  ctx.clearRect(0,0,W,H);
  pts.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0)p.x=W; if(p.x>W)p.x=0;
    if(p.y<0)p.y=H; if(p.y>H)p.y=0;
    const dx=p.x-mouse.x,dy=p.y-mouse.y,dist=Math.sqrt(dx*dx+dy*dy);
    const pull=dist<100?1-dist/100:0;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r+pull*2.5,0,Math.PI*2);
    ctx.fillStyle=`rgba(201,169,110,${0.1+pull*0.5})`; ctx.fill();
  });
  pts.forEach((a,i)=>pts.forEach((b,j)=>{
    if(j<=i)return;
    const dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<110){ ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
      ctx.strokeStyle=`rgba(201,169,110,${0.055*(1-d/110)})`; ctx.lineWidth=0.5; ctx.stroke(); }
  }));
  requestAnimationFrame(draw);
})();

const form = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');

form.addEventListener('submit', function(e){

  e.preventDefault();

  sendBtn.disabled = true;
  sendBtn.innerText = 'Sending...';

  emailjs.sendForm(
    'service_74ggn8l',
    'template_qfunrbh',
    '#contactForm'
  )

  .then(() => {

    sendBtn.innerText = 'Message Sent ✓';

    form.reset();

    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtn.innerText = 'Send Message';
    }, 2500);

  })

  .catch((error) => {

    console.error(error);

    sendBtn.disabled = false;
    sendBtn.innerText = 'Send Message';

    alert('Failed to send message.');

  });
});