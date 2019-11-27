// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});


//Elements
const WholePage = document.getElementById('WholePage');
const questionarePageElement = document.getElementById('QuestionsPage');
const scorePageElement = document.getElementById('ScorePage');
const ImageBoxEl = document.getElementById('ImageBox');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const button3 = document.getElementById('btn3');
const button4 = document.getElementById('btn4');
const questionElement = document.getElementById('Question');
const answerButtonsElement = document.getElementById('answers');





let shuffledQuestions, currentQuestionIndex;
let shuffledAnswers,currentAnswerIndex;
let Score = 0;
let questionCounter = 0;


startButton.addEventListener('click', startGame);

function startGame(){
  userName = document.getElementById('Name').value;
  console.log(userName);
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  button1.addEventListener('click', function(){
    selectAnswer(0);
  });
  button2.addEventListener('click', function(){
    selectAnswer(1);
  });
  button3.addEventListener('click', function(){
    selectAnswer(2);
  });
  button4.addEventListener('click', function(){
    selectAnswer(3);
  });
  setNextQuestion();
}

function setNextQuestion(){
  currentQuestionIndex++;
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
  questionElement.innerText = question.question;
  shuffledAnswers = question.answers.sort(() => Math.random() - .5);
  ImageBoxEl.setAttribute("src" , question.image)
  showAnswers(shuffledAnswers);
}

function showAnswers(answer){
  button1.innerHTML = answer[0].text;
  button2.innerHTML = answer[1].text;
  button3.innerHTML = answer[2].text;
  button4.innerHTML = answer[3].text;
}

function selectAnswer(e){
  console.log(currentQuestionIndex);
  if (shuffledQuestions[currentQuestionIndex].answers[e].correct == true){
    Score ++;
  }
  if (currentQuestionIndex == 10){
    questionarePageElement.classList.add('hide');
    scorePageElement.classList.remove('hide');
    scorePageElement.style.backgroundColor = "#2971C4";
    document.getElementById('Score').innerHTML = "Well done " + userName + "<br>" + "your score is: " + Score;
  }

  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    database: "mydb"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    /*Create a table named "customers":*/
    var sql = "CREATE TABLE HighScore (Name VARCHAR(255), Score VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });

  setNextQuestion();
}

