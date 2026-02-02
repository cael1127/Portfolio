# Fix Babel Compilation Error

## Problem

You're seeing this error when running `npm start`:
```
TypeError: params is not iterable
    at normalizeFile.next (<anonymous>)
ERROR in ./node_modules/core-js-pure/internals/shared-store.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
```

## Solution

Follow these steps to fix the Babel compilation error:

### Step 1: Stop the Development Server

If the dev server is running, press `Ctrl+C` in the terminal to stop it.

### Step 2: Clear npm Cache

Open a terminal in your project directory and run:

```bash
npm cache clean --force
```

### Step 3: Remove node_modules and package-lock.json

**On Windows PowerShell:**
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
```

**On Windows Command Prompt:**
```cmd
rmdir /s /q node_modules
del package-lock.json
```

### Step 4: Reinstall Dependencies

```bash
npm install
```

This will:
- Download fresh copies of all dependencies
- Resolve any version conflicts
- Create a new `package-lock.json` with correct versions

### Step 5: Start the Development Server

```bash
npm start
```

The Babel error should now be resolved.

## What Changed

- Updated `package.json` to use `"react-scripts": "^5.0.1"` (allows patch updates)
- Fresh install ensures all dependencies are compatible

## If the Error Persists

If you still see the error after these steps:

1. **Check Node.js version**: Make sure you're using Node.js 14 or higher
   ```bash
   node --version
   ```

2. **Try installing with legacy peer deps**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Check for conflicting packages**:
   ```bash
   npm list react-scripts
   npm list @babel/core
   ```

4. **Alternative: Use yarn instead of npm**:
   ```bash
   npm install -g yarn
   yarn install
   yarn start
   ```

## Additional Notes

- The error was caused by a version mismatch between Babel and core-js-pure
- A fresh install resolves dependency conflicts
- Moving the project out of OneDrive (see MIGRATION_INSTRUCTIONS.md) will also help prevent future issues
