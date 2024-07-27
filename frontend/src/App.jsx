import React, { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import DataTableProvider from "./Contexts/DataTableContext";
import GTIN from "./Pages/MemberPages/GTIN/GTIN";
import { LanguageProvider } from "./Contexts/LanguageContext.jsx";
import MemberLogin from "./Pages/MemberPages/MemberLogin/EmailAddress/MemberLogin.jsx";
import SelectGln from "./Pages/MemberPages/MemberLogin/EmailAddress/SelectGln.jsx";
import MemberNewDashboard from "./Pages/MemberPages/MemberDashboard/MemberNewDashboard.jsx";
import ItemSearchScreen from "./Pages/MemberPages/ItemSearchScreen/ItemSearchScreen.jsx";
import StatusSearchScreen from "./Pages/MemberPages/StatusSearchScreen/StatusSearchScreen.jsx";
import AdvanceSearch from "./Pages/MemberPages/StatusSearchScreen/AdvanceSearch.jsx";
import SearchProfile from "./Pages/MemberPages/StatusSearchScreen/SearchProfile.jsx";
import LaanguageChange from "./Pages/AdminPages/MasterData/LanguageChange/LaanguageChange";
import Users from "./Pages/AdminPages/MasterData/Users/Users";
import AddUsers from "./Pages/AdminPages/MasterData/Users/AddUsers";
import UpdateUsers from "./Pages/AdminPages/MasterData/Users/UpdateUsers";
import Roles from "./Pages/AdminPages/MasterData/Roles/Roles";
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
import SideNav from "./components/Sidebar/SideNav.jsx";
import GLN from "./Pages/MemberPages/GLN/GLN.jsx";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar.jsx";
import Dashboard from "./Pages/AdminPages/Dashboard/Dashboard.jsx";
import AdminLogin from "./Pages/AdminPages/AdminLogin/AdminLogin.jsx";
import { useTranslation } from "react-i18next";
import GlobalProductRegistry from "./Pages/AdminPages/NpcRegistry/GlobalProductRegistry/GlobalProductRegistry.jsx";
import LocalProductRegistry from "./Pages/AdminPages/NpcRegistry/LocalProductRegistry/LocalProductRegistry.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header/Header.jsx";
import HeaderLine from "./components/Header/HeaderLine.jsx";
import HomePage from "./Pages/UserPages/HomePage/HomePage.jsx";
import NewFooter from "./components/Footer/NewFooter.jsx";

const queryClient = new QueryClient();

const App = () => {
  
  const { t, i18n } = useTranslation();
  const MainLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSideNav = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="main-layout-container">
        <SideNav isOpen={isOpen} toggleSideNav={toggleSideNav} />
        <div
          className={`transition-all duration-300 ${
            isOpen ? `${i18n.language==='ar'?'lg:mr-[300px]':'lg:ml-[300px]'}` : "lg:ml-0"
          } `}
        >
          {children}
        </div>
      </div>
    );
  };

  const UserLayout = () => {
    return (
      <div>
        <div>
          <HeaderLine />
        </div>
        <div className="sticky top-0 z-50 bg-white">
          <Header />
        </div>
        <QueryClientProvider client={queryClient}>
        <main className="mx-auto flex max-w-[1760px] flex-col justify-center">
          <Outlet /> {/* Nested routes will render here */}
        </main>
        </QueryClientProvider>
        {/* <Footer /> */}
        <NewFooter />
      </div>
    );
  };

  const AdminMainLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSideNav = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="main-layout-container">
        <AdminSidebar isOpen={isOpen} toggleSideNav={toggleSideNav} />
        <div
          className={`transition-all duration-300 ${
            isOpen ? `${i18n.language==='ar'?'lg:mr-[300px]':'lg:ml-[300px]'}` : "lg:ml-0"
          }`}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <>
      <LanguageProvider>
        <DataTableProvider>
          <div>
            <BrowserRouter>
              <Routes>
                <Route element={<UserLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login-npc" element={<MemberLogin />} />
                  <Route path="/select-gln" element={<SelectGln />} />

                  <Route path="/admin-login" element={<AdminLogin />} />
                </Route>
              </Routes>
              <Routes>
                {/* Member Routes */}
                <Route
                  path="/member/*"
                  element={
                    <MainLayout>
                      <Routes>
                        <Route
                          path="dashboard"
                          element={<MemberNewDashboard />}
                        />
                        <Route path="gtin" element={<GTIN />} />
                        <Route path="gln" element={<GLN />} />
                        <Route
                          path="Item-Search-Screen"
                          element={<ItemSearchScreen />}
                        />
                        <Route
                          path="Status-Search-Screen"
                          element={<StatusSearchScreen />}
                        />
                        <Route
                          path="advance-search"
                          element={<AdvanceSearch />}
                        />
                        <Route
                          path="search-profile"
                          element={<SearchProfile />}
                        />
                      </Routes>
                    </MainLayout>
                  }
                />
              </Routes>

              <Routes>
                {/* Admin Routes */}
                <Route
                  path="/admin/*"
                  element={
                    <AdminMainLayout>
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        {/* Master Data */}
                        <Route
                          path="Language/Dynamic"
                          element={<LaanguageChange />}
                        />
                        <Route path="Users" element={<Users />} />
                        <Route path="add-users" element={<AddUsers />} />
                        <Route
                          path="update-users/:id"
                          element={<UpdateUsers />}
                        />

                        <Route path="Role" element={<Roles />} />
                        <Route path="add-roles" element={<AddRoles />} />
                        <Route
                          path="update-roles/:id"
                          element={<UpdateRoles />}
                        />

                        <Route path="Units" element={<Units />} />
                        <Route path="Documents" element={<Documents />} />
                        <Route
                          path="ProductPackaging"
                          element={<ProductPackaging />}
                        />
                        <Route
                          path="Other_products"
                          element={<Other_products />}
                        />
                        <Route path="Gcp_type" element={<Gcp_type />} />
                        <Route
                          path="CountryofSales"
                          element={<CountryofSales />}
                        />
                        <Route path="Hscode" element={<Hscode />} />
                        <Route path="UNSPCS" element={<UNSPCS />} />
                        <Route path="Cities" element={<Cities />} />
                        <Route path="State" element={<State />} />
                        <Route path="Country" element={<Country />} />
                        <Route path="crnumber" element={<Crnumber />} />
                        <Route
                          path="documenttype"
                          element={<Document_type />}
                        />
                        <Route
                          path="news-letter"
                          element={<AdminNewsLetter />}
                        />

                        <Route path="global-product-registry" element={<GlobalProductRegistry />} />
                        <Route path="local-product-registry" element={<LocalProductRegistry />} />

                      </Routes>
                    </AdminMainLayout>
                  }
                />
              </Routes>
            </BrowserRouter>
          </div>
        </DataTableProvider>
      </LanguageProvider>
    </>
  );
};

export default App;
