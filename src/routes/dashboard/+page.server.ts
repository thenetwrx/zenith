import type { PageServerLoad } from "./$types";
import { generic_error_not_logged_in } from "$lib/server/responses";
import { error } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) throw error(401, generic_error_not_logged_in);

    const polls = await prisma.poll.findMany({
        where: {
            owner_id: locals.user.id
        },
        include: {
            votes: {
                select: {
                    option_id: true
                }
            },
            options: {
                select: {
                    text: true,
                    id: true,
                    votes: true
                }
            }
        }
    });

    return {
        message: null,
        polls: polls
    };
};
