import React from "react";
import Draggable from "react-draggable";

class DraggableTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Draggable handle=".handle">
        <div className="w-[29px] h-[119px] rounded-[4.33px] absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col bg-[#C3C3C3] opacity-[60%] items-center">
          <div className="handle w-full border-b-2 border-black  flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mb-[8px] mt-[10px]" width="1em" height="1em" viewBox="0 0 256 256">
              <path fill="black" d="M76 92a16 16 0 1 1-16-16a16 16 0 0 1 16 16m52-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 32a16 16 0 1 0-16-16a16 16 0 0 0 16 16M60 148a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16"/>
            </svg>
          </div>
    
          <svg xmlns="http://www.w3.org/2000/svg" className = "mt-[8px]"width="1em" height="1em" viewBox="0 0 32 32">
            <path fill="black" d="M21.25 8.375V28h6.5V8.375zM12.25 28h6.5V4.125h-6.5zm-9 0h6.5V12.625h-6.5z"/>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" className = "mt-[8px]" width="1em" height="1em" viewBox="0 0 1024 1024">
            <path fill="black" d="M863.1 518.5H505.5V160.9c0-4.4-3.6-8-8-8h-26a398.57 398.57 0 0 0-282.5 117a397.5 397.5 0 0 0-85.6 127C82.6 446.2 72 498.5 72 552.5S82.6 658.7 103.4 708c20.1 47.5 48.9 90.3 85.6 127s79.4 65.5 127 85.6a396.6 396.6 0 0 0 155.6 31.5a398.57 398.57 0 0 0 282.5-117c36.7-36.7 65.5-79.4 85.6-127a396.6 396.6 0 0 0 31.5-155.6v-26c-.1-4.4-3.7-8-8.1-8M951 463l-2.6-28.2c-8.5-92-49.3-178.8-115.1-244.3A398.5 398.5 0 0 0 588.4 75.6L560.1 73c-4.7-.4-8.7 3.2-8.7 7.9v383.7c0 4.4 3.6 8 8 8l383.6-1c4.7-.1 8.4-4 8-8.6"/>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" className = "mt-[8px]" width="1em" height="1em" viewBox="0 0 256 256">
            <path fill="black" d="M236 208a12 12 0 0 1-12 12H32a12 12 0 0 1-12-12V48a12 12 0 0 1 24 0v85.55L88.1 95a12 12 0 0 1 15.1-.57l56.22 42.16L216.1 87a12 12 0 1 1 15.8 18l-64 56a12 12 0 0 1-15.1.57l-56.22-42.13L44 165.45V196h180a12 12 0 0 1 12 12"/>
          </svg>
        </div>
      </Draggable>
    );
  }
}

export default DraggableTools;
