import React from 'react'
import { FaCheckCircle, FaClock, FaTruck, FaBox } from 'react-icons/fa'

function GiftStatus({ status }) {
  const stages = [
    { name: 'Order Placed', icon: <FaCheckCircle /> },
    { name: 'Processing', icon: <FaClock /> },
    { name: 'Shipped', icon: <FaTruck /> },
    { name: 'Delivered', icon: <FaBox /> }
  ]

  const currentIndex = stages.findIndex(item => item.name === status)

  return (
    <div className="flex items-center justify-between gap-2 mt-6">

      {stages.map((stage, index) => {
        const completed = currentIndex >= index

        return (
          <div key={stage.name} className="flex-1 text-center">

            <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center ${
              completed
                ? 'bg-rose-700 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}>
              {stage.icon}
            </div>

            <p className={`text-xs mt-2 ${
              completed ? 'text-rose-700 font-semibold' : 'text-gray-400'
            }`}>
              {stage.name}
            </p>

          </div>
        )
      })}

    </div>
  )
}

export default GiftStatus