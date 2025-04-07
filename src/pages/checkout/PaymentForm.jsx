const PaymentForm = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  loading,
  total,
  formatCurrency,
  setStep,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-xl font-semibold">Payment Information</h2>

      {/* Cardholder Name */}
      <div className="mb-6">
        <label className="mb-2 block text-gray-600" htmlFor="cardName">
          Cardholder Name
        </label>
        <input
          type="text"
          id="cardName"
          className={`w-full rounded-lg border ${errors.cardName ? "border-red-500" : "border-gray-300"} p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...register("cardName", {
            required: "Cardholder name is required",
          })}
        />
        {errors.cardName && (
          <p className="mt-1 text-sm text-red-500">{errors.cardName.message}</p>
        )}
      </div>

      {/* Card Number */}
      <div className="mb-6">
        <label className="mb-2 block text-gray-700" htmlFor="cardNumber">
          Card Number
        </label>
        <div className="relative">
          <input
            type="text"
            id="cardNumber"
            placeholder="0000 0000 0000 0000"
            className={`w-full rounded-lg border ${errors.cardNumber ? "border-red-500" : "border-gray-300"} p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^(\d{4}\s?){4}$/,
                message: "Invalid card number format",
              },
            })}
          />
          <div className="absolute right-3 top-3 flex space-x-1">
            <div className="h-5 w-8 rounded bg-gray-200"></div>
            <div className="h-5 w-8 rounded bg-gray-200"></div>
          </div>
        </div>
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-500">
            {errors.cardNumber.message}
          </p>
        )}
      </div>

      {/* Expiration Date and CVV */}
      <div className="mb-8 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-gray-700" htmlFor="expDate">
            Expiration Date
          </label>
          <input
            type="text"
            id="expDate"
            placeholder="MM/YY"
            className={`w-full rounded-lg border ${errors.expDate ? "border-red-500" : "border-gray-300"} p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("expDate", {
              required: "Expiration date is required",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                message: "Invalid format (MM/YY)",
              },
            })}
          />
          {errors.expDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.expDate.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-gray-700" htmlFor="cvv">
            Security Code
          </label>
          <input
            type="text"
            id="cvv"
            placeholder="CVV"
            className={`w-full rounded-lg border ${errors.cvv ? "border-red-500" : "border-gray-300"} p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("cvv", {
              required: "CVV is required",
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: "Invalid CVV format",
              },
            })}
          />
          {errors.cvv && (
            <p className="mt-1 text-sm text-red-500">{errors.cvv.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            `Pay ${formatCurrency(total)}`
          )}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
