# 🎮 WebGL Terminal Background - Quick Settings Guide

## Current Configuration (Low-Key Mode)

```tsx
<FaultyTerminal
  scale={1.8}                    // ← Larger grid = more subtle
  gridMul={[2, 1]}               // Grid aspect ratio
  digitSize={1.5}                // Size of terminal characters
  timeScale={0.5}                // ← Slower animation = calmer
  pause={false}                  // Animation running
  scanlineIntensity={0.3}        // ← Subtle scanlines
  glitchAmount={0.4}             // ← Reduced glitch intensity
  flickerAmount={0.3}            // ← Gentle flicker
  noiseAmp={0.5}                 // ← Less noise movement
  chromaticAberration={0}        // No RGB split
  dither={0.2}                   // Subtle film grain
  curvature={0.1}                // Slight CRT curve
  tint="#00ff88"                 // Cyan-green terminal color
  mouseReact={true}              // ✅ MOUSE INTERACTIVE
  mouseStrength={0.8}            // ← Strong mouse response
  pageLoadAnimation={false}      // No fade-in animation
  brightness={0.25}              // ← 25% brightness (LOW-KEY!)
/>
```

---

## 🎚️ Parameter Guide

### Brightness (Most Important!)
- **Current:** `0.25` (25% - very subtle)
- **Range:** `0.1` (barely visible) to `1.0` (full brightness)
- **Recommendations:**
  - `0.15-0.25` - Subtle background
  - `0.3-0.5` - Noticeable but not distracting
  - `0.6-0.8` - Prominent effect
  - `1.0` - Full intensity

### Mouse Interactivity
- **mouseReact:** `true` (ENABLED)
- **mouseStrength:** `0.8` (strong response)
- **What it does:** 
  - Creates glowing ripple where mouse moves
  - Terminal characters light up near cursor
  - Smooth damped following effect
  - Works automatically - just move your mouse!

### Scale (Grid Size)
- **Current:** `1.8`
- **Range:** `0.5` (very dense) to `3.0` (very sparse)
- **Effect:** 
  - Higher = Larger grid cells = MORE SUBTLE
  - Lower = Smaller grid cells = More detail

### Time Scale (Animation Speed)
- **Current:** `0.5` (slower, calmer)
- **Range:** `0.1` (very slow) to `2.0` (fast)
- **Effect:** Controls overall animation speed

### Scanline Intensity
- **Current:** `0.3` (subtle)
- **Range:** `0.0` (off) to `1.0` (strong)
- **Effect:** Horizontal CRT scan lines

### Glitch Amount
- **Current:** `0.4` (moderate)
- **Range:** `0.0` (off) to `2.0` (extreme)
- **Effect:** Horizontal displacement glitches

### Flicker Amount
- **Current:** `0.3` (gentle)
- **Range:** `0.0` (off) to `1.0` (strong)
- **Effect:** Random brightness variations

### Noise Amplitude
- **Current:** `0.5` (moderate)
- **Range:** `0.0` (off) to `2.0` (intense)
- **Effect:** Pattern movement/distortion

---

## 🎨 Preset Configurations

### Ultra Subtle (Barely There)
```tsx
brightness={0.15}
scanlineIntensity={0.1}
glitchAmount={0.2}
flickerAmount={0.1}
noiseAmp={0.3}
timeScale={0.3}
scale={2.0}
mouseStrength={0.5}
```

### Low-Key (Current - Recommended)
```tsx
brightness={0.25}
scanlineIntensity={0.3}
glitchAmount={0.4}
flickerAmount={0.3}
noiseAmp={0.5}
timeScale={0.5}
scale={1.8}
mouseStrength={0.8}
```

### Balanced
```tsx
brightness={0.4}
scanlineIntensity={0.5}
glitchAmount={0.6}
flickerAmount={0.5}
noiseAmp={0.7}
timeScale={0.8}
scale={1.5}
mouseStrength={0.6}
```

