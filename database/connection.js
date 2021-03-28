const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/hw18",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.log("[!] Connection failed");
    console.log("[+] Server connected succeffully.");
  }
);
