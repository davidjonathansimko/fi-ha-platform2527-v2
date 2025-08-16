# Vercel Environment Variables Setup Guide

## Step-by-Step Instructions

### Step 1: Go to Vercel Dashboard
1. Open your web browser
2. Go to: **https://vercel.com/dashboard**
3. Log in if you're not already logged in

### Step 2: Find Your Project
1. Look for your project named: **fi-ha-platform2527**
2. Click on the project name to open it

### Step 3: Access Settings
1. Once inside your project, look for tabs at the top
2. Click on the **"Settings"** tab (it's usually next to "Deployments", "Functions", etc.)

### Step 4: Navigate to Environment Variables
1. In the left sidebar of Settings, you'll see several options
2. Click on **"Environment Variables"** 
   - It looks like a list item with a small icon

### Step 5: Add First Environment Variable
1. Click the **"Add New"** or **"+"** button
2. Fill in the form:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: `https://clyjncheuhqpiiwlnovj.supabase.co`
   - **Environments**: Check ALL boxes (Production, Preview, Development)
3. Click **"Save"** or **"Add"**

### Step 6: Add Second Environment Variable
1. Click **"Add New"** or **"+"** button again
2. Fill in the form:
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNseWpuY2hldWhxcGlpd2xub3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTQ1MjgsImV4cCI6MjA2NzQ5MDUyOH0.lnEYgKn_shPMRDTRal2pHb6zkx-g7Bu7r2WrWoupfDE`
   - **Environments**: Check ALL boxes (Production, Preview, Development)
3. Click **"Save"** or **"Add"**

### Step 7: Verify Variables Added
After adding both variables, you should see them listed like:
```
NEXT_PUBLIC_SUPABASE_URL = https://clyjncheuhqpiiwlnovj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI... (truncated for security)
```

### Step 8: Trigger Redeploy
1. Go back to the main project page (click project name or "Overview" tab)
2. You should see a list of deployments
3. Click on the latest deployment, then click **"Redeploy"**
   OR
4. Just wait a few minutes - Vercel might automatically redeploy after adding environment variables

## Alternative: If you can't find the settings

1. From your project dashboard, look for a **gear icon** ⚙️ - this is usually the Settings
2. Or look for three dots menu (...) and select "Settings"
3. The URL should look like: `https://vercel.com/[your-username]/fi-ha-platform2527/settings`

## What to Look For After Setup
Once the environment variables are added and deployed:
- Your site will show the authentication page
- Default language will be German
- You'll see login/signup forms
- Language switcher will work (DE/EN/TR/FR)

## Troubleshooting
- If you don't see "Environment Variables" in settings, scroll down in the left sidebar
- Make sure to check ALL environment checkboxes (Production, Preview, Development)
- Wait 2-3 minutes after adding variables for the redeploy to complete
