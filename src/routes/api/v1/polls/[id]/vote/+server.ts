import prisma from "$lib/server/prisma";
import { generic_error_unknown_error } from "$lib/server/responses";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { json, type RequestEvent } from "@sveltejs/kit";
import { nanoid } from "nanoid";

export async function POST(event: RequestEvent): Promise<Response> {
    // Parameters
    const poll_id = event.params.id;
    const body = await event.request.json();

    // Check request
    if (!body.option?.length)
        return json({ success: false, message: "No option was provided" }, { status: 400 });

    // Check session
    const already_voted = await prisma.vote.findFirst({
        where: {
            poll_id: poll_id,
            ip_address: event.getClientAddress()
        }
    });

    if (already_voted) return json({ message: "You have already voted on this poll" }, { status: 403 });

    // Create poll
    try {
        const id = nanoid(14);

        await prisma.vote.create({
            data: {
                id: id,
                poll_id: poll_id!,
                ip_address: event.getClientAddress(),
                option_id: body.option
            }
        });

        return new Response(null, { status: 204 });
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError)
            if (err.code === "P2003") return json({ message: "Invalid option" }, { status: 400 });

        console.log(err);

        return json(
            {
                message: generic_error_unknown_error
            },
            { status: 500 }
        );
    }
}
