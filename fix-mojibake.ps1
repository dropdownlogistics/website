$root = "public\preview"
$utf8 = [System.Text.Encoding]::UTF8
$cp1252 = [System.Text.Encoding]::GetEncoding(1252)

Get-ChildItem $root -Recurse -File -Include *.html,*.htm | ForEach-Object {
  $p = $_.FullName

  # Read as UTF8 text (this is what you were doing)
  $t = Get-Content -Path $p -Raw -Encoding UTF8

  # If it contains common mojibake marker, fix by re-decoding
  if ($t -match "?|?|?|?") {
    $fixed = $utf8.GetString($cp1252.GetBytes($t))

    if ($fixed -ne $t) {
      # write as UTF8 no BOM
      [System.IO.File]::WriteAllText($p, $fixed, (New-Object System.Text.UTF8Encoding($false)))
    }
  }
}

"COMPLETE"
