let index = 0;

let score = {
  fresh: 0,
  floral: 0,
  woody: 0,
  musk: 0
};

let questions = [
  {
    q: "休日の過ごし方は？",
    a: [
      { text: "外でアクティブに過ごす", type: "fresh" },
      { text: "家でゆっくりする", type: "musk" }
    ]
  },
  {
    q: "なりたい印象は？",
    a: [
      { text: "清潔感・爽やか", type: "fresh" },
      { text: "華やか・女性らしい", type: "floral" }
    ]
  },
  {
    q: "好きな雰囲気は？",
    a: [
      { text: "自然・木・落ち着き", type: "woody" },
      { text: "柔らかく肌になじむ", type: "musk" }
    ]
  }
];

let perfumes = {
  fresh: [
    { name: "BLUE HINOKI", desc: "透明感のあるヒノキの香り", url: "https://www.tamburins.com/jp/" }
  ],
  floral: [
    { name: "EVENING GLOW", desc: "華やかなフローラル系の香り", url: "https://www.tamburins.com/jp/" }
  ],
  woody: [
    { name: "BOTTARI", desc: "苔・ウッディで落ち着く香り", url: "https://www.tamburins.com/jp/" }
  ],
  musk: [
    { name: "SOFT MUSK系", desc: "肌に溶け込むような柔らかい香り", url: "https://www.tamburins.com/jp/" }
  ]
};

function startQuiz() {
  index = 0;
  score = { fresh: 0, floral: 0, woody: 0, musk: 0 };
  document.getElementById("result").innerHTML = "";
  showQuestion();
}

function showQuestion() {
  let q = questions[index];

  document.getElementById("question").innerText = q.q;

  let choices = document.getElementById("choices");
  choices.innerHTML = "";

  q.a.forEach(c => {
    let btn = document.createElement("button");
    btn.innerText = c.text;
    btn.onclick = () => select(c.type);
    choices.appendChild(btn);
  });
}

function select(type) {
  score[type]++;
  index++;

  if (index < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  let type = Object.keys(score).reduce((a,b) =>
    score[a] > score[b] ? a : b
  );

  let result = perfumes[type];

  let html = `<h2>あなたのタイプ：${type}</h2>`;

  result.forEach(p => {
    html += `
      <div class="perfume-card">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <a href="${p.url}" target="_blank">
          <button>公式を見る</button>
        </a>
      </div>
    `;
  });

  document.getElementById("card").style.display = "none";
  document.getElementById("result").innerHTML = html;
}