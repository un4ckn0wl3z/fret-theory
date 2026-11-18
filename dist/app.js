const $ = (selector, scope = document) => scope.querySelector(selector);
const lesson = $('#lesson');
const chapterNav = $('#chapters');
const menu = $('#menu');
const storageKey = 'fret-theory-completed';
const letters = ['C','D','E','F','G','A','B'];
const naturals = [0,2,4,5,7,9,11];
const roots = ['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];
const semitones = {'1':0,'♭2':1,'2':2,'♭3':3,'3':4,'4':5,'♯4':6,'♭5':6,'5':7,'♯5':8,'♭6':8,'6':9,'♭7':10,'7':11,'8':12};
const instruments = {scale:scales, mode:modes, chord:chords, interval:intervals};
const labTitles = {scale:'สำรวจสเกลบนคอกีตาร์', mode:'ฟังสีสันของโหมด', chord:'ฟังคอร์ดและดูตำแหน่งโน้ต', interval:'ฟังเสียงขั้นคู่'};
const subtopics = {
  rhythm:[['note-values','ค่าตัวโน้ต'],['note-modifiers','จุดประ วงโยง และสามพยางค์'],['time-signatures','Time signature']],
  chords:[['chord-extensions','Chord extensions'],['chord-inversions','Inversions'],['chord-progressions','Chord progressions'],['roman-numerals','เลขโรมัน']],
  scales:scaleTopics.map(([id,name]) => [id,name]),
  modes:[['colour-notes','โน้ตให้สีสัน'],...modeTopics.map(([id,name]) => [id,name])]
};
const tuning = [['E',64],['B',59],['G',55],['D',50],['A',45],['E',40]];
let completed = new Set();
let active;
let audio, output, scheduler;
let visualTimers = [];
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (Array.isArray(saved)) completed = new Set(saved.filter(id => theory.some(chapter => chapter.id === id)));
} catch {}

function noteName(pitch, degree) {
  const rootLetter = letters.indexOf(roots[pitch][0]);
  const letter = (rootLetter + Number(degree.slice(-1)) - 1) % 7;
  let delta = (pitch + semitones[degree] - naturals[letter] + 12) % 12;
  if (delta > 6) delta -= 12;
  return letters[letter] + (delta < 0 ? '♭'.repeat(-delta) : '♯'.repeat(delta));
}

