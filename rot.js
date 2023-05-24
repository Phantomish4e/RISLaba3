import { pipeline as _pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";
import { promisify } from "util";
import pkg from 'commander'

import pckg from "./package.json" assert { type: "json" };

import Validator from "./helpers/validator.class.js";
import EncryptTransform from "./helpers/encryptTransform.class.js";

const pipeline = promisify(_pipeline);
const { log, info } = console;
const errorMessage = "✘ Erorr";
const successMessage = "✔ Successful";
const codeMessage = "Code";

const actionHandler = async () => {
  let { shift, input, output, action } = pkg.opts();

  /* Validation */
  if (!Validator.isInteger(shift)) {
    process.stderr.write(`${errorMessage} "Shift is not integer :("\n`);
    process.exit(1);
  }
  if (!Validator.isIn(action, ["task1", "task2"])) {
    process.stderr.write(
      `${errorMessage} \"Action must be included in the given list ['task1', 'task2'] :(\"\n`
    );
    process.exit(1);
  }

  Validator.isEmpty(input) &&
    info(
      white(
        "Input text [press ENTER to choose task1/task2 | press CTRL + C to exit]:"
      )
    );

  try {
    await pipeline(
      !Validator.isEmpty(input) ? createReadStream(input) : process.stdin,
      new EncryptTransform(shift, action),
      !Validator.isEmpty(output)
        ? createWriteStream(output, { flags: "a" })
        : process.stdout
    );

    log(`${successMessage} complete: ${action}`);
  } catch (e) {
    process.stderr.write(`${errorMessage} ${e.message}\n`);
    process.exit(1);
  }
};

process.stdin.setEncoding("utf8");
process.on("exit", (code) => log(`${codeMessage} ${code}`));
process.on("SIGINT", () => {
  process.exit(0);
});

pkg.storeOptionsAsProperties(false).version(pckg.version);

pkg.requiredOption("-s, --shift <num>", "A shift", Number)
  .requiredOption("-a --action <action>", "An action task1/task2")
  .option("-i, --input <filename>", "An input file")
  .option("-o --output <filename>", "An output file")
  .action(actionHandler);

pkg.parse(process.argv);