import { Table } from "@/components/ui/table";
import LoadingReqTableHead from "./loading-req-table-head";
import { Suspense } from "react";
import TableLoadingSpinner from "@/src/components/shared/table-loading";
import LoadingReqsTableWrapper from "./loadingreqs-table-wrapper";

export default function LoadingRequestsTable() {
  return (
    <Table>
      {/* Header */}
      <LoadingReqTableHead />

      {/* body */}

    بالنسبة لرفع المشروع:

سيتم رفع الموقع على سيرفر احترافي لضمان السرعة والاستقرار، ولكن تكلفة السيرفر والاستضافة والدومين تكون على حضرتك (وأساعدك في اختيار الأفضل حسب الميزانية).

وأوفر لحضرتك دعم فني مجاني لمدة شهرين بعد التسليم، وأي مشكلة تقنية يتم حلها بدون أي رسوم إضافية خلال هذه الفترة.

هدفي إن المشروع يطلع بشكل احترافي ومستقر ويبدأ يشتغل ويحقق نتائج فعلاً.

في انتظار تأكيد حضرتك علشان نبدأ بإذن الله.

    </Table>
  );
}
