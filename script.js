const demoResults = [
  { name: "Player1", score: 95 },
  { name: "TestUser", score: 82 },
  { name: "Guest", score: 74 }
];

function saveName() {
  const nickname = document.getElementById("nickname").value.trim();
  const result = document.getElementById("result");

  if (!nickname) {
    result.textContent = "اكتب اسمًا مستعارًا أولًا.";
    return;
  }

  localStorage.setItem("demoNickname", nickname);

  const score = Math.floor(Math.random() * 51) + 50;

  demoResults.push({
    name: nickname,
    score: score
  });

  result.textContent = `مبروك ${nickname}! نتيجتك: ${score}`;

  showResults();
}

function showResults() {
  const container = document.getElementById("results");

  const sorted = [...demoResults].sort((a, b) => b.score - a.score);

  container.innerHTML = sorted
    .map((player, index) =>
      `<p>${index + 1}. ${player.name} — ${player.score} نقطة</p>`
    )
    .join("");
}

showResults();
