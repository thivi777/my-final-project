// Sentira Wellness Background Service Worker
const API_URL = 'http://localhost:5000/api';

// Initial state and Alarms
chrome.runtime.onInstalled.addListener(() => {
  console.log('Sentira Extension Installed');
  initializeAlarms();
});

// Also initialize on startup and top-level to ensure alarms exist after reload
chrome.runtime.onStartup.addListener(() => {
  initializeAlarms();
});

initializeAlarms();

function initializeAlarms() {
  // Set up periodic 20-min break alarm
  chrome.alarms.create('wellness-break', { periodInMinutes: 20 });
  
  // Set up specific daily checks (Lunch and Evening)
  setupDailyAlarms();
}

function setupDailyAlarms() {
  // Lunch Check (12:30 PM)
  const lunchTime = getNextOccurrence(12, 30);
  chrome.alarms.create('wellness-lunch', { when: lunchTime, periodInMinutes: 1440 });

  // Evening Check (5:00 PM)
  const eveningTime = getNextOccurrence(17, 0);
  chrome.alarms.create('wellness-evening', { when: eveningTime, periodInMinutes: 1440 });
}

function getNextOccurrence(hour, minute) {
  const now = new Date();
  const next = new Date();
  next.setHours(hour, minute, 0, 0);
  if (next < now) next.setDate(next.getDate() + 1);
  return next.getTime();
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const { userData } = await chrome.storage.local.get(['userData']);
  const name = userData?.name || '';
  const work = userData?.work || '';
  const goal = userData?.goal || '';
  const anchor = userData?.anchor || '';

  let message = '';
  switch (alarm.name) {
    case 'wellness-break':
      if (work === 'Creative' || work === 'Creative / Freelance') {
        message = `Hey ${name}, in the creative flow? Don't forget to blink and take a 2-min break! ${anchor}`;
      } else if (work === 'Student' || work === 'Student / Academic') {
        message = `Studying hard, ${name}? Your brain needs a reset. Take a short walk. ${anchor}`;
      } else {
        message = `${name}, how's work? Time for a quick stretch and some water. ${anchor}`;
      }
      break;
    case 'wellness-lunch':
      message = `It's lunch time, ${name}! Fuel your body so you can keep crushing your goal of ${goal.toLowerCase()}.`;
      break;
    case 'wellness-evening':
      message = `Evening is here, ${name}. Time to wrap up and head home. Remember your intention: ${anchor}`;
      break;
  }

  if (message) {
    // Notify all tabs
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'showPrompt', message });
      }
    });
  }
});

async function syncUserData() {
  try {
    const { token } = await chrome.storage.local.get(['token']);
    if (!token) return;

    const response = await fetch(`${API_URL}/responses`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      const { data } = await response.json();
      const onboarding = data.find(r => r.type === 'onboarding');
      if (onboarding) {
        const answers = onboarding.answers;
        const userData = {
          name: answers.find(a => a.question === 'name')?.answer || '',
          work: answers.find(a => a.question === 'work')?.answer || '',
          goal: answers.find(a => a.question === 'top_priority')?.answer || '',
          anchor: answers.find(a => a.question === 'personal_anchor')?.answer || ''
        };
        await chrome.storage.local.set({ userData });
        console.log('User data synced:', userData);
      }
    }
  } catch (error) {
    console.error('Error syncing user data:', error);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'logMood') {
    handleLogMood(request.mood, sendResponse);
    return true;
  }

  if (request.action === 'syncToken') {
    handleSyncToken(request.token);
    return true;
  }

  if (request.action === 'testPrompt' || request.action === 'syncData') {
    syncUserData();
    if (request.action === 'testPrompt') {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        if (tabs[0]) {
          const { userData } = await chrome.storage.local.get(['userData']);
          const name = userData?.name || 'there';
          chrome.tabs.sendMessage(tabs[0].id, { 
            action: 'showPrompt', 
            message: `Hi ${name}! This is a test. Your personalized prompts are working! ✨` 
          });
        }
      });
    }
    return true;
  }
});

async function handleSyncToken(token) {
  const current = await chrome.storage.local.get(['token']);
  if (current.token !== token) {
    console.log('Automated Sync: Updating API token...');
    await chrome.storage.local.set({ token });
    await syncUserData(); // This will fetch user names, goals etc
  }
}

async function handleLogMood(mood, sendResponse) {
  try {
    const { token } = await chrome.storage.local.get(['token']);

    if (!token) {
      sendResponse({ success: false, message: 'Not logged in' });
      return;
    }

    // Map mood string to score and emoji expected by backend
    const moodMap = {
      happy: { score: 9, emoji: '😊' },
      neutral: { score: 6, emoji: '😐' },
      sad: { score: 3, emoji: '😔' }
    };
    const mapping = moodMap[mood] || moodMap.neutral;

    const response = await fetch(`${API_URL}/mood-logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        moodScore: mapping.score, 
        moodEmoji: mapping.emoji, 
        note: 'Logged via extension' 
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      sendResponse({ success: false, message: errorData.message || 'Server error' });
      return;
    }

    const data = await response.json();
    sendResponse({ success: true, data });
  } catch (error) {
    sendResponse({ success: false, message: 'Connection error: ' + error.message });
  }
}
