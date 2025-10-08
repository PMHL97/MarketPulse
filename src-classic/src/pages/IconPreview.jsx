import React from 'react'
import TraceIcon from '../components/TraceIcon'

const IconPreview = () => {
  const sizes = ['Small', 'Medium', 'Large', 'Extra Large']
  const sizeClasses = ['w-4 h-4', 'w-6 h-6', 'w-8 h-8', 'w-12 h-12']
  
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-8 text-center">Trace Icon Preview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sizes.map((size, index) => (
            <div key={index} className="text-center">
              <div className="bg-secondary-50 rounded-lg p-8 mb-4">
                <TraceIcon 
                  className={`${sizeClasses[index]} mx-auto`}
                />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">{size}</h3>
              <p className="text-sm text-secondary-600 mb-4">Size: {sizeClasses[index]}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-secondary-600 mb-4">Current logo implementation</p>
          <div className="flex justify-center space-x-4">
            <div className="bg-secondary-50 rounded-lg p-4">
              <TraceIcon className="w-12 h-12" />
            </div>
          </div>
          <p className="text-sm text-secondary-500 mt-4">
            The trace icon includes multiple layered paths with different colors (#305141, #799280, #66806d, #4e6c5b, #fafbfa)
          </p>
        </div>
      </div>
    </div>
  )
}

export default IconPreview
