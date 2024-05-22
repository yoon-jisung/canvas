const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
/**
  컴퓨터가 1px을 표현할때 dpr을 사용한다.
  dpr은 device pixel ratio의 약자로, 디바이스의 화면에 표시되는 픽셀의 개수를 의미합니다.
  레티나 디스플레이와 같이 고해상도 화면을 가진 디바이스에서는 1px을 표현하기 위해 여러 개의 실제 픽셀을 사용합니다.
  dpr을 아는방법은 window.devicePixelRatio를 사용하면 된다.
 */
const dpr = window.devicePixelRatio;
const canvasWidth = 300;
const canvasHeight = 300;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";
//MEMO: 캔버스의 크기를 지정해주지 않으면 기본값으로 300 * 150이 설정된다.

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
/**
캔버스의 넓이와 높이를 작게 설정하면 화질이 낮아지는 이유는 픽셀 밀도(pixel density)와 관련이 있습니다.
캔버스는 픽셀 그리드로 구성되어 있으며, 각 픽셀은 색상 정보를 저장하는 작은 단위입니다. 캔버스의 크기가 작을수록 픽셀의 개수가 적어지므로, 색상과 디테일을 표현하는 데 제한이 생깁니다. 이로 인해 이미지나 그래픽의 선명도와 세부 사항이 손실될 수 있습니다.
예를 들어, 캔버스의 크기를 100x100으로 설정하면, 총 10,000개의 픽셀이 있게 됩니다. 그러나 원래 캔버스의 크기가 300x150이었다면, 45,000개의 픽셀이 있었을 것입니다. 작은 크기의 캔버스에서는 더 적은 픽셀로 정보를 표현해야 하므로, 화질이 낮아지는 것입니다.
따라서, 캔버스를 사용할 때는 원하는 화질과 세부 사항을 고려하여 적절한 크기를 선택하는 것이 중요합니다.
 */
ctx.scale(dpr, dpr);
/**
 * dpr을 사용하여 캔버스의 크기를 조정하면, 캔버스의 크기가 작아지는 것이 아니라 픽셀의 크기가 작아지는 것입니다. 캔버스의 크기는 변하지 않지만, 픽셀의 크기가 작아지므로 더 많은 픽셀을 사용하여 세밀한 그림을 그릴 수 있습니다.
 * 따라서, dpr값이 2일때 캔버스의 크기를 300x300으로 설정하면, 실제로는 600x600 크기의 픽셀 그리드가 사용되어 선명한 그림을 그릴 수 있습니다.
 */

ctx.fillRect(10, 10, 50, 50);

ctx.beginPath();
