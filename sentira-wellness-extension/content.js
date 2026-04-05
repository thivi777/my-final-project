// Sentira Wellness Content Script (The "Grammarly" Way)

const assistantID = 'sentira-wellness-assistant';

function createAssistantIcon() {
  if (document.getElementById(assistantID)) return;

  const assistant = document.createElement('div');
  assistant.id = assistantID;
  assistant.className = 'sentira-floating-trigger';
  assistant.innerHTML = `
    <div class="sentira-logo-ring"></div>
    <img src="${chrome.runtime.getURL('icons/icon48.png')}" alt="Sentira" class="sentira-logo">
  `;

  document.body.appendChild(assistant);

  assistant.addEventListener('click', toggleWellnessPanel);
}

function toggleWellnessPanel() {
  let panel = document.getElementById('sentira-wellness-panel');
  if (panel) {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  } else {
    createWellnessPanel();
  }
}

function createWellnessPanel() {
  const panel = document.createElement('div');
  panel.id = 'sentira-wellness-panel';
  panel.className = 'sentira-wellness-card';
  panel.innerHTML = `
    <div class="sentira-panel-header">
      <h3>Sentira Wellness</h3>
      <button id="sentira-close-panel">×</button>
    </div>
    <div class="sentira-panel-body">
      <p>How are you feeling right now?</p>
      <div class="mood-selector">
        <button class="mood-btn" data-mood="happy">😊</button>
        <button class="mood-btn" data-mood="neutral">😐</button>
        <button class="mood-btn" data-mood="sad">😔</button>
      </div>
      <div id="sentira-status-msg"></div>
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
      statusMsg.textContent = 'Error logging mood. Please check login.';
    }
  });
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createAssistantIcon);
} else {
  createAssistantIcon();
}
