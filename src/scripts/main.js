class Main {
  init() {
    const body = document.querySelector('body');
    console.log(body);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  main.init();
});