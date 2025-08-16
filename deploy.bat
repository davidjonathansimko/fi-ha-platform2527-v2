@echo off
echo Setting up Vercel environment variables...
echo.
echo Please go to your Vercel dashboard at: https://vercel.com/dashboard
echo Find your project and go to Settings > Environment Variables
echo.
echo Add these environment variables:
echo.
echo Variable 1:
echo Name: NEXT_PUBLIC_SUPABASE_URL
echo Value: https://clyjncheuhqpiiwlnovj.supabase.co
echo Environment: Production, Preview, Development (check all)
echo.
echo Variable 2:
echo Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
echo Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNseWpuY2hldWhxcGlpd2xub3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTQ1MjgsImV4cCI6MjA2NzQ5MDUyOH0.lnEYgKn_shPMRDTRal2pHb6zkx-g7Bu7r2WrWoupfDE
echo Environment: Production, Preview, Development (check all)
echo.
echo After adding the variables, press any key to redeploy...
pause
echo.
echo Redeploying to Vercel...
vercel --prod --force
echo.
echo Deployment complete!
