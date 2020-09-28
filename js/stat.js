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

var HEADER_HEIGHT = CLOUD_Y + GAP * 4 + FONT_GAP * 2;
var MAX_BAR_HEIGHT = CLOUD_HEIGHT - GAP * 6 - FONT_GAP * 4;
var NAMES_Y_POSITION = CLOUD_HEIGHT - GAP * 2 + CLOUD_Y;

function randomSaturation() {
  return `hsl(240, ${Math.random() * 100}%, 50%)`;
}

function renderBar(ctx, position, heightShare = 0, color) {
  ctx.fillStyle = color;
  var x = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * position;
  var y = HEADER_HEIGHT + GAP + MAX_BAR_HEIGHT * (1 - heightShare);
  ctx.fillRect(x, y, BAR_WIDTH, MAX_BAR_HEIGHT * heightShare);
}

function getRoundMaxValue(arr) {
  var result = arr.reduce(function (max, current) {
    max = (current > max) ? current : max;
    return max;
  }, 0);
  return Math.round(result);
}

function renderCloud(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function renderText(ctx, x, y, text, color = `black`) {
  ctx.font = MAIN_FONT;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getRoundMaxValue(times);
  var heightShare = 0;
  var barXPosition = 0;
  var curTime = 0;

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, `white`);

  renderText(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3, `Ура вы победили!`);
  renderText(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3 + FONT_GAP, `Список результатов:`);

  names.forEach(function (name, position) {
    barXPosition = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * position;
    curTime = Math.round(times[position]);
    heightShare = curTime / maxTime;

    renderText(ctx, barXPosition, NAMES_Y_POSITION, name);
    renderText(ctx, barXPosition, HEADER_HEIGHT + MAX_BAR_HEIGHT * (1 - heightShare), curTime);


    var colorBar = (name === `Вы`) ? `rgba(255, 0, 0, 1)` : randomSaturation();
    renderBar(ctx, position, heightShare, colorBar);
  });
};
