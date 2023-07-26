function Get-LastContainerImageVersion {
    param (
        [string]$RegistryUrl,
        [string]$Repository,
        [string]$ContainerName,
        [string]$Username,
        [string]$Password
    )

    $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $Username,$Password)))
    $headers = @{ Authorization = "Basic $base64AuthInfo" }

    $url = "$RegistryUrl/v2/$Repository/$ContainerName/tags/list"
    $response = Invoke-RestMethod -Method Get -Uri $url -Headers $headers

    $tags = $response.tags
    $last_tag = $tags | Sort-Object -Descending | Select-Object -First 1

    if (!$last_tag -or $last_tag -eq "latest") {
        return "0.0.0"
    }

    return $last_tag
}

Function ReadVersionInput
{
    param (
        [string]$DefaultVersion
    )

    do {
        $ImageVersion = Read-Host "New image version [$DefaultVersion]"
        if ($ImageVersion -eq '') {
            $ImageVersion = $DefaultVersion
        }
    } until ($ImageVersion -match '^\d+\.\d+\.\d+$')

    return $ImageVersion
}

function Increment-VersionString {
    param (
        [string]$VersionString
    )

    $versionNumbers = $VersionString.Split('.')
    $lastNumber = [int]$versionNumbers[-1]
    $versionNumbers[-1] = ($lastNumber + 1).ToString()

    return $versionNumbers -join '.'
}

Function DisplayHelperBanner
{
    Write-Host -ForegroundColor Blue "

    ██████╗  █████╗ ███╗   ██╗██████╗ ██╗████████╗
    ██╔══██╗██╔══██╗████╗  ██║██╔══██╗██║╚══██╔══╝
    ██████╔╝███████║██╔██╗ ██║██║  ██║██║   ██║   
    ██╔══██╗██╔══██║██║╚██╗██║██║  ██║██║   ██║   
    ██████╔╝██║  ██║██║ ╚████║██████╔╝██║   ██║   
    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝   ╚═╝   

Banking Analytics Network for Data Insight and Telemetry
"
    
    Write-Host "Docker Manager for Bandit ACS Portal `r`n"
}

DisplayHelperBanner

Write-Host "Fetching bandit-acs-portal last version..."

$LastVersion = Get-LastContainerImageVersion -RegistryUrl "https://registry.tristesse.lol" -Repository "p/masi-integratedproject/containers" -ContainerName "bandit-acs-portal" -Username "bc3130e9-9cdd-43ce-9601-08280cf46780" -Password "eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJiYzMxMzBlOS05Y2RkLTQzY2UtOTYwMS0wODI4MGNmNDY3ODAiLCJhdWQiOiJiYzMxMzBlOS05Y2RkLTQzY2UtOTYwMS0wODI4MGNmNDY3ODAiLCJvcmdEb21haW4iOiJzcGFjZSIsIm5hbWUiOiJTaGVsbCIsImlzcyI6Imh0dHBzOlwvXC9zcGFjZS50cmlzdGVzc2UubG9sIiwicGVybV90b2tlbiI6IjJOUEFubzN5Zm12dSIsInByaW5jaXBhbF90eXBlIjoiU0VSVklDRSIsImlhdCI6MTY3OTA2ODkwNH0.DE697Hniv9-9KUjqu7s4Maj2uOL_usB_07iAwIJMJGw7EJu3R6owVsuIITkS0CfIYj5dCZjMO8TIEeKaMYj4J_B3Ykvfq-WADi6uiD97o8zhWq8O5xL8M4IWNjTSqCxs1mFCGVtqp3v6EYdqPC5kwl2fQd9lt89sGEUss9Rmm4DYe58qDMgt7m3EDbMfltOoHtXim-HSITTjlEk6pWFa5wxt4dTGl7-H_ty2VjpnRq6yZI0sd9CgVc89XQOZPmIeU5eChheWEhRW5w4yX9n9qpnoDg4txxWFRQSU9FghREGG6GmXz_Vg79bQmxFUy3QhUDP1pB9PoB1U1DNB9epb1RA3jNgDdB6-yxPigLo2lyPXMfB-ssbeXd-vEgDNIvDf4l84QnteQyipmDRxCBeokJjXHRR1KCb-z1xk84q2JevsHyCcXD-3SValx7LEMsDDvklYg-Lt5OwpnTjX-sJ3iYxj5zglWcln79F9YhZg1TdBhHajrwvGcJTmwgq_8urGQBzzpCDQgDxdshLsxLbuR-ujbglM74sUo70WO8rkpGRXd59E5gNxnUl18A5Jnhd3peoIrS6BoT95y75EclhTT2fy-btfeZ0Jh7fDmlI3wgDIyd5b4macqgveyCLmEdFhzXUM3RofBgqedccJPW4dpSwLqAt3PvRrE85A_lrQMiU"

