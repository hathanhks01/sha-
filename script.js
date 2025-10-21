(function(){
  const STAR_COUNT = 80; // bạn có thể chỉnh số lượng
  const container = document.body;

  function rand(min, max){
    return Math.random() * (max - min) + min;
  }

  function makeStar(){
    const s = document.createElement('div');
    s.className = 'star';
    const size = rand(2, 8); // px
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;

    // random position in viewport
    s.style.left = `${rand(0, 100)}vw`;
    s.style.top  = `${rand(0, 100)}vh`;

    // random animation timings for "ngẫu nhiên theo nhịp"
    const twinkleDuration = rand(1.2, 4.0); // seconds
    const twinkleDelay = rand(-4, 0); // negative to start some mid-animation
    s.style.animationDuration = `${twinkleDuration}s, ${rand(4,8)}s`; // twinkle, floatTiny
    s.style.animationDelay = `${twinkleDelay}s, ${twinkleDelay/2}s`;

    // slight color tint for variety
    const hueShift = Math.round(rand(-8,8));
    s.style.filter = `hue-rotate(${hueShift}deg)`;

    // initial opacity variety
    s.style.opacity = rand(0.15, 0.95).toFixed(2);

    return s;
  }

  // create stars
  for(let i=0;i<STAR_COUNT;i++){
    container.appendChild(makeStar());
  }

  // Optional: on resize reposition some stars so they stay inside viewport
  let resizeTimeout;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(()=>{
      const stars = document.querySelectorAll('.star');
      stars.forEach(st=>{
        if (Math.random() < 0.25) { // reposition a subset to keep variety
          st.style.left = `${rand(0,100)}vw`;
          st.style.top  = `${rand(0,100)}vh`;
        }
      });
    }, 120);
  });
})();

// -------------------- typewriter effect --------------------
document.addEventListener('DOMContentLoaded', ()=> {
  const el = document.getElementById('typewriter');
  const box = document.querySelector('.intro-box');
  const cursor = document.querySelector('.cursor');
  const intro = document.querySelector('.intro');
  const profile = document.querySelector('.profile');
  const profileCard = document.querySelector('.profile-card');

  if (!el || !box) return;

  // Thay nội dung dài vào đây (có thể dùng \n để xuống dòng)
  const text = `chào sha, anh là Thành — rất vui được làm quen với em. Mình muốn bắt đầu bằng những lời thật lòng: em thật dễ thương, ấm áp, và anh hy vọng ta sẽ có nhiều điều để cùng chia sẻ. Nếu em muốn, anh sẽ kể cho em nghe về những chuyến đi, những bản nhạc làm anh rung động, và cả những món ăn anh thích. Hy vọng lời mở đầu này sẽ giúp chúng ta bước vào cuộc trò chuyện nhẹ nhàng và chân thành hơn...`;

  let index = 0;
  let timerId = null;
  let skipped = false;

  el.textContent = '';

  function showProfile(){
    // fade out intro
    if (intro) intro.classList.add('done');
    // reveal profile
    if (profile) {
      profile.classList.add('show');
      profile.setAttribute('aria-hidden', 'false');
      // focus profile card for keyboard users
      if (profileCard) profileCard.focus();
    }
  }

  function step(){
    if (skipped) return;
    if (index >= text.length) {
      // finished — keep cursor blinking and show profile
      showProfile();
      return;
    }
    const ch = text.charAt(index++);
    el.textContent += ch;

    // dynamic delay for natural typing rhythm
    let delay = 30 + Math.random() * 70; // base randomness
    if (ch === ' ') delay = 15 + Math.random() * 40;
    if (ch === ',' ) delay += 180;
    if (ch === '.' || ch === '!' || ch === '?') delay += 320;
    if (ch === '\n') delay += 200;

    timerId = setTimeout(step, delay);
  }

  // start after short pause so background loads
  timerId = setTimeout(step, 600);

  // click or Enter to skip typing and show full text immediately
  function skipHandler(e){
    if (skipped) return;
    if (e.type === 'click' || (e.key && (e.key === 'Enter' || e.key === ' '))) {
      skipped = true;
      if (timerId) clearTimeout(timerId);
      el.textContent = text;
      // keep cursor visible
      if (cursor) cursor.style.opacity = '1';
      // show profile immediately
      showProfile();
    }
  }

  box.addEventListener('click', skipHandler);
  box.addEventListener('keydown', skipHandler);
});