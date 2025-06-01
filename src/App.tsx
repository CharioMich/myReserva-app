import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from "./components/Home.tsx";

function App() {

  return (
    <>
      <main className="bg-gray-300 h-screen ">
        <Nav />
        <Home />
        <Footer />
      </main>

    </>
  )
}

export default App
