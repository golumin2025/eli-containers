<script lang="ts">
  export let show: boolean = false;
  export let onClose: () => void;

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
</script>

{#if show}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 bg-black/80 z-[9999999999] flex items-center justify-center"
    on:click={handleBackdropClick}
  >
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
      <div class="space-y-4">
        <slot />
      </div>
    </div>
  </div>
{/if}
