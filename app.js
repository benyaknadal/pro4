let deferredPrompt;

// تسجيل Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('✅ Service Worker مسجّل بنجاح.'))
      .catch(err => console.error('❌ خطأ في تسجيل Service Worker:', err));
  });
}

// اكتشاف إمكانية التثبيت
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installPromo').style.display = 'block';
});

// عند النقر على زر التثبيت
document.getElementById('installBtn')?.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('👍 تم تثبيت التطبيق!');
        document.getElementById('installPromo').style.display = 'none';
      }
      deferredPrompt = null;
    });
  }
});

// إذا تم التثبيت مسبقًا
window.addEventListener('appinstalled', () => {
  console.log('📱 التطبيق مثبت الآن!');
  document.getElementById('installPromo').style.display = 'none';
});
