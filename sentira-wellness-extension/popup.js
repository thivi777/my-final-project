// Sentira Wellness Popup Logic
document.addEventListener('DOMContentLoaded', async () => {
  const authSection = document.getElementById('auth-section');
  const mainSection = document.getElementById('main-section');
  const tokenInput = document.getElementById('api-token');
  const saveBtn = document.getElementById('save-token');
  const openDashboardBtn = document.getElementById('open-dashboard');
  const saveStatus = document.getElementById('save-status');

  // Check if token exists
  chrome.storage.local.get(['token'], (data) => {
    if (data.token) {
      authSection.style.display = 'none';
      mainSection.style.display = 'block';
      document.getElementById('api-token').value = data.token;
    }
  });

  const testBtn = document.getElementById('test-prompt');

  testBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'testPrompt' });
    const status = document.getElementById('save-status');
    status.textContent = 'Prompt sent to page! ✨';
    setTimeout(() => status.textContent = '', 2000);
  });

  const logoutBtn = document.getElementById('logout-btn');

  logoutBtn.addEventListener('click', async () => {
    await chrome.storage.local.remove(['token', 'userData']);
    authSection.style.display = 'block';
    mainSection.style.display = 'none';
    tokenInput.value = '';
    saveStatus.textContent = 'Disconnected. Please enter new token.';
  });

  const demoLink = document.getElementById('demo-mode-link');

  demoLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const mockData = {
      name: 'Alex',
      work: 'Student / Academic',
      goal: 'Less stress',
      anchor: 'Keep breathing'
    };
    await chrome.storage.local.set({ 
      token: 'demo-token-123',
      userData: mockData 
    });
    authSection.style.display = 'none';
    mainSection.style.display = 'block';
    saveStatus.textContent = 'Demo Mode Active! ✨';
  });

  saveBtn.addEventListener('click', async () => {
    const rawToken = tokenInput.value.trim();
    if (rawToken) {
      await chrome.storage.local.set({ token: rawToken });
      chrome.runtime.sendMessage({ action: 'syncData' });
      saveStatus.textContent = 'Successfully connected!';
      authSection.style.display = 'none';
      mainSection.style.display = 'block';
    }
  });

  openDashboardBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000/dashboard' });
  });
});
