import {content} from "./content.js";
const para = document.getElementById('content');
const inpfield = document.getElementById('input');
const timerTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistakes span");
const wpmTag = document.querySelector(".WPM span");
const cpmTag = document.querySelector(".CPM span");
const resetbtn = document.querySelector("button");
let timer,
maxTime =60,
timeleft = maxTime;
let charindex =0;
let mistakes = 0;
let istyping =0;
function abc(){
    let randIndex =Math.floor(Math.random()*content.length);
    para.innerHTML = "";
    content[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        para.innerHTML +=spanTag ;
    });
    para.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown",()=> inpfield.focus());
    para.addEventListener("click",()=> inpfield.focus());
}


function inityping(){
    const characters = para.querySelectorAll("span");
    let Typedchar = inpfield.value.split("")[charindex];
    if(charindex < characters.length -1 && timeleft > 0){
        if(!istyping){
            timer = setInterval(initTimer,1000);
            istyping =true;
        }
        if(Typedchar == null){
            charindex --;
            if(characters[charindex].classList.contains("incorrect")){
                mistakes --;
            }
            characters[charindex].classList.remove("correct","incorrect");
        } else {
            if (characters[charindex].innerText=== Typedchar){
                characters[charindex].classList.add("correct");
            }else{
                mistakes++
                characters[charindex].classList.add("incorrect");
            }
            charindex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charindex].classList.add("active");
    
        let wpm = Math.round((((charindex -mistakes) /5 ) / (maxTime - timeleft))*60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText =mistakes;
        wpmTag.innerText =wpm;
        cpmTag.innerText = charindex - mistakes;
    }else{
        inpfield.value = "";
        clearInterval(timer);
    }
}

function initTimer(){
    if(timeleft > 0){
        timeleft --;
        timerTag.innerText =timeleft;
    }else{
        clearInterval(timer)
    }
}
function resetgame(){
    abc();
    inpfield.value = "";
    clearInterval(timer);
    timeleft = maxTime;
    let charindex =0;
    let mistakes = 0;
    let istyping =0;
    timerTag.innerText =timeleft;
    mistakeTag.innerText =mistakes;
    wpmTag.innerText =0;
    cpmTag.innerText =0;
}

abc();
inpfield.addEventListener("input", inityping);
resetbtn.addEventListener("click", resetgame);