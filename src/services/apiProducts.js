import supabase from "../../supabase";

export async function getProductsCategory() {
  const { data, error } = await supabase.from("products").select("*").limit(8);

  if (error) {
    console.error(error);
    throw new Error("Error fetching products");
  }

  return data;
}

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Error fetching products");
  }

  return data;
}
