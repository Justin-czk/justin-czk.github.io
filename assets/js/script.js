async function load() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzge7cgF-I_tmvwWYZOp-GmLnzlTyaMqixBVKOnlIz-qNtpZsLRW44ioMjroI0OknvPug/exec", 
      {
        redirect: "follow",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const events = await response.json();
    console.log({ events });
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

load();
