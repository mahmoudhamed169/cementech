"use client";

import { useTranslations } from "next-intl";
import { UserStatusBadge } from "./user-status-badge";

type Iprops = {
  userId: string;
  userName: string;
  userPhoneNumber: string;
  userStat: "active" | "inactive" | "blocked";
};

export default function BasicInfo({
  userName,
  userId,
  userStat,
  userPhoneNumber,
}: Iprops) {
  const t = useTranslations("userPage.basicInfo"); 
  return (
    <div className="space-y-4 ">
      <h4 className="font-bold text-[#101828] text-lg">{t("title")}</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <h6 className="text-sm text-[#4A5565]">{t("userId")}</h6>
          <span className="font-medium">{userId}</span>
        </div>

        <div className="flex flex-col">
          <h6 className="text-sm text-[#4A5565]">{t("name")}</h6>
          <span className="font-medium">{userName}</span>
        </div>

        <div className="flex flex-col">
          <h6 className="text-sm text-[#4A5565]">{t("phone")}</h6>
          <span className="font-medium">{userPhoneNumber}</span>
        </div>

        <div className="flex flex-col">
          <h6 className="text-sm text-[#4A5565]">{t("status")}</h6>
          <div>
            <UserStatusBadge status={userStat} />
          </div>
        </div>

        <div className="flex flex-col">
          <h6 className="text-sm text-[#4A5565]">{t("joinDate")}</h6>
          <span className="font-medium">01-01-2026</span>
        </div>
      </div>
    </div>
  );
}
