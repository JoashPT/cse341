const express = require('express'); //included in the first part
const app = express();  // also included in the first part
//const router = express.Router();    //initialized in the second part, missing in the third part


//*~~~~~ First part using node.js express in the lesson~~~~*/
//~~~~ I don't really understand anything lmao but it states it's used for Modular Web Appliations
//CODE BEGINS HERE
// app.get('/', (req, res) => {
//     res.send("Hello");
// });

// app.listen(process.env.PORT || 3000, () => {
//     console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
// })
//CODE ENDS HERE

//*~~~~~ Second part using node.js express in the lesson~~~~*/
//~~~~ I don't really understand anything lmao
//CODE BEGINS HERE
router.get('/home', (req, res) => {
    res.send('Hello World, This is home router');
});

router.get('/profile', (req, res) => {
    res.send('Hello World, This is profile router');
});

router.get('/login', (req, res) => {
    res.send('Hello World, This is login router');
});

router.get('/logout', (req,res) => {
    res.send('Hello World, This is logout router');
});

app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
    console.log('Web Server is listerning at port ' + (process.env.PORT || 3000));
})
//CODE ENDS HERE

///*~~~Third part of the code */
//CODE BEGINS HERE
