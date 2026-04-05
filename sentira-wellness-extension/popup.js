// Sentira Wellness Popup Logic
document.addEventListener('DOMContentLoaded', async () => {
  const authSection = document.getElementById('auth-section');
  const mainSection = document.getElementById('main-section');
  const tokenInput = document.getElementById('api-token');
  const saveBtn = document.getElementById('save-token');
  const openDashboardBtn = document.getElementById('open-dashboard');

  // Check if token exists
  const { token } = await chrome.storage.local.get(['token']);
  if (token) {
    authSection.style.display = 'none';
    mainSection.style.display = 'block';
  }

  saveBtn.addEventListener('click', async () => {
    const rawToken = tokenInput.value.trim();
    if (rawToken) {
      await chrome.storage.local.set({ token: rawToken });
      authSection.style.display = 'none';
      mainSection.style.display = 'block';
    }
  });

  openDashboardBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000/dashboard' });
  });
});
