$ErrorActionPreference = "Stop"
$root = "public\preview"

Get-ChildItem $root -Recurse -File -Include *.html,*.htm | ForEach-Object {
  $bytes = [System.IO.File]::ReadAllBytes($_.FullName)

  $found = $false
  for ($i = 0; $i -le $bytes.Length - 3; $i++) {
    if ($bytes[$i] -eq 0xEF -and $bytes[$i+1] -eq 0xBF -and $bytes[$i+2] -eq 0xBD) {
      $found = $true
      break
    }
  }

  if ($found) {
    [pscustomobject]@{
      File = $_.FullName
      ReplacementCharCount = ([regex]::Matches([System.Text.Encoding]::UTF8.GetString($bytes), [char]0xFFFD)).Count
    }
  }
} | Sort-Object ReplacementCharCount -Descending | Format-Table -AutoSize
