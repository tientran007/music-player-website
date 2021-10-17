let song = document.getElementById("audiosong");
let playbntstatus = true;
let loopbtnstatus = true;
let randombtnstatus = true;
let replayliststatus = false;
let volumeshow = true;
let playlist = [];

init();

function init() {
  if (getLocalStorage("playlistsong") == null) {
    playlist = [];
    saveLocalStorage("playlistsong", playlist);
  } else {
    playlist = getLocalStorage("playlistsong");
  }
}

function getLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

function saveLocalStorage(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}

class Songs {
  constructor(id, namesong, namesinger, logosong, audio) {
    (this.id = id),
      (this.namesong = namesong),
      (this.namesinger = namesinger),
      (this.logosong = logosong),
      (this.audio = audio);
  }
}
let listsong = [
  new Songs(
    0,
    "Phận Duyên Lỡ Làng",
    "Phát Huy T4,Truzg",
    "images/phanduyenlolang.jpg",
    "./music/phanduyenlolang.mp3"
  ),
  new Songs(
    1,
    "Muộn rồi mà sao còn",
    "Sơn Tùng M-TP",
    "images/muonroimasaocon.jpg",
    "./music/muonroimasaocon.mp3"
  ),
  new Songs(
    2,
    "Yêu là cưới",
    "Phát Hồ",
    "images/yeu-la-cuoi.png",
    "./music/yeulacuoi.mp3"
  ),
  new Songs(
    3,
    "Câu hẹn câu thề",
    "Đình Dũng,ACV",
    "images/cauhencauthe.jpg",
    "./music/cauhencauthe.mp3"
  ),
  new Songs(
    4,
    "Tình thương phu thê",
    "Chí Hướng",
    "images/tinhthuongphuthe.jpg",
    "./music/tinhthuongphuthe.mp3"
  ),
  new Songs(
    5,
    "Cô đơn dành cho ai",
    "Lee,Ken,Nal",
    "images/codondanhchoai.jpg",
    "./music/codondanhchoai.mp3"
  ),
  new Songs(
    6,
    "Hãy trao cho anh",
    "Sơn Tùng M-TP",
    "images/haytraochoanh.jpg",
    "./music/haytraochoanh.mp3"
  ),
  new Songs(
    7,
    "Cầu Vòng Khuyết",
    "Tuấn Hưng",
    "images/cauvongkhuyet.jpg",
    "./music/cauvongkhuyet.mp3"
  ),
  new Songs(
    8,
    "Sài Gòn Đau Lòng Quá",
    "Hứa Kim Tuyền",
    "images/saigondaulongqua.jpg",
    "./music/saigondaulongqua.mp3"
  ),
  new Songs(
    9,
    "Đêm Lao Xao Remix",
    "Nguyễn Hải Yến",
    "images/demlaoxao.jpg",
    "./music/demlaoxao.mp3"
  ),
  new Songs(
    10,
    "Truyền Thái Y",
    "Ngô Kiến Huy,Masew",
    "images/truyenthaiy.jpg",
    "./music/truyenthaiy.mp3"
  ),
  new Songs(
    11,
    "Hương",
    "Văn Mai Hương,Negav",
    "images/huong.jpg",
    "./music/huong.mp3"
  ),
  new Songs(
    12,
    "Old Town Road (Remix)",
    "Lil Nas X,Billy Ray Cyrus",
    "images/oldtownroad.jpg",
    "./music/oldtownroad.mp3"
  ),
  new Songs(
    13,
    "Như Một Người Dưng",
    "Nguyễn Thạc Bảo Ngọc",
    "images/nhumotnguoidung.jpg",
    "./music/nhumotnguoidung.mp3"
  ),
  new Songs(
    14,
    "Cưới Luôn Được Không? ",
    "Yuni Boo,Goctoi Mixer",
    "images/cuoiluonduockhong.jpg",
    "./music/cuoiluonduockhong.mp3"
  ),
  new Songs(
    15,
    "Thế Thái",
    "Hương Ly",
    "images/thethai.jpg",
    "./music/thethai.mp3"
  ),

  new Songs(
    16,
    "Yêu Đừng Sợ Đau",
    "Ngô Lan Hương",
    "images/yeudungsodau.jpg",
    "./music/yeudungsodau.mp3"
  ),
  new Songs(
    17,
    "Gõ Cửa Trái Tim",
    "Quỳnh Trang",
    "images/gocuatraitim.jpg",
    "./music/gocuatraitim.mp3"
  ),
  new Songs(
    18,
    "Độ Tộc 2",
    " Masew,Pháo,Phúc Du,Phùng Thanh Độ",
    "images/dotoc2.jpg",
    "./music/dotoc2.mp3"
  ),
  new Songs(19, "Only", "Lee Hi", "images/only.jpg", "./music/only.mp3"),
  new Songs(
    20,
    "Industry Baby",
    "Lil Nas X,Jack Harlow",
    "images/indutrus.jpg",
    "./music/indutrus.mp3"
  ),
];
class SongInPlayList {
  constructor(songid, songname, singername, audio, imagesong) {
    this.songid = songid;
    (this.songname = songname),
      (this.singername = singername),
      (this.audio = audio),
      (this.imagesong = imagesong);
  }
}

