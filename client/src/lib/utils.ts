import mongoose from "mongoose";

const connection = {};
export const DBConnection = async () => {
  const PORT = process.env.PORT || 3830;
  const MONGO = process.env.MONGO || "";
  await mongoose
    .connect(MONGO)
    .then(() => {
      // app.listen(PORT, () => console.log(`Connected to PORT ${PORT}`));
      console.log("Connected to DB");
    })
    .catch((err) => console.error(`${err} connecting`));

  // try {
  //   if (connection.isConnected) {
  //     console.log("Using existing connection");
  //     return;
  //   }
  //   const db = await mongoose.connect(process.env.MONGO);
  //   connection.isConnected = db.connections[0].readyState;
  // } catch (error) {
  //   console.log(error);
  //   throw new Error(error.message);
  // }
};
