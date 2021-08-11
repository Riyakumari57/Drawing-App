let bgcolor = "black";
let dcolor = "white";
const box = document.getElementById('paintbox');
box.width = window.innerWidth - 90;
box.height = 500;
let context = box.getContext("2d");
context.fillStyle = bgcolor;
context.fillRect(0, 0, box.width, box.height);
let draw_color = dcolor;
let draw_width = "1";
let is_drawing = false;

var light = document.getElementById('sun');
light.onclick = function () {
     document.body.classList.toggle("light-theme");
     if (document.body.classList.contains("light-theme")) {
          light.src = "moon.png";
          context.fillStyle = dcolor;
          context.fillRect(0, 0, box.width, box.height);
          draw_color = bgcolor;
     }
     else {
          light.src = "sun.png";
          context.fillStyle = bgcolor;
          context.fillRect(0, 0, box.width, box.height);
          draw_color = dcolor;
     }
}

// const box = document.getElementById('paintbox');
// box.width = window.innerWidth - 90;
// box.height = 500;
// let context = box.getContext("2d");
// context.fillStyle = bgcolor;
// context.fillRect(0, 0, box.width, box.height);
// let draw_color = "white";
// let draw_width = "1";
// let is_drawing = false;

let arrayy = [];
let index = -1;

function change_color(ele)
{
     draw_color = ele.style.background;
}

box.addEventListener('touchstart', start, false);
box.addEventListener('touchmove', draw, false);
box.addEventListener('mousedown', start, false);
box.addEventListener('mousemove', draw, false);

box.addEventListener('touchend', stop, false);
box.addEventListener('mouseup', stop, false);
box.addEventListener('mouseout', stop, false);
function start(event) 
{
     is_drawing = true;
     context.beginPath();
     context.moveTo(event.clientX - box.offsetLeft,
                    event.clientY - box.offsetTop);
     event.preventDefault();
}

function draw(event) {
     if (is_drawing) {
          context.lineTo(event.clientX - box.offsetLeft,
                         event.clientY - box.offsetTop);
          event.preventDefault();
          context.strokeStyle = draw_color;
          context.lineWidth = draw_width;
          context.lineCap = "round";
          context.lineJoin = "round";
          context.stroke();
     }
     event.preventDefault();
}


function stop(event)
{
     if (is_drawing) {
          context.stroke();
          context.closePath();
          is_drawing= false;
     }
     event.preventDefault();
     if(event.type != 'mouseout')
     {
          arrayy.push(context.getImageData(0, 0, box.width , box.height));
          index +=1;
     }
     
     console.log(arrayy);
}


function clearCanvas()
{
     context.fillStyle = bgcolor;
     context.clearRect(0 , 0, box.width,box.height);
     context.fillRect(0, 0, box.width, box.height);
      arrayy = [];
      index = -1;
}

function undoo()
{
      if(index<=0)
      {
           clearCanvas();
      }
      else
      {
           index -=1;
           arrayy.pop();
           context.putImageData(arrayy[index],0,0);
      }
}
