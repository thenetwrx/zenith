import { redirect } from "@sveltejs/kit";
import { generateState } from "arctic";
import { github } from "$lib/server/auth";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
    const state = generateState();
    const redirect_url = event.url.searchParams.get("redirect") ?? null;

    const url = await github.createAuthorizationURL(state, {
        scopes: ["read:user", "user:email"]
    });

    event.cookies.set("state", state, {
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    });
    if (redirect_url !== null)
        event.cookies.set("redirect", redirect_url, {
            path: "/",
            secure: import.meta.env.PROD,
            httpOnly: true,
            maxAge: 60 * 10,
            sameSite: "lax"
        });

    redirect(302, url.toString());
}
