"use client";
import { useState } from "react";
import ProductList from "./_components/product-list";
import FilterSidebar from "./_components/filter-sidebar";
import FilterSortBar from "./_components/filter-sortbar";
import CarouselIndex from "./_components/carousel";
import BreadcrumbIndex from "./_components/breadcrumb";

export default function ProductPage() {
  const [filters, setFilters] = useState({ brand_id: [], category_id: [], subcategory_id: [], sort: "", }); // ✅ 狀態管理篩選條件

  // ✅ 修正 handleFilterChange
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // ✅ 處理品牌篩選（來自排序欄）
  const handleBrandSelect = (selectedBrand) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      brand_id: selectedBrand.brand_id, // ✅ 確保 `brand_id` 是陣列
    }));
  };

  // ✅ 處理排序變更
  const handleSortChange = (newSort) => {
    console.log("✅ 更新 sort:", newSort);
    setFilters((prevFilters) => ({
      ...prevFilters,
      sort: newSort,
    }));
  };

  return (
    <>
      <CarouselIndex />
      <div className="container mt-4">
        <div className="row">
          <BreadcrumbIndex />
          <div className="col-md-3">
            <FilterSidebar onFilterChange={handleFilterChange} selectedFilters={filters} />
          </div>
          <div className="col-md-9">
            <FilterSortBar onBrandSelect={handleBrandSelect} onSortChange={handleSortChange} />
            <ProductList filters={filters} />
            <div className="d-flex justify-content-center mt-5 mb-5">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
