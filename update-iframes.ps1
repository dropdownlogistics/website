# update-iframes.ps1
# Batch-updates simple iframe wrapper pages to use PreviewFrame component
# Run from repo root: .\update-iframes.ps1

$files = Get-ChildItem -Recurse -Path .\app -Filter "page.tsx" |
  Select-String -Pattern '<iframe' |
  Select-Object -ExpandProperty Path -Unique

$updated = 0
$skipped = 0

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    $lines = ($content -split "`n").Count

    # Skip complex files (more than 15 lines = not a simple wrapper)
    if ($lines -gt 15) {
        Write-Host "SKIP (complex, $lines lines): $file" -ForegroundColor Yellow
        $skipped++
        continue
    }

    # Extract iframe src
    if ($content -match 'src="([^"]+)"') {
        $src = $matches[1]
    } else {
        Write-Host "SKIP (no src): $file" -ForegroundColor Yellow
        $skipped++
        continue
    }

    # Extract iframe title
    if ($content -match 'title="([^"]+)"') {
        $title = $matches[1]
    } else {
        Write-Host "SKIP (no title): $file" -ForegroundColor Yellow
        $skipped++
        continue
    }

    # Extract metadata line if present
    $metaLine = ""
    if ($content -match "(export const metadata = \{[^}]+\};)") {
        $metaLine = $matches[1]
    }

    # Build new content
    if ($metaLine) {
        $newContent = "import PreviewFrame from '@/components/PreviewFrame';`n`n$metaLine`nexport default function Page() {`n  return <PreviewFrame src=`"$src`" title=`"$title`" />;`n}`n"
    } else {
        $newContent = "import PreviewFrame from '@/components/PreviewFrame';`n`nexport default function Page() {`n  return <PreviewFrame src=`"$src`" title=`"$title`" />;`n}`n"
    }

    Set-Content -Path $file -Value $newContent -Encoding UTF8 -NoNewline
    Write-Host "UPDATED: $file" -ForegroundColor Green
    $updated++
}

Write-Host "`n--- DONE ---" -ForegroundColor Cyan
Write-Host "Updated: $updated" -ForegroundColor Green
Write-Host "Skipped: $skipped" -ForegroundColor Yellow
Write-Host "`nNext: npm run build"
