$idxFile = "d:\PPG 2025\Pemahaman Tentang perserta didik\portfolio\index.html"
$rppFile = "d:\PPG 2025\Pemahaman Tentang perserta didik\portfolio\perangkat-ajar.html"
$jsFile = "d:\PPG 2025\Pemahaman Tentang perserta didik\portfolio\script.js"

# 1. Update index.html
$idxHtml = Get-Content $idxFile -Raw
if ($idxHtml -notmatch "theme-toggle") {
    $idxHtml = $idxHtml -replace '<li><a href="#kontak" class="btn-hubungi">Hubungi Saya</a></li>', '<li><a href="#kontak" class="btn-hubungi">Hubungi Saya</a></li>`n        <li><button id="theme-toggle" class="theme-toggle" aria-label="Toggle Dark Mode" title="Ganti Mode">🌙</button></li>'
    Set-Content -Path $idxFile -Value $idxHtml -Encoding UTF8
}

# 2. Update perangkat-ajar.html
$rppHtml = Get-Content $rppFile -Raw
if ($rppHtml -notmatch "theme-toggle") {
    $rppHtml = $rppHtml -replace '<li><a href="index.html#kontak" class="btn-hubungi">Hubungi Saya</a></li>', '<li><a href="index.html#kontak" class="btn-hubungi">Hubungi Saya</a></li>`n        <li><button id="theme-toggle" class="theme-toggle" aria-label="Toggle Dark Mode" title="Ganti Mode">🌙</button></li>'
    Set-Content -Path $rppFile -Value $rppHtml -Encoding UTF8
}

# 3. Update script.js
$jsContent = Get-Content $jsFile -Raw
$darkModeJs = @"

// ── DARK MODE TOGGLE ────────────────────────────
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Apply immediately to prevent flash if possible
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (themeToggleBtn) {
    themeToggleBtn.innerText = currentTheme === 'dark' ? '☀️' : '🌙';
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggleBtn.innerText = newTheme === 'dark' ? '☀️' : '🌙';
  });
}
"@

if ($jsContent -notmatch "DARK MODE TOGGLE") {
    $jsContent = $jsContent + $darkModeJs
    Set-Content -Path $jsFile -Value $jsContent -Encoding UTF8
}
