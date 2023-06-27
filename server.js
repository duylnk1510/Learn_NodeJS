const app = require("./src/app");

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});

// process.on('SIGINT', () => { // khi nhấn ctrl C
//     server.close(() => console.log('Exit server'));
// });