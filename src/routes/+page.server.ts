import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    const error_message = url.searchParams.get("error_message") ?? null;

    return {
        error_message
    };
};
