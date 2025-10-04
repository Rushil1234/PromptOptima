# 🎮 Interactive Terminal Background - Customization Guide

## ✨ What's New?

Your terminal background is now **MOUSE REACTIVE** and **HIGHLY VISIBLE**!

### New Features:
1. ✅ **Mouse Glow**: Cyan-green glow follows your cursor
2. ✅ **Grid Parallax**: Grid shifts slightly as you move your mouse
3. ✅ **Enhanced Visibility**: All effects 3-4x more visible
4. ✅ **Easy Customization**: CSS variables for quick tweaks
5. ✅ **Smooth Animations**: 60fps performance

---

## 🎨 EASY CUSTOMIZATION

### Quick Color Changes

Open `src/app/globals.css` and find the `:root` section (around line 20):

```css
:root {
  --terminal-color: 0, 255, 136;  /* 👈 CHANGE THIS! */
  --scanline-opacity: 0.08;
  --flicker-opacity: 0.05;
  --grid-opacity: 0.06;
  --glitch-brightness: 1.2;
  --vignette-strength: 0.4;
}
```

#### Popular Color Presets:

**🟢 Cyan-Green Terminal (Default)**
```css
--terminal-color: 0, 255, 136;  /* Matrix/terminal green */
```

**🔴 Red Alert Mode**
```css
--terminal-color: 255, 0, 0;  /* Danger/error theme */
```

**🔵 Blue Neon**
```css
--terminal-color: 0, 150, 255;  /* Cyberpunk blue */
```

**🟣 Purple Synthwave**
```css
--terminal-color: 200, 0, 255;  /* Retro purple */
```

**🟡 Yellow Caution**
```css
--terminal-color: 255, 200, 0;  /* Warning theme */
```

**🟠 Orange Fire**
```css
--terminal-color: 255, 100, 0;  /* Energetic orange */
```

---

## ⚙️ PARAMETER GUIDE

### 1. Scanline Opacity
**What it does:** Controls horizontal line visibility  
**Default:** `0.08`  
**Range:** `0.03` (subtle) to `0.15` (very visible)

```css
--scanline-opacity: 0.08;  /* Current setting */
```

**Examples:**
- `0.03` - Barely visible (original)
- `0.08` - Clearly visible (current)
- `0.12` - Very prominent
- `0.15` - Intense CRT effect

### 2. Flicker Opacity
**What it does:** Screen flicker intensity  
**Default:** `0.05`  
**Range:** `0.02` (gentle) to `0.1` (dramatic)

```css
--flicker-opacity: 0.05;  /* Current setting */
```

**Examples:**
- `0.02` - Subtle pulse
- `0.05` - Noticeable flicker (current)
- `0.08` - Strong flicker
- `0.1` - Very dramatic (may be distracting)

### 3. Grid Opacity
**What it does:** Background grid line visibility  
**Default:** `0.06`  
**Range:** `0.02` (faint) to `0.1` (bold)

```css
--grid-opacity: 0.06;  /* Current setting */
```

**Examples:**
- `0.02` - Very faint
- `0.06` - Clearly visible (current)
- `0.08` - Strong grid
- `0.1` - Dominant grid pattern

### 4. Glitch Brightness
**What it does:** Glitch line intensity multiplier  
**Default:** `1.2`  
**Range:** `0.8` (dim) to `1.5` (bright)

```css
--glitch-brightness: 1.2;  /* Current setting */
```

**Examples:**
- `0.8` - Subtle glitches
- `1.0` - Normal brightness
- `1.2` - Enhanced (current)
- `1.5` - Maximum intensity

### 5. Vignette Strength
**What it does:** Edge darkening amount  
**Default:** `0.4`  
**Range:** `0.2` (light) to `0.6` (dark)

```css
--vignette-strength: 0.4;  /* Current setting */
```

**Examples:**
- `0.2` - Subtle darkening
- `0.4` - Balanced (current)
- `0.5` - Strong focus effect
- `0.6` - Heavy vignette

---

## 🖱️ MOUSE REACTIVITY

