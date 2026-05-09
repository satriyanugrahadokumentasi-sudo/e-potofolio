$file = "d:\PPG 2025\Pemahaman Tentang perserta didik\portfolio\style.css"
$content = Get-Content $file -Raw

# Fix the corrupted pointer text
$content = $content -replace "poPlus Jakarta Sans", "pointer"

# Append dark mode
$darkModeCss = @"

/* ── DARK MODE ───────────────────────────────── */
[data-theme='dark'] {
  --purple: hsl(258, 80%, 75%);
  --purple-dark: hsl(258, 66%, 58%);
  --purple-light: hsl(258, 90%, 85%);
  --purple-soft: hsl(258, 30%, 18%);
  --purple-bg: hsl(224, 30%, 12%);
  --dark: hsl(0, 0%, 95%);
  --dark-accent: hsl(224, 30%, 25%);
  --text: hsl(0, 0%, 90%);
  --text-muted: hsl(224, 20%, 65%);
  --white: hsl(224, 40%, 8%);
  --border: hsl(224, 30%, 18%);
  --bg-alt: hsl(224, 40%, 10%);
  --glass-bg: rgba(15, 17, 26, 0.75);
  --glass-border: rgba(255, 255, 255, 0.1);
  --shadow-md: 0 8px 30px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 20px 50px rgba(0, 0, 0, 0.6);
}

.theme-toggle {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--text);
  font-size: 1.25rem;
  padding: 0.6rem;
  border-radius: 99px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  margin-left: 1rem;
}
.theme-toggle:hover {
  transform: scale(1.1);
  border-color: var(--purple);
}
"@

# Only append if not already there
if ($content -notmatch "DARK MODE") {
    $content = $content + $darkModeCss
}

Set-Content -Path $file -Value $content -Encoding UTF8
