import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Sidebar from "./components/Sidebar/Sidebar";
import DataTableProvider from "./Contexts/DataTableContext";
import GTIN from "./Pages/MemberPages/GTIN/GTIN";
import GTINAddProducts from "./Pages/MemberPages/GTINAddProducts/GTINAddProducts";
import GTINUpdateProducts from "./Pages/MemberPages/GTINAddProducts/GTINUpdateProducts";
import GTINViewProduct from "./Pages/MemberPages/GTINAddProducts/GTINViewProduct";
import MapProvider from "./Contexts/EventMapContext";
import { LanguageProvider } from "./Contexts/LanguageContext.jsx";
import MemberLogin from "./Pages/MemberPages/MemberLogin/EmailAddress/MemberLogin.jsx";
import SelectGln from "./Pages/MemberPages/MemberLogin/EmailAddress/SelectGln.jsx";
import MemberNewDashboard from "./Pages/MemberPages/MemberDashboard/MemberNewDashboard.jsx";
import ItemSearchScreen from "./Pages/MemberPages/ItemSearchScreen/ItemSearchScreen.jsx";
import StatusSearchScreen from "./Pages/MemberPages/StatusSearchScreen/StatusSearchScreen.jsx";
import AdvanceSearch from "./Pages/MemberPages/StatusSearchScreen/AdvanceSearch.jsx";
import SearchProfile from "./Pages/MemberPages/StatusSearchScreen/SearchProfile.jsx";
import LaanguageChange from "./Pages/AdminPages/MasterData/LanguageChange/LaanguageChange"
import Users from "./Pages/AdminPages/MasterData/Users/Users";
import AddUsers from "./Pages/AdminPages/MasterData/Users/AddUsers";
import UpdateUsers from "./Pages/AdminPages/MasterData/Users/UpdateUsers";
import Roles from "./Pages/AdminPages/MasterData/Roles/Roles"
import AddRoles from "./Pages/AdminPages/MasterData/Roles/AddRoles";
import UpdateRoles from "./Pages/AdminPages/MasterData/Roles/UpdateRoles";
import Units from "./Pages/AdminPages/MasterData/Units/Units.jsx";
import Documents from "./Pages/AdminPages/MasterData/document/document.jsx";
import ProductPackaging from "./Pages/AdminPages/MasterData/productPackaging/productPackaging.jsx";
import Other_products from "./Pages/AdminPages/MasterData/other_product/other_product.jsx";
import Gcp_type from "./Pages/AdminPages/MasterData/gcp_type/gcp_type.jsx";
import CountryofSales from "./Pages/AdminPages/MasterData/countryofsale/countryofsale";
import Hscode from "./Pages/AdminPages/MasterData/hscode/hscode";
import UNSPCS from "./Pages/AdminPages/MasterData/UNSPCS/UNSPCS";
import Cities from "./Pages/AdminPages/MasterData/city/cities";
import State from "./Pages/AdminPages/MasterData/state/state";
import Country from "./Pages/AdminPages/MasterData/country/country";
import Crnumber from "./Pages/AdminPages/MasterData/crnumber/crnumber";
import Document_type from "./Pages/AdminPages/MasterData/documentype/documenttype";
import AdminNewsLetter from "./Pages/AdminPages/MasterData/NewsLetter/NewsLetter.jsx";
import EmailConfigure from "./Pages/AdminPages/MasterData/EmailSettings/EmailConfigure.jsx";

const App = () =>
{
  // const MainLayout = ({ children }) =>
  // {
  //   return (
  //     <div className="main-layout-container">
  //       <Sidebar />
  //       <span className="right-layout">{children}</span>
  //     </div>
  //   );
  // };


  return (
    <>
      {/* <AuthProvider> */}
      <LanguageProvider>
        <DataTableProvider>
          <div>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MemberLogin />} />
                <Route path="/select-gln" element={<SelectGln />} />

                <Route path="dashboard" element={<MemberNewDashboard />} />
                <Route path="gtin" element={<GTIN />} />
                <Route
                  path="Item-Search-Screen"
                  element={<ItemSearchScreen />}
                />
                <Route
                  path="Status-Search-Screen"
                  element={<StatusSearchScreen />}
                />
                <Route path="advance-search" element={<AdvanceSearch />} />
                <Route path="search-profile" element={<SearchProfile />} />

                {/* Master Data */}
                <Route path="Language/Dynamic" element={<LaanguageChange />} />
                <Route path="Users" element={<Users />} />
                <Route path="add-users" element={<AddUsers />} />
                <Route path="update-users/:id" element={<UpdateUsers />} />

                <Route path="Role" element={<Roles />} />
                <Route path="add-roles" element={<AddRoles />} />
                <Route path="update-roles/:id" element={<UpdateRoles />} />

                <Route path="Units" element={<Units />} />
                <Route path="Documents" element={<Documents />} />
                <Route path="ProductPackaging" element={<ProductPackaging />} />
                <Route path="Other_products" element={<Other_products />} />
                <Route path="Gcp_type" element={<Gcp_type />} />
                <Route path="CountryofSales" element={<CountryofSales />} />
                <Route path="Hscode" element={<Hscode />} />
                <Route path="UNSPCS" element={<UNSPCS />} />
                <Route path="Cities" element={<Cities />} />
                <Route path="State" element={<State />} />
                <Route path="Country" element={<Country />} />
                <Route path="crnumber" element={<Crnumber />} />
                <Route path="documenttype" element={<Document_type />} />
                <Route path="news-letter" element={<AdminNewsLetter />} />
                <Route path="EmailConfigure" element={<EmailConfigure />} />
              </Routes>
            </BrowserRouter>
          </div>
        </DataTableProvider>
      </LanguageProvider>
      {/* </AuthProvider> */}
    </>
  );
};

export default App;