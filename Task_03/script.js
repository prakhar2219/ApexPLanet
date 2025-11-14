    // QUIZ FUNCTIONALITY
    const quizData = [
      {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System"],
        answer: 1,
      },
      {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin"],
        answer: 0,
      },
      {
        question: "What is the full form of HTML?",
        options: ["Hyper Transfer Markup Language", "Hyper Text Mockup Language", "Hyper Text Markup Language"],
        answer: 2,
      },
    ];

    const quizContainer = document.getElementById("quizContainer");

    quizData.forEach((q, i) => {
      let qHTML = `<div class='question'><p>Q${i + 1}. ${q.question}</p>`;
      q.options.forEach((opt, index) => {
        qHTML += `<label><input type='radio' name='q${i}' value='${index}'> ${opt}</label><br>`;
      });
      qHTML += `</div><hr>`;
      quizContainer.innerHTML += qHTML;
    });

    function showScore() {
      let score = 0;
      quizData.forEach((q, i) => {
        const selected = document.querySelector(`input[name='q${i}']:checked`);
        if (selected && parseInt(selected.value) === q.answer) {
          score++;
        }
      });
      document.getElementById("scoreDisplay").textContent = `Your Score: ${score}/${quizData.length}`;
    }

    // IMAGE CAROUSEL
    let imgIndex = 1;
    function updateImage() {
      document.getElementById("carouselImg").src = `https://picsum.photos/800/400?random=${imgIndex}`;
    }
    function nextImage() { imgIndex++; updateImage(); }
    function prevImage() { imgIndex--; if (imgIndex < 1) imgIndex = 1; updateImage(); }

    // JOKE API
    async function getJoke() {
      const jokeElement = document.getElementById('jokeDisplay');
      jokeElement.textContent = "Loading...";
      try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
        const data = await response.json();
        jokeElement.textContent = data.joke || "Couldn't fetch a joke.";
      } catch (error) {
        jokeElement.textContent = "Error fetching joke.";
      }
    }
  