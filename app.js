let allQuestions = [
  ...grade1,
  ...grade2,
  ...grade3
];

let quiz = [];
let current = 0;

const countSelect = document.getElementById("count");
const quizArea = document.getElementById("quizArea");
const categorySelect = document.getElementById("category");

for(let i=1;i<=10;i++){
  countSelect.innerHTML +=
  `<option value="${i}">${i}</option>`;
}

function shuffle(arr){

 return [...arr].sort(
   ()=>Math.random()-0.5
 );

}

function startQuiz(){

 current=0;

 const mode=
 document.querySelector(
 'input[name="mode"]:checked'
 ).value;

 const category=
 categorySelect.value;

 let data=[];

 if(category==="g1"){

   data=grade1;

 }

 else if(category==="g2"){

   data=grade2;

 }

 else if(category==="g3"){

   data=grade3;

 }

 else if(category==="g12"){

   data=[
     ...grade1,
     ...grade2
   ];

 }

 else if(category==="all"){

   data=allQuestions;

 }
else if(category==="unit1"){

   data=
   grade1.filter(
   q=>q.unit===1
   );

}

else if(category==="unit2"){

   data=
   grade1.filter(
   q=>q.unit===2
   );

}

 else if(category==="wrong"){

   let ids=

   JSON.parse(
   localStorage.getItem(
   "wrong"
   )) || [];

   data=

   allQuestions.filter(
   q=>ids.includes(q.id)
   );

 }

 if(data.length===0){

   quizArea.innerHTML=
   "<h2>問題データがありません</h2>";

   return;

 }

 quiz=

 shuffle(data).slice(
 0,
 Number(countSelect.value)
 );

 showQuestion();

}


function showQuestion(){

 if(current>=quiz.length){

 quizArea.innerHTML=`

 <h2>
 終了しました
 </h2>

 <button
 onclick="startQuiz()">

 もう一度

 </button>

 `;

 return;

 }


 let q=quiz[current];

 let mode=
 document.querySelector(
 'input[name="mode"]:checked'
 ).value;

 let html=`

 <div class="progress">

 ${current+1}
 /
 ${quiz.length}

 </div>

 <h2>${q.title}</h2>

 <p>

 ${q.japanese}

 </p>

 `;


 if(mode==="sorting"){

 let shuffled=
 shuffle(q.chunks);

 html+=`<div>`;

 shuffled.forEach(c=>{

 html+=`

 <span class="chunk">

 ${c}

 </span>

 `;

 })

 html+=`</div>`

 html+=`

 <button
 onclick="reshuffle()">

 再シャッフル

 </button>

 `

 }


 html+=`

 <button
 onclick="toggleAnswer()">

 解答表示

 </button>


 <div
 class="answer"
 id="answer">

 ${q.english}

 </div>


 <div class="selfCheck">

 <button
 onclick="saveWrong()">

 間違えた

 </button>


 <button
 onclick="nextQuestion()">

 次の問題

 </button>

 </div>

 `


 quizArea.innerHTML=
 html;

}



function toggleAnswer(){

 let a=

 document.getElementById(
 "answer"
 );

 if(
 a.style.display
 ==="block"
 ){

 a.style.display=
 "none";

 }

 else{

 a.style.display=
 "block";

 }

}



function reshuffle(){

 showQuestion();

}


function nextQuestion(){

 current++;

 showQuestion();

}



function saveWrong(){

 let ids=

 JSON.parse(
 localStorage.getItem(
 "wrong"
 )
 ) || [];

 ids.push(
 quiz[current].id
 );

 ids=[
 ...new Set(ids)
 ];

 localStorage.setItem(

 "wrong",

 JSON.stringify(ids)

 );

 alert(
 "保存しました"
 );

}
