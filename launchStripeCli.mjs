import { spawn } from "child_process";
import psList from "ps-list";
import * as dotenv from "dotenv";

(async () => {
  dotenv.config();
  const { NODE_ENV } = process.env;
  if (NODE_ENV === "production") return;
  
  try {
    // Get the list of running processes
    const processes = await psList();

    // Check if the target process is in the list
    const isProcessRunning = processes.find(
      (process) => process.name === "stripe.exe"
    );

    if (isProcessRunning) {
      console.log(`Stripe cli is already running.`);
    } else {
      console.log(`Stripe cli process is not running. Starting it now...`);

      const command = "cmd"; // Windows command prompt
      const args = [
        "/k",
        "stripe listen --forward-to localhost:3300/api/v1/webhooks/stripe -s",
      ]; // Command to execute in the new window

      const child = spawn(command, args, {
        shell: true,
        detached: true,
        stdio: "inherit",
      });

      child.unref(); // Allows the parent process to exit independently

      // Optionally, listen for the process to exit
      child.on("exit", (code) => {
        console.log(`Child process exited with code ${code}`);
      });
    }
  } catch (error) {
    console.error("Error checking for the process:", error);
  }
})();