function displayAllSong() {
  let tbshowallsong = document.getElementById("showallsong");
  tbshowallsong.innerHTML = " ";
  for (let i = 0; i < listsong.length; i++) {
    tbshowallsong.innerHTML += ` <tr class= "trinfosong" >
             <td>${listsong[i].id + 1}</td>
             <td class="showinfosong"><img class="imgsong" src="${
               listsong[i].logosong
             }" alt=""></td>
             <td  class="showinfosong">
                ${listsong[i].namesong}
             </td>
             <td  class="showinfosong">
                 Singer: ${listsong[i].namesinger}
             </td> 
             <td  class="showinfosong">
             <button onclick="addplaylist(${i})">+</button>
             </td>
         </tr> `;
  }
}
displayAllSong();

function addplaylist(index) {
  let song = new SongInPlayList(
    listsong[index].id,
    listsong[index].namesong,
    listsong[index].namesinger,
    listsong[index].audio,
    listsong[index].logosong
  );
  if (isNotExistProduct(song) == -1) {
    playlist.push(song);
    showplaylist();
    showindexsong();
    saveLocalStorage("playlistsong", playlist);
  } else {
    alert(`${song.songname} is existing in playlist!`);
  }
}

function isNotExistProduct(song) {
  return playlist.findIndex(function (item, index) {
    return item.songname == song.songname;
  });
}

function showplaylist() {
  let list = `<table class="tbplaylist">`;
  for (let i = 0; i < playlist.length; i++) {
    list += ` 
              <tr id="${playlist[i].id}">
                  <td class="namesongplaylist">${playlist[i].songname} </td>
                  <td>                 
                  <button onclick="playsong(${playlist[i].songid})" class="btnplaylist">▶</button>
                  </td>      
                  <td>
                  <button onclick="deletesong(${i})" class="delesongfrompl">X</button>
                  </td>
              </tr>`;
  }
  list += `</table>`;
  document.getElementById("listplaysong").innerHTML = list;
  quantitysong();
}
showplaylist();

function playmusic() {
  if (playbntstatus) {
    song.play();
    playbntstatus = false;
    document.getElementById("songlogo").style.animation =
      "app-logo-spin infinite 20s linear";
    document.getElementById("btnplay").innerHTML = "❚❚";
  } else {
    song.pause();
    document.getElementById("btnplay").innerHTML = "▶";
    document.getElementById("songlogo").style.animation = "none";
    playbntstatus = true;
  }
}

