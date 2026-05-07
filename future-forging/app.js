const answers = {};

const careerMap = {
  creative:    { "UX/UI Design": 95, "Digital Marketing": 80, "Product Management": 70, "Software Engineering": 50 },
  technical:   { "Software Engineering": 95, "Backend Engineering": 88, "AI/ML Engineering": 80, "Cloud & DevOps": 75 },
  analytical:  { "Data Science": 95, "AI/ML Engineering": 88, "Cybersecurity": 72, "Product Management": 70 },
  leadership:  { "Product Management": 95, "Digital Marketing": 78, "Cloud & DevOps": 65, "Software Engineering": 60 },
  coding:      { "Software Engineering": 92, "Backend Engineering": 88, "AI/ML Engineering": 85, "Mobile Development": 78 },
  communication: { "Digital Marketing": 90, "Product Management": 85, "UX/UI Design": 75, "Data Science": 55 },
  math:        { "Data Science": 95, "AI/ML Engineering": 90, "Cybersecurity": 72, "Software Engineering": 70 },
  artistic:    { "UX/UI Design": 95, "Digital Marketing": 82, "Mobile Development": 65, "Product Management": 60 },
  impact:      { "AI/ML Engineering": 88, "Data Science": 82, "UX/UI Design": 75, "Digital Marketing": 65 },
  money:       { "Software Engineering": 92, "Data Science": 90, "Cloud & DevOps": 85, "AI/ML Engineering": 88 },
  growth:      { "AI/ML Engineering": 90, "Data Science": 88, "Cybersecurity": 80, "Cloud & DevOps": 78 },
  creativity:  { "UX/UI Design": 92, "Software Engineering": 85, "Mobile Development": 80, "Digital Marketing": 75 },
};

const trackIcons = {
  "Software Engineering": "💻", "UX/UI Design": "🎨", "Data Science": "📊",
  "AI/ML Engineering": "🤖", "Mobile Development": "📱", "Cloud & DevOps": "☁️",
  "Cybersecurity": "🔐", "Digital Marketing": "📣", "Product Management": "💼",
  "Backend Engineering": "🏗️"
};

function selectOption(el, qId, value) {
  document.querySelectorAll(`#${qId} .option`).forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  answers[qId] = value;
  const btn = document.querySelector(`#${qId} .btn-next`);
  if (btn) btn.disabled = false;
}

function nextQuestion(current) {
  document.getElementById(`q${current}`).classList.add('hidden');
  document.getElementById(`step-dot-${current}`).classList.remove('active');
  document.getElementById(`step-dot-${current}`).classList.add('done');
  const next = current + 1;
  document.getElementById(`q${next}`).classList.remove('hidden');
  document.getElementById(`step-dot-${next}`).classList.add('active');
}

function submitAssessment() {
  const scores = {};
  Object.values(answers).forEach(ans => {
    const map = careerMap[ans] || {};
    Object.entries(map).forEach(([track, score]) => {
      scores[track] = (scores[track] || 0) + score;
    });
  });
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const max = sorted[0][1];

  document.getElementById('q5').classList.add('hidden');
  document.getElementById('step-dot-5').classList.add('done');
  const res = document.getElementById('results');
  res.classList.remove('hidden');

  const grid = document.getElementById('resultsGrid');
  grid.innerHTML = sorted.map(([track, score]) => {
    const pct = Math.round((score / max) * 100);
    return `<div class="result-item">
      <div class="result-icon">${trackIcons[track] || '⭐'}</div>
      <div class="result-name">${track}</div>
      <div class="result-bar-bg"><div class="result-bar" style="width:0%" data-width="${pct}%"></div></div>
      <div class="result-pct">${pct}% match</div>
    </div>`;
  }).join('');

  setTimeout(() => {
    document.querySelectorAll('.result-bar').forEach(b => b.style.width = b.dataset.width);
  }, 100);
}

function restartQuiz() {
  Object.keys(answers).forEach(k => delete answers[k]);
  document.getElementById('results').classList.add('hidden');
  document.getElementById('q1').classList.remove('hidden');
  for (let i = 2; i <= 5; i++) document.getElementById(`q${i}`).classList.add('hidden');
  for (let i = 1; i <= 5; i++) {
    const dot = document.getElementById(`step-dot-${i}`);
    dot.classList.remove('active', 'done');
  }
  document.getElementById('step-dot-1').classList.add('active');
  document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
  document.querySelectorAll('.btn-next').forEach(b => b.disabled = true);
}