const questions = [
    {
        question : "What type of animal is Bambi?",
        answers: [
            {text:'Dear', correct: true},
            {text:'Tiger', correct: false},
            {text:'Pig', correct: false},
            {text:'Spider', correct: false}
        ],
        image : "https://vignette.wikia.nocookie.net/disney/images/c/ce/Profile_-_Bambi.png/revision/latest?cb=20190313173158",
    },
    {
      question : "Which country features a maple leaf on its flag?",
      answers: [
          {text:'Canada', correct: true},
          {text:'USA', correct: false},
          {text:'China', correct: false},
          {text:'Uganda', correct: false}
      ],
      image : "https://media.istockphoto.com/photos/happy-canada-day-red-silk-maple-leaf-picture-id477832436?k=6&m=477832436&s=612x612&w=0&h=86on5span2a0I6hRI4XrDl041EVYmzDSlf4y2LA0S6M=",
  },
  {
    question : "What game features the term love, deuce, match and volley?",
    answers: [
        {text:'Tennis', correct: true},
        {text:'Football', correct: false},
        {text:'Badminton', correct: false},
        {text:'Poker', correct: false}
    ],
    image : "http://southstreetprimary.org/wp-content/uploads/2018/02/Sports-equipment-Cropped-600x313.jpg",
},
{
  question : "Name a US state beginning with K?",
  answers: [
      {text:'Kansas', correct: true},
      {text:'Kanada', correct: false},
      {text:'Kennedy', correct: false},
      {text:'Kenya', correct: false}
  ],
  image : "https://dnlzsmybcpo0z.cloudfront.net/games/images/1446677138_Find_the_US_States",
},
{
  question : "Who wrote the ‘Harry Potter’ series?",
  answers: [
      {text:'JK Rowling', correct: true},
      {text:'George RR Martin', correct: false},
      {text:'JRR Tolken', correct: false},
      {text:'Stephen King', correct: false}
  ],
  image : "https://img.maximummedia.ie/joe_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE5XFxcLzA1XFxcLzMwMTIzNzI3XFxcL2hhcnJ5LXBvdHRlci0yLmpwZ1wiLFwid2lkdGhcIjo3NjcsXCJoZWlnaHRcIjo0MzEsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3d3dy5qb2UuaWVcXFwvYXNzZXRzXFxcL2ltYWdlc1xcXC9qb2VcXFwvbm8taW1hZ2UucG5nP2lkPTQzYmNhOWRlN2ViMjY5NzM3YTBmXCIsXCJvcHRpb25zXCI6W119IiwiaGFzaCI6IjAwZjc5MDNjNmE3OGI3NTE3YjQ4NjY5NDQ5YTZlZTdjYzczMWQzYmUifQ==/harry-potter-2.jpg",
},
{
  question : "What is the currency of India and Pakistan as well as a few other Asian countries?",
  answers: [
      {text:'Rupee', correct: true},
      {text:'Taka', correct: false},
      {text:'Dollars', correct: false},
      {text:'Rubble', correct: false}
  ],
  image : "https://images.livemint.com/img/2019/03/14/600x338/rupees-k6pC--621x414@LiveMint_1552545606672.JPG",
},
{
  question : "Who is Winnie the Pooh's gloomy donkey friend?",
  answers: [
      {text:'Eyeore', correct: true},
      {text:'Piglet', correct: false},
      {text:'Donkey', correct: false},
      {text:'Gloomy', correct: false}
  ],
  image : "https://vignette.wikia.nocookie.net/disney/images/1/1c/Profile_-_Eeyore.png/revision/latest?cb=20190315134852",
},
{
  question : "What is the standard unit of distance in the metric system?",
  answers: [
      {text:'Meter', correct: true},
      {text:'Miles', correct: false},
      {text:'Grams', correct: false},
      {text:'Pounds', correct: false}
  ],
  image : "https://images-na.ssl-images-amazon.com/images/I/61WiTrCLcZL._SL1500_.jpg",
},
{
  question : "What chemical element is diamond made of?",
  answers: [
      {text:'Carbon', correct: true},
      {text:'Metal', correct: false},
      {text:'Hydrogen', correct: false},
      {text:'Aluminium', correct: false}
  ],
  image : "https://i.ytimg.com/vi/mjUCAMFVjaY/maxresdefault.jpg",
},
{
  question : "What is the name of the tool needed to play snooker or billiards to hit the ball?",
  answers: [
      {text:'Cue', correct: true},
      {text:'Stick', correct: false},
      {text:'Staff', correct: false},
      {text:'Que', correct: false}
  ],
  image : "https://www.wikihow.com/images/thumb/c/c6/Hold-a-Pool-Cue-Step-10-Version-2.jpg/aid1338593-v4-1200px-Hold-a-Pool-Cue-Step-10-Version-2.jpg",
},
{
  question : "What part of the body produces insulin?",
  answers: [
      {text:'Pancreas', correct: true},
      {text:'Pelvis', correct: false},
      {text:'Kidney', correct: false},
      {text:'Brain', correct: false}
  ],
  image : "https://isaacnewtonfarris.com/wp-content/uploads/2019/04/insulin-4.jpg",
},
{
  question : "In a standard pack of cards, which king is the only one to not have a moustache?",
  answers: [
      {text:'King Of Hearts', correct: true},
      {text:'King of Spades', correct: false},
      {text:'King of Diamonds', correct: false},
      {text:'King of Clubs', correct: false}
  ],
  image : "https://www.uncommongoods.com/images/items/43300/43327_1_1200px.jpg",
},
{
  question : "Which month is Black History Month in USA?",
  answers: [
      {text:'February', correct: true},
      {text:'January', correct: false},
      {text:'October', correct: false},
      {text:'August', correct: false}
  ],
  image : "https://themichigantimes.com/wp-content/uploads/2019/02/Black-History-Month-2017-Image-900x646.jpg",
},
{
  question : "What is the capital of Turkey?",
  answers: [
      {text:'Ankara', correct: true},
      {text:'Istanbul', correct: false},
      {text:'Marakesh', correct: false},
      {text:'Izmir', correct: false}
  ],
  image : "https://nails.newsela.com/s3/newsela-media/article_media/2018/02/elem-country-turkey-2604550a.jpg?crop=0%2C74%2C2121%2C1267&height=497&width=885",
},
{
  question : "In what country were the 2014 winter Olympics held in the town of Sochi?",
  answers: [
      {text:'Russia', correct: true},
      {text:'Kazekhstan', correct: false},
      {text:'Iraq', correct: false},
      {text:'Alaska', correct: false}
  ],
  image : "https://img.maximummedia.ie/joe_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE4XFxcLzAyXFxcLzExMTQxNzE2XFxcL0hvdy10by1XYXRjaC1XaW50ZXItT2x5bXBpY3MtMjAxOC13aXRob3V0LUNhYmxlLmpwZ1wiLFwid2lkdGhcIjo3NjcsXCJoZWlnaHRcIjo0MzEsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3d3dy5qb2UuaWVcXFwvYXNzZXRzXFxcL2ltYWdlc1xcXC9qb2VcXFwvbm8taW1hZ2UucG5nP2lkPTQzYmNhOWRlN2ViMjY5NzM3YTBmXCIsXCJvcHRpb25zXCI6W119IiwiaGFzaCI6IjU5ZGI4OWQ0OGE4OWZmM2FjZjk0ODNhMDE0ZTU1NzRhMDA5ZDllMjAifQ==/how-to-watch-winter-olympics-2018-without-cable.jpg",
},
{
  question : "Which planet did Superman come from?",
  answers: [
      {text:'Krypton', correct: true},
      {text:'Earth', correct: false},
      {text:'The Sun', correct: false},
      {text:'Tamaran', correct: false}
  ],
  image : "https://wegotthiscovered.com/wp-content/uploads/2016/04/czzkwrovaaaacu7-564x340.jpg",
},
{
  question : "Who was the Greek God of War?",
  answers: [
      {text:'Ares', correct: true},
      {text:'Kratos', correct: false},
      {text:'Zeus', correct: false},
      {text:'Poseidon', correct: false}
  ],
  image : "https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/8c/c3/T2-H-5022-Greek-Gods-Large-Display-Cut-Out-Pack.jpg",
},
{
  question : "What superhero has been played by Michael Keaton, Val Kilmer, George Clooney and Christian Bale?",
  answers: [
      {text:'Batman', correct: true},
      {text:'Superman', correct: false},
      {text:'Spiderman', correct: false},
      {text:'Captain America', correct: false}
  ],
  image : "https://vignette.wikia.nocookie.net/marvel_dc/images/0/02/Justice_League_of_America_Vol_2_1_Full.jpg/revision/latest?cb=20171010185905",
},
{
  question : "What band featured Sting, Stewart Copeland and Andy Summers??",
  answers: [
      {text:'The Police', correct: true},
      {text:'Beatles', correct: false},
      {text:'Metalica', correct: false},
      {text:'Red Hot Chilli Peppers', correct: false}
  ],
  image : "https://i.pinimg.com/originals/39/33/11/393311fe1693464baedc9cbc7c478869.jpg",
},
{
  question : "What is the official language of Brazil?",
  answers: [
      {text:'Portugese', correct: true},
      {text:'Spanish', correct: false},
      {text:'Brazilian', correct: false},
      {text:'English', correct: false}
  ],
  image : "https://ichef.bbci.co.uk/news/624/cpsprodpb/374F/production/_108095141_amapa_brazil.png",
},
{
  question : "In ‘Shrek’, what comedic actor voices Donkey?",
  answers: [
      {text:'Eddie Murphy', correct: true},
      {text:'Mike Meyers', correct: false},
      {text:'Ben Stiller', correct: false},
      {text:'Chris Rock', correct: false}
  ],
  image : "https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2Fc963f918-05a5-11e7-aa5b-6bb07f5c8e12?fit=scale-down&source=next&width=700",
},
{
  question : "What is the religion of the Dalai Lama?",
  answers: [
      {text:'Bhuddhism', correct: true},
      {text:'Hinduism', correct: false},
      {text:'Islam', correct: false},
      {text:'Christianity', correct: false}
  ],
  image : "https://pbs.twimg.com/media/D-dw5GRVAAAEj6_.jpg",
},
{
  question : "Who wrote ‘The Scarlet Letter’?",
  answers: [
      {text:'Nathaniel Hawthorne', correct: true},
      {text:'Hester Prynne', correct: false},
      {text:'Roland Joffe', correct: false},
      {text:'Wim Wenders', correct: false}
  ],
  image : "http://fringepvd.org/uploads/3/4/7/9/34790848/thescarletletter-1-stacey-koloski_orig.jpg",
},
{
  question : "What country has had prime ministers named Eden, Major, Peel Law, Brown and Heath?",
  answers: [
      {text:'United Kingdom', correct: true},
      {text:'United States', correct: false},
      {text:'Germany', correct: false},
      {text:'Denmark', correct: false}
  ],
  image : "https://www.oeclaw.co.uk/images/uploads/people/_Profile-Medium/ED-PEEL.jpg",
},
{
  question : "How many syllables make up a haiku?",
  answers: [
      {text:'17', correct: true},
      {text:'7', correct: false},
      {text:'16', correct: false},
      {text:'10', correct: false}
  ],
  image : "https://www.wikihow.com/images/0/0c/Write-a-Haiku-Poem-Step-12.jpg",
},
{
  question : "Who did Matthew Perry play in ‘Friends’?",
  answers: [
      {text:'Chandler', correct: true},
      {text:'Joey', correct: false},
      {text:'Ross', correct: false},
      {text:'Gunther', correct: false}
  ],
  image : "https://cdn1.thr.com/sites/default/files/imagecache/scale_crop_768_433/2018/12/cast01-h_2018.jpg",
},
{
  question : "What Shakespeare play features a brooding Danish prince and his girlfriend Ophelia?",
  answers: [
      {text:'Hamlet', correct: true},
      {text:'Othelo', correct: false},
      {text:'Romeo and Juliet', correct: false},
      {text:'Macbeth', correct: false}
  ],
  image : "https://res.cloudinary.com/uktv/image/upload/b_rgb:000000,w_880,h_495/v1460712102/lslbcyuuqqaq6cicozrj.jpg",
},
{
  question : "What is the name of the poker hand containing three of a kind and a pair?",
  answers: [
      {text:'Full House', correct: true},
      {text:'Royal Flush', correct: false},
      {text:'Four of a Kind', correct: false},
      {text:'Straight Flush', correct: false}
  ],
  image : "https://knowledge.insead.edu/sites/www.insead.edu/files/images/2018/07/vcs_should_invest_like_poker_player.jpg",
},
{
  question : "Which TV show featured older women named Blanche, Rose, Dorothy and Sophia?",
  answers: [
      {text:'The Golden Girls', correct: true},
      {text:'Friends', correct: false},
      {text:'Seinfeld', correct: false},
      {text:'SCall The Midwife', correct: false}
  ],
  image : "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555285702/shape/mentalfloss/goldenhed_2.jpg",
},
{
  question : "Who voiced the Genie in Disney’s ‘Aladdin (1992)’?",
  answers: [
      {text:'Robin Williams', correct: true},
      {text:'Will Smith', correct: false},
      {text:'Morgan Freeman', correct: false},
      {text:'Bud Spencer', correct: false}
  ],
  image : "https://s1.thcdn.com/productimg/1600/1600/12023775-1924645053645873.jpg",
},
];