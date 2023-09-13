console.log("Welcome to Spotify")
//initialize the variables
let songIndex=0;
let audioElement =new Audio('song/ukelule.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar= document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs =[

    {songName: "Ukelule song", filePath: "songs/1.mp3", coverPath: "cover/1.jpg"},
    {songName: "Tu akho se batanna", filePath: "songs/2.mp3", coverPath: "cover/2.png"},
    {songName: "Bash tera sath ho", filePath: "songs/3.mp3", coverPath: "cover/3.jpg"},
    {songName: "Chahe dukh ho chahe sukh ho", filePath: "songs/4.mp3", coverPath: "cover/4.jpg"},
    {songName: "Dhoonde akhiyaa", filePath: "songs/5.mp3", coverPath: "cover/5.jpg"},
    {songName: "Saibo flute music", filePath: "songs/6.mp3", coverPath: "cover/6.jpg"},
    {songName: "Chahe dukh ho chahe sukh ho", filePath: "songs/1.mp3", coverPath: "cover/4.jpg"}
]

songItem.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
// audioElement.play();
//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');
    //update seekbar
    progress =parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play'); 
    })
}
// Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
//     element.addEventListener('click',(e)=>{
//       makeAllPlays();
//       Index = parseInt(e.target.id)
//         e.target.classList.remove('fa-circle-play');
//         e.target.classList.add('fa-circle-pause');
//         audioElement.src = `song/${Index + 1}.mp3`;
//         audioElement.currentTime=0;
//         audioElement.play();
//         masterPlay.classList.remove('fa-circle-play');
//         masterPlay.classList.add('fa-circle-pause');

//     })
//  })
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        
        // Use backticks for template literals
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText =songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

document.getElementById('next').addEventListener('click', ()=>{
 if(songIndex>=6){
    songIndex=0;
 }
 else{
    songIndex+=1;
 }
 audioElement.src = `songs/${songIndex + 1}.mp3`;
 masterSongName.innerText =songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
       songIndex=0;
    }
    else{
       songIndex-=1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
           masterSongName.innerText =songs[songIndex].songName;
           audioElement.currentTime = 0;
           audioElement.play();
           masterPlay.classList.remove('fa-circle-play');
           masterPlay.classList.add('fa-circle-pause');
   })