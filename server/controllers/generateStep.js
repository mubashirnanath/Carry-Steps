import sumModel from "../model/sumModel.js";

const generateSteps = (num1, num2)=> {
  let carry = 0;
  let sum = "";
  let carryString = "_";
  let obj = {};
  let i = 1;
  num1 = num1.toString();
  num2 = num2.toString();

  while (num1.length > 0 || num2.length > 0 || carry > 0) {
    let n1 = num1.length > 0 ? parseInt(num1.slice(-1)) : 0;
    let n2 = num2.length > 0 ? parseInt(num2.slice(-1)) : 0;
    let total = n1 + n2 + carry;
    carry = Math.floor(total / 10);
    sum = (total % 10).toString() + sum;
    carryString = carry + carryString;
    obj[`step${i}`] = { carryString, sumString: sum };
    num1 = num1.slice(0, -1);
    num2 = num2.slice(0, -1);
    i++;
  }
  return obj;
}

const generateStep = async (req, res) => {
  try {
    const { num1, num2 } = req.body;
    const positiveRegex = /^[0-9]+$/;
    if (!positiveRegex.test(num1))
      // throw new Error("Number 1 not a positive number");
      res.status(404).json({ message: "Number 1 is not a positive number" });
    if (!positiveRegex.test(num2))
      // throw new Error("Number 2 not a positive number");
      res.status(201).json({ message: "Number 2 is not a positive number" });
    const steps = generateSteps(num1, num2);
    const sum = await sumModel.create({ steps: steps });
    res.status(201).json({ data: sum.steps });
  } catch (error) {
    console.log(error);
  }
};
export default generateStep;
