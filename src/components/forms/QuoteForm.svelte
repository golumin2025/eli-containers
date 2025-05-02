<script>
  import { actions, isInputError } from 'astro:actions'
  import { DateInput } from 'date-picker-svelte'
  import { turnstile } from '@svelte-put/cloudflare-turnstile'

  let { quoteFormTitle } = $props()

  let isLoading = $state(false)
  let error = $state(null)
  const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY

  let form = $state({
    serviceType: 'keep-it',
    firstName: '',
    lastName: '',
    initialDeliveryZip: '',
    finalDeliveryZip: '',
    deliveryDate: new Date(),
    email: '',
    phone: '',
    storeItType: '',
    cfTurnstileResponse: '',
    errors: {},
  })

  async function handleSubmit(event) {
    console.log(event)
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
      const data = await result.json()
      if (data.message !== 'Success') {
        isLoading = false
      } else {
        const urlParams = new URLSearchParams()
        urlParams.set(`type`, `${type}`)
        urlParams.set(`container_types`, `${data.data.service_type}`)
        urlParams.set(`email`, `${data.data.email}`)
        urlParams.set(`new_zipcode`, `${data.data.new_zip}`)
        urlParams.set(`phone_number`, `${data.data.phone}`)
        urlParams.set(`start_date`, `${data.data.start_date}`)
        urlParams.set(`zipcode`, `${data.data.current_zip}`)
        urlParams.set(`promocode`, `${data.data.promo}`)
        const stringParams = urlParams.toString()

        window.location.href = `https://app.miboxmovingandstorage.com/?${stringParams}#wpcf7-f52-p10-o1`
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
      class={`py-3 px-4 rounded-md flex-1 shadow-[0px_4px_8px_0px_#00000040] transition-colors cursor-pointer ${form.serviceType === 'keep-it' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
      onclick={() => (form.serviceType = 'keep-it')}
    >
      Keep It
    </button>
    <button
      type="button"
      class={`py-3 px-4 rounded-md shadow-[0px_4px_8px_0px_#00000040] transition-colors cursor-pointer flex-1 ${form.serviceType === 'move-it' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
      onclick={() => (form.serviceType = 'move-it')}
    >
      Move It
    </button>
    <button
      type="button"
      class={`py-3 px-4 rounded-md shadow-[0px_4px_8px_0px_#00000040] transition-colors cursor-pointer flex-1 ${form.serviceType === 'store-it' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
      onclick={() => (form.serviceType = 'store-it')}
    >
      Store It
    </button>
  </div>
  <div class="space-y-2">
    {#if form.serviceType === 'store-it'}
      <button
        type="button"
        class={`py-1 px-4 rounded-md transition-colors flex-1 mr-3 ${form.storeItType === 'My Location' ? 'bg-primary text-white shadow-md' : 'bg-yellow-300 shadow text-black cursor-pointer hover:bg-gray-300'}`}
        onclick={() => (form.storeItType = 'My Location')}
      >
        My Location
      </button>
      <button
        type="button"
        class={`py-1 px-4 rounded-md transition-colors flex-1 ${form.storeItType === 'MI-BOX Location' ? 'bg-primary text-white shadow-md' : 'bg-yellow-300 shadow text-black cursor-pointer hover:bg-gray-300'}`}
        onclick={() => (form.storeItType = 'MI-BOX Location')}
      >
        Move It
      </button>
    {/if}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label for="first-name" class="block text-sm/6 font-medium text-gray-900">First Name</label>
        <input
          type="text"
          id="first-name"
          class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
          bind:value={form.firstName}
          placeholder="Bob"
        />
        {#if form.errors?.firstName}
          <p class="text-red-800">{form.errors.firstName}</p>
        {/if}
      </div>
      <div>
        <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Last Name</label>
        <input
          type="text"
          id="last-name"
          class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
          bind:value={form.lastName}
          placeholder="Smith"
        />
        {#if form.errors?.lastName}
          <p class="text-red-800">{form.errors.lastName}</p>
        {/if}
      </div>
    </div>
    <div class="flex gap-2">
      <div class="w-full">
        <label for="initial-elivery-zip" class="block text-sm/6 font-medium text-gray-900"
          >Delivery Zip Code</label
        >
        <input
          class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
          type="text"
          id="initial-elivery-zip"
          bind:value={form.initialDeliveryZip}
          placeholder="05495"
        />
        {#if form.errors?.initialDeliveryZip}
          <p class="text-red-800">{form.errors.initialDeliveryZip}</p>
        {/if}
        {#if error}
          <p class="text-red-800">{error}</p>
        {/if}
      </div>
      {#if form.serviceType === 'move-it'}
        <div class="w-full">
          <label for="final-delivery-zip" class="block text-sm/6 font-medium text-gray-900"
            >Final Delivery Zip Code</label
          >
          <input
            class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            type="text"
            id="final-delivery-zip"
            placeholder="05495"
            bind:value={form.finalDeliveryZip}
          />
        </div>
      {/if}
    </div>
    <div>
      <label for="delivery-date" class="block text-sm/6 font-medium text-gray-900"
        >Delivery Date</label
      >
      <DateInput
        class="block w-full rounded-md bg-white text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
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
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
        <input
          type="email"
          id="email"
          placeholder="user@email.com"
          bind:value={form.email}
          class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
        />
        {#if form.errors?.email}
          <p class="text-red-800">{form.errors.email}</p>
        {/if}
      </div>
      <div>
        <label for="emphoneail" class="block text-sm/6 font-medium text-gray-900">Phone</label>
        <input
          type="phone"
          id="phone"
          placeholder="222.222.2222"
          bind:value={form.phone}
          class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
        />
        {#if form.errors?.phone}
          <p class="text-red-800">{form.errors.phone}</p>
        {/if}
      </div>
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
