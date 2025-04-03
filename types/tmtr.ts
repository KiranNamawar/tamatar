import * as v from 'valibot';

export const createUrlFormSchema = v.object({
    originalUrl: v.pipe(v.string(), v.nonEmpty('please enter a url'), v.url('please enter a valid url'), ),
});

