import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";

export function useProducts() {
  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Log the products when they're received
    onSuccess: (data) => {
      console.log(`useProducts received ${data?.length || 0} products`);
    },
    onError: (err) => {
      console.error("Error fetching products:", err);
    },
  });

  return { products, isLoadingProducts, error };
}
