import { getPermissions } from "@/src/lib/services/permissions/get-permissions";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const permissions = await getPermissions();
    return NextResponse.json(permissions);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch permissions" },
      { status: 500 },
    );
  }
}
