
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height= window.innerHeight;
let particlesArrray ;

const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
gradient.addColorStop(0.5,'white');
gradient.addColorStop(1,'black');

const inverse_gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
inverse_gradient.addColorStop(0.5,'black');
inverse_gradient.addColorStop(1,'white');

// mouse position
let mouse = {
  x: null,
  y : null,
  r : (canvas.height/130)*(canvas.width/130)
}

window.addEventListener('mousemove',function(event){
  mouse.x=event.x;
  mouse.y=event.y;
});

class Particle {
  constructor(x,y,dx,dy,size,color){
    this.x = x; this.y=y; this.dx=dx; this.dy=dy; this.size=size; this.color=color; this.mass = Math.random()*5 + 1 }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);
    // if(this.x <= canvas.width/2){
    //   ctx.fillStyle = 'white';
    // }else{
    //   ctx.fillStyle = 'black';
    // }
      ctx.fillStyle = inverse_gradient;

    ctx.fill();
    ctx.closePath();
  }

  update() {
    if(this.x>canvas.width || this.x<0){
      this.dx= -this.dx;
    }
    if(this.y>canvas.height || this.y<0){
      this.dy=-this.dy;
    }
  let  distX=mouse.x-this.x;   let disty=mouse.y-this.y;
  let  dist=Math.sqrt(distX*distX + disty*disty); //distance b/w mouse and particle
    if(dist<mouse.r + this.size){ //dist less than allowed space, then..
      if(mouse.x < this.x && this.x < canvas.width-this.size*10 ){ //check both position placement with boundary cross checks
        this.x+=10; //apply correction
      }
      if(mouse.x > this.x && this.x > this.size*10 ){
        this.x-=10;
      }
      if(mouse.y < this.y && this.y < canvas.height-this.size*10 ){
        this.y+=10;
      }
      if(mouse.y > this.y && this.y > this.size*10 ){
        this.y-=10;
      }
    }
    //move particle
    this.x+=this.dx;  this.y+=this.dy;

    //draw particle
    this.draw();

  }
}

// particlwe creation
function init(){
  particlesArrray=[];
  let num=(canvas.height * canvas.width)/9000; //adjust particles acc to window size
  for (let i=0;i<num*2;i++){
    let size= (Math.random()*5 ) +1;
    let x =(Math.random() * ((innerWidth - size*2) - (size*2)) + size*2);
    let y =(Math.random() * ((innerHeight - size*2) - (size*2)) + size*2);
    let dx = (Math.random()*5) -2.5;
    let dy = (Math.random()*5) -2.5;
    let color = '#8C5523';

    particlesArrray.push(new Particle(x,y,dx,dy,size,color));

  }
}
// draw lines to connect close enough particles
function connect(){
  //let opacity=1; //declaring for smooth transition between line on and off
for(let a=0; a<particlesArrray.length;a++){
  for(let b=a; b<particlesArrray.length;b++){
    let distance = Math.pow(particlesArrray[a].x - particlesArrray[b].x , 2) +  Math.pow(particlesArrray[a].y - particlesArrray[b].y , 2)

if ( distance < (canvas.width/12) * (canvas.height/12) ){
    //opacity=1-(distance/20000);
     ctx.strokeStyle= gradient; //'rgba(140,30,70,'+opacity+');
    ctx.lineWidth=1;
      ctx.beginPath();
    ctx.moveTo(particlesArrray[a].x , particlesArrray[a].y);
    ctx.lineTo(particlesArrray[b].x , particlesArrray[b].y);
    ctx.stroke();
    ctx.closePath();
    }
  } }
}



//anim
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,innerHeight);

  for(let i=0;i<particlesArrray.length;i++){
    particlesArrray[i].update();
  }
  connect();
}

window.addEventListener('resize',function(){
  canvas.width=innerWidth;
  canvas.height=innerHeight;
  mouse.r= (canvas.height/130)*(canvas.width/130) ;
  init();
});

//when mouse goes out of window, otherwise that area gets blocked
window.addEventListener('mouseout',function(){
  mouse.x= null;  mouse.y=null;
})
init();
//connect();
animate();

// this.dx = -1*distX*this.mass*0.05;
// this.dy = -1*disty*this.mass*0.05;
//
