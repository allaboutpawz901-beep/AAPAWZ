import type { NextRequest } from "next/server";

export type Visitor = {
  id: string;
  name: string;
  email: string | null;
  token: string;
};

export function getVisitor(request: NextRequest): Visitor {
  const token = request.headers.get("x-promptql-visitor-token");
  if (!token) {
    throw new Error("Open UNLEASHED through its PromptQL application card.");
  }

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"),
    );
    const hasura = decoded["https://promptql.hasura.io"] ?? {};
    if (typeof decoded.sub !== "string" || !decoded.sub) throw new Error("Missing identity");
    return {
      id: decoded.sub,
      name: decoded.display_name ?? hasura["x-hasura-email"] ?? "Learner",
      email: hasura["x-hasura-email"] ?? null,
      token,
    };
  } catch {
    throw new Error("The PromptQL visitor identity was invalid.");
  }
}