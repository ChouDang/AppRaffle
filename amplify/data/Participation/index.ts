import { ParticipationModel } from "./model";
import { AuthorizationPublicApiKey } from "../Authorization";

export const ParticipationSchema = {
   Participation: ParticipationModel.authorization(AuthorizationPublicApiKey),
}