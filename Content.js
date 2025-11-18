//rahhh

fetch('https://raw.githubusercontent.com/Ev-ring/nameblocker-extension/main/first-names.txt')
  .then(result => result.text())
  .then(text => {
    const nameList = text.split(/\r?\n/).filter(Boolean); // array of names
    censorNames(nameList);
  })
  .catch(error => {
    console.error("Failed to load name list", error);
  });


function censorNames(nameList){
//--START OF FUNCTION--
   const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
    );   
    let node;
    while (node = walker.nextNode()) {
      const words = node.textContent.split(/(\W+)/);
      // /(W+) keeps punctuation but allows word-by-word detection
      
    let changed = false;
    const newWords = words.map(word => {
      if (nameList.includes(word)) {
        changed = true;
        return `<span style="background:black">${word}</span>`;
      }
      return word;
    });
    //if text is changed, safely replace it so it doesnt destroy the webpage
    if (changed) {
      const span = document.createElement("span");
      span.innerHTML = newWords.join("");
      node.parentNode.replaceChild(span, node);
    }
  }
//--END OF FUNCTION--
}
