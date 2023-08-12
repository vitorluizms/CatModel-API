import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().min(5).max(60).invalid("name").required(),
  email: joi.string().email().min(5).max(60).required(),
  cpf: joi.string().length(11).required(),
  contact: joi.string().min(10).max(11).required(),
  password: joi.string().invalid("password").required(),
});

export const signInSchema = joi.object({
  email: joi.string().email().min(5).max(60).required(),
  password: joi.string().invalid("password").required(),
});

export const catSchema = joi.object({
  name: joi.string().max(80).required(),
  age: joi.string().max(40).required(),
  color: joi.string().max(40).required(),
  race: joi.number().min(1).required(),
  description: joi.string().required(),
  mainPic: joi.string().pattern(new RegExp("^https?://")).required(),
});
