import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const record = await prisma.record.create({
      data: {
        tableName: body.tableName,
        data: body.data,
      },
    });

    console.log("Mock email sent");

    return NextResponse.json(record);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json([]);
    }

    const records = await prisma.record.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: 500 }
    );
  }
}
