fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const { pronunciation, fluency, vocabulary, grammar } = data;

    const scores = [pronunciation, fluency, vocabulary, grammar];
    const overall = (scores.reduce((a, b) => a + b) / scores.length).toFixed(1);

    document.getElementById("overallScore").innerText = overall;

    setBar("pronunciation", pronunciation);
    setBar("fluency", fluency);
    setBar("vocabulary", vocabulary);
    setBar("grammar", grammar);

    setFeedback(overall);
    loadChart(scores);
  });

function setBar(id, value) {
  const bar = document.getElementById(id);
  bar.style.width = (value / 9) * 100 + "%";
}

function setFeedback(score) {
  let text = "";
  if (score >= 8) {
    text = "Excellent performance with strong control.";
  } else if (score >= 6) {
    text = "Good performance with minor inaccuracies.";
  } else {
    text = "Needs improvement.";
  }
  document.getElementById("feedbackText").innerText = text;
}

function loadChart(scores) {
  new Chart(document.getElementById("scoreChart"), {
    type: "radar",
    data: {
      labels: ["Pronunciation", "Fluency", "Vocabulary", "Grammar"],
      datasets: [{
        label: "Scores",
        data: scores,
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderColor: "#4caf50"
      }]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 9
        }
      }
    }
  });
}
