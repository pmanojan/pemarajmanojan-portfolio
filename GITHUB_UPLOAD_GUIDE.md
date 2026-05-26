# 🚀 Step-by-Step: Upload to GitHub & Deploy

---

## STEP 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name:** `portfolio`
3. **Description:** `🔐 Modern, interactive portfolio website — Cybersecurity-themed with 50+ features. Pure HTML/CSS/JS.`
4. Set to **Public**
5. ❌ Do NOT initialize with README (we already have one)
6. Click **"Create repository"**

---

## STEP 2: Upload Files via GitHub Web (Easiest Method)

### Option A: Drag & Drop (No Git Required)

1. On your new repository page, click **"uploading an existing file"**
2. Drag all these files into the upload area:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
   - `LICENSE`
   - `.gitignore`
3. Write commit message: `🚀 Initial release — Portfolio v3.0`
4. Click **"Commit changes"**

### Option B: Using Git Command Line

```bash
# Navigate to your project folder
cd /path/to/your/portfolio

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "🚀 Initial release — Portfolio v3.0"

# Set branch to main
git branch -M main

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/pemarajmanojan/portfolio.git

# Push
git push -u origin main
```

---

## STEP 3: Enable GitHub Pages (Free Hosting!)

1. Go to your repository → **Settings**
2. Scroll down to **"Pages"** (left sidebar)
3. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **"Save"**
5. Wait 2-3 minutes — your site will be live at:
   ```
   https://pemarajmanojan.github.io/portfolio/
   ```

### Custom Domain (Optional):
If you own `pemarajmanojan.dev`:
1. In GitHub Pages settings, enter your custom domain
2. Add a `CNAME` file to your repo containing: `pemarajmanojan.dev`
3. Update your domain's DNS:
   - Type: CNAME
   - Name: www
   - Value: `pemarajmanojan.github.io`

---

## STEP 4: Configure Repository Settings

1. **Add Topics:** Click the ⚙️ gear next to "About" on your repo page
   - Add: `portfolio`, `cybersecurity`, `ccna`, `network-engineer`, `html-css-javascript`, `dark-mode`, `interactive`, `responsive`, `open-source`
2. **Add Website URL:** `https://pemarajmanojan.dev` (or your GitHub Pages URL)
3. **Pin the Repository:** Go to your GitHub profile → click "Customize your pins" → select `portfolio`

---

## STEP 5: Post on LinkedIn

1. Copy one of the three post options from `LINKEDIN_POST.md`
2. Take a screenshot of your portfolio (or screen record a GIF)
3. Go to LinkedIn → "Start a post"
4. Paste the text
5. Attach your screenshot/video
6. Post! 🎉

---

## ✅ Checklist

- [ ] Repository created on GitHub
- [ ] All files uploaded (index.html, style.css, script.js, README.md, LICENSE, .gitignore)
- [ ] GitHub Pages enabled
- [ ] Repository topics added
- [ ] Repository pinned on profile
- [ ] LinkedIn post published
- [ ] LinkedIn headline updated
- [ ] LinkedIn Featured section updated
- [ ] Portfolio URL shared in LinkedIn About section
