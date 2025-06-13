import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Turnstile } from "@marsidev/react-turnstile";
import "react-datepicker/dist/react-datepicker.css";
import { actions, isInputError } from "astro:actions";

const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;

export default function QuoteForm({
  quoteFormTitle = "Get a Free Quote",
  promoCode = "",
  phoneNumber,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      serviceType: "Moving",
      firstName: "",
      lastName: "",
      initialDeliveryZip: "",
      finalDeliveryZip: "",
      deliveryDate: new Date(),
      email: "",
      phone: "",
      storeItType: "",
      promoCode,
      cfTurnstileResponse: "",
    },
  });

  const serviceType = watch("serviceType");
  const storeItType = watch("storeItType");

  const onSubmit = async (data) => {
    const result = await actions.quoteForm(data);
    console.log("Form submission result:", result);
    if (isInputError(result.error)) {
      form.errors = Object.fromEntries(
        Object.entries(result.error.fields).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : value,
        ])
      );
    } else {
      if (result.data.success) {
        window.location.href = result.data.successUrl;
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-3xl mx-auto"
    >
      <h2 className="text-xl md:text-3xl text-center font-bold">
        {quoteFormTitle}
      </h2>

      <div className="flex justify-around items-center my-6 gap-4">
        {["Moving", "Storage", "Storage & Moving"].map((type) => (
          <button
            key={type}
            type="button"
            className={`py-3 px-4 rounded-md flex-1 transition-colors shadow ${
              serviceType === type
                ? "bg-primary text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setValue("serviceType", type)}
          >
            {type === "Storage & Moving" ? "Both" : type}
          </button>
        ))}
      </div>

      {(serviceType === "Storage" || serviceType === "Storage & Moving") && (
        <div className="space-y-2">
          <h3 className="italic text-dark">
            Where would you like to store your container?
          </h3>
          <div className="flex gap-2">
            {["My Location", "MI-BOX Location"].map((opt) => (
              <button
                key={opt}
                type="button"
                className={`py-1 px-4 rounded-md flex-1 transition-colors shadow ${
                  storeItType === opt
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-300 hover:bg-gray-300"
                }`}
                onClick={() => setValue("storeItType", opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label>First Name</label>
          <input
            {...register("firstName", { required: true })}
            placeholder="Bob"
            className="input"
          />
          {errors.firstName && (
            <p className="text-red-600">First name is required</p>
          )}
        </div>
        <div>
          <label>Last Name</label>
          <input
            {...register("lastName", { required: true })}
            placeholder="Smith"
            className="input"
          />
          {errors.lastName && (
            <p className="text-red-600">Last name is required</p>
          )}
        </div>
      </div>

      <div
        className={`grid grid-cols-1 ${
          (serviceType === "Moving" || serviceType === "Storage & Moving") &&
          "md:grid-cols-2"
        }
        } gap-3`}
      >
        <div className="">
          <label>Initial Delivery Zip Code</label>
          <input
            {...register("initialDeliveryZip", { required: true })}
            placeholder="34240"
            className="input"
          />
          {errors.initialDeliveryZip && (
            <p className="text-red-600">Required</p>
          )}
        </div>
        {(serviceType === "Moving" || serviceType === "Storage & Moving") && (
          <div>
            <label>Final Delivery Zip Code</label>
            <input
              {...register("finalDeliveryZip", { required: true })}
              placeholder="34240"
              className="input"
            />
            {errors.finalDeliveryZip && (
              <p className="text-red-600">Required</p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <label>Delivery Date</label>
        <DatePicker
          selected={watch("deliveryDate")}
          onChange={(date) => setValue("deliveryDate", date)}
          dateFormat="MM-dd-yyyy"
          className="input"
        />
        {errors.deliveryDate && <p className="text-red-600">Required</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label>Email</label>
          <input
            {...register("email", { required: true })}
            placeholder="you@example.com"
            className="input"
          />
          {errors.email && <p className="text-red-600">Email is required</p>}
        </div>
        <div>
          <label>Phone</label>
          <input
            {...register("phone", { required: true })}
            placeholder="222.222.2222"
            className="input"
          />
          {errors.phone && <p className="text-red-600">Phone is required</p>}
        </div>
      </div>

      <div>
        <label>Promo Code</label>
        <input value={promoCode} readOnly className="input bg-gray-100" />
      </div>

      <Turnstile
        siteKey={TURNSTILE_SITE_KEY}
        onSuccess={(token) => setValue("cfTurnstileResponse", token)}
        options={{ theme: "light" }}
      />
      {errors.cfTurnstileResponse && (
        <p className="text-red-600">Captcha required</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="submit-btn w-full flex justify-center items-center"
      >
        {isSubmitting ? (
          <>
            Submitting...
            <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                fill="currentColor"
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </>
        ) : (
          "Get your Quote"
        )}
      </button>
    </form>
  );
}
