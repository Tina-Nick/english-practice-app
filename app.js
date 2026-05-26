let allQuestions=[]

allQuestions=[

...grade1,
...grade2,
...grade3

]

for(let i=1;i<=10;i++){

count.innerHTML+=
`<option>${i}</option>`

}

let quiz=[]

let current=0


function shuffle(a){

return [...a]
.sort(()=>Math.random()-.5)

}



function startQuiz(){

current=0

const mode=
document.querySelector(
'input[name=mode]:checked'
).value

const category=
category.value

let data=[]


if(category==="g1")
data=grade1

if(category==="g2")
data=grade2

if(category==="g3")
data=grade3

if(category==="g12")

data=[

...grade1,
...grade2

]


if(category==="all")

data=allQuestions


if(category==="wrong"){

let ids=

JSON.parse(
localStorage.getItem(
"wrong"
)
)||[]

data=

allQuestions.filter(
q=>ids.includes(q.id)
)

}


quiz=

shuffle(data)

.slice(
0,
Number(
count.value
)
)

showQuestion()

}



function showQuestion(){

if(current>=quiz.length){

quizArea.innerHTML=

`

<h2>
終了
</h2>

<button
onclick="
startQuiz()
">

もう一度

</button>

`

return

}


let q=

quiz[current]

let mode=

document.querySelector(
'input[name=mode]:checked'
).value


let html=`

<div class=progress>

${current+1}

/

${quiz.length}

</div>


<h2>

${q.title}

</h2>

<p>

${q.japanese}

</p>

`


if(
mode==="sorting"
){

let shuffled=

shuffle(
q.chunks
)

html+=

`<div id=chunks>`

shuffled.forEach(

c=>{

html+=

`

<span class=chunk>

${c}

</span>

`

}

)

html+=`</div>`

html+=

`

<button
onclick="
reshuffle()
">

再シャッフル

</button>

`

}


html+=

`

<button
onclick=
"toggleAnswer()">

解答表示

</button>


<div
class=answer
id=answer>

${q.english}

</div>


<div
class=selfCheck>

<button
onclick=
"saveWrong()">

間違えた

</button>


<button
onclick=
"nextQuestion()">

次の問題

</button>

</div>

`


quizArea.innerHTML=
html

}



function reshuffle(){

showQuestion()

}


function toggleAnswer(){

let a=

document
.getElementById(
"answer"
)

if(
a.style.display
==="block"
)

a.style.display=
"none"

else

a.style.display=
"block"

}



function nextQuestion(){

current++

showQuestion()

}


function saveWrong(){

let ids=

JSON.parse(
localStorage.getItem(
"wrong"
))

||[]


ids.push(
quiz[current].id
)


ids=

[...new Set(ids)]


localStorage.setItem(

"wrong",

JSON.stringify(ids)

)

alert(
"保存しました"
)

}
