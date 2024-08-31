import { nanoid } from "nanoid";
import { cryptr, github, lucia } from "$lib/server/auth";

import { redirect, type RequestEvent } from "@sveltejs/kit";
import type GitHubUserPartial from "$lib/types/GitHubUserPartial";
import prisma from "$lib/server/prisma";
import { generic_error_banned, generic_error_unknown_error } from "$lib/server/responses";

export async function GET(event: RequestEvent): Promise<Response> {
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");
    const storedState = event.cookies.get("state") ?? null;
    const redirect_url = event.cookies.get("redirect") ?? null;

    if (!code)
        return redirect(302, `/?error_message=${encodeURIComponent("Unable to authenticate with GitHub")}`);
    if (!state) return redirect(302, `/?error_message=${encodeURIComponent("Server didn't receive state")}`);
    if (!storedState)
        return redirect(302, `/?error_message=${encodeURIComponent("Server couldn't find stored state")}`);
    if (state !== storedState)
        return redirect(302, `/?error_message=${encodeURIComponent("Server received a mismatched state")}`);

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const github_user_response = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        const provider_user: GitHubUserPartial = await github_user_response.json();
        console.log(provider_user);

        const existing_user = await prisma.user.findFirst({
            select: {
                id: true,
                banned: true
            },
            where: {
                provider_id: {
                    equals: provider_user.id
                }
            }
        });

        if (existing_user) {
            if (existing_user.banned)
                return new Response(null, {
                    status: 302,
                    headers: {
                        Location: `/?error_message=${encodeURIComponent(generic_error_banned)}`
                    }
                });

            const now = new Date();
            const session = await lucia.createSession(existing_user.id, {
                created_at: now,
                provider_access_token: cryptr.encrypt(tokens.accessToken)
            });
            const sessionCookie = lucia.createSessionCookie(session.id);
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
        } else {
            const user_id = nanoid(14);

            const now = new Date();
            const created_user = await prisma.user.create({
                data: {
                    created_at: now,
                    updated_at: now,
                    id: user_id,
                    provider_id: provider_user.id,
                    username: provider_user.login,
                    display_name: provider_user.name || provider_user.login,
                    email: provider_user.email
                },
                select: {
                    id: true
                }
            });

            if (!created_user)
                return new Response(null, {
                    status: 302,
                    headers: {
                        Location: `/?error_message=${encodeURIComponent("Aw snap, you caught a super duper rare error. Please let us know about this!")}`
                    }
                });

            const session = await lucia.createSession(created_user.id, {
                created_at: now,
                provider_access_token: cryptr.encrypt(tokens.accessToken)
            });
            const sessionCookie = lucia.createSessionCookie(session.id);
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
        }

        return new Response(null, {
            status: 302,
            headers: {
                Location: redirect_url !== null && redirect_url.startsWith("/") ? redirect_url : "/"
            }
        });
    } catch (err) {
        console.log(err);

        return new Response(null, {
            status: 302,
            headers: {
                Location: `/?error_message=${encodeURIComponent(generic_error_unknown_error)}`
            }
        });
    }
}
