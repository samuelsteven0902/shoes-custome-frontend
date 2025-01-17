import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Landing from "./component/landing/Landing"
import DefaultNavbar from "./component/layout/DefaultNavbar"
import DefaultFooter from "./component/layout/DefaultFooter"
import AddShoes from "./component/admin/AddShoes"
import ColorShoes from "./component/color_shoes/ColorShoes"
import CustomeShoe from "./component/custome_shoe/CustomeShoe"
import AddSticker from "./component/admin/AddSticker"
import Navbar from "./component/layout/Navbar"
import AddType from "./component/admin/AddType"
import CustomSize from "./component/custome-size/CustomSize"
import CustomType from "./component/custom_type/CustomType"
import MyShoeWithID from "./component/my_shoe/MyShoeWithID"
import MyShoe from "./component/my_shoe/MyShoe"

function App() {

  return (
    <>
      <Router>
          {/* <DefaultNavbar /> */}
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/custom-shoes" element={<ColorShoes />} />
          <Route exact path="/custom-shoe" element={<CustomeShoe />} />
          <Route exact path="/custom-type" element={<CustomType />} />
          <Route exact path="/custom-size" element={<CustomSize />} />
          <Route exact path="/my-shoe" element={<MyShoe />} />
          <Route exact path="/my-shoe/:id" element={<MyShoeWithID />} />
          <Route exact path="/dashboard/add-shoes" element={<AddShoes />} />
          <Route exact path="/dashboard/add-type" element={<AddType />} />
          <Route exact path="/dashboard/add-sticker" element={<AddSticker />} />
        </Routes>
          {/* <DefaultFooter /> */}
      </Router>
    </>
  )
}

export default App
