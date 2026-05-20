@echo off
echo ========================================
echo    DEPLOIEMENT EGCOM-PROJETS EN COURS
echo ========================================
echo.
cd /d "%~dp0"
echo Envoi des fichiers vers egcomprojets-btp.com...
netlify deploy --prod --dir=.
echo.
echo ========================================
echo    DEPLOIEMENT TERMINE !
echo    Site : https://egcomprojets-btp.com
echo ========================================
pause
