import { JSONSchemaType } from "ajv";
import {
  LoginBodyInterface,
  RefreshTokenBodyInterface,
  RegisterBodyInterface,
  RestaurantBodyInterface,
} from "./interface";

export const refreshTokenSchema: JSONSchemaType<RefreshTokenBodyInterface> = {
  type: "object",
  properties: {
    userId: { type: "string" },
  },
  required: ["userId"],
  additionalProperties: false,
};

export const registerTokenSchema: JSONSchemaType<RegisterBodyInterface> = {
  type: "object",
  properties: {
    username: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password", "username"],
  additionalProperties: false,
};

export const loginTokenSchema: JSONSchemaType<LoginBodyInterface> = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export const restaurantBodyInterfaceSchema: JSONSchemaType<RestaurantBodyInterface> =
  {
    type: "object",
    properties: {
      name: { type: "string" },
      notes: { type: "string" },
      location: { type: "string" },
      photo: { type: "string" },
      distance: { type: "string" },
      openTime: { type: "string" },
      deliveryFee: { type: "string" },
      minimumAmount: { type: "string" },
    },
    required: [
      "name",
      "notes",
      "deliveryFee",
      "location",
      "photo",
      "distance",
      "openTime",
      "minimumAmount",
    ],
    additionalProperties: false,
  };
