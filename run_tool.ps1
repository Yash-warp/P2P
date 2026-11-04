param (
    [Parameter(Position = 0)]
    [string]$Command,
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$Arguments
)

$nodeDir = "C:\Program Files\nodejs"
$machinePath = [System.Environment]::GetEnvironmentVariable("Path","Machine")
$userPath = [System.Environment]::GetEnvironmentVariable("Path","User")
$env:Path = "$nodeDir;$machinePath;$userPath"

if ($Command -eq "npm") {
    & "$nodeDir\npm.cmd" @Arguments
} elseif ($Command -eq "npx") {
    & "$nodeDir\npx.cmd" @Arguments
} elseif ($Command -eq "node") {
    & "$nodeDir\node.exe" @Arguments
} else {
    & $Command @Arguments
}