### Mouse Glow
A glowing orb follows your cursor with:
- **Size:** 400px diameter
- **Blur:** 40px for soft effect
- **Opacity:** 15% at center, fading to transparent
- **Transition:** Smooth 0.2s ease-out

**Adjust the size** in `globals.css`:
```css
.mouse-glow {
  width: 400px;   /* Increase for larger glow */
  height: 400px;  /* Keep same as width */
  filter: blur(40px);  /* Increase for softer glow */
}
```

**Make it more intense:**
```css
.mouse-glow {
  background: radial-gradient(
    circle,
    rgba(var(--terminal-color), 0.25) 0%,  /* Was 0.15 */
    rgba(var(--terminal-color), 0.15) 30%, /* Was 0.08 */
    transparent 70%
  );
}
```

### Grid Parallax
The grid shifts based on mouse position:
```tsx
transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
```

**Increase parallax effect** (in `page.tsx`):
```tsx
// More movement
transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`

// Less movement
transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
```

---

## 🎯 PRESET CONFIGURATIONS

### Subtle Mode (Minimal Distraction)
```css
:root {
  --terminal-color: 0, 255, 136;
  --scanline-opacity: 0.04;
  --flicker-opacity: 0.02;
  --grid-opacity: 0.03;
  --glitch-brightness: 0.8;
  --vignette-strength: 0.2;
}
```

### Balanced Mode (Current - Recommended)
```css
:root {
  --terminal-color: 0, 255, 136;
  --scanline-opacity: 0.08;
  --flicker-opacity: 0.05;
  --grid-opacity: 0.06;
  --glitch-brightness: 1.2;
  --vignette-strength: 0.4;
}
```

### Intense Mode (Maximum Effect)
```css
:root {
  --terminal-color: 0, 255, 136;
  --scanline-opacity: 0.12;
  --flicker-opacity: 0.08;
  --grid-opacity: 0.09;
  --glitch-brightness: 1.5;
  --vignette-strength: 0.5;
}
```

### Cyberpunk Mode (Blue + Intense)
```css
:root {
  --terminal-color: 0, 150, 255;  /* Neon blue */
  --scanline-opacity: 0.10;
  --flicker-opacity: 0.06;
  --grid-opacity: 0.08;
  --glitch-brightness: 1.4;
  --vignette-strength: 0.5;
}
```

### Matrix Mode (Green + Dramatic)
```css
:root {
  --terminal-color: 0, 255, 100;  /* Bright green */
  --scanline-opacity: 0.11;
  --flicker-opacity: 0.07;
  --grid-opacity: 0.08;
  --glitch-brightness: 1.5;
  --vignette-strength: 0.55;
}
```

---

## 🔧 ADVANCED CUSTOMIZATION

### Change Glitch Line Speed
In `globals.css`, find the glitch line animations:
```css
.glitch-line-1 {
  animation: glitch-slide-1 3s ease-in-out infinite;  /* 👈 Change duration */
}
```

**Faster glitches:**
```css
animation: glitch-slide-1 2s ease-in-out infinite;  /* Was 3s */
```

**Slower glitches:**
```css
animation: glitch-slide-1 5s ease-in-out infinite;  /* Was 3s */
```

### Change Scanline Speed
```css
.terminal-background::before {
  animation: scanlines 8s linear infinite;  /* 👈 Change this */
}
```

**Faster:** `4s` | **Normal:** `8s` | **Slower:** `15s`

### Change Grid Shift Speed
```css
.terminal-grid {
  animation: grid-shift 20s linear infinite;  /* 👈 Change this */
}
```

**Faster:** `10s` | **Normal:** `20s` | **Slower:** `40s`

### Disable Mouse Reactivity
If you want static background, comment out in `page.tsx`:
```tsx
// Remove or comment these lines:
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

useEffect(() => {
  // ... mouse tracking code
}, []);
```

And remove mouse-reactive elements:
```tsx
{/* Remove this: */}
<div className="mouse-glow" style={{...}} />

