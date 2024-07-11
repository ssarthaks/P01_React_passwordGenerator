import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState()
  const resetPass = ""

  const resetPassword = () => {
    setPassword(resetPass)
  }

  //useRef hook example
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$*()^<>?][}{"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)      
    }

    setPassword(pass)

  },[length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    //only first 3 numbers are selected
    //passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <h1 className="text-4xl text-center mt-5 text-white">Password Generator Through React using Hooks</h1>
      <div className="w-full max-w-xl mx-auto py-5 px-10 shadow-md rounded-xl my-8 text-orange-500 bg-gray-700">
        <h1 className="mb-4 text-center">Password Generated Below </h1>
        
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
          <input 
            type="text" 
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Generator Password Here"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="bg-neutral-800 px-5 p-3 hover:bg-slate-700 duration-400">Copy</button>
        </div>
        
        <div className="flex text-sm gap-x-2 ">
          <div className="flex items-center gap-x-1">
            <input 
              type="range" 
              min={5} 
              max={20} 
              value={length} 
              className="cursor-pointer" 
              onChange={(e) => {setLength(e.target.value)}}
            />

            <label className="mx-6">Length: {length}</label>
          </div>

          <div className="flex text-sm gap-x-2 mx-6">
            <input 
              type="checkbox" 
              defaultChecked={numberAllowed}
              id="numberInput"
              //true and false is flipped 
              onChange={() => {setNumberAllowed((prev) => !prev)}}
            />
            <label htmlFor="">Numbers</label>
          </div>

          <div className="flex text-sm gap-x-2 ">
            <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id="chatInput"
              onChange={() => {setCharAllowed((prev) => !(prev))}} 
            />
            <label htmlFor="">Characters</label>
          </div>
        </div>
        <div className="flex mt-5 justify-center gap-6">
            <button onClick={passwordGenerator} className="bg-slate-800 p-2 rounded-3xl px-7">Generate</button>
            <button onClick={resetPassword} className="bg-slate-800 p-2 rounded-3xl px-7">Reset</button>
        </div>
      </div>

    </>
  )
}

export default App
