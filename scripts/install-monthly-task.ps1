# Installe la tache planifiee Windows pour le refresh mensuel Vellio.
# A executer UNE SEULE FOIS, apres avoir fait le setup de connexion Amazon
# (node scripts/monthly-refresh.mjs --setup).

$scriptPath = "C:\Users\kenam\Application-Projet-K\vellio-shop\scripts\monthly-refresh.mjs"
$nodePath = (Get-Command node).Source
$action = New-ScheduledTaskAction -Execute $nodePath -Argument "`"$scriptPath`"" -WorkingDirectory "C:\Users\kenam\Application-Projet-K\vellio-shop"
$trigger = New-ScheduledTaskTrigger -Daily -At 3am
$trigger.DaysInterval = 30

Register-ScheduledTask -TaskName "VellioMonthlyRefresh" -Action $action -Trigger $trigger -Description "Refresh mensuel automatique du catalogue Vellio (best-sellers Amazon)" -Force

Write-Host "Tache 'VellioMonthlyRefresh' installee — s'execute tous les 30 jours a 3h du matin."
Write-Host "Pour tester immediatement : Start-ScheduledTask -TaskName VellioMonthlyRefresh"
