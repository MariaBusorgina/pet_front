import * as yup from "yup";
import {FIELD_ARRAY} from "./constants.ts";

export const validationRegistrationScheme = yup
    .object({
        [FIELD_ARRAY.first_name]: yup
            .string()
            .min(4, 'Минимальная длинна имени - 4 символа')
            .required('Химя обязателено для заполнения'),
        [FIELD_ARRAY.last_name]: yup
            .string()
            .min(4, 'Минимальная длинна имени - 4 символа')
            .required('Фамилия обязателено для заполнения'),
        [FIELD_ARRAY.email]: yup
            .string()
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Неверный формат email')
            .required('Email обязателен для заполнения'),
        [FIELD_ARRAY.password]: yup
            .string()
            .matches(/^[a-zA-Z0-9_]+$/, 'Недопустимые символы в пароле')
            .min(4, 'Минимальная длина пароля - 4 символа')
            .required('Пароль обязателен для заполнения'),
        [FIELD_ARRAY.passwordConfirmation]: yup
            .string()
            .oneOf([yup.ref(FIELD_ARRAY.password)], 'Пароли должны совпадать')
            .required('Подтверждение пароля обязательно для заполнения')
    })
    .required();

export const validationLoginScheme = yup
    .object({
        [FIELD_ARRAY.email]: yup
            .string()
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Неверный формат email')
            .required('Email обязателен для заполнения'),
        [FIELD_ARRAY.password]: yup
            .string()
            .matches(/^[a-zA-Z0-9_]+$/, 'Недопустимые символы в пароле')
            .min(4, 'Минимальная длина пароля - 4 символа')
            .required('Пароль обязателен для заполнения'),
    })
    .required();


