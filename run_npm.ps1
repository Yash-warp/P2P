$nodeDir = "C:\Program Files\nodejs"
$env:Path = "$nodeDir;" + [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
$argsList = $args -join " "
Write-Host "Running: npm $argsList"
& "$nodeDir\npm.cmd" $args

