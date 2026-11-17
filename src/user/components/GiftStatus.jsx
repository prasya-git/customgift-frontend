
import React from 'react'
import {
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaBox,
  FaTimesCircle
} from 'react-icons/fa'

function GiftStatus({ status }) {

  const stages = [
    { name: 'Order Placed', icon: <FaCheckCircle /> },
    { name: 'Processing', icon: <FaClock /> },
    { name: 'Shipped', icon: <FaTruck /> },
    { name: 'Delivered', icon: <FaBox /> }
  ]

  const currentIndex = stages.findIndex(
    item => item.name === status
  )

  // Cancelled Order
  if (status === 'Cancelled') {
    return (
      <div className="mt-5 flex items-center gap-4 bg-red-50 border border-red-200 text-red-700 p-5 rounded-2xl">

        <div className="w-12 h-12 shrink-0 rounded-full bg-red-100 flex items-center justify-center">
          <FaTimesCircle className="text-2xl" />
        </div>

        <div>
          <h3 className="font-bold text-base">
            Order Cancelled
          </h3>

          <p className="text-sm text-red-600 mt-1">
            This order has been cancelled.
          </p>
        </div>

      </div>
    )
  }

  // Order Progress
  return (
    <div className="mt-6 bg-[#fffafb] border border-[#f3e3e8] rounded-2xl p-5 md:p-6">

      <div className="flex justify-between items-center mb-7">
        <h3 className="font-bold text-[#3b202b]">
          Track Your Order
        </h3>

        {currentIndex !== -1 && (
          <span className="text-xs font-semibold bg-[#fbe8ed] text-[#872d4c] px-3 py-1.5 rounded-full">
            {currentIndex + 1} of {stages.length} Steps
          </span>
        )}
      </div>

      <div className="flex items-start justify-between">

        {stages.map((stage, index) => {

          const completed = currentIndex >= index
          const isCurrent = currentIndex === index
          const isLast = index === stages.length - 1

          return (
            <React.Fragment key={stage.name}>

              {/* Stage */}
              <div className="flex-1 flex flex-col items-center text-center min-w-0">

                <div
                  className={`relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-lg transition-all duration-300 ${
                    completed
                      ? 'bg-[#872d4c] text-white shadow-md shadow-[#872d4c]/20'
                      : 'bg-[#f1e9ec] text-[#b69aa4]'
                  } ${
                    isCurrent
                      ? 'ring-4 ring-[#f5dce4]'
                      : ''
                  }`}
                >
                  {stage.icon}
                </div>

                <p
                  className={`text-[10px] sm:text-xs md:text-sm mt-3 leading-5 ${
                    completed
                      ? 'text-[#872d4c] font-bold'
                      : 'text-[#a1848e] font-medium'
                  }`}
                >
                  {stage.name}
                </p>

                {isCurrent && (
                  <span className="text-[9px] md:text-[10px] text-[#b45b78] font-semibold mt-1">
                    Current
                  </span>
                )}

              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div className="flex-1 mt-5 md:mt-6 h-1 rounded-full bg-[#eadce1] overflow-hidden mx-1">

                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      currentIndex > index
                        ? 'w-full bg-[#872d4c]'
                        : 'w-0'
                    }`}
                  />

                </div>
              )}

            </React.Fragment>
          )
        })}

      </div>

      {/* Status Message */}
      <div className="mt-7 pt-5 border-t border-[#f1e3e7] text-center">

        {currentIndex === 0 && (
          <p className="text-sm text-[#987985]">
            Your order has been placed successfully. We'll start preparing it soon!
          </p>
        )}

        {currentIndex === 1 && (
          <p className="text-sm text-[#987985]">
            Your gift is being carefully prepared.
          </p>
        )}

        {currentIndex === 2 && (
          <p className="text-sm text-[#987985]">
            Your gift is on its way. Get ready to receive it!
          </p>
        )}

        {currentIndex === 3 && (
          <p className="text-sm text-[#987985] font-semibold">
            Your gift has been delivered. Hope you love it!
          </p>
        )}

        {currentIndex === -1 && (
          <p className="text-sm text-[#987985]">
            Order status: {status || 'Not available'}
          </p>
        )}

      </div>

    </div>
  )
}

export default GiftStatus

