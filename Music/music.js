const $SongsContainer = document.getElementsByClassName('songs-container')[0];
const $SelectedMusicContainer = document.getElementsByClassName('selectedMusicContainer')[0];
const $GetSongsListButton = document.getElementsByClassName('GetSongsList')[0];
const $measuringWrapper = document.getElementsByClassName('measuringWrapper')[0];
const $playpauseTrack = document.getElementsByClassName('playpause-track')[0];
var TrackIndex = 0;
var updateTimer;
var isPlaying = false;
const $ToSeekSong = document.getElementById('ToSeekSong');
const $curr_time = document.getElementsByClassName('current-time')[0];
const $Total_duration = document.getElementsByClassName('total-duration')[0];
const $SongName = document.getElementsByClassName('SongName')[0];
const $SongImage = document.querySelector('.image > img');
const $ToChangeVolume = document.getElementById('VolumeBar');

const SongName = ['Warriyo',
    'Cielo',
    'DEAF KEV',
    'Different Heaven',
    'Janji-Heroes',
    'Sakhiyaan',
    'Bhula Dena',
    'Tumhari Kasam',
    'Na Jaana',
    'Rabba'
];

var curr_track = document.createElement('audio');


// To show and hide list of songs
function ShowListOfSongs() {
    var growDiv = document.getElementById('grow');
    // For smooth increase and decrease in height of songs-container div or we can say grow div
    if (growDiv.clientHeight && $GetSongsListButton.dataset.clicked === 'true') {
        growDiv.style.height = 0;
        $GetSongsListButton.dataset.clicked = 'false';
        document.querySelector('.GetSongsList > i').classList.toggle('down');
        document.querySelector('.GetSongsList > i').classList.toggle('up');
    } else {
        var wrapper = document.querySelector('.measuringWrapper');
        growDiv.style.height = wrapper.clientHeight + "px";
        $GetSongsListButton.dataset.clicked = 'true';
        document.querySelector('.GetSongsList > i').classList.toggle('down');
        document.querySelector('.GetSongsList > i').classList.toggle('up');
    }

}

// To load the song on media player
function Load(TrackIndex) {
    resetValues();
    curr_track.src = `songs/${SongName[TrackIndex]}.mp3`
    curr_track.load();
    $SongName.textContent = SongName[TrackIndex];
    $SongImage.src = `covers/${SongName[TrackIndex]}.jpg`
    // To wait until song successfully load inside curr_track. If we didin't wait then NaN will be printed 
    // when  duration is displayed beside seek bar.
    let SetIntervalId = setInterval(() => {
        if (!isNaN(curr_track.duration)) {
            SeekUpdate();
            clearInterval(SetIntervalId);
        }
    }, 10);

    curr_track.addEventListener("ended", nextTrack);
    updateTimer = setInterval(SeekUpdate, 1000);

    // Apply a random background color
    random_bg_color();
}

function random_bg_color() {
        
    // Get a random number between 64 to 256 (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
  
    // Construct a color withe the given values
    let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  
    // Set the background to that color
    $SelectedMusicContainer.style.background = bgColor;
  }

// To play and pause a song
function playPauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

// To play a song
function playTrack() {
    curr_track.play();
    isPlaying = true;
    $playpauseTrack.innerHTML = `<i class="fa fa-pause-circle fa-5x"></i>`;
}

// To pause a song
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    $playpauseTrack.innerHTML = `<i class="fa fa-play-circle fa-5x"></i>`;
}

// To change the song with the next song
function nextTrack() {
    if (TrackIndex < SongName.length - 1)
        TrackIndex += 1;
    else
        TrackIndex = 0;

    clearInterval(updateTimer);
    Load(TrackIndex);
    playTrack();
    ChangeGif();
}

// To change the song with the previous song
function prevTrack() {
    if (TrackIndex > 0)
        TrackIndex -= 1;
    else
        TrackIndex = 0;

    clearInterval(updateTimer);
    Load(TrackIndex);
    playTrack();
    DisplayDuration();
    ChangeGif();
}

