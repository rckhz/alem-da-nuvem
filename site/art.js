// Anatomical plate drawn at a fixed resolution so it also works offline.
(() => {
 const canvas=document.querySelector('#lungs'), ctx=canvas.getContext('2d');
 let seed=108;
 const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 function line(path,color,width){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke(new Path2D(path))}
 const outlines=[
 'M335 103 C317 66 273 85 241 125 C196 166 164 237 140 306 C116 373 98 453 99 499 C100 528 111 538 133 529 C170 511 202 496 251 491 C300 485 326 472 334 435 C347 374 330 325 337 269 C344 196 349 135 335 103 Z',
 'M404 98 C424 68 457 88 485 118 C538 177 585 261 609 339 C626 390 642 466 638 504 C636 535 624 542 599 527 C561 507 533 495 492 489 C467 486 446 477 442 454 C438 429 450 415 432 395 C415 378 388 354 390 327 C391 302 410 276 402 249 C392 198 387 124 404 98 Z'];
 outlines.forEach((d,s)=>{
  const path=new Path2D(d);ctx.save();ctx.clip(path);
  const g=ctx.createLinearGradient(s?385:100,210,s?640:345,405);
  ['#626b77','#ced2da','#abb3c0','#7c8797','#434e5d'].forEach((c,i)=>g.addColorStop(i/4,c));ctx.fillStyle=g;ctx.fill(path);
  for(let i=0;i<3500;i++){let x=90+rand()*560,y=70+rand()*470,l=2+rand()*14;ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+(s?1:-1)*l*.45,y+l*.35,x+(s?1:-1)*l*.55,y+l);ctx.strokeStyle=rand()>.36?'rgba(42,46,58,.32)':'rgba(239,242,249,.54)';ctx.lineWidth=.4+rand()*.8;ctx.stroke()}
  function branch(x,y,a,len,w,level){
   let bend=(rand()-.5)*.46, end=a+bend,ex=x+Math.cos(end)*len,ey=y+Math.sin(end)*len;
   let d='M'+x+' '+y+' Q'+(x+Math.cos(a)*len*.65)+' '+(y+Math.sin(a)*len*.65)+' '+ex+' '+ey;
   ctx.lineCap='round';line(d,'#505965',w+1.6);line(d,level>4?'#9ab9ea':'#e0e7ef',w);
   if(level>0){branch(ex,ey,end-.26-rand()*.55,len*(.56+rand()*.21),w*.60,level-1);branch(ex,ey,end+.25+rand()*.59,len*(.56+rand()*.23),w*.62,level-1)}
  }
  const x=s?422:314;
  for(const [a,l] of [[-.85,71],[.15,80],[.62,84],[1.11,88],[1.45,78],[-1.36,67]])branch(x,248,s?a:Math.PI-a,l,6.3,6);
  const fissure=s?'M412 269 Q468 354 622 454':'M326 274 Q229 357 117 435 M289 313 Q238 316 145 303';
  line(fissure,'#3c495c',2);ctx.restore();line(d,'#617084',2.6);
 });
 const tube='M368 51 C366 110 381 173 369 213 M369 202 Q366 228 305 256 M370 203 Q380 229 429 257';
 ctx.lineCap='round';line(tube,'#42546d',23);line(tube,'#8daedc',20);line(tube,'#c5daf7',12);
 for(let i=0;i<23;i++){let t=i/23,y=52+i*7,x=368+6*Math.sin(t*Math.PI)-1.7*Math.sin(t*2*Math.PI);line('M'+(x-9)+' '+y+' q9 4 18 0','#667d9b',2.3)}
 // Fine registration marks match those on a printed anatomy plate.
 for(const [x,y] of [[73,105],[665,105],[73,527],[665,527]])line('M'+(x-6)+' '+y+' h12 M'+x+' '+(y-6)+' v12','#8a91a0',1);
})();
