import { TodoModel } from "./model";
import { AuthorizationPublicApiKey } from "../Authorization";

export const TodoSchema = {
   Todo: TodoModel.authorization(AuthorizationPublicApiKey),
}