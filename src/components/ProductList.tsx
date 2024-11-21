import React, { FC, useEffect, useRef, useState } from "react";
import { fetchProducts, searchProducts } from "../services/api";
import { Product } from "../types/Product";
import "../styles/ProductList.scss";

const ProductList: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const listEnd = useRef<HTMLDivElement>(null);

  const LIMIT_PAGE = 20;

  // Fetch products when scrolling
  const loadMore = async () => {
    if (query || loading) return;
    setLoading(true);
    const newProducts = await fetchProducts(LIMIT_PAGE, page * LIMIT_PAGE);
    setProducts((prev) => [...prev, ...newProducts]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  // Fetch products when search
  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    const searchResults = searchQuery ? await searchProducts(searchQuery) : [];
    setProducts(searchResults);
    setPage(0);
    setLoading(false);
  };

  // Mark user when reaching the last list
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1 }
    );

    if (listEnd.current) observer.observe(listEnd.current);
    return () => {
      if (listEnd.current) observer.unobserve(listEnd.current);
    };
  }, []);

  return (
    <div className="product-list">
      <h1 className="product-list_title">Danh sách sản phẩm</h1>
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className="search-input"
      />
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageURL}
              alt={product.name}
              className="product-card_img"
            />
            <h4 className="product-card_title">{product.name}</h4>
            <p className="product-card_price">${product.price}</p>
          </div>
        ))}
      </div>
      {loading && <p className="loading">Loading...</p>}
      {!query && <div className="product-end" ref={listEnd} />}
    </div>
  );
};

export default ProductList;
