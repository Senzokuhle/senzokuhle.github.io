// Elements
const generateBtn = document.getElementById('generateBtn');
const loader = document.getElementById('loader');
const numberContainer = document.getElementById('numberContainer');
const datetimeDisplay = document.getElementById('datetimeDisplay');
const copyBtn = document.getElementById('copyBtn');
const notification = document.getElementById('notification');

// Config
const GENERATION_DELAY = 100;  // More realistic than 2000ms
const NOTIFICATION_DURATION = 3000;

// Improved number generator using Set
function generateLotteryNumbers(count, min, max) {
    const numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

// Optimized UI flow
async function handleGenerate() {
    try {
        loader.classList.remove('hidden');
        numberContainer.innerHTML = '';
        copyBtn.classList.add('hidden');
        notification.classList.add('hidden');

        // Simulate async operation
        const numbers = await new Promise(resolve => {
            setTimeout(() => {
                resolve(generateLotteryNumbers(6, 1, 49));
            }, GENERATION_DELAY);
        });

        numbers.forEach((num, index) => {
            const span = document.createElement('span');
            span.textContent = num.toString().padStart(2, '0');
            span.className = `number${index === numbers.length - 1 ? ' last-number' : ''}`;
            numberContainer.appendChild(span);
        });
    } finally {
        loader.classList.add('hidden');
        copyBtn.classList.remove('hidden');
    }
}

// Robust copy function
async function copyNumbers() {
    try {
        const text = Array.from(numberContainer.children)
            .map(el => el.textContent)
            .join(' ');

        await navigator.clipboard.writeText(text);
        showNotification('✓ Copied to clipboard!', 'success');
    } catch (err) {
        console.error('Copy failed:', err);
        showNotification('⚠️ Failed to copy!', 'error');
    }
}

// Reusable notification system
function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, NOTIFICATION_DURATION);
}

// Date/time formatting
function updateDateTime() {
    datetimeDisplay.textContent = new Date().toLocaleString('en-ZA', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Event listeners
generateBtn.addEventListener('click', handleGenerate);
copyBtn.addEventListener('click', copyNumbers);

// Initial setup
updateDateTime();
setInterval(updateDateTime, 1000);

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Initialize theme
const storedTheme = localStorage.getItem('theme');
setTheme(storedTheme || (prefersDark.matches ? 'dark' : 'light'));
