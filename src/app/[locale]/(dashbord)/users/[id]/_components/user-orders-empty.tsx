import { getTranslations } from "next-intl/server";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export default async function UserOrdersEmpty() {
  const t = await getTranslations("userPage.userOrderTable.empty");

  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={6} className="text-center py-12">
          <p className="font-bold text-[#101828]">{t("title")}</p>
          <p className="text-sm text-[#475467] mt-1">{t("description")}</p>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
