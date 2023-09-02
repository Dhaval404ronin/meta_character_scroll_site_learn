// select canvas
const canvas = document.querySelector("canvas");
// gett all 2d tool and save in context
const context = canvas.getContext("2d");

// inner height is heoght without close min button strip
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render(); //made up this function in code
});


//images
function files(index) {
  var data = `
    // paste all images here!!
 `;
  return data.split("\n")[index]; //all are in an arr
}

const frameCount = 300; // how many img if we write 100 it will stop at 100

const images = [];
const imageSeq = {
  frame: 1, // starting
};

for (let i = 0; i < frameCount; i++) { // i is frame
  const img = new Image();  // create new img tag every time
  img.src = files(i); // files() func we made this will put src of image
  images.push(img); //
}


// 
gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame", //descrete fram will show to in between
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page>canvas`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render; // on refresh or load show frame 1


// when we resize it brings images appropriately
function render() {
  scaleImage(images[imageSeq.frame], context);
} 

// image scale
function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);  // h or v which ever is maxt according to that img will change
//   center the img
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
//   clear previous img
  ctx.clearRect(0, 0, canvas.width, canvas.height);
//   take new img
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}

ScrollTrigger.create({

  trigger: "#page>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
//   set start end according to preference
  start: `top top`,
  end: `600% top`,
});

// upper can be written in g sap also

// gsap.to("#page>canvas"),{
//     ScrollTrigger:{
//         trigger: "#page>canvas",
//         pin: true,
//         scroller: `#main`,
//         start: `top top`,
//         end: `600% top`,
//     }
// }