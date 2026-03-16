module.exports = (io) => {

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("placeBid", (data) => {

      io.emit("bidUpdate", data);

    });

    socket.on("disconnect", () => {

      console.log("User disconnected:", socket.id);

    });

  });

};