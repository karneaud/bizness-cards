<template>
  <div class="help-container p-6 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">How to Use</h2>
    
    <div class="space-y-4">
      <div class="help-section">
        <h3 class="text-lg font-semibold mb-2">🃏 Card Navigation</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li><strong>Tap</strong> a card to expand it full-screen</li>
          <li><strong>Click X</strong> button to close expanded card</li>
          <li><strong>Swipe left/right</strong> to dismiss a card</li>
          <li><strong>Drag</strong> cards to preview swipe direction</li>
        </ul>
      </div>

      <div class="help-section">
        <h3 class="text-lg font-semibold mb-2">📋 Card Types</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li><strong>Business Cards</strong> - Display contact information</li>
          <li><strong>Form Cards</strong> - Create new business cards</li>
        </ul>
      </div>

      <div class="help-section">
        <h3 class="text-lg font-semibold mb-2">🔄 Card Stack</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Cards are stacked in order (top to bottom)</li>
          <li>Swiped cards move to the back of the stack</li>
          <li>Cards cycle through continuously</li>
        </ul>
      </div>

      <div class="help-section">
        <h3 class="text-lg font-semibold mb-2">💡 Tips</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Swipe gently to preview, swipe firmly to dismiss</li>
          <li>Expanded cards show a close button after animation</li>
          <li>Fill out the form to add new cards to your stack</li>
        </ul>
      </div>
    </div>

    <div class="mt-6 p-4 bg-base-200 rounded-lg">
      <p class="text-sm text-center">
        <strong>Keyboard shortcuts coming soon!</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
// Help component - displays usage instructions
</script>

<style type="css" scoped>
@import "../css/_help.css";
</style>
