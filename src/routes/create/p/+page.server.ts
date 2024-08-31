import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { generic_error_not_logged_in } from "$lib/server/responses";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) throw error(401, generic_error_not_logged_in);
};
