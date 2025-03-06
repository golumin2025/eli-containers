<script lang="ts">
  import { actions, isInputError } from "astro:actions";
  import { DateInput } from "date-picker-svelte";
  import { turnstile } from "@svelte-put/cloudflare-turnstile";

  interface FormData {
    serviceType: "keep-it" | "move-it" | "store-it";
    firstName: string;
    lastName: string;
    initialDeliveryZip: string;
    selectedContainerType: string;
    finalDeliveryZip: string;
    deliveryDate: Date;
    email: string;
    phone: string;
    storeItType: string;
    cfTurnstileResponse: string;
    errors: {
      firstName?: string;
      lastName?: string;
      initialDeliveryZip?: string;
      finalDeliveryZip?: string;
      deliveryDate?: string;
      email?: string;
      phone?: string;
      cfTurnstileResponse?: string;
      general?: string;
    };
  }

  let { development_mode, quoteFormContent } = $props();

  let containerTypes: string[] = $state([]);
  let storageTypes: string[] = $state([]);
  let isContainerLoading = $state(false);
  let isLoading = $state(false);
  let error: string | boolean | null = $state(null);
  const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;

  let form: FormData = $state({
    serviceType: "keep-it",
    firstName: "",
    lastName: "",
    initialDeliveryZip: "",
    selectedContainerType: "8x8",
    finalDeliveryZip: "",
    deliveryDate: new Date(),
    email: "",
    phone: "",
    storeItType: "",
    cfTurnstileResponse: "",
    errors: {},
  });

  let previousServiceType = $state(form.serviceType);

  let validZipCodes: string[] = $state([]);

  $effect(() => {
    if (form.serviceType && form.serviceType !== previousServiceType) {
      previousServiceType = form.serviceType;
      form = {
        ...form,
        firstName: "",
        lastName: "",
        selectedContainerType: "8x8",
        initialDeliveryZip: "",
        finalDeliveryZip: "",
        deliveryDate: new Date(),
        email: "",
        phone: "",
        storeItType: "",
        errors: {},
      };
      containerTypes = [];
      storageTypes = [];
    }
  });

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isLoading = true;
    const result = await actions.quoteForm(form);
    if (isInputError(result.error)) {
      form.errors = result.error.fields;
    } else if (result && !result.error) {
      window.location.href = `/thank-you`;
    } else if (result.error) {
      form.errors = { general: result.error.message };
    }
    isLoading = false;
  }

  const fetchZipCodes = async () => {
    try {
      const response = await fetch("/api/get_zip-codes");
      if (!response.ok) {
        throw new Error("Failed to fetch zip codes");
      }
      const data = await response.json();
      validZipCodes = data;
    } catch (error) {
      console.error("Error fetching zip codes:", error);
      validZipCodes = [];
    }
  };

  $effect(() => {
    fetchZipCodes();
  });

  const isValidZipCode = (zipCode: string): boolean => {
    return validZipCodes.includes(zipCode);
  };

  async function fetchContainerTypes() {
    const zipcode = form.initialDeliveryZip;

    if (!zipcode || zipcode.length < 5) {
      containerTypes = [];
      storageTypes = [];
      return;
    }

    if (zipcode.length === 5) {
      if (!isValidZipCode(zipcode)) {
        error = "Invalid zip code for service area";
        containerTypes = [];
        storageTypes = [];
        return;
      }
      isContainerLoading = true;
      error = false;
    }
  }
  $effect(() => {
    fetchContainerTypes();
  });
</script>

<form method="POST" onsubmit={handleSubmit}>
  <div
    class="flex justify-around items-center my-6 gap-4"
    style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 1rem;"
  >
    <button
      type="button"
      class={`py-3 px-4 rounded-md flex-1 transition-colors ${form.serviceType === "keep-it" ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"}`}
      onclick={() => (form.serviceType = "keep-it")}>Keep It</button
    >
    <button
      type="button"
      class={`py-3 px-4 rounded-md transition-colors flex-1 ${form.serviceType === "move-it" ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"}`}
      onclick={() => (form.serviceType = "move-it")}>Move It</button
    >
    <button
      type="button"
      class={`py-3 px-4 rounded-md transition-colors flex-1 ${form.serviceType === "store-it" ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"}`}
      onclick={() => (form.serviceType = "store-it")}>Store It</button
    >
  </div>
  <div class="space-y-2">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <input
          type="text"
          id="firstName"
          class="outline-secondary border border-black w-full py-3 text-base rounded px-3"
          bind:value={form.firstName}
          placeholder="First Name"
        />
        {#if form.errors?.firstName}
          <p class="text-red-800">{form.errors.firstName}</p>
        {/if}
      </div>

      <div>
        <input
          type="text"
          id="lastName"
          class="outline-secondary border border-black w-full py-3 text-base rounded px-3"
          bind:value={form.lastName}
          placeholder="Last Name"
        />
        {#if form.errors?.lastName}
          <p class="text-red-800">{form.errors.lastName}</p>
        {/if}
      </div>
    </div>
    <div class="flex gap-2">
      <div class="w-full">
        <input
          class="outline-secondary border border-black w-full py-3 text-base rounded px-3"
          type="text"
          id="initialDeliveryZip"
          bind:value={form.initialDeliveryZip}
          placeholder="Delivery Zip Code"
        />
        {#if form.errors?.initialDeliveryZip}
          <p class="text-red-800">{form.errors.initialDeliveryZip}</p>
        {/if}
        {#if error}
          <p class="text-red-800">{error}</p>
        {/if}
      </div>
      {#if form.serviceType === "move-it"}
        <div class="w-full">
          <input
            class="outline-secondary border border-black w-full py-3 text-base rounded px-3"
            type="text"
            id="final-delivery-zip"
            placeholder="Relocation Zip Code"
            bind:value={form.finalDeliveryZip}
          />
        </div>
      {/if}
    </div>
    <div class="!w-full">
      <DateInput
        class="outline-secondary border border-black text-base rounded !w-full"
        id="delivery-date"
        bind:value={form.deliveryDate}
        max={new Date("2030-12-31")}
        format="MM-dd-yyyy"
        closeOnSelection
      />
      {#if form.errors?.deliveryDate}
        <p class="text-red-800">{form.errors.deliveryDate}</p>
      {/if}
    </div>

    <div>
      <input
        type="email"
        id="email"
        placeholder="Email Address"
        bind:value={form.email}
        class="outline-secondary border border-black w-full py-3 text-base rounded px-3"
      />
      {#if form.errors?.email}
        <p class="text-red-800">{form.errors.email}</p>
      {/if}
    </div>

    <div>
      <input
        type="phone"
        id="phone"
        placeholder="Phone Number"
        bind:value={form.phone}
        class="outline-secondary border border-black w-full py-3 text-base rounded px-3"
      />
      {#if form.errors?.phone}
        <p class="text-red-800">{form.errors.phone}</p>
      {/if}
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
      disabled={isLoading || typeof error === "string" ? true : error}
      class="submit-btn"
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
