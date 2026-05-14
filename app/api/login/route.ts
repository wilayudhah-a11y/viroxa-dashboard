import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "lib/users.json"
);

export async function POST(req: Request) {

  const body = await req.json();

  const file = fs.readFileSync(
    filePath,
    "utf8"
  );

  const users = JSON.parse(file);

  const user = users.find(
    (u: any) =>
      u.username === body.username &&
      u.password === body.password
  );

  if (!user) {

    return NextResponse.json(
      {
        success: false,
        message: "Invalid credentials"
      },
      {
        status: 401
      }
    );
  }

  return NextResponse.json({
    success: true,
    user
  });
}
