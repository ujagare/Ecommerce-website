import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../Utils/Context'

const Edit = () => {
  const [products, setProducts] = useContext(ProductContext)

  // Form state
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  // Error state
  const [errors, setErrors] = useState({})

  // Predefined categories matching your existing product categories
  const PRODUCT_CATEGORIES = [
    "men's clothing", 
    "women's clothing", 
    "electronics", 
    "jewelery"
  ]

  // Load product data on component mount
  useEffect(() => {
    const productToEdit = products.find(p => p.id === id)
    if (productToEdit) {
      setTitle(productToEdit.title)
      setImage(productToEdit.image)
      setCategory(productToEdit.category)
      setPrice(productToEdit.price.toString())
      setDescription(productToEdit.description)
    } else {
      // If product not found, redirect to home
    }
  }, [id, products])

  // Validation function
  const validateForm = () => {
    const newErrors = {}

    // Title validation
    if (!title.trim()) {
      newErrors.title = "Product title is required"
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters long"
    }

    // Image URL validation
    if (!image.trim()) {
      newErrors.image = "Image URL is required"
    } else {
      const urlPattern = /^(https?:\/\/).*\.(jpg|jpeg|png|gif|webp)$/i
      if (!urlPattern.test(image)) {
        newErrors.image = "Please enter a valid image URL (ending with .jpg, .png, etc.)"
      }
    }

    // Category validation
    if (!category) {
      newErrors.category = "Please select a category"
    }

    // Price validation
    if (!price) {
      newErrors.price = "Price is required"
    } else {
      const priceNum = parseFloat(price)
      if (isNaN(priceNum) || priceNum <= 0) {
        newErrors.price = "Price must be a positive number"
      }
    }

    // Description validation
    if (!description.trim()) {
      newErrors.description = "Product description is required"
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }
    
    // Update the product in the context
    const updatedProducts = products.map(p => 
      p.id === id 
        ? {
            ...p, 
            title: title.trim(),
            image: image.trim(), 
            category,
            description: description.trim(),
            price: parseFloat(price)
          }
        : p
    )

    // Update the products context
    setProducts(updatedProducts)

  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center p-4 sm:p-6'>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg p-6'>
        <h1 className='text-2xl font-bold mb-6 text-center text-gray-800'>Edit Product</h1>
        
        <form onSubmit={handleFormSubmit} className='space-y-4'>
          <div>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700'>Title</label>
            <input 
              type='text' 
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
              placeholder='Enter product title'
              required
            />
            {errors.title && <p className='text-red-600 text-sm mt-1'>{errors.title}</p>}
          </div>

          <div>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
            <textarea 
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
              placeholder='Enter product description'
              rows='3'
              required
            />
            {errors.description && <p className='text-red-600 text-sm mt-1'>{errors.description}</p>}
          </div>

          <div>
            <label htmlFor='price' className='block text-sm font-medium text-gray-700'>Price</label>
            <input 
              type='number' 
              id='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
              placeholder='Enter product price'
              min='0'
              step='0.01'
              required
            />
            {errors.price && <p className='text-red-600 text-sm mt-1'>{errors.price}</p>}
          </div>

          <div>
            <label htmlFor='image' className='block text-sm font-medium text-gray-700'>Image URL</label>
            <input 
              type='url' 
              id='image'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
              placeholder='Enter image URL'
              required
            />
            {errors.image && <p className='text-red-600 text-sm mt-1'>{errors.image}</p>}
          </div>

          <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-700'>Category</label>
            <select
              id='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
              required
            >
              <option value="">Select a category</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className='text-red-600 text-sm mt-1'>{errors.category}</p>}
          </div>

          <div className='flex justify-between space-x-4'>
            <button 
              type='submit' 
              className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors'
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit
