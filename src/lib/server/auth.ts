import Cryptr from "cryptr";
import { Lucia, TimeSpan } from "lucia";
import { GitHub } from "arctic";
import { dev } from "$app/environment";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { ENCRYPTION_KEY, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, BASE_URL } from "$env/static/private";
import prisma from "./prisma";

export const cryptr = new Cryptr(ENCRYPTION_KEY);

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, {
    redirectURI: BASE_URL + "/api/v1/auth/github/callback"
});

const adapter = new PrismaAdapter(prisma.session, prisma.user); // your adapter

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            // set to `true` when using HTTPS
            secure: !dev
        },
        name: "session"
    },
    sessionExpiresIn: new TimeSpan(3, "d"),
    getUserAttributes: (attributes) => {
        return attributes;
    },
    getSessionAttributes: (attributes) => {
        return attributes;
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: Omit<import("@prisma/client").User, "id">;
        DatabaseSessionAttributes: Omit<import("@prisma/client").Session, "id" | "expiresAt" | "userId">;
    }
}
