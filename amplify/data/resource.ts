import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { RaffleSchema } from "./Raffle";
import { ResultSchema } from "./Result";
import { ParticipationSchema } from "./Participation";
import { ProductSchema } from "./Product";
import { WarehouseSchema } from "./Warehouse";

const schema = a.schema({
  ...RaffleSchema, // thông tin Raffle
  ...ParticipationSchema, // thông tin tham gia
  ...ResultSchema, // kết quả
  ...ProductSchema, // sản phẩm 
  ...WarehouseSchema, // thông tin kho,
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/
