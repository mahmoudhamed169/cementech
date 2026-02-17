// drivers-table-wrapper.tsx
import { dummyDrivers } from "@/src/lib/constants/drivers";
import DriversTable from "./drivers-table";
import DriversTableBody from "./drivers-table-body";
import { getUsers } from "@/src/lib/services/users";

async function getDrivers() {
  const response = await getUsers({
    type: "driver",
    page: 1,
    limit: 10,
  });
  return response.data;
}

export default async function DriversTableWrapper() {
  const driversRes = await getDrivers();
  console.log(driversRes)
  const drivers = dummyDrivers; 

  return <DriversTableBody drivers={drivers} />;
}
