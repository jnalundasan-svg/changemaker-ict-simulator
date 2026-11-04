# Initialize git repository (if not already initialized)
git init

# Stage all files
git add .

# Commit the files
git commit -m "Initial commit: ChangeMaker ICT for Social Impact Simulator"

# Rename branch to main
git branch -M main

# Add your GitHub repo as the remote origin (replace with your repo URL)
git remote add origin https://github.com/<your-username>/changemaker-ict-simulator.git

# Push to GitHub
git push -u origin main