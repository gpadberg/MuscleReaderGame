import * as React from "react"



export default function ResultsPage(props) {
    return(<div class="bg-black text-white min-h-screen">
    <div class="flex justify-between w-full px-96 pt-8">
    <a href="#" class="text-white mb-2">Home</a>
      <a href="#" class="text-white mb-2">Phobia Definitions</a>
      <a href="#" class="text-white mb-2">About Us</a>
      <a href="#" class="text-white mb-2">What's Next?</a>
    </div>
    <div class="text-center mt-28">
      <div class="flex justify-center items-center space-x-5 mb-8">
        <img alt="Logo" src="/phobiatestlogo.png" class="w-[30rem] h-[20rem] mb-6"></img>
      </div>
      <h1 class="text-5xl font-bold mb-14">Your Results</h1>
      <ul class="text-xl mr-6 ml-6 mb-2">
        <li>placehold</li>
        <li>placehold</li>
        <li>placehold</li>
        <li>placehold</li>
        <li>placehold</li>
        <li>placehold</li>
        </ul>
    </div>
  </div>
    )
}