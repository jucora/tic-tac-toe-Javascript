const initialBox = () => {
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const dialogoverlay = document.getElementById('dialogoverlay');
  const dialogbox = document.getElementById('dialogbox');
  if (dialogbox) {
    // if due to test error null
    dialogoverlay.style.display = 'block';
    dialogoverlay.style.height = `${winH}px`;
    dialogbox.style.left = `${winW / 2 - 550 * 0.5}px`;
    dialogbox.style.top = '100px';
    dialogbox.style.display = 'block';
    document.getElementById('dialogboxhead').innerHTML = 'Welcome to the Tic Tac Toe Game!';
  }
};

export default initialBox;
