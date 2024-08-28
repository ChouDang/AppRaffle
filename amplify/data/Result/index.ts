import { ResultModel } from "./model";
import { AuthorizationPublicApiKey } from "../Authorization";

export const ResultSchema = {
   Result: ResultModel.authorization(AuthorizationPublicApiKey),
}