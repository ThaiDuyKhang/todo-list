const getEle = (id) => {
    return document.getElementById(id);
  };

//Complete animation
// const circle = document.getElementsByClassName('success__circle');
// const check = document.getElementsByClassName('success__check')[0];
//     const animate = () => {
//         Velocity(circle, { 'stroke-dashoffset': 400 }, 0);
//         Velocity(circle, { 'stroke-dashoffset': 0 }, { duration: 300, delay: 250, easing: 'easeInQuad',once: true});
        
//         Velocity(check, { 'stroke-dashoffset': 400 }, 0);
//         Velocity(check, { 'stroke-dashoffset': 0 }, { duration: 400, delay: 0, easing: 'easeInQuint',once: true})
//     }
// window.animate = animate;

//Delete animation
const delAnimation = (id) =>{
    const delAnimate = document.getElementsByClassName(`delBtn${id}`)[0];
    delAnimate.classList.add("poof");
    // setTimeout(()=>{
    //     delAnimate.classList.remove("poof");
    // }, 2000);
}
window.delAnimation = delAnimation;

//Thời gian
const date = new Date();
const currentDay = date.getDay();
if(currentDay == 0){
    var sunDay = "Chủ nhật";
}
for(var i=1; i<=6; i++){
        if(currentDay == i){
            var sunDay = "Thứ " + (i+1);
        }
    }
getEle("day").innerHTML = sunDay + ', ';
getEle("date").innerHTML = "ngày " + date.toLocaleString();