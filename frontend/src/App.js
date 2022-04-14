import React from "react";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import NavbarItem from "./components/NavbarItem";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import { Container } from "react-bootstrap";
import SubCategoryPage from "./pages/SubCategoryPage";
import ProductsPage from "./pages/ProductsPage";
const App = () => {
  return (
    <>
      <NavbarItem />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories/:parentId" element={<CategoryPage />} />
            <Route
              path="/categories/:parentId/:subcategoryId"
              element={<SubCategoryPage />}
            />
            <Route
              path="/categories/:parentId/:subcategoryId/:productCategoryId"
              element={<ProductsPage />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
