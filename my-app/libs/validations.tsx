import * as yup from "yup";

export const loginSchema = yup.object().shape({
  tel: yup.string(),
  // .required("Email obligatoire"),
  password: yup.string(),
  // .min(6, "Le mot de passe doit contenir au moins 6 caractères")
  // .required("Mot de passe obligatoire"),
});

export const signupSchema = yup.object().shape({
  nom: yup.string().min(2, "Le nom doit contenir au moins 6 caractères"),
  // .required("Nom obligatoire"),
  prenoms: yup
    .string()
    .min(2, "Le prenoms doit contenir au moins 6 caractères"),
  // .required("Prenoms obligatoire"),
  tel: yup.string().min(10, "Le numero doit contenir au moins 10 caractères"),
  email: yup.string().email("Email invalide"),
  // .required("Email obligatoire"),
  // .required("Numero obligatoire"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  // .required("Mot de passe obligatoire"),
});

export const schemaUpdatePassword = yup.object().shape({
  oldPassword: yup
    .string()
    .min(10, "Le numero doit contenir au moins 10 caractères")
    .required("L'ancien mot de passe est requis"),
  newPassword: yup
    .string()
    .min(10, "Le numero doit contenir au moins 10 caractères")
    .required("Le nouveau mot de passe est requis"),
  // confirmPassword: Yup.string().required(
  //   "La confirmation du mot de passe est requise"
  // ),
});
