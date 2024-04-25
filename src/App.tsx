import { useState } from "react";
import AvgYieldTable from "./components/AvgYieldTable"
import YearlyCropsTable from "./components/YearlyCropsTable"
import '@mantine/core/styles.css';
import { Title } from "@mantine/core";

function App() {

  const [toggle,setToggle] = useState(false)

  return (
    <>
    <div className="main-container">
      <div className="container-heading">
      <Title>Dataset Analysis</Title>
      <button onClick={() => setToggle(prev => !prev)}>{toggle ? 'Next' : 'Prev'}</button>
      </div>
      <div className="container-content">
        {toggle ? <YearlyCropsTable/> : <AvgYieldTable/>}
      </div>
    </div>
    </>
  )
}

export default App
