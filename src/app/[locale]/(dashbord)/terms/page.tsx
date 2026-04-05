import { getServerSession } from "next-auth";

import { TermsApiResponse, TermsPolicy } from "./_types/terms.types";
import TermsForm from "./_components/terms-form";
import { authOptions } from "@/src/auth";

async function getTermsData(token: string): Promise<TermsPolicy[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/policies
`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        system_screen: "",
      },
      cache: "no-store",
    },
  );
  const json: TermsApiResponse = await res.json();
  return json.data;
}

export default async function TermsPage() {
  const session = await getServerSession(authOptions);
  const policies = await getTermsData(session?.user.accessToken ?? "");

  return <TermsForm policies={policies} />;
}
