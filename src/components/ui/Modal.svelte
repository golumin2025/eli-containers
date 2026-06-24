<script lang="ts">
  export let show
  export let onClose: () => void
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
</script>

{#if show}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 bg-ink/70 z-[9999999999] flex items-center justify-center p-4"
    on:click={handleBackdropClick}
  >
    <div class="bg-white p-6 shadow-2xl ring-1 ring-black/5 max-w-md w-full">
      <div class="space-y-4">
        <slot />
      </div>
    </div>
  </div>
{/if}
