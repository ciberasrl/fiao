import cron from "node-cron";
import DeudaColmaderoCliente from "../models/deudaColmaderoCliente.js";
import chalk from "chalk";

const resetTotalMes = () => {
  cron.schedule(
    "0 0 1 * *", // A las 00:00 del primer día de cada mes
    async () => {
      try {
        await DeudaColmaderoCliente.update({ totalMes: 0 }, { where: {} });
        console.log(
          chalk.green("✅ TotalMes reiniciado el 1ro del mes (zona RD)")
        );
      } catch (error) {
        console.error(chalk.red("❌ Error al reiniciar totalMes:", error));
      }
    },
    {
      timezone: "America/Santo_Domingo", // 👈 Aquí se ajusta la zona horaria
    }
  );
};

export default resetTotalMes;