function playsong(index) {
  stopsong();
  document.getElementById("songlogo").src = listsong[index].logosong;
  document.getElementById("marquee").innerHTML = `${listsong[index].namesong}`;
  document.getElementById(
    "marquee1"
  ).innerHTML = `${listsong[index].namesinger}`;
  song.src = listsong[index].audio;
  song.ontimeupdate = function () {
    let percenttime = Math.floor((song.currentTime / song.duration) * 100);
    document.getElementById("rangetimesong").value = percenttime;
    changeVolume();
    displaytime();
    replayiconvolume();
    if (loopbtnstatus == true && randombtnstatus == true) {
      if (
        findindexpersent() == playlist.length - 1 &&
        replayliststatus == true
      ) {
        replayPlaylist();
      } else {
        autonextsong();
      }
    } else {
      if (loopbtnstatus == false && randombtnstatus == true) {
        loopsong();
      }
      if (randombtnstatus == false && loopbtnstatus == true) {
        randomsong();
      }
    }
  };
  showindexsong();
  song.play();
  playbntstatus = false;
  document.getElementById("songlogo").style.animation =
    "app-logo-spin infinite 20s linear";
  document.getElementById("btnplay").innerHTML = "❚❚";
}
song.ontimeupdate = function () {
  let percenttime = (song.currentTime / song.duration) * 100;
  document.getElementById("rangetimesong").value = percenttime;
  changeVolume(song);
  displaytime();
  replayiconvolume();
  if (loopbtnstatus == true && randombtnstatus == true) {
    if (findindexpersent() == playlist.length - 1 && replayliststatus == true) {
      replayPlaylist();
    } else {
      autonextsong();
    }
  } else {
    if (loopbtnstatus == false && randombtnstatus == true) {
      loopsong();
    }
    if (randombtnstatus == false && loopbtnstatus == true) {
      randomsong();
    }
  }
};

function speed075() {
  changespeedbtn(0);
  song.playbackRate = 0.75;
}

function speed100() {
  changespeedbtn(1);
  song.playbackRate = 1;
}

function speed150() {
  changespeedbtn(2);
  song.playbackRate = 1.5;
}

function speed200() {
  changespeedbtn(3);
  song.playbackRate = 2;
}

function changespeedbtn(n) {
  for (let i = 0; i < 4; i++) {
    if (i !== n) {
      document
        .getElementById("speedaudio")
        .children[0].children[0].children[
          i
        ].children[0].children[0].classList.add("disable-btn");
    } else {
      document
        .getElementById("speedaudio")
        .children[0].children[0].children[
          n
        ].children[0].children[0].classList.remove("disable-btn");
    }
  }
}

function changeVolume() {
  let volume = document.getElementById("volume").value;
  song.volume = volume / 100;
}

function showrangevolume() {
  if (volumeshow) {
    document.getElementById("volume").classList.remove("d-none");
    volumeshow = false;
  } else {
    document.getElementById("volume").classList.add("d-none");
    volumeshow = true;
  }
}

function rePlaylist() {
  if (replayliststatus == false) {
    document.getElementById("replayplaylistbtn").classList.add("replaylistbtn");
    replayliststatus = true;
  } else {
    document
      .getElementById("replayplaylistbtn")
      .classList.remove("replaylistbtn");
    replayliststatus = false;
  }
}

function replayPlaylist() {
  if (song.duration == song.currentTime) {
    playsong(playlist[0].songid);
  }
}

function replayiconvolume() {
  let volumevalue = document.getElementById("volume").value;
  if (volumevalue == 0) {
    document.getElementById("iconvolume").src = "images/icon/mute.png";
  } else {
    document.getElementById("iconvolume").src = "images/icon/speaker.png";
  }
}

function deletesong(index) {
  playlist.splice(index, 1);
  showplaylist();
  showindexsong();
  saveLocalStorage("playlistsong", playlist);
}

function stopsong() {
  song.pause();
  song.currentTime = 0;
}

function findindexpersent() {
  let namesongPresent = document.getElementById("marquee").textContent;
  var indexPresent = -1;
  for (var i = 0; i < playlist.length; i++)
    if (playlist[i].songname == namesongPresent) {
      indexPresent = i;
      break;
    }
  return indexPresent;
}

