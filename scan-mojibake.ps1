$ErrorActionPreference = "Stop"

$root = "public\preview"
$patterns = @("Â","â€”","â€™","â€œ","â€","â€¢","Ã")

$out = foreach ($pat in $patterns) {
  Get-ChildItem $root -Recurse -File -Include *.html,*.htm | ForEach-Object {
    $m = Select-String -Path $_.FullName -Pattern $pat -AllMatches -Encoding UTF8 -ErrorAction SilentlyContinue
    if ($m) {
      [pscustomobject]@{
        Pattern = $pat
        File    = $_.FullName
        Hits    = ($m.Matches | Measure-Object).Count
        Sample  = $m[0].Line.Trim()
      }
    }
  }
}

$out | Sort-Object Hits -Descending | Format-Table -AutoSize
