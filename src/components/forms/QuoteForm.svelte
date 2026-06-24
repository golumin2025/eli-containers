<script>
  const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY
  const ZIP_NOT_SERVICED_MSG = 'Sorry, we do not service this zipcode'
  import { actions, isInputError } from 'astro:actions'
  import Input from './Input.svelte'
  import { DateInput } from 'date-picker-svelte'
  import { turnstile } from '@svelte-put/cloudflare-turnstile'
  let { quoteFormTitle, quoteButtonTitle = 'Get your Quote', promoCode } = $props()
  let isLoading = $state(false)
  let zipErrors = $state({ initial: '', final: '' })
  let form = $state({
    serviceType: "Moving",
    firstName: "",
    lastName: "",
    initialDeliveryZip: "",
    finalDeliveryZip: "",
    deliveryDate: new Date(),
    email: "",
    phone: "",
    storeItType: "",
    promoCode: promoCode ?? "",
    cfTurnstileResponse: "",
    errors: {},
  });

  async function checkZipcode(zipcode, field) {
    if (!zipcode) {
      zipErrors[field] = ''
      return
    }
    try {
      const res = await fetch(
        `/api/check-zipcode?zipcode=${encodeURIComponent(zipcode)}`,
      )
      const data = await res.json().catch(() => ({}))
      zipErrors[field] = res.ok && data.success ? '' : ZIP_NOT_SERVICED_MSG
    } catch {
      zipErrors[field] = ZIP_NOT_SERVICED_MSG
    }
  }

  let isFinalZipRequired = $derived(
    form.serviceType === 'Moving' || form.serviceType === 'Storage & Moving',
  )
  let hasZipError = $derived(
    !!zipErrors.initial || (isFinalZipRequired && !!zipErrors.final),
  )

  async function handleSubmit(event) {
    event.preventDefault();
    isLoading = true;
    form.errors = {};
    const result = await actions.quoteForm(form);
    if (isInputError(result.error)) {
      form.errors = Object.fromEntries(
        Object.entries(result.error.fields).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : value,
        ]),
      );
    } else {
      if (result.data.success) {
        isLoading = false;
        window.location.href = result.data.successUrl;
      }
    }
    isLoading = false;
  }
</script>

<form id="quote-form" method="POST" onsubmit={handleSubmit} class="form-card">
  <h2 class="heading-md text-center">
    {quoteFormTitle}
  </h2>
  <div class="grid grid-cols-3 gap-1.5 my-6 bg-cream p-1.5 ring-1 ring-line">
    <button
      type="button"
      class={`py-2.5 px-2 text-sm font-bold transition-all cursor-pointer ${form.serviceType === "Moving" ? "bg-primary text-dark shadow-md shadow-primary/30" : "bg-transparent text-secondary hover:bg-white hover:text-dark"}`}
      onclick={() => (form.serviceType = "Moving")}
    >
      Moving
    </button>
    <button
      type="button"
      class={`py-2.5 px-2 text-sm font-bold transition-all cursor-pointer ${form.serviceType === "Storage" ? "bg-primary text-dark shadow-md shadow-primary/30" : "bg-transparent text-secondary hover:bg-white hover:text-dark"}`}
      onclick={() => (form.serviceType = "Storage")}
    >
      Storage
    </button>
    <button
      type="button"
      class={`py-2.5 px-2 text-sm font-bold transition-all cursor-pointer ${form.serviceType === "Storage & Moving" ? "bg-primary text-dark shadow-md shadow-primary/30" : "bg-transparent text-secondary hover:bg-white hover:text-dark"}`}
      onclick={() => (form.serviceType = "Storage & Moving")}
    >
      Both
    </button>
  </div>
  <div class="space-y-2">
    {#if form.serviceType === "Storage" || form.serviceType === "Storage & Moving"}
      <h3 class="text-sm font-semibold text-dark">
        Where would you like to store your container?
      </h3>
      <div class="grid grid-cols-2 gap-2">
        <button
          type="button"
          class={`py-2 px-4 text-sm font-semibold transition-colors cursor-pointer border border-line ${form.storeItType === "1" ? "bg-primary text-dark shadow-md shadow-primary/30 border-primary" : "bg-white text-dark hover:bg-cream"}`}
          onclick={() => (form.storeItType = "1")}
        >
          My Location
        </button>
        <button
          type="button"
          class={`py-2 px-4 text-sm font-semibold transition-colors cursor-pointer border border-line ${form.storeItType === "0" ? "bg-primary text-dark shadow-md shadow-primary/30 border-primary" : "bg-white text-dark hover:bg-cream"}`}
          onclick={() => (form.storeItType = "0")}
        >
          Box Rental Now Location
        </button>
      </div>
    {/if}

    <div class="flex gap-2">
      <div class="w-full">
        <Input
          forId="initial-delivery-zip"
          label="Initial Delivery Zip Code"
          placeholder="34240"
          bind:value={form.initialDeliveryZip}
          errors={zipErrors.initial || form.errors.initialDeliveryZip}
          onblur={() => checkZipcode(form.initialDeliveryZip, 'initial')}
        />
      </div>
      {#if isFinalZipRequired}
        <div class="w-full">
          <Input
            forId="final-delivery-zip"
            label="Final Delivery Zip Code"
            placeholder="34240"
            bind:value={form.finalDeliveryZip}
            errors={zipErrors.final || form.errors.finalDeliveryZip}
            onblur={() => checkZipcode(form.finalDeliveryZip, 'final')}
          />
        </div>
      {/if}
    </div>
    <div class="date-time-field field">
      <label
        for="delivery-date"
        class="label">Delivery Date</label
      >
      <DateInput
        class="block w-full border border-line bg-white p-0 text-base text-dark"
        id="delivery-date"
        bind:value={form.deliveryDate}
        max={new Date("2030-12-31")}
        format="MM-dd-yyyy"
        closeOnSelection
      />
      {#if form.errors?.deliveryDate}
        <p class="form-error">{form.errors.deliveryDate}</p>
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
    <div class="field">
      <label for="promo-code" class="label"
        >Promo Code</label
      >
      <input
        id="promo-code"
        type="text"
        class="input bg-surface"
        bind:value={form.promoCode}
        tabindex="-1"
      />
    </div>
    <div
      class="w-full [&_iframe]:!w-full"
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
      <p class="form-error">{form.errors.cfTurnstileResponse}</p>
    {/if}
    <button
      type="submit"
      disabled={isLoading || hasZipError}
      class="submit-btn cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
        {quoteButtonTitle}
      {/if}
    </button>
  </div>
</form>

<style>
  .submit-btn {
    width: 100%;
    background: var(--color-primary);
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    font-size: 1.05rem;
    line-height: 1.5rem;
    font-weight: 800;
    color: var(--color-dark);
    white-space: nowrap;
    padding: 0.95rem 1.25rem;
    box-shadow: 0 10px 20px -8px rgba(255, 194, 14, 0.6);
    transition: all 0.2s ease;
  }
  .submit-btn:hover:not(:disabled) {
    background: var(--color-primary-dark);
    transform: translateY(-1px);
    box-shadow: 0 14px 26px -8px rgba(255, 194, 14, 0.7);
  }
</style>
