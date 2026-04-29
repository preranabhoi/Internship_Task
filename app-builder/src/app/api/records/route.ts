import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const record = await prisma.record.create({
      data: {
        tableName: body.tableName,
        data: body.data,
      },
    });

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
    const records =
      await prisma.record.findMany({
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
