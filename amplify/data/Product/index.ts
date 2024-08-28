import { ProductModel } from "./model";
import { AuthorizationPublicApiKey } from "../Authorization";

export const ProductSchema = {
   Product: ProductModel.authorization(AuthorizationPublicApiKey),
}