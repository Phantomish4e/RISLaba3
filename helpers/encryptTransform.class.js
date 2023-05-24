import { Transform } from "stream";

import { charConverter, multiplicationTable } from "./char-converter.js";

class EncryptTransform extends Transform {
  constructor(shift, action) {
    super();
    this.shift = shift;
    this.action = action;
  }

  _transform(chunk, _enc, done) {
    let rot = "";

    switch (this.action) {
      case "task1":
        rot = charConverter(chunk.toString("utf8"), this.shift);
        break;
      case "task2":
        rot = multiplicationTable(chunk.toString("utf8"), this.shift);
        break;
      default:
        process.stderr.write("✘ Erorr" + ' "Action not found :("\n');
        process.exit(1);
    }

    this.push(rot);
    done();
  }
}

export default EncryptTransform;