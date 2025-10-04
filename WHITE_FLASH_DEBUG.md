# White Flash Debugging Guide

## Current Status
- ✅ 8 layers of black backgrounds applied
- ✅ Threads component restored with alpha blending
- ✅ All components have black backgrounds
- ✅ Overscroll-behavior: none applied
- ❌ White flash still occurring during scroll

## Potential Root Causes

### 1. Browser-Specific Rendering Issues
**Symptom:** White flash during rapid scroll or elastic scrolling  
**Likely Cause:** Browser compositor showing white during GPU layer promotion/demotion

**Test:**
1. Open in different browsers (Chrome, Safari, Firefox)
2. Does the flash occur in all browsers or just one?
3. Test in private/incognito mode (no extensions)

### 2. Scroll Beyond Boundaries
**Symptom:** White flash when scrolling past top/bottom of page  
**Likely Cause:** Browser default "overscroll" background showing

**Check:**
- Is the white flash ONLY at the very top or bottom of scroll?
- Does it happen mid-page or everywhere?

### 3. GPU Layer Composition
**Symptom:** Brief white flash during heavy interactions  
**Likely Cause:** GPU layer being recreated/recomposited

**Test:** Check Chrome DevTools > More Tools > Rendering > Paint Flashing

### 4. Faulty Threads Canvas Behavior
**Symptom:** White flash specifically around WebGL canvas  
**Likely Cause:** Canvas losing context or being recreated

**Check Browser Console for:**
- "WebGL context lost" warnings
- Canvas errors
- Memory warnings

## Diagnostic Steps

### Step 1: Identify Flash Location
Open browser and scroll slowly, then quickly:
- [ ] Flash occurs at TOP of page only
- [ ] Flash occurs at BOTTOM of page only  
- [ ] Flash occurs EVERYWHERE when scrolling
- [ ] Flash occurs only during FAST scroll
- [ ] Flash occurs during SLOW scroll too

### Step 2: Identify Flash Timing
- [ ] Flash happens DURING scroll (while finger/mouse moving)
- [ ] Flash happens AFTER scroll (momentum/inertia scrolling)
- [ ] Flash happens when STOPPING scroll
- [ ] Flash happens when STARTING scroll

### Step 3: Browser Testing
Test in each browser and note if flash occurs:
- [ ] Chrome/Edge (Chromium)
- [ ] Safari (WebKit)
- [ ] Firefox (Gecko)

### Step 4: Disable Threads Background
Temporarily comment out Threads component in `src/app/page.tsx`:
```tsx
{/* <Threads ... /> */}
```
- [ ] Flash STILL occurs → Problem is NOT Threads
- [ ] Flash GONE → Problem IS Threads

## Aggressive Fixes to Try

### Fix 1: Force Hardware Acceleration Everywhere
Add to `src/app/globals.css`:
```css
* {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
```

### Fix 2: Prevent Overscroll Completely
Add to `src/app/globals.css`:
```css
html, body {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#__next {
  overflow-y: auto;
  height: 100vh;
}
```

### Fix 3: Force Dark Mode at OS Level
Check System Preferences → Appearance → Dark mode is enabled

### Fix 4: CSS Root Background
Add to top of `src/app/globals.css`:
```css
:root {
  background: #000000;
  background-color: #000000;
}
```

### Fix 5: Disable Smooth Scrolling
Add to `src/app/globals.css`:
```css
* {
  scroll-behavior: auto !important;
}
```

## Nuclear Option: Container Scroll Instead of Body Scroll

If all else fails, prevent body scroll entirely and use a container:

**In `src/app/page.tsx`:**
```tsx
<div style={{
  position: 'fixed',
  inset: 0,
  overflow: 'auto',
  backgroundColor: '#000'
}}>
  {/* All content here */}
</div>
```

## What We've Already Done

✅ HTML/Body black backgrounds with !important  
✅ Meta tags for browser chrome  
✅ Fallback black div at z-index -2  
✅ Threads container black background  
✅ Canvas black background  
✅ WebGL clearColor(0,0,0,1)  
✅ All component black backgrounds  
✅ Card base backgrounds set to black  
✅ Shimmer effect changed from white to purple  
✅ AnimatePresence elements with black backgrounds  
✅ overscroll-behavior: none  
✅ #__next black background  
✅ Main element black background  

## Next Steps

1. **Identify exact scenario** when flash occurs using diagnostic steps above
2. **Record screen video** showing the flash to analyze frame-by-frame
3. **Use browser DevTools** Performance tab to capture during flash
4. **Try aggressive fixes** one at a time
5. **Report findings** with specific browser, OS, and scenario

## Report Template

```
Browser: [Chrome/Safari/Firefox] [Version]
OS: macOS [Version]
When: [During fast scroll / At top of page / etc]
Flash Location: [Top/Bottom/Middle/Everywhere]
Flash Duration: [Brief/Long]
With Threads: [Yes/No - does disabling Threads fix it?]
```

## Advanced Debugging (Developer)

### Chrome DevTools Method:
1. Open DevTools → Performance tab
2. Click Record
3. Scroll to trigger white flash
4. Stop recording
5. Look for "Paint" events during the flash
6. Check "Layers" tab to see GPU layer composition

### Safari DevTools Method:
1. Develop → Show Web Inspector
2. Timelines → Paint
3. Record during scroll
4. Look for unexpected repaints

### Monitor GPU Usage:
```bash
# macOS Activity Monitor
# View → GPU History while scrolling
```

## Possible Solutions Based on Diagnosis

| Symptom | Solution |
|---------|----------|
| Flash only in Safari | Add `-webkit-` prefixed CSS properties |
| Flash only at edges | Improve overscroll prevention |
| Flash everywhere | GPU layer issue - reduce will-change usage |
| Flash with Threads | Canvas context loss - add recovery |
| Flash during fast scroll | Add scroll throttling/debouncing |
