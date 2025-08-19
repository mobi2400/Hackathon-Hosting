import {NextResponse} from "next/server";
import {getHackathon} from "@/lib/hackathons";

export async function GET(_req: Request, {params}: {params: {id: string}}) {
  const h = getHackathon(params.id);
  if (!h)
    return NextResponse.json(
      {success: false, error: "Not found"},
      {status: 404}
    );
  return NextResponse.json({success: true, data: h});
}
