const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const percent = document.getElementById("percent");
const spotBtns = document.querySelectorAll(".spot-btn");

let isPlaying = false;

// 관광지 선택
spotBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // 기존 active 제거
    spotBtns.forEach(b => b.classList.remove("active"));

    // 현재 버튼 active
    btn.classList.add("active");

    // 오디오 재생
    audio.src = `./mp3/${btn.dataset.audio}`;
    audio.play();
    playBtn.textContent = "❚❚";
    isPlaying = true;
  });
});


// 재생 / 정지
playBtn.addEventListener("click", () => {
  if (!audio.src) return;

  if (!isPlaying) {
    audio.play();
    playBtn.textContent = "❚❚";
    isPlaying = true;
  } else {
    audio.pause();
    playBtn.textContent = "▶";
    isPlaying = false;
  }
});

// 진행바
audio.addEventListener("timeupdate", () => {
  const cur = audio.currentTime;
  const dur = audio.duration || 0;
  const p = dur ? (cur / dur) * 100 : 0;

  progress.style.width = `${p}%`;
  percent.textContent = `${Math.floor(p)}%`;
  current.textContent = formatTime(cur);
});

audio.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  isPlaying = false;
});

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
