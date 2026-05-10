
import { MainSection } from './Screens/Main/Main'
import "./App.css"
import { About } from './Screens/About/About'
import { Appointment } from './Screens/Appointment/Appointment'
import FAQSection from './Screens/Faqs/Faqs'
import Footer from './Screens/Footer/Footer'
import {Toaster} from "react-hot-toast"
import { Layout } from './Screens/Layout/Layout'

function App() {



  return (
    <>
      <div className=''  >
        <Toaster/>
        <Layout>
          <MainSection />
          <About />
          <Appointment />
          <FAQSection />
          <Footer />
          
        </Layout>
      </div>

    </>
  )
}

export default App
