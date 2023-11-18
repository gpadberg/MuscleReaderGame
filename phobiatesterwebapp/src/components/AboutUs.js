import * as React from "react"



export default function StartPage(props) {
    return(<div class="bg-black text-white min-h-screen">
    <div class="flex justify-between w-full px-96 pt-8">
      <a href="#" class="text-white mb-2">Home</a>
      <a href="#" class="text-white mb-2">Phobia Definitions</a>
      <a href="#" class="text-white mb-2">What's Next?</a>
    </div>
    <div class="text-center mt-28">
      <div class="flex justify-center items-center space-x-5 mb-8">
        <img alt="Logo" src="/phobiatestlogo.png" class="w-[30rem] h-[20rem] mb-6"></img>
      </div>
      <h1 class="text-5xl font-bold mb-14">About Us</h1>
      <p class="text-xl mr-14 ml-14 mb-14">We are a team of five students from the University of Alberta. We came together to create this project during the 2023 natHacks Hackathon with the idea of researching heart rate responses to stimuli.</p>
    </div>
  </div>
    )
}