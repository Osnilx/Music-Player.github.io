const songList = [
    {
        title: "'VIDA ADICTIVA' BASE DE RAP USO LIBRE HIP HOP INSTRUMENTAL [FREE USE] BEAT 2018",
        file: "'VIDA ADICTIVA' BASE DE RAP USO LIBRE HIP HOP INSTRUMENTAL [FREE USE] BEAT 2018.mp3",
        cover: "descarga.jpg"
    },

    {
        title: "🔥 [FREE] Boom Bap Freestyle Rap Beat Hip Hop Instrumental - '' Mafia Money'' (P",
        file: "🔥 [FREE] Boom Bap Freestyle Rap Beat Hip Hop Instrumental - '' Mafia Money'' (P.mp3",
        cover: "descargak.jpg",
    },
    {
        title: "ZoneBeats-Free Style",
        file: "ZoneBeats-Free Style.mp3",
        cover: "pexels-photo-2486168.jpeg",
    }

]

//cancion actual

let actualSong = null

// capturar elementos del DOM para trabajar con Js

const songs = document.getElementById("songs")

const audio = document.getElementById("audio")

const cover = document.getElementById("cover")

const title = document.getElementById("title")

const play = document.getElementById("play")

const prev = document.getElementById("prev")

const next = document.getElementById("next")

const progress = document.getElementById("progress")

const progressContainer = document.getElementById("progress-Container")

//escuchar el click en la barra
progressContainer.addEventListener("click", setProgress) 




// escuchar el elemento audio

audio.addEventListener("timeupdate", updateProgress)


// escuchar clicks en los controles
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()
    }
    else {
        pauseSong()
    }
})

next.addEventListener("click", () => nextSong())

prev.addEventListener("click", () => prevSong())

// cargar canciones y mostar el listado

function loadSongs() {
    songList.forEach((song, index) => {

        // crear li

        const li = document.createElement("li")

        // crear a

        const link = document.createElement("a")

        // hidratar a

        link.textContent = song.title
        link.href = "#"

        //escuchar clicks

        link.addEventListener("click", () => loadSong(index))

        // añadir a li

        li.appendChild(link)

        //añadir li a ul

        songs.appendChild(li)

    })
}


// cargar cancion selecionada

function loadSong(songindex) {
    if (songindex != actualSong) {
        changeActiveclass(actualSong, songindex)
        actualSong = songindex
        audio.src = "./Mp3/" + songList[songindex].file
        audio.play()
        playSong()
        changeCover(songindex)
        changeSongtitlle(songindex)

    }

}

// actualizar barra de progreso de la cancion
function updateProgress(event) {
    const { duration, currentTime } = event.srcElement
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + "%"
}

//hacer la barra de progreso clicable
function setProgress(event) {
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current

}


// actualizar controles
function updatecontrols() {
    if (audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    }
    else {
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")

    }
}

// repodrucir cancion

function playSong() {
    if (actualSong != null) {
        audio.play()
        updatecontrols()
    }

}

//pausar cancion

function pauseSong() {

    audio.pause()
    updatecontrols()
}

//cambiar clase activa

function changeActiveclass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")
    if (lastIndex != null) {
        links[lastIndex].classList.remove("active")
    }

    links[newIndex].classList.add("active")

}


//cambiar el cover de la cancion

function changeCover(songindex) {
    cover.src = "./jpg/" + songList[songindex].cover
}

//cambiar el titulo de la cancion

function changeSongtitlle(songindex) {
    title.innerText = songList[songindex].title
}

// anterior cancion

function prevSong() {
    if (actualSong > 0) {
        loadSong(actualSong - 1)
    } else {
        loadSong(songList.length - 1)
    }

}

// siguiente cancion

function nextSong() {
    if (actualSong < songList.length - 1) {
        loadSong(actualSong + 1)
    } else {
        loadSong(0)
    }


}

// lanzar siguiente cancion cuando se acaba la actual

audio.addEventListener("ended", ()=> nextSong())


//go!

loadSongs()