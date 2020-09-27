'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var GAP = 10;
var FONT_GAP = 15;
var MAIN_FONT = `16px PT Mono`;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var HEADER_HEIGHT = CLOUD_Y + GAP*4 + FONT_GAP*2;
var maxBarHeight = CLOUD_HEIGHT - GAP*6 - FONT_GAP*4;
var namesYPosition = CLOUD_HEIGHT - 2*GAP + CLOUD_Y;


window.renderStatistics = function (ctx, names, times) {

  var namesCount = names.length;
  var maxTime = Math.max(...times);
  var coefficient = 0;
  var barXPosition = 0;

  ctx.fillStyle = `white`;
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.shadowColor = `rgba(0, 0, 0, 0.7)`;
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.shadowColor = `rgba(0, 0, 0, 0)`;


  ctx.fillStyle = `black`;
  ctx.font = MAIN_FONT;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + GAP*2, CLOUD_Y + GAP*3);
  ctx.fillText(`Список результатов:`, CLOUD_X + GAP*2, CLOUD_Y + GAP*3 + FONT_GAP);

  for (var i = 0; i < namesCount; i++) {
    barXPosition = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP)*i;
    coefficient = times[i] / maxTime;

    ctx.fillStyle = `black`;
    ctx.fillText(`${names[i]}`, barXPosition, namesYPosition);
    ctx.fillText(`${Math.round(times[i])}`, barXPosition, HEADER_HEIGHT + maxBarHeight*(1-coefficient));

    ctx.fillStyle = `hsl(240,` + Math.random()*100 + `%, 50%)`;
    if (names[i] === `Вы`)
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    ctx.fillRect(barXPosition, HEADER_HEIGHT + GAP + maxBarHeight*(1-coefficient), BAR_WIDTH, maxBarHeight*coefficient);
  }
};
