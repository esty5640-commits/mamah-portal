@echo off
chcp 65001 > nul
echo ======================================================
echo מעלה את גרסת ה-Next.js הנקייה והמהירה ל-GitHub...
echo ======================================================
git branch -M main
git push -f origin main
echo.
if %errorlevel% neq 0 (
    echo [שגיאה] לא ניתן היה לדחוף. ודאי שיש לך הרשאות לחשבון.
) else (
    echo [הצלחה מושלמת!] האתר המעודכן עלה ל-GitHub! Vercel יבנה אותו כעת תוך 15 שניות.
)
echo.
pause
