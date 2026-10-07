export function generateId(prefix = 'id') {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

import config from '../../tailwind.config'

const THEME_COLORS = config.daisyui.themes

export default THEME_COLORS
