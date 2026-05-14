import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "lib/users.json"
);

export async function GET() {

  const file = fs.readFileSync(filePath, "utf8");

  return NextResponse.json(JSON.parse(file));
}

export async function POST(req: Request) {

  const body = await req.json();

  const file = fs.readFileSync(filePath, "utf8");

  const users = JSON.parse(file);

  const newUser = {
    id: Date.now(),
    username: body.username,
    password: body.password,
    role: "user"
  };

  users.push(newUser);

  fs.writeFileSync(
    filePath,
    JSON.stringify(users, null, 2)
  );

  return NextResponse.json({
    success: true
  });
}

export async function DELETE(req: Request) {

  const body = await req.json();

  const file = fs.readFileSync(filePath, "utf8");

  const users = JSON.parse(file);

  const filteredUsers =
    users.filter(
      (user: any) =>
        user.id !== body.id
    );

  fs.writeFileSync(
    filePath,
    JSON.stringify(filteredUsers, null, 2)
  );

  return NextResponse.json({
    success: true
  });
}