function rowTable(headers, rows) {
  return `<div class="table-wrap"><table><thead><tr>${headers.map(value => `<th scope="col">${value}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(value => `<td>${value}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function updateProgress() {
  $('#progress').value = completed.size;
  $('#progress-label').textContent = `เรียนจบแล้ว ${completed.size} / ${theory.length} บท`;
  for (const link of chapterNav.querySelectorAll('a')) {
    const selected = link.hash === '#' + active.id;
    const done = completed.has(link.hash.slice(1));
    link.toggleAttribute('data-done', done);
    $('.check', link).textContent = done ? '✓' : '';
    if (selected) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  const done = completed.has(active.id);
  $('#done').textContent = done ? '✓ เรียนจบแล้ว' : 'บันทึกว่าเรียนจบ';
  $('#done').setAttribute('aria-pressed', String(done));
}

function toggleMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'ปิดสารบัญ ↑' : 'เปิดสารบัญ ↓';
  chapterNav.classList.toggle('opened', open);
}

function chapterRoute() {
  return location.hash.slice(1).split('/');
}

function jumpToTopic(topic) {
  const target = document.getElementById(topic);
  if (!target || !lesson.contains(target)) return;
  target.tabIndex = -1;
  target.focus({preventScroll:true});
  target.scrollIntoView({block:'start'});
}

function studyTab(pitch, degrees) {
  const start = (pitch - 4 + 12) % 12;
  const minFret = Math.max(0,start - 2);
  const maxFret = Math.min(12,Math.max(start + 3,minFret + 6));
  const sequence = [0,12].flatMap(octave => degrees.map(degree =>
    ({name:noteName(pitch,degree),midi:40 + start + octave + semitones[degree]})));
  sequence.push({name:roots[pitch],midi:40 + start + 24});
  const positions = sequence.map(({midi}) => tuning.findLastIndex(([,open]) =>
    midi - open >= minFret && midi - open <= maxFret));
  return rowTable(['สาย', ...sequence.map(({name}) => name)], tuning.map(([name,open],index) => [
    index + 1 + ' ' + name, ...sequence.map(({midi},step) => positions[step] === index ? midi - open : '–')
  ]));
}

function topicCards(topics, formulas) {
  return topics.map(([id,name,th,pitch,explanation,context,exercise]) => {
    const [formula,colors] = formulas[name];
    const degrees = formula.split(' ');
    const notes = degrees.map(degree => noteName(pitch,degree));
    return `<section class="topic-card" aria-labelledby="${id}">
      <h2 id="${id}">${name} <small>${th}</small></h2>
      <div class="topic-facts"><span><strong>สูตร</strong> ${degrees.join(' · ')}</span>
      <span><strong>โน้ตใน ${roots[pitch]}</strong> ${notes.join(' · ')}</span>
      ${colors ? `<span class="color-text"><strong>โน้ตที่เน้น</strong> ${colors.split(' ').map(degree => degree + ' ' + noteName(pitch,degree)).join(' · ')}</span>` : ''}</div>
      <p>${explanation}</p>
      <p><strong>คอร์ดประกอบ</strong> ${context}</p>
      <p><strong>ลองเล่น</strong> ${exercise}</p>
      <details><summary>TAB ขาขึ้นสองอ็อกเทฟ</summary>${studyTab(pitch,degrees)}</details>
      <button type="button" class="secondary" data-study="${id}">เปิดบนคอกีตาร์ ↑</button>
    </section>`;
  }).join('');
}

function showChapter(moveFocus = true) {
  const [chapterId,topic] = chapterRoute();
  const index = Math.max(0, theory.findIndex(chapter => chapter.id === chapterId));
  if (active === theory[index] && topic) {
    jumpToTopic(topic);
    return;
  }
  active = theory[index];
  stopAudio();
  toggleMenu(false);
  document.title = active.th + ' · Fret Theory';
  const buttonLink = (chapter, label) => chapter ? `<a class="button secondary" href="#${chapter.id}">${label}</a>` : '';
  lesson.innerHTML = `<article>
    <header class="hero"><p class="eyebrow">บทที่ ${String(index + 1).padStart(2,'0')} / 08 <span></span> ${active.en}</p>
    <h1>${active.title}</h1><p class="lead">${active.intro}</p></header>
    ${subtopics[active.id] ? `<nav class="topic-index" aria-label="หัวข้อในบทนี้"><strong>หัวข้อในบทนี้</strong><div>${subtopics[active.id].map(([id,label]) => `<a href="#${active.id}/${id}">${label}</a>`).join('')}</div></nav>` : ''}
    ${active.lab ? '<section id="lab" class="lab" aria-labelledby="lab-title"></section>' : ''}
    <div class="article-copy">${active.body}
      ${active.id === 'scales' ? topicCards(scaleTopics,scales) : ''}
      ${active.id === 'modes' ? topicCards(modeTopics,modes) : ''}
    </div>
    <footer class="lesson-end">
      ${buttonLink(theory[index - 1], '← ' + (theory[index - 1]?.th ?? ''))}
      <button id="done" class="secondary" type="button"></button>
      ${buttonLink(theory[index + 1], (theory[index + 1]?.th ?? '') + ' →')}
    </footer>
  </article>`;
  $('#done').addEventListener('click', () => {
    if (completed.has(active.id)) completed.delete(active.id);
    else completed.add(active.id);
    try { localStorage.setItem(storageKey, JSON.stringify([...completed])); } catch {}
    updateProgress();
  });
  if (active.lab === 'rhythm') rhythmLab();
  else if (active.lab) fretLab(active);
  if (active.id === 'intervals') {
    $('#interval-table').innerHTML = rowTable(['ขั้นคู่','ครึ่งเสียง','ตัวอย่างจาก E'], Object.entries(intervals).map(([name,[formula]]) => {
      const degree = formula.split(' ').at(-1);
      return [name,semitones[degree],`E → ${noteName(4,degree)}`];
    }));
  }
  if (active.id === 'chords') {
    $('#chord-table').innerHTML = rowTable(['คอร์ด','สูตร','ตัวอย่างจาก C'], Object.entries(chords).map(([name,[formula]]) =>
      [name, formula, formula.split(' ').map(degree => noteName(0,degree)).join(' – ')]));
  }
  if (active.id === 'modes') {
    $('#mode-table').innerHTML = rowTable(['โหมด','สูตร','โน้ตให้สีสันใน A'], Object.entries(modes).map(([name,[formula,colors]]) =>
      [name, formula, colors.split(' ').map(degree => degree + ' ' + noteName(9,degree)).join(' · ')]));
  }
  updateProgress();
  if (topic) jumpToTopic(topic);
  else if (moveFocus) {
    lesson.focus({preventScroll:true});
    window.scrollTo(0,0);
  }
}

function stopAudio() {
  clearInterval(scheduler);
  visualTimers.forEach(clearTimeout);
  visualTimers = [];
  if (output) {
    output.disconnect();
    output = null;
  }
}

function startAudio(status) {
  stopAudio();
  try {
    audio ??= new AudioContext();
    audio.resume().catch(() => { status.textContent = 'เปิดเสียงไม่ได้ในเบราว์เซอร์นี้'; });
    output = audio.createGain();
    output.connect(audio.destination);
    return output;
  } catch {
    status.textContent = 'เปิดเสียงไม่ได้ในเบราว์เซอร์นี้';
    return null;
  }
}

function tone(destination, midi, at, length = .28, volume = .12, wave = 'triangle') {
  const oscillator = audio.createOscillator();
  const envelope = audio.createGain();
  oscillator.type = wave;
  oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
  envelope.gain.setValueAtTime(.0001, at);
  envelope.gain.exponentialRampToValueAtTime(volume, at + .008);
  envelope.gain.exponentialRampToValueAtTime(.0001, at + length);
  oscillator.connect(envelope).connect(destination);
  oscillator.start(at);
  oscillator.stop(at + length + .02);
}

function fretLab(chapter) {
  const lab = $('#lab');
  const type = chapter.lab;
  const choices = instruments[type];
  const playLabel = {chord:'ฟังคอร์ด', interval:'ฟังขั้นคู่', scale:'ฟังสเกล', mode:'ฟังโหมดพร้อมเสียงเบส'}[type];
  const chosen = chapter.preset ?? (type === 'interval' ? 'Perfect fifth' : Object.keys(choices)[0]);
  lab.innerHTML = `<h2 id="lab-title">${labTitles[type]}</h2>
    <div class="controls">
      <label>Root <select id="root">${roots.map((name,index) => `<option value="${index}">${name}</option>`).join('')}</select></label>
      <label>${chapter.th === 'เริ่มต้น' || chapter.th === 'คีย์' ? 'สเกล' : chapter.th} <select id="formula">${Object.keys(choices).map(name => `<option>${name}</option>`).join('')}</select></label>
      <button id="play" class="primary">▶ ${playLabel}</button>
    </div>
    <div id="formula-notes" class="pills" aria-label="โน้ตตามขั้น"></div>
    <div id="board-scroll" class="board-scroll" tabindex="0" aria-label="คอกีตาร์ เลื่อนด้านข้างเพื่อดูทุกเฟรต"><div id="board" class="board" role="group" aria-label="กีตาร์จูนมาตรฐาน สาย 1 ถึง 6"></div></div>
    <div class="lab-bottom"><span>Standard tuning · E A D G B E</span><span><i class="legend-dot root"></i> Root <i class="legend-dot color"></i> โน้ตให้สีสัน</span></div>
    <p id="sound-status" class="sr-only" aria-live="polite"></p>`;
  const root = $('#root');
  const select = $('#formula');
  const status = $('#sound-status');
  root.value = chapter.root ?? (type === 'interval' ? 4 : 0);
  select.value = chosen;
  let pitch, members;

  function redraw() {
    stopAudio();
    pitch = Number(root.value);
    const [formula, characteristic] = choices[select.value];
    members = formula.split(' ').map(degree => ({
      degree, offset:semitones[degree], name:noteName(pitch,degree),
      color:characteristic.split(' ').includes(degree)
    }));
    const kindClass = member => member.offset % 12 === 0 ? 'root' : member.color ? 'color' : '';
    $('#formula-notes').innerHTML = members.map(member =>
      `<button class="pill ${kindClass(member)}" data-midi="${60 + pitch + member.offset}"><small>${member.degree}</small> ${member.name}</button>`).join('');
    const fretLabels = Array.from({length:13}, (_,fret) => `<span class="fret-label">${fret}</span>`).join('');
    const strings = tuning.map(([name,open],index) => {
      const cells = Array.from({length:13}, (_,fret) => {
        const midi = open + fret;
        const member = members.find(note => (midi - pitch - note.offset) % 12 === 0);
        return `<div class="fret ${fret === 0 ? 'nut' : ''}">${member ? `<button class="note-dot ${kindClass(member)}" data-midi="${midi}" aria-label="${member.name} สาย ${index + 1} เฟรต ${fret}">${member.name}</button>` : ''}</div>`;
      }).join('');
      return `<span class="string-label">${name}</span>${cells}`;
    });
    $('#board').innerHTML = '<span></span>' + fretLabels + strings.join('');
  }
  root.addEventListener('change', redraw);
  select.addEventListener('change', redraw);
  lab.addEventListener('click', event => {
    const note = event.target.closest('[data-midi]');
    if (!note) return;
    const destination = startAudio(status);
    if (destination) tone(destination, Number(note.dataset.midi), audio.currentTime + .025, .42);
  });
  $('#play').addEventListener('click', () => {
    const destination = startAudio(status);
    if (!destination) return;
    const first = audio.currentTime + .04;
    const step = .29;
    const sequence = ['scale','mode'].includes(type) ? [...members,{offset:12}] : members;
    for (const [index,member] of sequence.entries()) {
      tone(destination,60 + pitch + member.offset,first + (type === 'chord' ? 0 : index * step),type === 'chord' ? .84 : .34,type === 'chord' ? .095 : .14);
    }
    if (type === 'mode') tone(destination,36 + pitch,first,sequence.length * step + .2,.18,'sine');
  });
  redraw();
}

function rhythmLab() {
  const patterns = {
    'Quarter':[1], 'Eighth':[1,1], 'Triplet':[1,1,1], 'Sixteenth':[1,1,1,1], 'Gallop':[1,0,1,1]
  };
  const lab = $('#lab');
  lab.innerHTML = `<h2 id="lab-title">ฟังจังหวะที่ BPM เดียวกัน</h2>
    <div class="controls"><label>BPM <input id="bpm" type="number" min="40" max="240" value="90"></label>
    <label>รูปแบบ <select id="pattern">${Object.keys(patterns).map(key => `<option>${key}</option>`).join('')}</select></label>
    <button id="click" class="primary" aria-pressed="false">▶ เล่นจังหวะ</button></div>
    <div id="beat-grid" class="beat-grid" aria-label="จังหวะ 4/4"></div>
    <p id="sound-status" class="sr-only" aria-live="polite"></p>`;
  const bpm = $('#bpm');
  const pattern = $('#pattern');
  const button = $('#click');
  const grid = $('#beat-grid');
  const status = $('#sound-status');

  function reset() {
    stopAudio();
    button.textContent = '▶ เล่นจังหวะ';
    button.setAttribute('aria-pressed','false');
    grid.innerHTML = Array.from({length:4}, (_, index) =>
      `<div class="beat"><strong>${index + 1}</strong><div>${patterns[pattern.value].map(on => `<span class="${on ? '' : 'rest'}"></span>`).join('')}</div></div>`).join('');
  }

  function play() {
    const destination = startAudio(status);
    if (!destination) return;
    const speed = Math.max(40,Math.min(240,Number(bpm.value) || 90));
    bpm.value = speed;
    const parts = patterns[pattern.value];
    const step = 60 / speed / parts.length;
    const cells = [...grid.querySelectorAll('.beat span')];
    button.textContent = '■ หยุดจังหวะ';
    button.setAttribute('aria-pressed','true');
    let cursor = 0;
    let next = audio.currentTime + .07;
    function schedule() {
      if (next < audio.currentTime) next = audio.currentTime + .025;
      while (next < audio.currentTime + .12) {
        const cell = cursor;
        const part = cell % parts.length;
        if (parts[part]) tone(destination,part ? 82 : cell === 0 ? 95 : 88,next,.065,part ? .1 : .2,'sine');
        const timer = setTimeout(() => {
          visualTimers = visualTimers.filter(id => id !== timer);
          $('.playing',grid)?.classList.remove('playing');
          cells[cell].classList.add('playing');
        },Math.max(0,(next - audio.currentTime) * 1000));
        visualTimers.push(timer);
        cursor = (cursor + 1) % cells.length;
        next += step;
      }
    }
    schedule();
    scheduler = setInterval(schedule,25);
  }
  button.addEventListener('click', () => button.getAttribute('aria-pressed') === 'true' ? reset() : play());
  for (const input of [bpm,pattern]) input.addEventListener('change', () => {
    const wasPlaying = button.getAttribute('aria-pressed') === 'true';
    reset();
    if (wasPlaying) play();
  });
  reset();
}

chapterNav.innerHTML = theory.map((chapter,index) =>
  `<a href="#${chapter.id}"><span class="nav-number">${String(index + 1).padStart(2,'0')}</span><span class="nav-title">${chapter.th}<small>${chapter.en}</small></span><span class="check" aria-label="เรียนจบ"></span></a>`).join('');
menu.addEventListener('click', () => toggleMenu(menu.getAttribute('aria-expanded') === 'false'));
chapterNav.addEventListener('click', event => {
  if (event.target.closest('a')?.hash === location.hash) toggleMenu(false);
});
window.addEventListener('hashchange', () => {
  if (!location.hash || theory.some(chapter => chapter.id === chapterRoute()[0])) showChapter();
});
lesson.addEventListener('click', event => {
  const button = event.target.closest('[data-study]');
  if (!button) return;
  const topic = [...scaleTopics,...modeTopics].find(([id]) => id === button.dataset.study);
  if (!topic) return;
  const [,name,,pitch] = topic;
  $('#root').value = pitch;
  const select = $('#formula');
  select.value = name;
  select.dispatchEvent(new Event('change'));
  select.focus({preventScroll:true});
  $('#lab').scrollIntoView({block:'start'});
});
window.addEventListener('pagehide', stopAudio);
showChapter(false);
