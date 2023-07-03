const mongoose = require("mongoose");
const infoSchema = new mongoose.Schema({
  userImg: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  summary: { type: String, required: true },
  skillHighLights: [{ type: String, required: true }],
  experience: [{ type: Object, required: true }],
  education: [{ type: Object, required: true }],
  languages: { type: String, required: true },
  hobbies: { type: String, required: true },
  templateIndex: { type: Number, required: true },
});

module.exports = mongoose.model("Info", infoSchema);
