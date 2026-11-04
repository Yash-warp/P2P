$nodeDir = "C:\Program Files\nodejs"
$env:Path = "$nodeDir;" + [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$cmd = $args[0]
if ($args.Length -gt 1) {
    $rest = $args[1..($args.Length - 1)]
} else {
    $rest = @()
}

if ($cmd -eq "npm") {
    & "$nodeDir\npm.cmd" $rest
} elseif ($cmd -eq "npx") {
    & "$nodeDir\npx.cmd" $rest
} elseif ($cmd -eq "node") {
    & "$nodeDir\node.exe" $rest
} else {
    & $cmd $rest
}

