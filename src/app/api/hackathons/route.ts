import {NextRequest, NextResponse} from "next/server";
import {addHackathon, listHackathons} from "@/lib/hackathons";

export async function GET() {
  return NextResponse.json({success: true, data: listHackathons()});
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const required = [
      "hackathonName",
      "theme",
      "startDate",
      "lastEnrollDate",
      "prizePool",
      "sponsor",
      "teamSize",
      "hackathonAbout",
    ];
    for (const key of required) {
      if (!body[key])
        return NextResponse.json(
          {success: false, error: `${key} is required`},
          {status: 400}
        );
    }
    const h = addHackathon({
      name: body.hackathonName,
      theme: body.theme,
      startDate: body.startDate,
      lastEnrollDate: body.lastEnrollDate,
      prizePool: body.prizePool,
      sponsor: body.sponsor,
      teamSize: body.teamSize,
      about: body.hackathonAbout,
    });
    return NextResponse.json({success: true, data: h});
  } catch (e: any) {
    return NextResponse.json(
      {success: false, error: e.message || "Failed"},
      {status: 500}
    );
  }
}
