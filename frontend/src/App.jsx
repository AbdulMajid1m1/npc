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

                <Route path="Language/Dynamic" element={<LaanguageChange />} />
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