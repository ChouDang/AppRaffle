import { WarehouseModel } from "./model";
import { AuthorizationPublicApiKey } from "../Authorization";

export const WarehouseSchema = {
   Warehouse: WarehouseModel.authorization(AuthorizationPublicApiKey),
}