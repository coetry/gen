let args = require("minimist")(process.argv.slice(2));
let dedent = require("dedent");

function generateNodeFn() {
  return dedent`
  module.exports = (req, res) => res.status(200).end('yo')
  `;
}
function generateNodeTsFn() {
  return dedent`
  import { NowRequest, NowResponse } from '@now/node'
  
  export default (req: NowRequest, res: NowResponse) => {
    res.status(200).end('yo')
  }
  `;
}

let generators = {
  "node-fn": generateNodeFn,
  "node-ts-fn": generateNodeTsFn
};

function thingsToGenerate(args) {
  let validThingsToGenerate = [];
  validThingsToGenerate = args.filter(x => typeof generators[x] === "function");
  return validThingsToGenerate;
}

for (let x of thingsToGenerate(args["_"])) {
  console.log(generators[x]());
}
