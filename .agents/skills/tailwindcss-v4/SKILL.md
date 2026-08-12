---
name: tailwindcss-v4
description: Tailwind CSS v4 with DaisyUI, BEM patterns, and theme customization
---

# Tailwind CSS v4 Guidelines

## Configuration

This project uses Tailwind CSS v4 with the Vite plugin (not PostCSS):

```javascript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), /* other plugins */]
})
```

## Import Patterns

Import Tailwind in CSS files:

```css
@import 'tailwindcss';
@plugin 'daisyui';
```

## DaisyUI v5 Usage

This project uses DaisyUI v5 via `@plugin 'daisyui'`. Components are available with DaisyUI classes.

### Buttons

```html
<!-- Basic buttons -->
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-ghost">Ghost</button>

<!-- Outline buttons -->
<button class="btn btn-outline">Outline</button>
<button class="btn btn-primary btn-outline">Primary Outline</button>

<!-- Button sizes -->
<button class="btn btn-sm">Small</button>
<button class="btn btn-md">Medium</button>
<button class="btn btn-lg">Large</button>

<!-- Button with icon -->
<button class="btn btn-primary">
  <svg class="w-5 h-5"></svg>
  With Icon
</button>
```

### Inputs

```html
<!-- Text input -->
<input type="text" class="input input-bordered" placeholder="Text input" />

<!-- Input sizes -->
<input class="input input-sm input-bordered" />
<input class="input input-md input-bordered" />
<input class="input input-lg input-bordered" />

<!-- Input with label -->
<label class="form-control">
  <div class="label">
    <span class="label-text">Label</span>
  </div>
  <input type="text" class="input input-bordered" />
</label>

<!-- Textarea -->
<textarea class="textarea textarea-bordered"></textarea>

<!-- Select -->
<select class="select select-bordered">
  <option>Option 1</option>
  <option>Option 2</option>
</select>

<!-- Checkbox -->
<input type="checkbox" class="checkbox" />

<!-- Radio -->
<input type="radio" name="radio" class="radio" />

<!-- Range (slider) -->
<input type="range" class="range" min="0" max="100" />
```

### Cards

```html
<div class="card bg-base-200 w-96 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>Card content goes here</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>

<!-- Card with image -->
<div class="card image-full">
  <figure><img src="/image.jpg" alt="Image" /></figure>
  <div class="card-body">
    <h2 class="card-title">Overlay</h2>
  </div>
</div>
```

### Navigation

```html
<!-- Navbar -->
<div class="navbar bg-base-200">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">Brand</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a>Link 1</a></li>
      <li><a>Link 2</a></li>
    </ul>
  </div>
</div>

<!-- Tabs -->
<div class="tabs">
  <a class="tab">Tab 1</a>
  <a class="tab tab-active">Tab 2</a>
</div>
```

### Modals

```html
<!-- Modal -->
<dialog id="my_modal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Modal Title</h3>
    <p class="py-4">Modal content</p>
    <div class="modal-action">
      <button class="btn" onclick="my_modal.close()">Close</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
```

### Dropdowns

```html
<!-- Dropdown -->
<div class="dropdown">
  <div tabindex="0" class="btn m-1">Click</div>
  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
```

### Alerts

```html
<div class="alert">
  <span>Alert message</span>
</div>
<div class="alert alert-info">Info alert</div>
<div class="alert alert-success">Success alert</div>
<div class="alert alert-warning">Warning alert</div>
<div class="alert alert-error">Error alert</div>
```

### Badges

```html
<span class="badge">Default</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-outline">Outline</span>
```

### Avatar

```html
<div class="avatar">
  <div class="w-12 rounded-full">
    <img src="/image.jpg" alt="Avatar" />
  </div>
</div>
```

### Progress

```html
<progress class="progress progress-primary" value="40" max="100"></progress>
```

### Skeleton

```html
<div class="skeleton w-32 h-4"></div>
<div class="skeleton w-48 h-32"></div>
```

### Toast

```html
<div class="toast">
  <div class="alert alert-info">
    <span>Toast message</span>
  </div>
</div>
```

## DaisyUI Theme Customization

### Default Themes

DaisyUI comes with built-in themes. Apply via HTML attribute:

