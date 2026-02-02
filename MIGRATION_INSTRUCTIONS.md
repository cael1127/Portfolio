# Migration Instructions: Moving Project Out of OneDrive

This guide will help you move your Portfolio project from OneDrive to a local directory to prevent sync issues during npm operations.

## Why Move Out of OneDrive?

- OneDrive tries to sync `node_modules` (thousands of files) every time you run `npm install`
- This causes slow npm operations and can cause file locking issues
- Development tools work better in non-synced directories

## Prerequisites

- Close any running dev servers (`Ctrl+C` in terminal)
- Close your IDE/editor (VS Code, Cursor, etc.)
- Ensure you have enough disk space in the destination location

## Step-by-Step Instructions

### Step 1: Choose New Location

Choose a location outside of OneDrive. Recommended locations:
- `C:\Projects\Portfolio`
- `C:\Dev\Portfolio`
- `C:\Users\caelf\Documents\Projects\Portfolio`

**Important**: Do NOT use any folder inside `C:\Users\caelf\OneDrive\`

### Step 2: Copy the Project

1. Open File Explorer
2. Navigate to: `C:\Users\caelf\OneDrive\Desktop\Portfolio\`
3. Right-click on the `Portfolio` folder
4. Select **Copy**
5. Navigate to your chosen new location (e.g., `C:\Projects\`)
6. Right-click in the folder and select **Paste**
7. Wait for the copy to complete (this may take a few minutes)

### Step 3: Verify the Copy

1. Open the new location in File Explorer
2. Verify these important files/folders exist:
   - `package.json`
   - `src/` folder
   - `public/` folder
   - `node_modules/` folder (if it exists)
   - `.git/` folder (if using git)

### Step 4: Open Project in New Location

1. Open your IDE/editor (Cursor, VS Code, etc.)
2. Open the project from the NEW location (not the OneDrive one)
3. Open a terminal in the new project directory

### Step 5: Clean Install Dependencies

In the terminal, run these commands:

```bash
# Clear npm cache
npm cache clean --force

# Remove old node_modules (if it exists)
# On Windows PowerShell:
Remove-Item -Recurse -Force node_modules

# Remove package-lock.json
Remove-Item -Force package-lock.json

# Install fresh dependencies
npm install
```

### Step 6: Test the Project

1. Start the development server:
   ```bash
   npm start
   ```

2. Verify:
   - The server starts without errors
   - The app loads in your browser
   - No Babel compilation errors appear

### Step 7: Update Git Remote (if using Git)

If you're using Git and have a remote repository:

1. The `.git` folder was copied, so your git history is intact
2. No changes needed to git remotes
3. You can continue working normally

### Step 8: Delete Old OneDrive Location (After Verification)

**Only after confirming everything works in the new location:**

1. Close all terminals and editors
2. Navigate to: `C:\Users\caelf\OneDrive\Desktop\Portfolio\`
3. Delete the `Portfolio` folder
4. Empty your Recycle Bin if desired

**Warning**: Make sure the new location is working perfectly before deleting the old one!

## Troubleshooting

### If npm install fails:
- Make sure you're in the correct directory
- Try running as Administrator
- Check your internet connection
- Try: `npm install --legacy-peer-deps`

### If the app doesn't start:
- Check the terminal for error messages
- Verify all files were copied correctly
- Try deleting `node_modules` and `package-lock.json` and reinstalling

### If OneDrive still syncs:
- Make sure you moved to a location outside OneDrive
- Check OneDrive settings to ensure the new location isn't being synced

## After Migration

- Your project is now in a non-synced location
- npm operations will be much faster
- No more OneDrive sync conflicts
- Continue development as normal

## Need Help?

If you encounter any issues during migration, check:
1. Terminal error messages
2. Browser console errors (F12)
3. Verify all files were copied correctly
