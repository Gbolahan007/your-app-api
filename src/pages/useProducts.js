import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";

export function useProducts() {
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,

    // Add these options to improve reliability
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    // Add error handling
    onError: (err) => {
      console.error("Error fetching products:", err);
    },
  });

  return { products, isLoadingProducts };
}
