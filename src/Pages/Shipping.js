import React from 'react'
import Header from '../components/Header'

const Shipping = () => {
    return (
        <section id="crud-modal" tabindex="-1" aria-hidden="true" class="transition-all flex-col duration-500 flex justify-center items-center w-full md:inset-0 h-full max-h-full">
        <Header />
            <div class="relative p-4 w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div class="relative bg-white rounded-lg shadow">
                    {/* <!-- Modal header --> */}
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 class="text-lg font-semibold text-gray-900 ">
                            Shipping Details
                        </h3>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form class="p-4 md:p-5">
                        <div class="grid gap-4 mb-4 grid-cols-2">
                            <div class="col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name" required="" />
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                                <input type="number" name="phoneNumber" id="phoneNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="+23***4545**" required="" />
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900"> Full Name</label>
                                <input type="text" name="lastName" id="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Tomiwa David" required="" />
                            </div>
                            <div class="col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Residential Address</label>
                                <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="G15 ojabalu streeet..." required="" />
                            </div>
                            <div class="col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Country / Region</label>
                                <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="United Kingdom" required="" />
                            </div>
                            <div class="col-span-2">
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional Details</label>
                                <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Add any additional details"></textarea>
                            </div>
                        </div>
                        <button class="text-white inline-flex items-center bg-black focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Checkout
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Shipping
