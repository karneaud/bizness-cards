// tailwind.config.js

module.exports = {
daisyui: {
    themes: ["light","nord","business","coporate","winter","emerald","silk","lofi","acid","pastel"], // DaisyUI built-in themes
    },
    plugins: [require("daisyui")],
theme: {
extend: {
input: {
"2xl": 'calc(var(--size-field, 0.45rem) * 14)'
},
},
},
};