// To stopt timer and pause song when user click on slider thumb so that user
// will get an smooth song seeking experience.
function StopUpdateTimer() {
    // curr_track.pause();
    clearInterval(updateTimer);
}

// To start timer and play the song after user click on slider thumb
function RestartUpdateTimer() {
    // curr_track.play();
    updateTimer = setInterval(SeekUpdate, 1000);
}

// To seek song
function SeekTo(){
    curr_track.currentTime = curr_track.duration * ($ToSeekSong.value / 100);
    DisplayDuration();
}


// To Update progress bar
function SeekUpdate() {
    if (!isNaN(curr_track.duration))
    $ToSeekSong.value = (curr_track.currentTime / curr_track.duration) * 100;
    DisplayDuration();
}

// To change volume
function ChangeVolume(){
    curr_track.volume =  $ToChangeVolume.value/100;
}

// Reset Values
function resetValues() {
    $curr_time.textContent = "00:00";
    $Total_duration.textContent = "00:00";
    $ToSeekSong.value = 0;
}

function DisplayDuration() {

    if (!isNaN(curr_track.duration)) {
        // To show current time and total duration of song
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.round(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentMinutes < 10) {
            currentMinutes = '0' + currentMinutes
        };
        if (currentSeconds < 10) {
            currentSeconds = '0' + currentSeconds
        };
        if (durationMinutes < 10) {
            durationMinutes = '0' + durationMinutes
        };
        if (durationSeconds < 10) {
            durationSeconds = '0' + durationSeconds
        };

        $curr_time.textContent = `${currentMinutes}:${currentSeconds}`;
        $Total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
}

// Creating html for list of songs
function CreateListOfSongs() {
    var fragment = document.createDocumentFragment();
    SongName.forEach((element, index) => {
        var Songsdiv = document.createElement('div');
        Songsdiv.setAttribute('class', 'songs');
        Songsdiv.setAttribute('data-songName', `${SongName[index]}`);
        // first inner div of song div
        var songInnerDiv1 = document.createElement('div');

        var songNumber = document.createElement('p');
        songNumber.setAttribute('id', 'songNumber');
        songNumber.innerText = `${index + 1}`;

        var songName = document.createElement('p');
        songName.setAttribute('id', 'songName');
        songName.innerText = `${element}`;

        // second inner div of song div
        var songInnerDiv2 = document.createElement('div');
        songInnerDiv2.setAttribute('class', 'gif');

        var gif = document.createElement('img');
        gif.src = `gif/playing.gif`;

        songInnerDiv2.append(gif);
        songInnerDiv1.append(songNumber, songName);
        Songsdiv.append(songInnerDiv1, songInnerDiv2);
        fragment.append(Songsdiv);
    });
    $measuringWrapper.append(fragment);
}

// To change songs and updatae GIF when user click on any song name from the list of songs  
$SongsContainer.onclick = (e) => {
    var selectedSongName = e.target.closest(".songs").dataset.songname;
    var TrackIndex = SongName.indexOf(selectedSongName);
    var selectedDivGifs = document.querySelector(`[data-songname="${selectedSongName}"] > .gif`);

    var All_gif_Div = document.querySelectorAll('.songs > .gif');
    All_gif_Div.forEach((gif) => {
        gif.style.opacity = 0;
    });

    selectedDivGifs.style.opacity = 1;
    Load(TrackIndex);
    playTrack();
}

// To update GIF whenever song changes
function ChangeGif() {
    var All_gif_Div = document.querySelectorAll('.songs > .gif');
    var selectedDivGifs = All_gif_Div[TrackIndex];
    All_gif_Div.forEach((songs_div) => {
        songs_div.style.opacity = 0;
    });
    selectedDivGifs.style.opacity = 1;
}

window.onload = () => {
    CreateListOfSongs();
    Load(TrackIndex);
    // To update GIF whenever window loads
    ChangeGif();
}