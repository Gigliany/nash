@echo off
echo =========================================
echo    NASH WEBSITE — DEPLOY PARA GITHUB
echo =========================================
echo.

:: Navegue para a pasta do site
cd /d "%~dp0"

:: Inicia o repositório git (se ainda não existe)
if not exist ".git" (
    git init -b main
    git remote add origin https://github.com/Gigliany/nash.git
    echo Repositorio iniciado!
) else (
    echo Repositorio git ja existe.
)

:: Configura usuario
git config user.name "Gigliany"
git config user.email "nashweb.contato@gmail.com"

:: Adiciona todos os arquivos e faz commit
git add .
git commit -m "deploy: atualizacao do site Nash"

:: Faz push para GitHub
echo.
echo Enviando para GitHub...
echo (Se pedir usuario/senha, use seu token do GitHub como senha)
echo.
git push -u origin main

echo.
echo =========================================
echo FEITO! Acesse: https://gigliany.github.io/nash/
echo.
echo Para ativar o GitHub Pages:
echo   1. Acesse github.com/Gigliany/nash
echo   2. Clique em Settings > Pages
echo   3. Selecione "Deploy from branch: main"
echo   4. Clique em Save
echo =========================================
pause
