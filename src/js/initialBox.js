const dialogoverlayBox = () => {
  const dialogoverlayBox = document.createElement('div');
  dialogoverlayBox.setAttribute('id', 'dialogoverlay');
  document.body.appendChild(dialogoverlayBox);
};

const dialogBox = () => {
  const dialogBox = document.createElement('div');
  dialogBox.setAttribute('id', 'dialogbox');
  const div = document.createElement('div');
  const dialogBoxHead = document.createElement('div');
  dialogBoxHead.setAttribute('id', 'dialogboxhead');
  const dialogBoxBody = document.createElement('div');
  dialogBoxBody.setAttribute('id', 'dialogboxbody');
  const dialogBoxFoot = document.createElement('div');
  dialogBoxFoot.setAttribute('id', 'dialogboxfoot');
  div.appendChild(dialogBoxHead);
  div.appendChild(dialogBoxBody);
  div.appendChild(dialogBoxFoot);
  dialogBox.appendChild(div);
  document.body.appendChild(dialogBox); // pending know why container append is not working
};
const initialBox = () => {
  if (!document.querySelector('#dialogoverlay')) {
    dialogoverlayBox();
  }
  if (!document.querySelector('#dialogbox')) {
    dialogBox();
  }

  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const dialogoverlay = document.getElementById('dialogoverlay');
  const dialogbox = document.getElementById('dialogbox');
  dialogoverlay.style.display = 'block';
  dialogoverlay.style.height = `${winH}px`;
  dialogbox.style.left = `${winW / 2 - 550 * 0.5}px`;
  dialogbox.style.top = '100px';
  dialogbox.style.display = 'block';
  document.getElementById('dialogboxhead').innerHTML = 'Welcome to the Tic Tac Toe Game!';
};

export default initialBox;
