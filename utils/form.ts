import { formOptions } from "@tanstack/react-form/nextjs";

export const signupFormOptions = formOptions({
    defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
});