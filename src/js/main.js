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
