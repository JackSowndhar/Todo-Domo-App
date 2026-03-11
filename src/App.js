import React from 'react'
import Method from "./components/Method/Method.jsx"
import Edit from "./components/Edit/Edit.jsx"
import Cardpage from "./components/Card/Cardpage.jsx"
import Add from "./components/Add/Add.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="m-0 min-h-screen font-[Poppins] bg-gradient-to-br from-[#1d5345] to-[#164236]" >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Method />} />
          <Route path="/cardpage/:id" element={<Cardpage />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App