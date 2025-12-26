const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const percent = document.getElementById("percent");

let isPlaying = false;

playBtn.addEventListener("click", () => {
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
