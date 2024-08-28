import { a } from "@aws-amplify/backend";

export const TodoModel = a.model({
  content: a.string(),
});