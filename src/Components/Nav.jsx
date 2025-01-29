import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../Utils/Context'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [products] = useContext(ProductContext);
  
  // Safely get unique categories
  const distingCatogory = products 
    ? [...new Set(products.map(p => p.category))]
    : [];
  
  return (
    <div className='relative h-full'>
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded-md'
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      {/* Navigation */}
      <nav className={`
        fixed md:static inset-y-0 left-0 w-64 md:w-full h-full bg-white shadow-lg 
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        z-40 flex flex-col items-start justify-start p-4 border-r border-gray-200 overflow-y-auto
      `}>
        <Link 
          to="/Create" 
          className='w-full mb-6 px-4 py-3 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg 
          transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg 
          flex items-center justify-center space-x-2'
        > 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Add New Product</span>
        </Link>
      
        <div className='w-full'>
          <h1 className='text-xl font-semibold text-gray-700 mb-4 text-left border-b pb-2'>Categories</h1>
          <div className='space-y-2'>
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className='w-full block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg 
              transition-all duration-300 ease-in-out flex items-center space-x-3 hover:text-blue-600'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>All Products</span>
            </Link>

            {distingCatogory.map((c, i) => (
              <Link
                key={i} 
                to={`/category/${c}`}
                onClick={() => setIsMenuOpen(false)}
                className='w-full block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg 
                transition-all duration-300 ease-in-out flex items-center space-x-3 hover:text-blue-600 capitalize'
              >
                <div className='w-3 h-3 bg-blue-500 rounded-full mr-3'></div>
                {c}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          onClick={() => setIsMenuOpen(false)}
          className='fixed inset-0 bg-black opacity-50 z-30 md:hidden'
        />
      )}
    </div>
  )
}

export default Nav