function nextsong() {
  let indexPresent = findindexpersent();
  nextidx = indexPresent + 1;
  playsong(playlist[nextidx].songid);
}

function previoussong() {
  let index = findindexpersent();
  previousidx = index - 1;
  playsong(playlist[previousidx].songid);
}

function autonextsong() {
  if (song.duration == song.currentTime) {
    nextsong();
  }
}

function clickloop() {
  if (loopbtnstatus == true) {
    document.getElementById("loopbutton").classList.remove("disable-btn");
    document.getElementById("randombutton").classList.add("disable-btn");
    loopbtnstatus = false;
    randombtnstatus = true;
  } else {
    document.getElementById("loopbutton").classList.add("disable-btn");
    loopbtnstatus = true;
  }
}

function loopsong() {
  if (song.duration == song.currentTime) {
    let indexPresent = findindexpersent();
    playsong(playlist[indexPresent].songid);
  }
}

function clickrandom() {
  if (randombtnstatus == true) {
    document.getElementById("randombutton").classList.remove("disable-btn");
    document.getElementById("loopbutton").classList.add("disable-btn");
    randombtnstatus = false;
    loopbtnstatus = true;
  } else {
    document.getElementById("randombutton").classList.add("disable-btn");
    randombtnstatus = true;
  }
}

function randomsong() {
  randomindex = Math.floor(Math.random() * playlist.length);
  if (song.duration == song.currentTime) {
    playsong(playlist[randomindex].songid);
  }
}

function rewindsong() {
  let percent = document.getElementById("rangetimesong").value;
  let secontimesong = (song.duration / 100) * percent;
  song.currentTime = secontimesong;
}

function displaytime() {
  let sec = parseInt(song.currentTime % 60);
  let min = parseInt((song.currentTime / 60) % 60);
  document.getElementById("innertime").innerHTML = `${min} : ${sec}`;
}

function quantitysong() {
  let quantity = playlist.length;
  document.getElementById("quantitysong").innerText = `${quantity} song`;
}
quantitysong();

function showindexsong() {
  let indexsong = findindexpersent() + 1;
  let totalsong = playlist.length;
  document.getElementById(
    "inerindexsong"
  ).innerHTML = `Song ${indexsong}/ ${totalsong}`;
}
showindexsong();

function searchSong() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("inputnamesong");
  filter = input.value.toUpperCase();
  table = document.getElementById("showallsong");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

//---------------------------------- Theme Color use OOP-----------------------------------//
class Theme {
  constructor(color1, color2, color3, color4, color5) {
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3;
    this.color4 = color4;
    this.color5 = color5;
  }
  settheme() {
    document.getElementsByTagName(
      "body"
    )[0].style.backgroundColor = `${this.color1}`;
    document.getElementsByClassName(
      "header"
    )[0].style.backgroundColor = `${this.color2}`;
    document.getElementsByClassName(
      "viewpage"
    )[0].style.backgroundColor = `${this.color3}`;
    document.getElementsByClassName(
      "viewpage"
    )[0].style.color = `${this.color5}`;
    let x = document.getElementsByTagName("button");
    for (let i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = `${this.color4}`;
    }
    let z = document.getElementsByClassName("infosinger");
    for (let k = 0; k < z.length; k++) {
      z[k].style.color = `${this.color5}`;
    }
  }
}

let yellowtheme = new Theme(
  "#000000",
  "#082032",
  "#334756",
  "#F0A500",
  "#ffffff"
);
let violettheme = new Theme(
  "#F56FAD",
  "#C32BAD",
  "#7027A0",
  "#F56FAD",
  "#ffffff"
);
let multiltheme = new Theme(
  "#FFEDDA",
  "#FFB830",
  "#3DB2FF",
  "#FF2442",
  "#ffffff"
);
let tomatotheme = new Theme(
  "#082032",
  "#2C394B",
  "#334756",
  "#FF4C29",
  "#ffffff"
);
let defaulttheme = new Theme(
  "#0d6a9a",
  "#2bcbba",
  "#1db9c3",
  "#7027a0",
  "#000000"
);
