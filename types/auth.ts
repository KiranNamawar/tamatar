import * as v from 'valibot';

export const signupFormSchema = v.pipe(
    v.object({
        name: v.pipe(
            v.string(),
            v.nonEmpty('please enter your name'),
            v.minLength(3, 'name must be at least 3 characters long'),
        ),
        email: v.pipe(
            v.string(),
            v.nonEmpty('please enter an email'),
            v.email('please enter a valid email'),
        ),
        password: v.pipe(
            v.string(),
            v.nonEmpty('please enter a password'),
            v.regex(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                'password must be at least 8 characters long and contain at least one letter and one number',
            ),
        ),
        confirmPassword: v.pipe(
            v.string(),
            v.nonEmpty('please confirm your password'),
        ),
    }),
    v.forward(
        v.partialCheck(
            [['password'], ['confirmPassword']],
            (input) => input.password === input.confirmPassword,
            'passwords do not match',
        ),
        ['confirmPassword'],
    ),
);

export const loginFormSchema = v.object({
    email: v.pipe(v.string(), v.nonEmpty('please enter an email'), v.email('please enter a valid email')),
    password: v.pipe(v.string(), v.nonEmpty('please enter a password')),
});
