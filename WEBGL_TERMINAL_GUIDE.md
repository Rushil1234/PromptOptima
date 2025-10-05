# 🎮 WebGL Faulty Terminal - Complete Guide

## ✨ NOW USING AUTHENTIC WEBGL SHADERS!

Your background is now powered by **OGL (OpenGL wrapper)** with **custom GLSL shaders** - the same technology used in the original reactbits.dev implementation!

---

## 🚀 WHAT'S NEW?

### Before (CSS):
- ❌ Simple CSS animations
- ❌ Limited effects
- ❌ No authentic terminal look
- ❌ Basic mouse reactivity

### After (WebGL):
- ✅ **Real shader-based graphics**
- ✅ **Procedural noise & FBM**
- ✅ **Authentic CRT monitor effect**
- ✅ **Matrix-style digit grid**
- ✅ **Advanced mouse interaction with ripples**
- ✅ **GPU-accelerated (60fps+)**
- ✅ **Chromatic aberration**
- ✅ **Screen curvature**
- ✅ **Dithering effects**

---

## 🎨 CUSTOMIZATION OPTIONS

Open `src/app/page.tsx` and find the `<FaultyTerminal>` component (around line 188):

```tsx
<FaultyTerminal
  scale={1.5}                    // 👈 CUSTOMIZE THESE!
  gridMul={[2, 1]}
  digitSize={1.2}
  timeScale={1}
  pause={false}
  scanlineIntensity={1}
  glitchAmount={1}
  flickerAmount={1}
  noiseAmp={1}
  chromaticAberration={0}
  dither={0}
  curvature={0}
  tint="#00ff88"
  mouseReact={true}
  mouseStrength={0.5}
  pageLoadAnimation={false}
  brightness={1}
/>
```

---

## 📊 PARAMETER REFERENCE

### 1. `scale` (number)
**What it does:** Zoom level of the terminal grid  
**Default:** `1.5`  
**Range:** `0.5` - `3.0`

```tsx
scale={1.0}   // Wide view, more digits visible
scale={1.5}   // Balanced (default)
scale={2.0}   // Zoomed in, larger digits
scale={2.5}   // Very close up
```

### 2. `gridMul` ([x, y])
**What it does:** Grid cell aspect ratio  
**Default:** `[2, 1]`

```tsx
gridMul={[1, 1]}   // Square cells
gridMul={[2, 1]}   // Wide cells (default)
gridMul={[3, 1]}   // Very wide cells
gridMul={[1, 2]}   // Tall cells
```

### 3. `digitSize` (number)
**What it does:** Size of individual digit characters  
**Default:** `1.2`  
**Range:** `0.5` - `2.0`

```tsx
digitSize={0.8}   // Small, dense text
digitSize={1.2}   // Readable (default)
digitSize={1.5}   // Large, bold
digitSize={2.0}   // Extra large
```

### 4. `timeScale` (number)
**What it does:** Animation speed multiplier  
**Default:** `1`  
**Range:** `0.1` - `3.0`

```tsx
timeScale={0.3}   // Slow, calm
timeScale={1}     // Normal (default)
timeScale={2}     // Fast, intense
timeScale={3}     // Very fast
```

### 5. `pause` (boolean)
**What it does:** Freeze all animations  
**Default:** `false`

```tsx
pause={false}  // Animated (default)
pause={true}   // Frozen
```

### 6. `scanlineIntensity` (number)
**What it does:** Horizontal scan line visibility  
**Default:** `1`  
**Range:** `0` (off) - `2` (very strong)

```tsx
scanlineIntensity={0}     // No scanlines
scanlineIntensity={0.3}   // Subtle
scanlineIntensity={1}     // Normal (default)
scanlineIntensity={1.5}   // Strong CRT effect
scanlineIntensity={2}     // Intense
```

### 7. `glitchAmount` (number)
**What it does:** Horizontal displacement/glitch intensity  
**Default:** `1`  
**Range:** `0` (off) - `3`

