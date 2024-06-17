import React,{useEffect} from 'react'

function State() {
  useEffect(() => {
  

    const fetchData = async () => {
    
      try {
        const response = await fetch("http://127.0.0.1:8000/api/indextotell");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

       const data = response.data
console.log(data)
      
      } catch (error) {
     
        console.error("Error fetching data:", error);
      } finally {
        console.log("there is error ")
      }
    };

    fetchData();
  }, []);
  return (
    <div className='flex justify-center'>
<section className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 py-7 sm:px-6 md:py-8 lg:px-8">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">platform Analysis</h2>
    
    </div>
    <div className="mt-8 sm:mt-12">
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-100">
        <div className="flex flex-col px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">Les Domonde</dt>
          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">400</dd>
        </div>
        <div className="flex flex-col px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">Les Reclamation</dt>
          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">75</dd>
        </div>
        <div className="flex flex-col px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">Les Ajouns</dt>
          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">12</dd>
        </div>
      </dl>
    </div>
  </div>
</section>

    </div>
  )
}

export default State
