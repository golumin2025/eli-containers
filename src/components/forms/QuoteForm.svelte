<script>
  const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY
  import { actions, isInputError } from 'astro:actions'
  import Input from './Input.svelte'
  import { DateInput } from 'date-picker-svelte'
  import { turnstile } from '@svelte-put/cloudflare-turnstile'
  let { quoteFormTitle, promoCode } = $props()
  let isLoading = $state(false)
  let form = $state({
    serviceType: 'Moving',
    firstName: '',
    lastName: '',
    initialDeliveryZip: '',
    finalDeliveryZip: '',
    deliveryDate: new Date(),
    email: '',
    phone: '',
    storeItType: '',
    promoCode: promoCode ?? '',
    cfTurnstileResponse: '',
    errors: {},
  })

  async function handleSubmit(event) {
    event.preventDefault()
    isLoading = true
    form.errors = {}
    const result = await actions.quoteForm(form)
    if (isInputError(result.error)) {
      form.errors = Object.fromEntries(
        Object.entries(result.error.fields).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : value,
        ])
      )
    } else {
      if (result.data.success) {
        isLoading = false
        window.location.href = result.data.successUrl
      }
    }
    isLoading = false
  }
</script>

<form id="quote-form" method="POST" onsubmit={handleSubmit}>
  <h2 class="md:text-3xl text-xl text-center font-bold block">
    {quoteFormTitle}
  </h2>
  <div class="flex justify-around items-center my-6 gap-4">
    <button
      type="button"
      class={`py-3 px-4 rounded-md flex-1 shadow-[0px_4px_8px_0px_#00000040] transition-colors cursor-pointer ${form.serviceType === 'Moving' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
      onclick={() => (form.serviceType = 'Moving')}
    >
      Moving
    </button>
    <button
      type="button"
      class={`py-3 px-4 rounded-md shadow-[0px_4px_8px_0px_#00000040] transition-colors cursor-pointer flex-1 ${form.serviceType === 'Storage' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
      onclick={() => (form.serviceType = 'Storage')}
    >
      Storage
    </button>
    <button
      type="button"
      class={`py-3 px-4 rounded-md shadow-[0px_4px_8px_0px_#00000040] transition-colors cursor-pointer flex-1 ${form.serviceType === 'Storage & Moving' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
      onclick={() => (form.serviceType = 'Storage & Moving')}
    >
      Both
    </button>
  </div>
  <div class="space-y-2">
    {#if form.serviceType === 'Storage' || form.serviceType === 'Storage & Moving'}
      <h3 class="italic text-black">Where would you like to store your container?</h3>
      <button
        type="button"
        class={`py-1 px-4 rounded-md transition-colors flex-1 mr-3 ${form.storeItType === '1' ? 'bg-primary text-white shadow-md' : 'bg-gray-300 shadow text-black cursor-pointer hover:bg-gray-300'}`}
        onclick={() => (form.storeItType = '1')}
      >
        My Location
      </button>
      <button
        type="button"
        class={`py-1 px-4 rounded-md transition-colors flex-1 ${form.storeItType === '0' ? 'bg-primary text-white shadow-md' : 'bg-gray-300 shadow text-black cursor-pointer hover:bg-gray-300'}`}
        onclick={() => (form.storeItType = '0')}
      >
        MI-BOX Location
      </button>
    {/if}
    
    <div class="flex gap-2">
      <div class="w-full">
        <Input
          forId="initial-delivery-zip"
          label="Initial Delivery Zip Code"
          placeholder="34240"
          bind:value={form.initialDeliveryZip}
          errors={form.errors.initialDeliveryZip}
        />
      </div>
      {#if form.serviceType === 'Moving' || form.serviceType === 'Storage & Moving'}
        <div class="w-full">
          <Input
            forId="final-delivery-zip"
            label="Final Delivery Zip Code"
            placeholder="34240"
            bind:value={form.finalDeliveryZip}
            errors={form.errors.finalDeliveryZip}
          />
        </div>
      {/if}
    </div>
    <div>
      <label for="delivery-date" class="block text-sm/6 font-medium text-gray-900"
        >Delivery Date</label
      >
      <DateInput
        class="block w-full rounded-md bg-white p-0 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
        id="delivery-date"
        bind:value={form.deliveryDate}
        max={new Date('2030-12-31')}
        format="MM-dd-yyyy"
        closeOnSelection
      />
      {#if form.errors?.deliveryDate}
        <p class="text-red-800">{form.errors.deliveryDate}</p>
      {/if}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Input
        forId="email"
        label="Email"
        placeholder="user@email.com"
        bind:value={form.email}
        errors={form.errors.email}
      />
      <Input
        forId="phone"
        label="Phone"
        placeholder="222.222.2222"
        bind:value={form.phone}
        errors={form.errors.phone}
      />
    </div>
    <div>
      <label for="promo-code" class="block text-sm/6 font-medium text-gray-900">Promo Code</label>
      <input
        id="promo-code"
        type="text"
        class="block w-full rounded-md bg-gray-100 p-2 text-base text-gray-900"
        bind:value={promoCode} 
        tabindex="-1"
      />
    </div>
    <div
      use:turnstile
      turnstile-sitekey={TURNSTILE_SITE_KEY}
      turnstile-theme="light"
      turnstile-size="normal"
      turnstile-language="en"
      turnstile-response-field-name="turnstile"
      turnstile-response-field
      turnstile-feedback-enabled
      onturnstile={(e) => (form.cfTurnstileResponse = e.detail.token)}
    ></div>
    {#if form.errors?.cfTurnstileResponse}
      <p class="text-red-800">{form.errors.cfTurnstileResponse}</p>
    {/if}
    <button
      type="submit"
      disabled={isLoading}
      class="submit-btn shadow-[0px_4px_8px_0px_#00000040] cursor-pointer"
    >
      {#if isLoading}
        Submitting...
        <svg
          class="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      {:else}
        Get your Quote
      {/if}
    </button>
  </div>
</form>

<style>
  .submit-btn {
    background: var(--color-secondary);
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: #ffffff;
    white-space: nowrap;
    padding: 0.5rem 1rem;
  }
  @media (min-width: 1024px) {
    .submit-btn {
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
      font-weight: 600;
    }
  }
</style>
