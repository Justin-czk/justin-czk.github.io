async function load() {
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbzge7cgF-I_tmvwWYZOp-GmLnzlTyaMqixBVKOnlIz-qNtpZsLRW44ioMjroI0OknvPug/exec"
  );
  console.log(response);
  const events = await response.json();
  console.log({ events });
}

load();
