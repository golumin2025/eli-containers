<script lang="ts">
  import { actions, isInputError } from "astro:actions";
  import { DateInput } from "date-picker-svelte";
  import { turnstile } from "@svelte-put/cloudflare-turnstile";
  import { onMount } from "svelte";
  import Modal from "@components/ui/Modal.svelte";

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
    isExcludedZip: boolean;
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
      excludedZip?: string;
    };
  }

  let { quoteFormTitle } = $props();

  let containerTypes: string[] = $state([]);
  let storageTypes: string[] = $state([]);
  let isContainerLoading = $state(false);
  let isLoading = $state(false);
  let error: string | boolean | null = $state(null);
  const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;
  let showZipModal = $state(false);
  let modalMessage = $state("");

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
    isExcludedZip: true, // Default to true as requested
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
        isExcludedZip: true, // Reset to true when service type changes
        errors: {},
      };
      containerTypes = [];
      storageTypes = [];
    }
  });

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isLoading = true;
    form.errors = {};

    // Validate zip code before submission
    if (form.initialDeliveryZip.length === 5) {
      form.isExcludedZip = !validZipCodes.includes(form.initialDeliveryZip);
    }

    // Submit the form regardless of zip code status
    const result: any = await actions.quoteForm(form);

    if (isInputError(result.error)) {
      form.errors = result.error.fields;
    } else if (result.success) {
      // Only redirect if zip is valid
      if (!form.isExcludedZip) {
        window.location.href = `/thank-you`;
      }
    } else if (result.error) {
      form.errors = { general: result.error.message };
    }

    // Show modal if zip is excluded (after submission)
    if (form.isExcludedZip) {
      modalMessage =
        "Sorry, we currently don't service this area. Please try a different zip code or contact our support team for assistance.";
      showZipModal = true;
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
    if (zipCode.length < 5) return false;
    return validZipCodes.includes(zipCode);
  };

  async function fetchContainerTypes() {
    const zipcode = form.initialDeliveryZip;

    if (!zipcode || zipcode.length < 5) {
      containerTypes = [];
      storageTypes = [];
      form.isExcludedZip = true; // Assume excluded until verified
      return;
    }

    if (zipcode.length === 5) {
      form.isExcludedZip = !isValidZipCode(zipcode);
      if (form.isExcludedZip) {
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

  function closeModal() {
    showZipModal = false;
    modalMessage = "";
  }
</script>

<form id="quote-form" method="POST" onsubmit={handleSubmit}>
  <h2 class="md:text-3xl text-xl text-center font-bold block">
    {quoteFormTitle}
  </h2>
  <div class="flex justify-around items-center my-6 gap-4">
    <button
      type="button"
      class={`py-3 px-4 rounded-md flex-1 shadow-[0px_4px_8px_0px_#00000040] transition-colors ${form.serviceType === "keep-it" ? "bg-primary text-white shadow-md" : "bg-gray-200 text-black hover:bg-gray-300"}`}
      onclick={() => (form.serviceType = "keep-it")}
    >
      Keep It
    </button>
    <button
      type="button"
      class={`py-3 px-4 rounded-md shadow-[0px_4px_8px_0px_#00000040] transition-colors flex-1 ${form.serviceType === "move-it" ? "bg-primary text-white shadow-md" : "bg-gray-200 text-black hover:bg-gray-300"}`}
      onclick={() => (form.serviceType = "move-it")}
    >
      Move It
    </button>
    <button
      type="button"
      class={`py-3 px-4 rounded-md shadow-[0px_4px_8px_0px_#00000040] transition-colors flex-1 ${form.serviceType === "store-it" ? "bg-primary text-white shadow-md" : "bg-gray-200 text-black hover:bg-gray-300"}`}
      onclick={() => (form.serviceType = "store-it")}
    >
      Store It
    </button>
  </div>
  <div class="space-y-2">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <input
          type="text"
          id="firstName"
          class="outline-secondary border border-black w-full py-3 text-base rounded px-3 placeholder:text-black"
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
          class="outline-secondary border border-black w-full py-3 text-base rounded px-3 placeholder:text-black"
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
          class="outline-secondary border border-black w-full py-3 text-base rounded px-3 placeholder:text-black"
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
            class="outline-secondary border border-black w-full py-3 text-base rounded px-3 placeholder:text-black"
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
        class="outline-secondary border border-black w-full py-3 text-base rounded px-3 placeholder:text-black"
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
        class="outline-secondary border border-black w-full py-3 text-base rounded px-3 placeholder:text-black"
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
  <Modal show={showZipModal} onClose={closeModal}>
    <div class="space-y-4">
      <h3 class="text-xl font-bold text-gray-900">Service Area Notice</h3>
      <p class="text-gray-600">{modalMessage}</p>
      <div class="flex justify-end">
        <button
          type="button"
          class="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
          onclick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  </Modal>
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
