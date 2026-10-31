/* Lujan motion kit: pixel field, dissolve headline, typed values line, ribbon, I-35 arrow board,
   glitch wordmark, stitched motif, header/menu glue and the color-theme switcher.
   Every effect is guarded with :not([data-lcs-on]) so loading this twice is harmless,
   and every effect holds still when prefers-reduced-motion is set. */
(function(){
  var NS='http://www.w3.org/2000/svg';
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.lcs-field:not([data-lcs-on])').forEach(function(el){
    el.setAttribute('data-lcs-on','');
    var cell=+el.getAttribute('data-cell')||24,svg=document.createElementNS(NS,'svg');
    svg.setAttribute('shape-rendering','crispEdges');el.appendChild(svg);
    var dots=[],px=-9999,py=-9999,rip=[],lastMove=-99,lastAuto=0,vis=true,running=false;
    function build(){
      var W=el.clientWidth,H=el.clientHeight;if(!W||!H)return;
      svg.setAttribute('viewBox','0 0 '+W+' '+H);svg.textContent='';dots=[];
      var s=Math.max(2,Math.round(cell*.16));
      for(var y=cell/2;y<H;y+=cell)for(var x=cell/2;x<W;x+=cell){
        var r=document.createElementNS(NS,'rect');
        r.setAttribute('x',(x-s/2).toFixed(1));r.setAttribute('y',(y-s/2).toFixed(1));r.setAttribute('width',s);r.setAttribute('height',s);
        svg.appendChild(r);dots.push({r:r,x:x,y:y,o:-1,k:-1});
      }
    }
    function frame(T){
      rip=rip.filter(function(R){return T-R.t<2.2;});
      var band=cell*1.3;
      for(var i=0;i<dots.length;i++){
        var d=dots[i],v=.07+.06*Math.sin(d.x*.012+d.y*.02-T*1.3);
        var dx=d.x-px,dy=d.y-py,dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<170)v+=(1-dist/170)*.85;
        for(var j=0;j<rip.length;j++){
          var R=rip[j],gap=Math.abs(Math.sqrt((d.x-R.x)*(d.x-R.x)+(d.y-R.y)*(d.y-R.y))-(T-R.t)*420);
          if(gap<band)v+=(1-gap/band)*(1-(T-R.t)/2.2);
        }
        var q=Math.round(Math.min(1,v)*20)/20;
        if(q!==d.o){d.r.setAttribute('opacity',q);d.o=q;}
        var k=v>.55?2:v>.3?1:0;
        if(k!==d.k){d.r.setAttribute('class',k===2?'is-big':k?'is-mid':'');d.k=k;}
      }
    }
    build();
    if(rm){frame(0);return;}
    function now(){return performance.now()/1000;}
    document.addEventListener('pointermove',function(e){var b=el.getBoundingClientRect();px=e.clientX-b.left;py=e.clientY-b.top;lastMove=now();});
    document.addEventListener('pointerdown',function(e){
      var b=el.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top;
      if(x>=0&&y>=0&&x<=b.width&&y<=b.height)rip.push({x:x,y:y,t:now()});
    });
    document.documentElement.addEventListener('pointerleave',function(){px=py=-9999;});
    function tick(t){
      if(!vis||!el.isConnected){running=false;return;}
      var T=t/1000;
      if(T-lastMove>3&&T-lastAuto>3.6){lastAuto=T;rip.push({x:Math.random()*el.clientWidth,y:Math.random()*el.clientHeight,t:T});}
      frame(T);requestAnimationFrame(tick);
    }
    function start(){if(!running){running=true;requestAnimationFrame(tick);}}
    if('ResizeObserver' in window)new ResizeObserver(build).observe(el);
    if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis)start();}).observe(el);
    start();
  });
})();
(function(){
  var NS='http://www.w3.org/2000/svg';
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.lcs-dissolve:not([data-lcs-on])').forEach(function(el){
    el.setAttribute('data-lcs-on','');
    if(rm)return;
    var cell=+el.getAttribute('data-cell')||10,dur=+el.getAttribute('data-duration')||1300,rects=[];
    var veil=document.createElementNS(NS,'svg');
    veil.setAttribute('class','lcs-dissolve__veil');veil.setAttribute('aria-hidden','true');
    veil.setAttribute('preserveAspectRatio','none');veil.setAttribute('shape-rendering','crispEdges');
    el.appendChild(veil);
    function build(){
      var w=Math.max(1,Math.ceil(el.offsetWidth)),h=Math.max(1,Math.ceil(el.offsetHeight));
      veil.setAttribute('viewBox','0 0 '+w+' '+h);veil.textContent='';rects=[];
      for(var y=0;y<h;y+=cell)for(var x=0;x<w;x+=cell){
        var r=document.createElementNS(NS,'rect');
        r.setAttribute('x',x);r.setAttribute('y',y);r.setAttribute('width',cell+.6);r.setAttribute('height',cell+.6);
        veil.appendChild(r);rects.push(r);
      }
      for(var i=rects.length-1;i>0;i--){var j=Math.random()*(i+1)|0,t=rects[i];rects[i]=rects[j];rects[j]=t;}
    }
    function play(){
      var t0=0,done=0,flashing=[],N=rects.length;
      function tick(t){
        if(!t0)t0=t;
        var p=Math.min(1,(t-t0)/dur),e=p<.5?2*p*p:1-Math.pow(2-2*p,2)/2,target=Math.floor(N*e);
        while(done<target){var r=rects[done++];r.setAttribute('class',Math.random()<.5?'lcs-dissolve__flash':'lcs-dissolve__flash lcs-dissolve__flash--b');flashing.push([r,t]);}
        while(flashing.length&&t-flashing[0][1]>70){flashing.shift()[0].remove();}
        if(p<1||flashing.length)requestAnimationFrame(tick);else veil.remove();
      }
      requestAnimationFrame(tick);
    }
    build();
    function go(){build();play();}
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();go();}},{threshold:.3});io.observe(el);
    }else go();
  });
})();
(function(){
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.lcs-type:not([data-lcs-on])').forEach(function(el){
    el.setAttribute('data-lcs-on','');
    var phrases=(el.getAttribute('data-text')||'').split('|'),out=el.querySelector('.lcs-type__out');
    el.querySelector('.lcs-type__sr').textContent=phrases.join(' ');
    if(rm){out.textContent=phrases[0];el.classList.add('is-idle');return;}
    out.textContent='';
    function wait(ms){return new Promise(function(r){setTimeout(r,ms);});}
    async function run(){
      var i=0;
      while(el.isConnected){
        var s=phrases[i%phrases.length];el.classList.remove('is-idle');
        for(var j=1;j<=s.length;j++){out.textContent=s.slice(0,j);await wait(s.charAt(j-1)===' '?95:38+Math.random()*58);}
        el.classList.add('is-idle');
        if(phrases.length<2)return;
        await wait(2600);el.classList.remove('is-idle');
        for(var k=s.length;k>=0;k--){out.textContent=s.slice(0,k);await wait(16);}
        await wait(380);i++;
      }
    }
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();run();}},{threshold:.4});io.observe(el);
    }else run();
  });
})();
(function(){
  var NS='http://www.w3.org/2000/svg';
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.lcs-ribbon:not([data-lcs-on])').forEach(function(el){
    el.setAttribute('data-lcs-on','');
    var id='lcs-r-'+Math.random().toString(36).slice(2,9);
    el.querySelector('.lcs-ribbon__guide').id=id;
    var tp=el.querySelector('.lcs-ribbon__tp'),txt=el.querySelector('.lcs-ribbon__text');
    tp.setAttribute('href','#'+id);tp.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#'+id);
    var unit=el.getAttribute('data-text')||'EMPATHY + ACCESSIBILITY + BRAND + BY DESIGN + ';
    function addUnit(){
      unit.split('+').forEach(function(p,i,all){
        if(p){var s=document.createElementNS(NS,'tspan');s.textContent=p;tp.appendChild(s);}
        if(i<all.length-1){var q=document.createElementNS(NS,'tspan');q.textContent='+';q.setAttribute('class','lcs-ribbon__sep');tp.appendChild(q);}
      });
    }
    var len=0;
    function fill(){
      tp.textContent='';addUnit();
      try{len=txt.getSubStringLength(0,unit.length);}catch(e){len=0;}
      var reps=len?Math.ceil(6400/len)+1:8;
      for(var r=1;r<reps;r++)addUnit();
    }
    fill();
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fill);
    if(rm||!len)return;
    var speed=+el.getAttribute('data-speed')||70,off=0,last=0,rate=1,target=1,vis=true,running=false;
    el.addEventListener('mouseenter',function(){target=.2;});
    el.addEventListener('mouseleave',function(){target=1;});
    function tick(t){
      if(!vis||!el.isConnected){running=false;return;}
      var dt=last?Math.min((t-last)/1000,.05):0;last=t;
      rate+=(target-rate)*.06;off=(off+speed*rate*dt)%len;
      tp.setAttribute('startOffset',(len-off).toFixed(2));
      requestAnimationFrame(tick);
    }
    function start(){if(!running){running=true;last=0;requestAnimationFrame(tick);}}
    if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis)start();}).observe(el);
    start();
  });
})();
(function(){
  var NS='http://www.w3.org/2000/svg';
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.lcs-i35:not([data-lcs-on])').forEach(function(el){
    el.setAttribute('data-lcs-on','');
    var g=el.querySelector('.lcs-i35__lamps'),lamps=[];
    for(var r=0;r<9;r++)for(var c=0;c<21;c++){
      var o=document.createElementNS(NS,'circle');
      o.setAttribute('cx',75+c*11);o.setAttribute('cy',32+r*11);o.setAttribute('r',3.6);g.appendChild(o);
      var chev=-1,a=4-Math.abs(r-4);
      [2,8,14].forEach(function(x0,k){var dx=c-x0;if(dx===a||dx===a-1)chev=k;});
      lamps.push({el:o,chev:chev});
    }
    function show(n){lamps.forEach(function(l){l.el.setAttribute('class',l.chev>-1&&l.chev<n?'is-on':'');});}
    if(rm){show(3);return;}
    var step=0,frames=[1,2,3,0];
    setInterval(function(){if(el.isConnected)show(frames[step++%frames.length]);},420);
    show(1);
  });
})();
(function(){
  var NS='http://www.w3.org/2000/svg';
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.lcs-glitch:not([data-lcs-on])').forEach(function(el){
    el.setAttribute('data-lcs-on','');
    if(rm)return;
    var id='lcs-g-'+Math.random().toString(36).slice(2,9),defs=document.createElementNS(NS,'svg');
    defs.setAttribute('width','0');defs.setAttribute('height','0');defs.setAttribute('aria-hidden','true');
    defs.style.position='absolute';
    defs.innerHTML='<filter id="'+id+'" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">'+
      '<feTurbulence type="fractalNoise" baseFrequency="0.0001 0.07" numOctaves="1" seed="1"/>'+
      '<feComponentTransfer result="slices"><feFuncR type="discrete" tableValues="0 .3 .5 .5 .5 .7 1"/><feFuncG type="linear" slope="0" intercept=".5"/></feComponentTransfer>'+
      '<feDisplacementMap in="SourceGraphic" in2="slices" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>';
    document.body.appendChild(defs);
    el.style.filter='url(#'+id+')';
    var turb=defs.querySelector('feTurbulence'),disp=defs.querySelector('feDisplacementMap'),busy=false;
    function burst(n,amp){
      if(busy)return;busy=true;var i=0;
      (function step(){
        if(i++<n){el.style.textShadow=((Math.random()*10-5)|0)+'px 0 var(--lcs-accent,#E4007C)';disp.setAttribute('scale',((Math.random()*2-1)*amp).toFixed(1));turb.setAttribute('seed',Math.random()*100|0);setTimeout(step,45+Math.random()*45);}
        else{disp.setAttribute('scale','0');el.style.textShadow='';busy=false;}
      })();
    }
    el.addEventListener('pointerenter',function(){burst(9,24);});
    el.addEventListener('focus',function(){burst(9,24);});
    var idle=+el.getAttribute('data-idle')||0;
    if(idle)(function loop(){setTimeout(function(){if(!el.isConnected)return;burst(3,12);loop();},idle*1000*(.7+Math.random()*.6));})();
  });
})();
(function(){
  var NS='http://www.w3.org/2000/svg';
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.lcs-stitch:not([data-lcs-on])').forEach(function(el){
    el.setAttribute('data-lcs-on','');
    var pat=el.getAttribute('data-pattern')||'',alt=el.getAttribute('data-pattern-alt');if(alt&&Math.random()<(parseFloat(el.getAttribute('data-alt-chance'))||.25))pat=alt;var rows=pat.split('/'),svg=el.querySelector('svg'),steps=[];
    var cols=Math.max.apply(null,rows.map(function(r){return r.length;}));
    svg.setAttribute('viewBox','-0.5 -0.5 '+(cols+1)+' '+(rows.length+1));
    function line(g,x1,y1,x2,y2){var l=document.createElementNS(NS,'line');l.setAttribute('x1',x1);l.setAttribute('y1',y1);l.setAttribute('x2',x2);l.setAttribute('y2',y2);g.appendChild(l);return l;}
    rows.forEach(function(row,r){
      var cs=[];for(var c=0;c<row.length;c++)cs.push(c);
      if(r%2)cs.reverse();
      cs.forEach(function(c){
        var ch=row.charAt(c),k={X:'',o:'is-b',G:'c-g',R:'c-r',W:'c-w',K:'c-k',O:'c-o',C:'c-c',Y:'c-y',V:'c-v',D:'c-d'}[ch];if(k===undefined)return;
        var g=document.createElementNS(NS,'g');if(k)g.setAttribute('class',k);svg.appendChild(g);
        steps.push(line(g,c+.2,r+.2,c+.8,r+.8));steps.push(line(g,c+.8,r+.2,c+.2,r+.8));
      });
    });
    if(rm){steps.forEach(function(l){l.setAttribute('class','is-in');});return;}
    function run(){var i=0;(function next(){if(i<steps.length&&el.isConnected){steps[i++].setAttribute('class','is-in');setTimeout(next,16);}})();}
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();run();}},{threshold:.3});io.observe(el);
    }else run();
  });
})();
/* page glue: live Garland clock, header rule on scroll, current nav link */
(function(){
  var fd=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',month:'long',day:'numeric',year:'numeric'});
  var ft=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
  var c=document.getElementById('clock');
  function tick(){var d=new Date();c.textContent=fd.format(d)+' at '+ft.format(d);}
  if(c){tick();setInterval(tick,1000);}
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();

  var h=document.querySelector('.header');
  function onScroll(){h.classList.toggle('is-scrolled',window.scrollY>8);}
  if(h){onScroll();window.addEventListener('scroll',onScroll,{passive:true});}

  /* Work dropdown: click or tap to open, hover on desktop, Escape or a click outside to close */
  document.querySelectorAll('.lcs-menu').forEach(function(m){
    var b=m.querySelector('.lcs-menu__btn'),l=m.querySelector('.lcs-menu__list'),t=0,byHover=false;
    function set(o,focusFirst){b.setAttribute('aria-expanded',String(o));l.hidden=!o;if(o&&focusFirst){var f=l.querySelector('a');if(f)f.focus();}}
    b.addEventListener('click',function(){if(byHover){byHover=false;return;}set(b.getAttribute('aria-expanded')!=='true');});
    b.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();e.stopPropagation();set(true,true);}});
    m.addEventListener('keydown',function(e){
      var items=[].slice.call(l.querySelectorAll('a')),i=items.indexOf(document.activeElement);
      if(e.key==='Escape'&&!l.hidden){set(false);b.focus();}
      else if(i>-1&&(e.key==='ArrowDown'||e.key==='ArrowUp')){e.preventDefault();items[(i+(e.key==='ArrowDown'?1:items.length-1))%items.length].focus();}
    });
    m.addEventListener('focusout',function(e){if(!m.contains(e.relatedTarget))set(false);});
    document.addEventListener('click',function(e){if(!m.contains(e.target))set(false);});
    l.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});
    if(window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches){
      m.addEventListener('mouseenter',function(){clearTimeout(t);if(l.hidden){byHover=true;set(true);}});
      m.addEventListener('mouseleave',function(){byHover=false;t=setTimeout(function(){if(!m.querySelector(':focus-visible'))set(false);},250);});
    }
  });

  if('IntersectionObserver' in window){
    var links={};document.querySelectorAll('.header a[href^="#"]:not(.skip):not(.lcs-glitch)').forEach(function(a){links[a.getAttribute('href').slice(1)]=a;});
    var io=new IntersectionObserver(function(es){es.forEach(function(e){var a=links[e.target.id];if(!a)return;if(e.isIntersecting)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});},{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(links).forEach(function(id){var s=document.getElementById(id);if(s)io.observe(s);});
  }
})();
/* color themes: footer swatches set data-lcs-theme on <html>; the choice is remembered in this browser */
(function(){
  var KEY='lcs-theme',root=document.documentElement;
  function set(t,save){
    if(t==='rosa')root.removeAttribute('data-lcs-theme');else root.setAttribute('data-lcs-theme',t);
    document.querySelectorAll('.lcs-themes').forEach(function(g){
      g.querySelectorAll('button').forEach(function(b){
        var on=b.getAttribute('data-theme')===t;b.setAttribute('aria-pressed',String(on));
        if(on){var n=g.querySelector('.lcs-themes__name');if(n)n.textContent=b.getAttribute('aria-label');}
      });
    });
    if(save){try{localStorage.setItem(KEY,t);}catch(e){}}
  }
  var cur='rosa';try{cur=localStorage.getItem(KEY)||'rosa';}catch(e){}
  if(!document.querySelector('.lcs-themes button[data-theme="'+cur+'"]'))cur='rosa';
  set(cur,false);
  document.querySelectorAll('.lcs-themes button').forEach(function(b){b.addEventListener('click',function(){set(b.getAttribute('data-theme'),true);});});
})();