Start-Sleep -Seconds 1.5

cls 

DisplayHelperBanner

Write-Host "Last bandit-acs-portal version : [$LastVersion]`r`n"

$DefaultVersion = Increment-VersionString -VersionString $LastVersion

$ImageVersion = ReadVersionInput -DefaultVersion $DefaultVersion

Write-Host "`r`n"

$DockerfilePath = Get-ChildItem -Recurse -Filter Dockerfile | Select-Object -First 1 -Property FullName

if (!$DockerfilePath) {
    Write-Error "No Dockerfile found"
}

cmd.exe /c docker build . -t registry.tristesse.lol/p/masi-integratedproject/containers/bandit-acs-portal:$ImageVersion -f $DockerfilePath.FullName

cmd.exe /c docker login registry.tristesse.lol -u="bc3130e9-9cdd-43ce-9601-08280cf46780" -p="eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJiYzMxMzBlOS05Y2RkLTQzY2UtOTYwMS0wODI4MGNmNDY3ODAiLCJhdWQiOiJiYzMxMzBlOS05Y2RkLTQzY2UtOTYwMS0wODI4MGNmNDY3ODAiLCJvcmdEb21haW4iOiJzcGFjZSIsIm5hbWUiOiJTaGVsbCIsImlzcyI6Imh0dHBzOlwvXC9zcGFjZS50cmlzdGVzc2UubG9sIiwicGVybV90b2tlbiI6IjJOUEFubzN5Zm12dSIsInByaW5jaXBhbF90eXBlIjoiU0VSVklDRSIsImlhdCI6MTY3OTA2ODkwNH0.DE697Hniv9-9KUjqu7s4Maj2uOL_usB_07iAwIJMJGw7EJu3R6owVsuIITkS0CfIYj5dCZjMO8TIEeKaMYj4J_B3Ykvfq-WADi6uiD97o8zhWq8O5xL8M4IWNjTSqCxs1mFCGVtqp3v6EYdqPC5kwl2fQd9lt89sGEUss9Rmm4DYe58qDMgt7m3EDbMfltOoHtXim-HSITTjlEk6pWFa5wxt4dTGl7-H_ty2VjpnRq6yZI0sd9CgVc89XQOZPmIeU5eChheWEhRW5w4yX9n9qpnoDg4txxWFRQSU9FghREGG6GmXz_Vg79bQmxFUy3QhUDP1pB9PoB1U1DNB9epb1RA3jNgDdB6-yxPigLo2lyPXMfB-ssbeXd-vEgDNIvDf4l84QnteQyipmDRxCBeokJjXHRR1KCb-z1xk84q2JevsHyCcXD-3SValx7LEMsDDvklYg-Lt5OwpnTjX-sJ3iYxj5zglWcln79F9YhZg1TdBhHajrwvGcJTmwgq_8urGQBzzpCDQgDxdshLsxLbuR-ujbglM74sUo70WO8rkpGRXd59E5gNxnUl18A5Jnhd3peoIrS6BoT95y75EclhTT2fy-btfeZ0Jh7fDmlI3wgDIyd5b4macqgveyCLmEdFhzXUM3RofBgqedccJPW4dpSwLqAt3PvRrE85A_lrQMiU"

cmd.exe /c docker push registry.tristesse.lol/p/masi-integratedproject/containers/bandit-acs-portal:$ImageVersion

Write-Host -ForegroundColor Green "Image successfully published at registry.tristesse.lol/p/masi-integratedproject/containers/bandit-acs-portal:$ImageVersion`r`n"
Write-Host -NoNewLine 'Press any key to continue...';

$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');
