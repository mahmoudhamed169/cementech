import DriversStatus from "./drivers-status";
import SystemWarnings from "./system-warnings";

export default function Status() {
  return (
    <section className=" flex  gap-8">
      <DriversStatus />
      <SystemWarnings />
    </section>
  );
}
