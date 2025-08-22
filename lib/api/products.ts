import api from "@/lib/api/api";

export interface ProductVariant {
    id: number;
    weight_grams: number;
    price: number;
    discount_price?: number | null;
    stock: number;
    final_price: number;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    category: number;
    origin: string;
    roast_level: number;
    tasting_note: number;
    description: string;
    image: string;
    is_active: boolean;
    variants: ProductVariant[];
}

// export interface CategoryWithProducts {
//     id: number;
//     name: string;
//     slug: string;
//     group_slug?: string | null;
//     products: Product [];
// }


// Fetch products by group slug
export const getCategoriesByGroupSlug = async (
    groupSlug: string
): Promise<Product []> => {
    const response = await api.get<Product []>("/store/products/", {
        params: { group_slug: groupSlug},
    });
    return response.data
}