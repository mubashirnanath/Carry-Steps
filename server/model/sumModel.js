import { Schema, model } from "mongoose";

const sumSchema = new Schema({
    steps: {
        type: Object,
        required: true,
    }
})
const sum = model("sum", sumSchema);

export default sum;