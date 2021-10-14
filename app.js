let card = document.getElementById("card");
let span = document.getElementById("span");
let artistSong = document.getElementById("name-artist");
let darkTheme = document.getElementById("dark-theme");
let music = document.querySelector("audio");
let img = document.getElementById("musicBg");
let songName = document.getElementById("name");
let songArtist = document.getElementById("artist");
let musicBeat = document.getElementById("musicBeat");
let duration_slider = document.querySelector("input");
let playBtn = document.getElementById("playButton");
let muteBtn = document.getElementById("muteButton");
let music_Duration = document.getElementById("duration");
let current_Time = document.getElementById("current-time");
let percentage = document.getElementById("percentage");
let repeatEnable = document.getElementById("repeat");
let index_no = 0;

const musicData = [

    {
        song: "Songs/official-chinese-song-ordinary-people-by-jackie-chan-mv.mp3",
        name: "Ordinary People",
        artist: "Jackie Chan",
        image: "Songs-Images/the foriengner.jpg",
    },

    {
        song: "Songs/childhood.mp3",
        name: "Childhood",
        artist: "Rauf & Faik",
        image: "Songs-Images/rauf-faik.jpg",
    },

    {
        song: "Songs/sultan.mp3",
        name: "Sultan",
        artist: "Sukhwinder Singh",
        image: "Songs-Images/sultan.jpg",
    },

    {
        song: "Songs/Dangal - Title Track Lyrical Video Dangal Aamir Khan Pritam Amitabh B Daler Mehndi.mp3",
        name: "Dangal",
        artist: "Daler Mehendi",
        image: "Songs-Images/dangal.jpg",
    },

    {
        song: "Songs/Heartbeat (Kal Ho Naa Ho)(PagalWorldCom.Com).mp3",
        name: "Kal Ho Naa Ho",
        artist: "Sonu Nigam",
        image: "Songs-Images/kal ho naa ho.jpg",
    },

    {
        song: "Songs/Main Hoon Na - Main Hoon Na 320 Kbps.mp3",
        name: "Mein Hoon Naa",
        artist: "Sonu Nigam",
        image: "Songs-Images/mein hoon na.jpg",
    },

    {
        song: "Songs/Aa Bhi Jaa Sanam - Prince 320 Kbps.mp3",
        name: "Prince",
        artist: "Atif Aslam",
        image: "Songs-Images/prince.jpg",
    },

]

function dark() {
    darkTheme.setAttribute("class", "fas fa-sun")
    card.classList.add("dark-theme");
    span.classList.add("dark-icons");
    artistSong.classList.add("dark-name")
    playBtn.style.color = "green"
    darkTheme.onclick = light;
}

function light() {
    darkTheme.setAttribute("class", "fas fa-moon")
    card.style.transition = "1s";
    card.classList.remove("dark-theme");
    span.classList.remove("dark-icons");
    artistSong.classList.remove("dark-name")
    playBtn.style.color = ""
    darkTheme.onclick = dark;
}

function loadSongs(index_no) {
    music.src = musicData[index_no].song;
    img.src = musicData[index_no].image;
    songName.innerHTML = musicData[index_no].name;
    songArtist.innerHTML = musicData[index_no].artist;
    setInterval(duration, 1000)
}

loadSongs(index_no);

function shuffleSong() {
    let randomSong = Math.floor(Math.random() * musicData.length);
    loadSongs(randomSong);
    music.currentTime = 0;
    playSong();
    console.log(randomSong);
}

function playSong() {
    musicBeat.style.display = "block";
    music.play(index_no);
    playBtn.setAttribute("class", "fas fa-pause-circle");
    playBtn.onclick = pauseSong;
}

function pauseSong() {
    playBtn.setAttribute("class", "fas fa-play-circle");
    playBtn.onclick = playSong;
    music.pause();
    musicBeat.style.display = "none";
}

function repeat() {
    repeatEnable.style.color = "rgb(14, 255, 94)"
    repeatEnable.onclick = unRepeat;
    loadSongs(index_no = 0);
    music.currentTime = 0;
    playSong();
}

function unRepeat() {
    repeatEnable.onclick = repeat;
    repeatEnable.style.color = "white";
}

function mute() {
    muteBtn.setAttribute("class", "fas fa-volume-mute");
    music.muted = true;
    muteBtn.onclick = unmute;
}

function unmute() {
    muteBtn.setAttribute("class", "fas fa-volume-up")
    music.muted = false;
    muteBtn.onclick = mute;
}

function nextSong() {
    if (index_no !== 6) {
        music.currentTime = 0;
        index_no += 1;
        loadSongs(index_no);
        playSong();
    }
}

function prevSong() {
    if (index_no > 0) {
        music.currentTime = 0;
        index_no -= 1;
        loadSongs(index_no);
        playSong();
    }
}

music.addEventListener("ended", () => {
    nextSong();
})

function duration() {

    // range slider movement
    let durationMovement = music.currentTime / music.duration * 100;

    // range slider value equal to movement 
    duration_slider.value = durationMovement;

    // destructring seconds and minutes from getTime function
    let { seconds, minutes } = getTime(music.duration)

    // get integer instead decimal then use ternary operator for condition
    let roundSeconds = seconds.toFixed(0)
    music_Duration.innerHTML = `${minutes.toFixed(0)}:${roundSeconds.length === 1 ? '0' + roundSeconds : roundSeconds}`

    // again destructring seconds and minutes from getTime function
    let { seconds: newSecond, minutes: newMinute } = getTime(music.duration * (durationMovement / 100))

    // get integer instead decimal then use ternary operator for condition
    let roundSeconds2 = newSecond.toFixed(0)
    current_Time.innerHTML = `${newMinute.toFixed(0)}:${roundSeconds2.length === 1 ? '0' + roundSeconds2 : roundSeconds2}`

    // percentage.innerHTML = `${Math.floor(durationMovement)}%`;

}

function change_duration() {
    music.currentTime = music.duration * (duration_slider.value / 100);
}

// First get integer instead decimal using math.floor() and returns 2 variables minutes and seconds using return for destructuring 

function getTime(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds - minutes * 60;
    return { minutes, seconds }
}

// document.body.addEventListener('load', () => {
//     console.log(music.duration)
//     // let time = music.duration;
//     // let minutes = Math.floor(time / 60);
//     // let seconds = time - minutes * 60;
//     // console.log(seconds, minutes);
// })