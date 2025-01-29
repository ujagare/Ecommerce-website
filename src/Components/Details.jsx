import React, { useContext, useEffect, useState }  from 'react'
import Loading from './Loading'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../Utils/Context'

const Details = () => {
  const [products] = useContext(ProductContext)
  const [singleProduct, setSingleProduct] = useState(null)
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // Find the specific product from the context
    // Use loose equality to handle different ID types
    const foundProduct = products.find(p => 
      p.id == id || // Loose comparison to handle string/number mismatch
      p.id === id || 
      p.id.toString() === id
    )

    if (foundProduct) {
      setSingleProduct(foundProduct)
    } else {
      // If no product found, redirect to home
      navigate('/')
    }
  }, [id, products, navigate])

  const handleEdit = () => {
    // Navigate to edit page with product details
    navigate(`/edit/${id}`)
  }

  const handleDelete = () => {
    // Confirm deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this product?")
    
    if (confirmDelete) {
      // Filter out the product to be deleted
      const updatedProducts = products.filter(p => 
        p.id != id && // Loose comparison
        p.id !== id && 
        p.id.toString() !== id
      )
      
      // Navigate back to home
      navigate('/')
    }
  }

  // Add error boundary for additional safety
  if (!products || products.length === 0) {
    return <Loading />
  }

  return (singleProduct ? 
    <div className='flex flex-col items-center justify-center w-full min-h-screen p-4 sm:p-6'>
      <h1 className='font-semibold text-2xl sm:text-3xl capitalize mb-3 text-zinc-500'>Product Details</h1>
      
      <div className='w-full max-w-4xl flex flex-col md:flex-row items-center justify-center border-zinc-300 rounded-md border-2 overflow-hidden'>
        <div className='w-full md:w-1/2 flex items-center justify-center h-[300px] sm:h-[400px] p-4 bg-gray-100'>
          <img 
            className='w-full h-full object-contain' 
            src={singleProduct.image} 
            alt={singleProduct.title} 
          />
        </div>
        <div className='w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-center'>
          <h1 className='text-lg sm:text-2xl font-semibold mb-2 capitalize'>{singleProduct.title}</h1>
          <h2 className='font-semibold text-base sm:text-xl mb-2 capitalize text-gray-600'>{singleProduct.category}</h2>
          <h2 className='font-semibold text-blue-500 text-lg sm:text-2xl mb-2 capitalize'>Price: ${singleProduct.price}</h2>
          <p className='capitalize font-medium text-sm sm:text-base text-zinc-500 mb-4'>{singleProduct.description}</p>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-5'>
            <button 
              onClick={handleEdit}
              className='w-full sm:w-auto px-4 py-2 text-blue-400 font-semibold capitalize border-2 border-blue-300 rounded-md hover:bg-blue-50 transition-all'
            >
              Edit
            </button>
            <button 
              onClick={handleDelete}
              className='w-full sm:w-auto px-4 py-2 text-red-400 font-semibold capitalize border-2 border-red-300 rounded-md hover:bg-red-50 transition-all'
            > 
              Delete
            </button>
          </div>
        </div>
      </div>
      <button 
        onClick={() => navigate(-1)} 
        className='px-5 py-2 border-blue-600 border-2 font-semibold text-blue-600 rounded-full mt-4 hover:bg-blue-50 transition-all'
      >
        Back
      </button>
    </div> 
    : <Loading/>
  )
}

export default Details