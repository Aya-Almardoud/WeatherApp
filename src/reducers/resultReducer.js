export function reduceResult(currentState, action) {
  const { firstNum, secondNum } = action.payload;
  const type = action.type;
  if (type == "add") {
    return Number(firstNum) + Number(secondNum);
  } else if (type == "subtract") {
    return Number(firstNum) - Number(secondNum);
  } else if (type == "multiply") {
    return Number(firstNum) * Number(secondNum);
  } else if (type == "divide") {
    return Number(firstNum) / Number(secondNum);
  }
}
