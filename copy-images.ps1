# copy-images.ps1
# Run this script ONCE from within the posm-website folder to copy
# the AI-generated placeholder images from the Antigravity brain into
# the assets/images directory.
#
# Usage (from posm-website directory):
#   powershell -ExecutionPolicy Bypass -File copy-images.ps1
#
# After running, replace placeholder images with your real lab photos.

$brain = "C:\Users\mahdi\.gemini\antigravity\brain\ceffffe1-d416-4e30-9374-a792857213ca"
$dest  = "$PSScriptRoot\assets\images"

$files = @{
    "hero_bg.png"            = "hero_bg_*.png"
    "optics_section.png"     = "optics_section_*.png"
    "rf_electronics.png"     = "rf_electronics_*.png"
    "vacuum_chamber.png"     = "vacuum_chamber_*.png"
    "laser_optics.png"       = "laser_optics_*.png"
    "photonics_abstract.png" = "photonics_abstract_*.png"
}

foreach ($destName in $files.Keys) {
    $pattern = $files[$destName]
    $src = Get-ChildItem -Path $brain -Filter $pattern -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($src) {
        Copy-Item $src.FullName -Destination "$dest\$destName" -Force
        Write-Host "Copied: $destName" -ForegroundColor Green
    } else {
        Write-Host "Not found: $pattern (skipping)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Done. Open index.html in a browser to preview the site." -ForegroundColor Cyan
Write-Host "Replace images in assets/images/ with your real lab photos when ready." -ForegroundColor Cyan