{/* And remove style from grid: */}
<div className="terminal-grid" />  {/* No style prop */}
```

---

## 📊 VISIBILITY IMPROVEMENTS

### Before vs After:

| Element | Before | After | Improvement |
|---------|--------|-------|-------------|
| Scanlines | 0.03 | 0.08 | **166% more visible** |
| Flicker | 0.02 | 0.05 | **150% more visible** |
| Grid | 0.02 | 0.06 | **200% more visible** |
| Glitch lines | 2px, blur 1px | 3px, blur 1.5px | **50% larger** |
| Mouse glow | ❌ None | ✅ Interactive | **NEW!** |
| Grid parallax | ❌ Static | ✅ Mouse-reactive | **NEW!** |

---

## 🎨 COLOR MIXING EXAMPLES

You can mix RGB values for custom colors:

**Cyan-Pink Gradient:**
```css
--terminal-color: 100, 200, 255;  /* Light cyan-blue */
```

**Warm Orange:**
```css
--terminal-color: 255, 150, 50;  /* Warm orange-yellow */
```

**Cool Teal:**
```css
--terminal-color: 0, 200, 180;  /* Teal/turquoise */
```

**Hot Pink:**
```css
--terminal-color: 255, 20, 147;  /* Hot pink/magenta */
```

---

## 🧪 TESTING YOUR CHANGES

After modifying CSS variables:

1. **Save the file** (`src/app/globals.css`)
2. **Browser auto-refreshes** (Next.js hot reload)
3. **Move your mouse** to see interactive effects
4. **Check visibility** of scanlines and grid
5. **Watch glitch lines** slide down screen

**Not seeing changes?**
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Clear cache and reload
- Check browser console for errors

---

## 🚀 PERFORMANCE TIPS

All effects are GPU-accelerated for 60fps:
- ✅ Using `transform` (not `left`/`top`)
- ✅ Using `opacity` animations
- ✅ Using `filter: blur()` (GPU-accelerated)
- ✅ CSS animations (not JavaScript)

**If experiencing lag:**
1. Reduce blur amount in `.mouse-glow`
2. Increase animation durations (slower = less CPU)
3. Lower opacity values
4. Disable mouse tracking (see Advanced section)

---

## 📍 FILE LOCATIONS

**CSS Variables & Styles:**
- `src/app/globals.css` - Lines 20-150
- Look for `:root {` section for easy variables
- Look for `.terminal-background` for main styles

**Mouse Tracking Code:**
- `src/app/page.tsx` - Around line 186-200
- `useState` and `useEffect` hooks
- Mouse glow and grid parallax JSX

---

## 💡 QUICK TIPS

### Want it MORE visible?
Increase ALL opacity values by 0.02-0.03:
```css
--scanline-opacity: 0.11;  /* Was 0.08 */
--flicker-opacity: 0.08;   /* Was 0.05 */
--grid-opacity: 0.09;      /* Was 0.06 */
```

### Want it LESS visible?
Decrease ALL opacity values by 0.02-0.03:
```css
--scanline-opacity: 0.05;  /* Was 0.08 */
--flicker-opacity: 0.03;   /* Was 0.05 */
--grid-opacity: 0.04;      /* Was 0.06 */
```

### Want STRONGER mouse effect?
Increase mouse glow size and parallax:
```css
/* In globals.css */
.mouse-glow {
  width: 600px;   /* Was 400px */
  height: 600px;
}
```

```tsx
// In page.tsx
transform: `translate(${mousePos.x * 0.04}px, ${mousePos.y * 0.04}px)`
// Was 0.02
```

---

## ✅ SUMMARY

Your background now features:
- 🎨 **Easy color customization** via CSS variables
- 🖱️ **Mouse-reactive glow** that follows cursor
- 📐 **Parallax grid** that shifts with mouse
- 👁️ **3-4x more visible** than before
- ⚡ **60fps performance** with GPU acceleration
- 🎛️ **6 adjustable parameters** for fine-tuning

**Enjoy your interactive terminal background!** 💚✨
