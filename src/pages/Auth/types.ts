export type TLoginForm = {
    email: string,
    password: string,
};

export type TRegistrationForm = TLoginForm & {
    first_name: string;
    last_name: string,
    passwordConfirmation: string;
};
