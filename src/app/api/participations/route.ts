import {NextResponse} from "next/server";
import {listParticipations, upsertParticipation} from "@/lib/participation";

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const hid = searchParams.get("hackathonId") || undefined;
  return NextResponse.json({success: true, data: listParticipations(hid)});
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.hackathonId || !body.username) {
      return NextResponse.json(
        {success: false, error: "hackathonId & username required"},
        {status: 400}
      );
    }
    const rec = upsertParticipation({
      hackathonId: body.hackathonId,
      username: body.username,
      projectName: body.projectName,
      repoUrl: body.repoUrl,
      demoUrl: body.demoUrl,
      description: body.description,
    });
    return NextResponse.json({success: true, data: rec});
  } catch (e: any) {
    return NextResponse.json(
      {success: false, error: e.message || "Invalid JSON"},
      {status: 400}
    );
  }
}
