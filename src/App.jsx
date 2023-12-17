import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Landing from "./component/landing/Landing"
import DefaultNavbar from "./component/layout/DefaultNavbar"
import DefaultFooter from "./component/layout/DefaultFooter"
import AddShoes from "./component/admin/AddShoes"
import ColorShoes from "./component/color_shoes/ColorShoes"
import CustomeShoe from "./component/custome_shoe/CustomeShoe"
import AddSticker from "./component/admin/AddSticker"

function App() {

  return (
    <>
      <Router>
          <DefaultNavbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/custome-shoes" element={<ColorShoes />} />
          <Route exact path="/custome-shoe" element={<CustomeShoe />} />
          <Route exact path="/dashboard/add-shoes" element={<AddShoes />} />
          <Route exact path="/dashboard/add-sticker" element={<AddSticker />} />
        </Routes>
          <DefaultFooter />
      </Router>
    </>
  )
}

export default App
