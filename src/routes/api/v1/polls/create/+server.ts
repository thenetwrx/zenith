import prisma from "$lib/server/prisma";
import {
    generic_error_banned,
    generic_error_not_logged_in,
    generic_error_unknown_error
} from "$lib/server/responses";
import { json, type RequestEvent } from "@sveltejs/kit";
import { nanoid } from "nanoid";

export async function PUT(event: RequestEvent): Promise<Response> {
    // Parameters
    const body = await event.request.json();

    // Check session
    if (!event.locals.user) return json({ message: generic_error_not_logged_in }, { status: 401 });
    if (event.locals.user.banned) return json({ message: generic_error_banned }, { status: 403 });

    // Check request
    if (!body.title?.length) return json({ message: "Title must not be empty" }, { status: 400 });
    if (body.title.length < 3)
        return json(
            {
                message: "Title is too short (minimum of 3 characters)"
            },
            { status: 400 }
        );
    if (body.title.length > 256)
        return json(
            {
                message: "Title is too long (max of 256 characters)"
            },
            { status: 400 }
        );
    if (body.description?.length > 1024)
        return json(
            {
                message: "Description is too long (max of 1024 characters)"
            },
            { status: 400 }
        );
    if (body.options?.length < 2) {
        return json(
            {
                message: "Not enough options (minimum of 2 options)"
            },
            { status: 400 }
        );
    }

    for (let i = 0; i < body.options.length; i++) {
        const option = body.options[i].trim();

        if (option.length === 0) {
            if (i < 2) {
                return json(
                    {
                        message: "Not enough options (minimum of 2 options)"
                    },
                    {
                        status: 400
                    }
                );
            }
            // Remove empty options after the first two
            body.options.splice(i, 1);
            i--; // Adjust index after removal
            continue;
        }

        if (option.length < 1) {
            return json(
                {
                    message: `Option #${i + 1} is too short (minimum of 1 character)`
                },
                { status: 400 }
            );
        }

        if (option.length > 128) {
            return json(
                {
                    message: `Option #${i + 1} is too long (max of 128 characters)`
                },
                {
                    status: 400
                }
            );
        }
    }
    // const moderation = await moderate([body.description]);
    // if (moderation[0].flagged)
    //     return json(
    //         {
    //             message: "Description contains inappropriate content, please review our guidelines"
    //         },
    //         { status: 400 }
    //     );

    // Create poll
    try {
        const poll = await prisma.poll.create({
            data: {
                id: nanoid(14),
                title: body.title,
                description: body.description,
                owner_id: event.locals.user.id,
                options: {
                    create: body.options.map((optionText: string) => ({
                        id: nanoid(14),
                        text: optionText
                    }))
                }
            },
            select: {
                id: true
            }
        });

        return json(
            {
                message: null,
                id: poll.id
            },
            {
                status: 200
            }
        );
    } catch (err) {
        console.log(err);

        return json(
            {
                message: generic_error_unknown_error
            },
            { status: 500 }
        );
    }
}
