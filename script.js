const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const btn = document.getElementById('generate-btn');
const loader = document.getElementById('loader'); // Make sure loader div exists in your HTML

async function getQuote() {
  // Show loader and clear current text
  loader.classList.add('show');
  quoteText.textContent = '';
  authorText.textContent = '';
  quoteText.classList.remove('fade');
  authorText.classList.remove('fade');

  try {
    const res = await fetch('https://quotes-api-self.vercel.app/quote');
    const data = await res.json();

    // Slight delay to sync with loader animation
    setTimeout(() => {
      quoteText.textContent = `"${data.quote}"`;
      authorText.textContent = `— ${data.author}`;
      quoteText.classList.add('fade');
      authorText.classList.add('fade');
      loader.classList.remove('show');
    }, 500);
  } catch (error) {
    loader.classList.remove('show');
    quoteText.textContent = "Couldn't fetch a quote.";
    authorText.textContent = "Please try again later.";
    console.error("Quote fetch error:", error);
  }
}

window.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);
