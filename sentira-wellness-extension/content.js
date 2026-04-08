// Sentira Wellness Content Script (The "Grammarly" Way)

const assistantID = 'sentira-assistant';

function createAssistantIcon() {
  if (document.getElementById(assistantID)) return;

  const assistant = document.createElement('div');
  assistant.id = assistantID;
  assistant.className = 'sentira-floating-trigger';
  assistant.innerHTML = `
    <div class="sentira-logo-ring"></div>
    <img src="${chrome.runtime.getURL('icons/icon128.png')}" alt="Sentira" class="sentira-logo">
  `;

  document.body.appendChild(assistant);

  assistant.addEventListener('click', toggleWellnessPanel);
}

function toggleWellnessPanel() {
  let panel = document.getElementById('sentira-wellness-panel');
  if (panel) {
    if (panel.style.display === 'none') {
      panel.style.display = 'block';
    } else {
      panel.style.display = 'none';
    }
  } else {
    createWellnessPanel();
  }
}

function createWellnessPanel(customMessage) {
  let panel = document.getElementById('sentira-wellness-panel');
  if (panel) {
    const bodyQ = panel.querySelector('.sentira-question');
    if (bodyQ) bodyQ.textContent = customMessage || "How are you feeling right now?";
    panel.style.display = 'block';
    return;
  }

  panel = document.createElement('div');
  panel.id = 'sentira-wellness-panel';
  panel.className = 'sentira-wellness-card';
  panel.innerHTML = `
    <div class="sentira-panel-header">
      <button id="sentira-close-panel">×</button>
      <div class="sentira-header-logo-wrap">
        <img src="${chrome.runtime.getURL('icons/icon128.png')}" alt="Logo" class="sentira-header-logo">
        <div class="sentira-header-text">
          <h3 class="sentira-brand">SENTIRA</h3>
          <p class="sentira-tagline">Premium Wellness</p>
        </div>
      </div>
      <h2 class="sentira-question">${customMessage || "How are you feeling right now?"}</h2>
    </div>
    <div class="sentira-panel-body">
      <div class="mood-selector">
        <div class="mood-option">
          <button class="mood-btn" data-mood="happy">😊</button>
          <span class="mood-caption">Happy, radiant</span>
        </div>
        <div class="mood-option">
          <button class="mood-btn" data-mood="neutral">😐</button>
          <span class="mood-caption">Neutral, calm</span>
        </div>
        <div class="mood-option">
          <button class="mood-btn" data-mood="sad">😔</button>
          <span class="mood-caption">Sad, reflective</span>
        </div>
      </div>
      <div id="sentira-status-msg"></div>
      <div class="sentira-footer">
        <div class="footer-left">Sentira Premium ✨ | Your Wellbeing Companion</div>
        <div class="footer-right">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16a4 4 0 100-8 4 4 0 000 8z"></path></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path></svg>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(panel);

  document.getElementById('sentira-close-panel').addEventListener('click', () => {
    panel.style.display = 'none';
  });

  panel.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const mood = btn.dataset.mood;
      logMood(mood);
    });
  });
}

async function logMood(mood) {
  const statusMsg = document.getElementById('sentira-status-msg');
  statusMsg.textContent = 'Logging...';

  chrome.runtime.sendMessage({ action: 'logMood', mood }, (response) => {
    if (response && response.success) {
      statusMsg.textContent = 'Mood logged! Stay mindful. ✨';
      setTimeout(() => {
        statusMsg.textContent = '';
        document.getElementById('sentira-wellness-panel').style.display = 'none';
      }, 2000);
    } else {
      statusMsg.textContent = (response && response.message) ? response.message : 'Error logging mood. Please check login.';
    }
  });
}

function checkAuth() {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      chrome.runtime.sendMessage({ action: 'syncToken', token });
    }
  } catch (e) {
    // Ignore security/origin errors
  }
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    createAssistantIcon();
    checkAuth();
  });
} else {
  createAssistantIcon();
  checkAuth();
}

// Message Listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showPrompt') {
    createWellnessPanel(request.message);
  }
});
