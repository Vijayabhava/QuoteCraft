const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const btn = document.getElementById('generate-btn');

// Typewriter effect - word by word
function typeWriter(text, element, delay = 250) {
  element.textContent = '';
  const words = text.split(' ');
  let index = 0;

  const interval = setInterval(() => {
    if (index < words.length) {
      element.textContent += words[index] + ' ';
      index++;
    } else {
      clearInterval(interval);
    }
  }, delay);
}

async function getQuote() {
  try {
    const res = await fetch('https://quotes-api-self.vercel.app/quote');
    const data = await res.json();

    typeWriter(`"${data.quote}"`, quoteText, 250); // Adjust delay here
    authorText.textContent = `— ${data.author}`;
  } catch (error) {
    quoteText.textContent = "Couldn't fetch a quote.";
    authorText.textContent = "Please try again later.";
    console.error("Quote fetch error:", error);
  }
}

window.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);
