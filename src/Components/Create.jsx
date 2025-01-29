import React, { useContext, useState } from 'react'
import { ProductContext } from '../Utils/Context'
import { nanoid } from 'nanoid'

// Predefined categories matching your existing product categories
const PRODUCT_CATEGORIES = [
  "men's clothing", 
  "women's clothing", 
  "electronics", 
  "jewelery"
]

const Create = () => {
  const [products, setproducts] = useContext(ProductContext)

  // Form state
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  // Error state
  const [errors, setErrors] = useState({})

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
    
    // Create a new product object
    const newProduct = {
      id: nanoid(),
      title: title.trim(),
      image: image.trim(), 
      category,
      description: description.trim(),
      price: parseFloat(price)
    }

    // Update the products context with the new product
    setproducts([...products, newProduct])

    // Reset form fields
    setTitle("")
    setImage("")
    setCategory("")
    setPrice("")
    setDescription("")
    setErrors({})

  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center p-10'>
      <h1 className='text-4xl font-semibold mb-4 w-[55%]'>Add New Product</h1>
      <form onSubmit={handleFormSubmit} className='w-[60%] h-[70%] p-10 rounded border-zinc-300 border-2 flex flex-col gap-3'>
        {/* Title Input */}
        <div>
          <input 
            className={`w-full p-2 rounded text-xl border-none outline-none 
              ${errors.title ? 'bg-red-100' : 'bg-zinc-200 hover:bg-zinc-300'} 
              capitalize`} 
            type="text" 
            placeholder='Title' 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
          />
          {errors.title && <p className='text-red-600 text-sm mt-1'>{errors.title}</p>}
        </div>

        {/* Image URL Input */}
        <div>
          <input 
            className={`w-full p-2 rounded text-xl border-none outline-none 
              ${errors.image ? 'bg-red-100' : 'bg-zinc-200 hover:bg-zinc-300'} 
              capitalize`} 
            type="url" 
            placeholder='Image URL' 
            onChange={(e) => setImage(e.target.value)} 
            value={image}
          />
          {errors.image && <p className='text-red-600 text-sm mt-1'>{errors.image}</p>}
        </div>

        {/* Category and Price Inputs */}
        <div className='w-full flex justify-between'>
          {/* Category Dropdown */}
          <div className='w-[48%]'>
            <select 
              className={`w-full p-2 rounded text-xl border-none outline-none 
                ${errors.category ? 'bg-red-100' : 'bg-zinc-200 hover:bg-zinc-300'} 
                capitalize`} 
              onChange={(e) => setCategory(e.target.value)} 
              value={category}
            >
              <option value="">Select Category</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className='text-red-600 text-sm mt-1'>{errors.category}</p>}
          </div>

          {/* Price Input */}
          <div className='w-[48%]'>
            <input 
              className={`w-full p-2 rounded text-xl border-none outline-none 
                ${errors.price ? 'bg-red-100' : 'bg-zinc-200 hover:bg-zinc-300'} 
                capitalize`} 
              type="number" 
              placeholder='Price' 
              onChange={(e) => setPrice(e.target.value)} 
              value={price}
              min="0"
              step="0.01"
            />
            {errors.price && <p className='text-red-600 text-sm mt-1'>{errors.price}</p>}
          </div>
        </div>

        {/* Description Textarea */}
        <div>
          <textarea  
            onChange={(e) => setDescription(e.target.value)} 
            value={description}
            className={`text-xl rounded p-2 w-full 
              ${errors.description ? 'bg-red-100' : 'bg-zinc-200'} 
              outline-none`} 
            placeholder='Enter Product Description'
            rows="4"
          ></textarea>
          {errors.description && <p className='text-red-600 text-sm mt-1'>{errors.description}</p>}
        </div>

        {/* Submit Button */}
        <div className='flex items-center justify-center relative'>
          <button 
            type="submit"
            className='px-3 py-2 text-white mt-3 w-[60%] font-semi-bold capitalis border-2 bg-blue-600 hover:bg-blue-700 hover:text-white rounded-full'
          > 
            Add New Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create