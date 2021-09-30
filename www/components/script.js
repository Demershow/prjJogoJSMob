window.onload = function(){
inicioJogo();
document.querySelector('#Subir').addEventListener("click", function(){
subir();
setTimeout(parar, 1000);
});
document.querySelector('#Esquerda').addEventListener("click", function(){
esquerda();
setTimeout(parar, 1000);
});
document.querySelector('#Direita').addEventListener("click", function(){
direita();
setTimeout(parar, 1000);
});
document.querySelector('#Descer').addEventListener("click", function(){
descer();
setTimeout(parar, 1000);
});
}

var personagemObj;
var obstaculo = [];
var pontos;

function inicioJogo(){
areaJogo.start();
personagemObj = new componente("#C76EFF", 10, 120, 30, 30);
pontos = new componente ("#FFF", 0, 290, 'Consolas', '30px', 'texto');
}

let areaJogo = {
canvas: document.createElement("canvas"),
start: function(){
this.canvas.height = 300,
this.context = this.canvas.getContext("2d");
document.body.insertBefore(this.canvas, document.body.childNodes[0]);
this.frame = 0;
this.intervalo = setInterval(atualizaAreaJogo, 20)
},
limpar: function(){
this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
},
parar : function(){
clearInterval(this.interval);
}
}

function componente(cor, x, y, largura, altura, tipo) {
this.tipo = tipo,
this.altura = altura,
this.largura = largura,
this.x = x,
this.y = y,
this.velocidadeX = 0,
this.velocidadeY = 0,
this.texto = 0,
this.atualiza = function(){
contexto = areaJogo.context;
if(this.tipo == "texto"){
contexto.font = this.altura + " " + this.largura;
contexto.fillStyle = cor;
contexto.fillText(this.texto, this.x, this. y);
}else{
contexto.fillStyle = cor,
contexto.fillRect(this.x, this.y, this.altura, this.largura);
}
},
this.novaPosicao = function(){
this.x += this.velocidadeX;
this.y += this.velocidadeY;
},
this.bater = function(obj){
//reconhecendo a posição do personagem
let esquerda = this.x;
let direita = this.x + largura;
let superior = this.y;
let inferior = this.y + altura;

//reconhecendo a posição do obstáculo
let objEsquerda = obj.x;
let objDireita = obj.x + obj.altura;
let objSuperior = obj.y;
let objInferior = obj.y + obj.largura;

let batida = true;
if(
(inferior < objSuperior) || (superior > objInferior) || (direita < objEsquerda) || (esquerda > objDireita)
){
batida = false;
}
return batida;
}
}

function atualizaAreaJogo(){
let x, y;
for(i = 0; i < obstaculo.length; i++)
{
if(personagemObj.bater(obstaculo[i])){
areaJogo.parar();
return;
}
}
areaJogo.limpar();
areaJogo.frame += 1;

if(areaJogo.frame == 1 || contarIntervalo(150)){
x = areaJogo.canvas.width;
minAltura = 20;
maxAltura = 200;
altura = Math.floor(Math.random() * (maxAltura - minAltura + 1) + minAltura)
minVazio = 50;
maxVazio = 200;
vazio = Math.floor(Math.random() * (maxVazio - minVazio + 1) + minVazio)
obstaculo.push(new componente('#70C7A7', x, 0, altura, 10));
obstaculo.push(new componente('#70C7A7', x, altura + vazio, x - altura - vazio, 10));
}

for(i = 0; i < obstaculo.length; i++){
obstaculo[i].x += -1;
obstaculo[i].atualiza();
}

pontos.texto = "Pontos: " + areaJogo.frame;
pontos.atualiza();
personagemObj.novaPosicao();
personagemObj.atualiza();
}

function subir(){
personagemObj.velocidadeY -= 1;
}

function descer(){
personagemObj.velocidadeY += 1;
}

function direita(){
personagemObj.velocidadeX += 1;
}

function esquerda(){
personagemObj.velocidadeX -= 1;
}

function parar (){
personagemObj.velocidadeX = 0;
personagemObj.velocidadeY = 0;
}

function contarIntervalo(n){
if((areaJogo.frame / n) % 1 == 0){
return true;
}else{
return false;
}
}