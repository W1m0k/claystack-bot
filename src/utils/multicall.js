const { Provider } = require("@ethersproject/providers");
const { ethers } = require("ethers");
const { multicallContract } = require("../constants/config");

function encodeFunctionCalls(functionName, args, abi) {
  const abiInterface = new ethers.utils.Interface(abi);
  return abiInterface.encodeFunctionData(functionName, args);
}

function decodeFunctionCall(functionName, result, abi) {
  const abiInterface = new ethers.utils.Interface(abi);
  const outputs = abiInterface.decodeFunctionResult(functionName, result);
  return outputs[0];
}

function makeCalls(abi, _calls) {
  const calls = _calls.map((call) => ({
    target: call.target,
    callData: encodeFunctionCalls(call.name, call.params, abi),
  }));
  return multicallContract
    .aggregate(calls)
    .then((res) => res.returnData)
    .then((datas) => {
      return datas.map((data, i) =>
        decodeFunctionCall(_calls[i].name, data, abi)
      );
    });
}

module.exports = makeCalls;
