import { RaffleModel } from "./model";
import { AuthorizationPublicApiKey } from "../Authorization";

export const RaffleSchema = {
   Raffle: RaffleModel.authorization(AuthorizationPublicApiKey),
}