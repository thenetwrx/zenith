import prisma from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";
import { poll_error_does_not_exist } from "$lib/server/responses";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, params, getClientAddress }) => {
    const poll = await prisma.poll.findFirst({
        where: {
            id: params.id
        },
        include: {
            options: true
        }
    });

    if (!poll) throw error(404, poll_error_does_not_exist);
    const _voted = await prisma.vote.findFirst({
        where: {
            poll_id: poll.id,
            ip_address: getClientAddress()
        }
    });

    return {
        poll: { ...poll },
        voted: _voted !== null ? _voted.option_id : null
    };
};
