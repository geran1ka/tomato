export const main = (btn) => {
  let count = 0;
  const imp = ['default', 'important', 'so-so'];
  btn.addEventListener('click', ({target}) => {
    count += 1;
    if (count >= imp.length) {
      count = 0;
    }

    for (let i = 0; i < imp.length; i++) {
      if (count === i) {
        target.classList.add(imp[i]);
      } else {
        target.classList.remove(imp[i]);
      }
    }
  });
};


const getNum = num => ('0' + num).slice(-2);

export const getTimeMinSec = (state) => {
  const minutes = getNum(Math.floor(state.time / 60));
  const seconds = getNum(state.time % 60);
  return  `${minutes}:${seconds}`;
}

export const changeStatusInfo = (state) => {
  return state.status === 'break' ? 'Короткий перерыв' :
    state.status === 'relax' ? 'Длинный перерыв' : 'Работа';
}