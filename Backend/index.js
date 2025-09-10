import express from "express";
import * as emoji from "node-emoji";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Heelo world" });
});

app.post("/generate-otp", (req, res) => {
  const { email } = req.body;
  let string = "";
  for (let i = 0; i < 5; i++) {
    string += ":" + emoji.random().name + ":" + " ";
  }

  res.json({ message: `Your OTP for ${email} is ${string}` });
});


app.post("/verify-otp", (req, res) => {
  const { otp } = req.body;
  const  email  = req.query.email;
  console.log("the value of email is ", email);
  const originalArray =
    ":gibraltar: :man_fairy: :flashlight: :girl: :woman_health_worker:";

  const originalOtpArray = otp.split(" ");

  if (!otp || !email) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  console.log("the value of ", originalOtpArray);

  if (originalOtpArray.length > 0) {
    for (let value of originalOtpArray) {
      console.log("the value of i is ", value);
      if (!originalArray.includes(value)) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    }
  }
  res.json({ message: "OTP verified successfully" });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
