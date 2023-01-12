console.log("Welcome to spotify");
let song=[
    {songName:'Until I found You', filepath:"songs/2.mp3", coverpath:"covers/1.jpg"},
    {songName:'love me like You do', filepath:"songs/3.mp3", coverpath:"covers/2.jpg"},
    {songName:'Besharam', filepath:"songs/4.mp3", coverpath:"covers/3.jpg"},
    {songName:'Heer ranjha', filepath:"songs/5.mp3", coverpath:"covers/4.jpg"},
    {songName:'Sugar', filepath:"songs/6.mp3", coverpath:"covers/5.jpg"},
    {songName:'Ishq Sufiyaan', filepath:"songs/7.mp3", coverpath:"covers/6.jpg"},
    {songName:'I found You', filepath:"songs/8.mp3", coverpath:"covers/7.jpg"},
    {songName:'Ranjhanna', filepath:"songs/9.mp3", coverpath:"covers/8.jpg"},
]

//initialise the variable
let songIndex=0;
let audioElement= new Audio("songs/1.mp3");
// audioElement.play();
let Masterplay = document.getElementById('Masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let Gif = document.getElementById('Gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from( document.getElementsByClassName('songItem'));


songItems.forEach((element,i) => {
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=song[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText=song[i].songName;
    
})
// handle play/pause
Masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        Masterplay.classList.remove('fa-circle-play');
        Masterplay.classList.add('fa-circle-pause');
        Gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        Masterplay.classList.remove('fa-circle-pause');
        Masterplay.classList.add('fa-circle-play');
        Gif.style.opacity= 0;

    }
})

// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
   
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime=(myProgressBar.value * audioElement.duration)/100;
})

const makeALLPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeALLPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src= `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = song[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        Gif.style.opacity=1;
        Masterplay.classList.remove('fa-circle-play');
        Masterplay.classList.add('fa-circle-pause');
    })

})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
     masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    Masterplay.classList.remove('fa-circle-play');
    Masterplay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
     masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    Masterplay.classList.remove('fa-circle-play');
    Masterplay.classList.add('fa-circle-pause');
})