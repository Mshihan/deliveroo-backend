import Ajv, { JSONSchemaType } from "ajv";
import { RefreshTokenBodyInterface } from "./interface";
import { refreshTokenSchema } from "./schema";
import { CustomError } from "../../middleware/error.middleware";

const ajv = new Ajv();

export const validateRequest = (
  body: any,
  schema: any,
  error: string,
  code: number
) => {
  const validate = ajv.compile(schema);
  if (!validate(body)) {
    throw new CustomError(error, code);
  }
};