```tsx
glitchAmount={0}     // No glitches
glitchAmount={0.5}   // Subtle distortion
glitchAmount={1}     // Normal (default)
glitchAmount={2}     // Heavy glitches
glitchAmount={3}     // Extreme
```

### 8. `flickerAmount` (number)
**What it does:** Screen flicker intensity  
**Default:** `1`  
**Range:** `0` (off) - `2`

```tsx
flickerAmount={0}     // No flicker
flickerAmount={0.5}   // Gentle pulse
flickerAmount={1}     // Normal (default)
flickerAmount={1.5}   // Strong flicker
flickerAmount={2}     // Very unstable
```

### 9. `noiseAmp` (number)
**What it does:** Procedural noise amplitude (affects pattern flow)  
**Default:** `1`  
**Range:** `0` - `2`

```tsx
noiseAmp={0}     // Static pattern
noiseAmp={0.5}   // Subtle movement
noiseAmp={1}     // Normal flow (default)
noiseAmp={1.5}   // More turbulent
noiseAmp={2}     // Very chaotic
```

### 10. `chromaticAberration` (number)
**What it does:** RGB color separation (like old TVs)  
**Default:** `0`  
**Range:** `0` (off) - `10`

```tsx
chromaticAberration={0}     // No effect (default)
chromaticAberration={2}     // Subtle color shift
chromaticAberration={5}     // Noticeable RGB split
chromaticAberration={10}    // Strong retro TV effect
```

### 11. `dither` (number or boolean)
**What it does:** Adds grain/noise texture  
**Default:** `0`  
**Range:** `0` (off) - `5`

```tsx
dither={0}       // Clean (default)
dither={1}       // Subtle grain
dither={true}    // Enabled (= 1)
dither={3}       // Strong grain
dither={5}       // Very grainy
```

### 12. `curvature` (number)
**What it does:** CRT screen curve/barrel distortion  
**Default:** `0`  
**Range:** `0` (flat) - `0.5`

```tsx
curvature={0}      // Flat screen (default)
curvature={0.1}    // Slight curve
curvature={0.2}    // Noticeable CRT bulge
curvature={0.3}    // Strong curve
curvature={0.5}    // Extreme fisheye
```

### 13. `tint` (hex color string)
**What it does:** Color tint/filter  
**Default:** `"#00ff88"` (cyan-green)

```tsx
tint="#00ff88"    // Cyan-green (default)
tint="#00ff00"    // Bright green (Matrix)
tint="#00ffff"    // Cyan
tint="#ff0000"    // Red
tint="#ff00ff"    // Magenta
tint="#ffff00"    // Yellow
tint="#ffffff"    // White
```

### 14. `mouseReact` (boolean)
**What it does:** Enable mouse interaction  
**Default:** `true`

```tsx
mouseReact={true}   // Interactive (default)
mouseReact={false}  // Static, no mouse effect
```

### 15. `mouseStrength` (number)
**What it does:** Mouse influence intensity  
**Default:** `0.5`  
**Range:** `0` - `2`

```tsx
mouseStrength={0.2}   // Subtle
mouseStrength={0.5}   // Balanced (default)
mouseStrength={1.0}   // Strong
mouseStrength={1.5}   // Very responsive
mouseStrength={2.0}   // Extreme
```

### 16. `pageLoadAnimation` (boolean)
**What it does:** Fade-in animation on page load  
**Default:** `false`

```tsx
pageLoadAnimation={false}  // Instant (default)
pageLoadAnimation={true}   // 2-second fade-in
```

### 17. `brightness` (number)
**What it does:** Overall brightness multiplier  
**Default:** `1`  
**Range:** `0.1` - `2`

```tsx
brightness={0.5}   // Dim
brightness={1}     // Normal (default)
brightness={1.5}   // Bright
brightness={2}     // Very bright
```

---

## 🎯 PRESET CONFIGURATIONS

### Classic Terminal (Default)
```tsx
<FaultyTerminal
  scale={1.5}
  gridMul={[2, 1]}
  digitSize={1.2}
  timeScale={1}
  scanlineIntensity={1}
  glitchAmount={1}
  flickerAmount={1}
  noiseAmp={1}
  tint="#00ff88"
  mouseReact={true}
  mouseStrength={0.5}
  brightness={1}
/>
```

