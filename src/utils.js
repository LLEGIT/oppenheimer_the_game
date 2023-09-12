function showDialogue(object, dialogueArray, type) {
  let currentDialogueIndex = object.houseName ?? 0;
  let dialogBox = document.createElement("div");
  
  dialogBox.className = "dialog-box";
  dialogBox.textContent = dialogueArray[currentDialogueIndex];
  document.body.appendChild(dialogBox);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      currentDialogueIndex++;
      if (currentDialogueIndex < dialogueArray.length) {
        dialogBox.textContent = dialogueArray[currentDialogueIndex];
      } else {
        document.removeEventListener("keydown", handleKeyDown); // Remove the event listener
        if (dialogBox.parentNode === document.body) {
          document.body.removeChild(dialogBox);
        }

        if (type === "npc") {
          object.isTalking = false;
        }
      }
    }
  };

  document.addEventListener("keydown", handleKeyDown);
}

export { showDialogue };
