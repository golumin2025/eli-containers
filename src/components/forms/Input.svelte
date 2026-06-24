<script>
  let { forId, label, type = 'text', placeholder, value = $bindable(), errors, onblur } = $props()
</script>

<div class="field">
  <label for={forId} class="label">{label}</label>
  <input
    {type}
    id={forId}
    class="input"
    bind:value
    {placeholder}
    {onblur}
  />
  {#if errors}
    <p class="form-error">{errors}</p>
  {/if}
</div>
