import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../Utils/Context'
import Loading from './Loading'
import axios from '../Utils/Axios'

const Home = () => {
  const [products] = useContext(ProductContext) 
  const { category } = useParams()
  const navigate = useNavigate()

  const [filterProducts, setfilterProducts] = useState(null)

  const getproductCategory = async (categoryName)=>{
    try {
      const {data} = await axios.get(`/products/category/${categoryName}`)
      setfilterProducts(data)
    } catch (error) {
      console.log(error)
      // Redirect to home if category not found
      navigate('/')
    }
  };

  useEffect(()=>{
    if (!category || category === 'undefined') {
      setfilterProducts(products)
    } else {
      getproductCategory(category)
    }
  },[category, products, navigate])

  return (products ? 
    <div className='w-full h-full flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start overflow-x-hidden overflow-y-auto p-4 sm:p-5'>
      {filterProducts && filterProducts.map((item) => (
        <div 
          key={item.id} 
          className='w-[calc(50%-1rem)] sm:w-[calc(33.333%-1.5rem)] md:w-[calc(25%-1.5rem)] lg:w-[calc(20%-1.5rem)] 
          bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 
          hover:shadow-2xl hover:scale-105 transform mb-4'
        >
          <Link to={`/details/${item.id.toString()}`} className='block h-full'>
            <div className='h-[200px] sm:h-[250px] overflow-hidden flex items-center justify-center bg-gray-100'>
              <img 
                className='w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-110' 
                src={item.image} 
                alt={item.title} 
              />
            </div>
            <div className='p-3 sm:p-4'>
              <h2 className='text-sm sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-10 sm:h-12 overflow-hidden'>
                {item.title}
              </h2>
              <div className='flex justify-between items-center'>
                <span className='text-blue-600 font-semibold text-base sm:text-xl'>
                  ${item.price.toFixed(2)}
                </span>
                <span className='text-xs sm:text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full'>
                  {item.category}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div> 
    : <Loading/>
  )
}

export default Home