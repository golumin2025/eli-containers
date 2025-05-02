<script>
  let { forId, label, type = 'text', placeholder, value = $bindable(), errors } = $props()
</script>

<div>
  <label for={forId} class="block text-sm/6 font-medium text-gray-900">{label}</label>
  <input
    {type}
    id={forId}
    class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
    bind:value
    {placeholder}
  />
  {#if errors}
    <p class="text-red-800">{errors}</p>
  {/if}
</div>