### Prominent
```tsx
brightness={0.6}
scanlineIntensity={0.8}
glitchAmount={1.0}
flickerAmount={0.7}
noiseAmp={1.0}
timeScale={1.0}
scale={1.2}
mouseStrength={0.4}
```

### Maximum Effect
```tsx
brightness={1.0}
scanlineIntensity={1.0}
glitchAmount={1.5}
flickerAmount={1.0}
noiseAmp={1.5}
timeScale={1.5}
scale={1.0}
mouseStrength={0.3}
```

---

## 🎯 What Changed?

### Before (Too Bright)
```tsx
brightness={1}           // 100% - too intense
scanlineIntensity={1}    // Full scanlines
glitchAmount={1}         // Full glitching
flickerAmount={1}        // Full flicker
noiseAmp={1}             // Full noise
timeScale={1}            // Normal speed
scale={1.5}              // Medium grid
mouseStrength={0.5}      // Moderate mouse
```

### After (Low-Key)
```tsx
brightness={0.25}        // ← 25% = Much more subtle!
scanlineIntensity={0.3}  // ← Gentle scanlines
glitchAmount={0.4}       // ← Less glitchy
flickerAmount={0.3}      // ← Subtle flicker
noiseAmp={0.5}           // ← Calmer movement
timeScale={0.5}          // ← Slower, more relaxed
scale={1.8}              // ← Larger grid = more space
mouseStrength={0.8}      // ← STRONGER mouse interaction!
```

**Result:** 75% LESS BRIGHT, more subtle, BETTER mouse reactivity!

---

## 🖱️ Mouse Interaction Details

The mouse creates:
1. **Glowing Ripple**: Bright area follows your cursor
2. **Distance-Based Intensity**: Characters near cursor light up more
3. **Ripple Animation**: Expanding circles from mouse position
4. **Smooth Damping**: Follows mouse with slight lag (looks natural)

**How to adjust:**
- `mouseStrength={0.5}` - Subtle mouse effect
- `mouseStrength={0.8}` - Strong mouse effect (current)
- `mouseStrength={1.2}` - Very dramatic mouse effect

---

## 🎨 Color Customization

Current: `tint="#00ff88"` (cyan-green terminal)

**Popular alternatives:**
```tsx
tint="#00ff88"  // Cyan-green (Matrix/terminal)
tint="#00ffff"  // Pure cyan
tint="#00ff00"  // Pure green
tint="#ff0000"  // Red alert
tint="#ff00ff"  // Magenta/pink
tint="#0088ff"  // Blue neon
tint="#ffffff"  // White/grayscale
tint="#ffaa00"  // Amber/orange
```

---

## 🚀 Performance

WebGL-powered = 60fps smooth on all devices!
- GPU-accelerated fragment shader
- No JavaScript animation loops
- Automatic pixel ratio detection
- ResizeObserver for responsive scaling

---

## 📝 Quick Tweaks

### Make Even More Subtle
```tsx
brightness={0.15}      // Lower brightness
scale={2.2}            // Larger grid
timeScale={0.3}        // Slower animation
```

### Make More Visible
```tsx
brightness={0.4}       // Higher brightness
scale={1.5}            // Smaller grid
timeScale={0.8}        // Faster animation
```

### Stronger Mouse Effect
```tsx
mouseStrength={1.2}    // More dramatic
```

### Weaker Mouse Effect
```tsx
mouseStrength={0.4}    // More subtle
```

### Disable Mouse Interaction
```tsx
mouseReact={false}     // Static background
```

---

## ✅ Current Result

You now have:
- ✨ **Subtle 25% brightness** - doesn't overpower content
- 🖱️ **Strong mouse interaction** - responsive to cursor movement
- 🎬 **Slower animation** - calmer, more relaxed feel
- 📐 **Larger grid** - more spaced out, less busy
- 🔇 **Reduced effects** - gentle glitches, flicker, and noise
- 💚 **Terminal aesthetic** - authentic WebGL shader rendering

Perfect for a professional compression tool with character! 🚀