### Matrix Mode (Green + Intense)
```tsx
<FaultyTerminal
  scale={1.8}
  gridMul={[2, 1]}
  digitSize={1.5}
  timeScale={1.5}
  scanlineIntensity={1.5}
  glitchAmount={1.5}
  flickerAmount={1.2}
  noiseAmp={1.5}
  tint="#00ff00"
  mouseReact={true}
  mouseStrength={0.8}
  brightness={1.3}
/>
```

### Retro CRT (Curved + Chromatic Aberration)
```tsx
<FaultyTerminal
  scale={1.5}
  gridMul={[2, 1]}
  digitSize={1.2}
  timeScale={0.8}
  scanlineIntensity={1.2}
  glitchAmount={1}
  flickerAmount={1}
  noiseAmp={0.8}
  chromaticAberration={5}
  curvature={0.2}
  dither={2}
  tint="#00ff88"
  mouseReact={true}
  mouseStrength={0.5}
  brightness={1}
/>
```

### Cyberpunk (Blue + Fast)
```tsx
<FaultyTerminal
  scale={1.6}
  gridMul={[3, 1]}
  digitSize={1.3}
  timeScale={2}
  scanlineIntensity={1.3}
  glitchAmount={2}
  flickerAmount={1.5}
  noiseAmp={1.8}
  chromaticAberration={3}
  tint="#00ffff"
  mouseReact={true}
  mouseStrength={1}
  brightness={1.2}
/>
```

### Minimal Clean (Subtle Effects)
```tsx
<FaultyTerminal
  scale={1.5}
  gridMul={[2, 1]}
  digitSize={1.2}
  timeScale={0.5}
  scanlineIntensity={0.3}
  glitchAmount={0.3}
  flickerAmount={0.3}
  noiseAmp={0.5}
  tint="#00ff88"
  mouseReact={true}
  mouseStrength={0.2}
  brightness={0.9}
/>
```

### Intense Chaos (Maximum Everything)
```tsx
<FaultyTerminal
  scale={2}
  gridMul={[2, 1]}
  digitSize={1.5}
  timeScale={2.5}
  scanlineIntensity={2}
  glitchAmount={3}
  flickerAmount={2}
  noiseAmp={2}
  chromaticAberration={8}
  curvature={0.3}
  dither={4}
  tint="#ff00ff"
  mouseReact={true}
  mouseStrength={1.5}
  brightness={1.5}
/>
```

---

## 🖱️ MOUSE INTERACTION

When `mouseReact={true}`, the shader responds to your cursor:

1. **Intensity Boost**: Digits near your cursor brighten
2. **Ripple Effect**: Sine wave ripples emanate from cursor
3. **Smooth Tracking**: 8% damping for fluid motion

**Adjust mouse responsiveness:**
```tsx
mouseStrength={0.2}   // Barely visible
mouseStrength={0.5}   // Balanced
mouseStrength={1.0}   // Very responsive
mouseStrength={2.0}   // Extreme
```

**Disable mouse effects:**
```tsx
mouseReact={false}
```

---

## 🎨 COLOR SCHEMES

### Terminal Green Variants
```tsx
tint="#00ff00"    // Bright green (Matrix)
tint="#00ff88"    // Cyan-green (default)
tint="#00cc66"    // Darker green
tint="#88ff00"    // Yellow-green
```

### Cyberpunk Colors
```tsx
tint="#00ffff"    // Cyan
tint="#ff00ff"    // Magenta
tint="#ff0088"    // Hot pink
tint="#8800ff"    // Purple
```

### Retro/Warning
```tsx
tint="#ff0000"    // Red alert
tint="#ffaa00"    // Orange
tint="#ffff00"    // Yellow
tint="#ff6600"    // Amber
```

### Monochrome
```tsx
tint="#ffffff"    // White/gray
tint="#aaaaaa"    // Gray
tint="#666666"    // Dark gray
```

---

## ⚡ PERFORMANCE