```html
<html data-theme="light">
<html data-theme="dark">
<html data-theme="cupcake">
<html data-theme="bumblebee">
<html data-theme="emerald">
<html data-theme="corporate">
<html data-theme="synthwave">
<html data-theme="retro">
<html data-theme="cyberpunk">
<html data-theme="valentine">
<html data-theme="halloween">
<html data-theme="garden">
<html data-theme="forest">
<html data-theme="aqua">
<html data-theme="lofi">
<html data-theme="pastel">
<html data-theme="fantasy">
<html data-theme="wireframe">
<html data-theme="black">
<html data-theme="luxury">
<html data-theme="dracula">
```

### Custom Theme (CSS Variables)

Define custom theme in CSS:

```css
@plugin 'daisyui' {
  --daisyui-theme-light: "custom";
  --daisyui-theme-dark: "custom";
}

:root {
  --p: 250 100% 50%;
  --pf: 250 100% 40%;
  --pc: 0 0% 100%;
  --s: 180 100% 50%;
  --sf: 180 100% 40%;
  --sc: 0 0% 100%;
  --a: 30 100% 50%;
  --af: 30 100% 40%;
  --ac: 0 0% 100%;
  --n: 220 20% 96%;
  --nf: 220 10% 90%;
  --nc: 220 20% 10%;
  --b1: 220 20% 98%;
  --b2: 220 15% 92%;
  --b3: 220 10% 80%;
  --bc: 220 20% 10%;
  --su: 150 100% 50%;
  --wu: 0 100% 50%;
  --er: 0 100% 50%;
}
```

### DaisyUI Color Variables

| Variable | Description |
|----------|-------------|
| `--p`, `--pf`, `--pc` | Primary (color, focus, content) |
| `--s`, `--sf`, `--sc` | Secondary |
| `--a`, `--af`, `--ac` | Accent |
| `--n`, `--nf`, `--nc` | Neutral |
| `--b1`, `--b2`, `--bc` | Base (colors, border, content) |
| `--su`, `--wu`, `--er` | Success, Warning, Error |

## Custom Theme Extensions (tailwind.config.js)

Extend theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      customKey: { value }
    }
  }
}
```

Access in CSS with `theme()` function:

```css
.custom-element {
  padding: theme('spacing.4');
  color: theme('colors.primary');
}
```

## BEM with Tailwind

Use BEM-style naming with Tailwind utility prefixes:

```html
<!-- Block -->
<div class="card">

  <!-- Element -->
  <div class="card__header">
    <h2 class="card__title">Title</h2>
  </div>

  <!-- Modifier -->
  <div class="card card--featured">
    <div class="card__body card__body--primary">
  </div>
</div>
```

## CSS @apply

Group Tailwind utilities with `@apply` in custom CSS:

```css
.card {
  @apply bg-base-200 rounded-lg p-4 shadow-lg;
}
```

## Responsive Design

Use responsive prefixes:

```html
<div class="flex flex-col md:flex-row">
<div class="w-full md:w-1/2">
```

## Utility Patterns

### Flexbox

```html
<div class="flex items-center justify-between">
<div class="flex flex-col gap-4">
<div class="flex-1">
```

### Spacing

```html
<div class="p-4 m-2 space-y-4">
```

### Typography

```html
<h1 class="text-2xl font-bold">Title</h1>
<p class="text-sm text-base-content/70">Subtitle</p>
```

### Colors

```html
<div class="bg-primary text-white">
<div class="bg-base-200">
```

### Animations

```html
<div class="transition-all duration-300">
```

### Interactive States

```html
<button class="hover:bg-primary focus:ring">
<input class="focus:input-bordered disabled:opacity-50">
```

## Tailwind v4 Layer Directive

Use `@layer` for organizing styles:

```css
@layer components {
  .btn-custom {
    @apply btn btn-primary;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## DaisyUI Theme Colors

Access DaisyUI theme colors via CSS variables:

```css
.bg-base-100 /* Primary background */
.bg-base-200 /* Secondary background */
.bg-base-300 /* Tertiary background */
.text-base-content /* Primary text */
.text-base-content/70 /* Secondary text with opacity */
```