### GPU-Accelerated
- All rendering on GPU via WebGL
- GLSL shader execution
- 60fps+ on modern devices
- Minimal CPU usage

### Responsive
- Automatically adapts to container size
- Uses `ResizeObserver` for dynamic sizing
- Pixel ratio detection (retina support)

### Optimized
- Single render pass
- Efficient uniform updates
- Proper cleanup on unmount
- Memory leak prevention

---

## 🔧 ADVANCED CUSTOMIZATION

### Change Location
Currently in `src/app/page.tsx` line ~188. Move anywhere:
```tsx
// Example: In a specific component
import FaultyTerminal from '@/components/FaultyTerminal';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <FaultyTerminal {...props} />
</div>
```

### Multiple Instances
You can have multiple terminals:
```tsx
<div className="grid grid-cols-2 gap-4">
  <FaultyTerminal tint="#00ff00" />
  <FaultyTerminal tint="#ff0000" />
</div>
```

### Custom Styles
```tsx
<FaultyTerminal
  style={{
    width: '100%',
    height: '800px',
    border: '2px solid cyan',
    borderRadius: '10px',
    overflow: 'hidden'
  }}
/>
```

### Conditional Props
```tsx
<FaultyTerminal
  pause={isModalOpen}  // Pause when modal opens
  brightness={isDarkMode ? 1 : 0.5}
  mouseReact={!isMobile}
/>
```

---

## 📚 TECHNICAL DETAILS

### Shader Features
- **Fragment Shader**: ~200 lines of GLSL
- **Vertex Shader**: Simple passthrough
- **FBM (Fractal Brownian Motion)**: Organic noise patterns
- **Pattern Function**: Procedural texture generation
- **Digit Function**: Circle-based character rendering
- **Barrel Distortion**: CRT curvature simulation

### Libraries Used
- **OGL**: Lightweight WebGL wrapper (~5KB)
- **React**: Component lifecycle
- **TypeScript**: Type safety

### Browser Compatibility
- ✅ Chrome/Edge (WebGL 1.0+)
- ✅ Firefox (WebGL 1.0+)
- ✅ Safari (WebGL 1.0+)
- ✅ Mobile browsers (performance may vary)
- ❌ IE11 (no WebGL support)

---

## 🐛 TROUBLESHOOTING

### Black Screen
1. Check browser console for WebGL errors
2. Ensure WebGL is enabled in browser
3. Update graphics drivers
4. Try lower `dpr` value (device pixel ratio)

### Performance Issues
1. Lower `dpr` to `1` instead of `2`
2. Reduce `timeScale` to slow animations
3. Disable `chromaticAberration`
4. Set `curvature={0}`
5. Disable `mouseReact`

### Too Subtle
1. Increase `brightness` to `1.5`
2. Increase `scanlineIntensity` to `1.5`
3. Increase `glitchAmount` to `2`
4. Increase `flickerAmount` to `1.5`
5. Change `tint` to brighter color

### Too Intense
1. Lower `brightness` to `0.7`
2. Lower `scanlineIntensity` to `0.3`
3. Lower `glitchAmount` to `0.5`
4. Lower `flickerAmount` to `0.3`
5. Lower `timeScale` to `0.5`

---

## ✅ WHAT YOU GET

Your LLM Optimizer now features:
- 🎮 **Authentic WebGL shader graphics**
- 🖥️ **Real terminal/CRT simulation**
- 🖱️ **Advanced mouse interaction**
- ⚡ **GPU-accelerated 60fps+**
- 🎨 **Fully customizable parameters**
- 📱 **Responsive and adaptive**
- 🔧 **Professional implementation**
- 💯 **Same as reactbits.dev!**

**This is the REAL Faulty Terminal effect!** 🚀✨

---

## 📝 FILES CREATED

- `src/components/FaultyTerminal.tsx` - Main component with WebGL shader
- `src/components/FaultyTerminal.css` - Minimal styling
- Updated `src/app/page.tsx` - Integration
- Installed `ogl` package - WebGL library

**Enjoy your authentic terminal background!** 💚
