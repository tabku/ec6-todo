import "./styles.css";

const onClickAdd = () => {
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  createIncompleteList(inputText);
};

// 未完了リストの削除処理を共通化
const deleteFromList = (target) => {
  const ttarget = target.parentNode;
  document.getElementById("incomplete-list").removeChild(ttarget);
};

// 未完了のTODOに追加する
const createIncompleteList = (text) => {
  const div = document.createElement("div");
  div.className = "list-row";
  const li = document.createElement("li");
  li.innerText = text;

  // 完了ボタンの作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 今いるリストから削除
    deleteFromList(completeButton);
    const addTarget = completeButton.parentNode;
    const text = addTarget.firstElementChild.innerText;
    addTarget.textContent = null;
    const li = document.createElement("li");
    li.innerText = text;

    // 戻るボタンの作成
    const reButton = document.createElement("button");
    reButton.innerText = "戻す";
    reButton.addEventListener("click", () => {
      const reTarget = reButton.parentNode;
      document.getElementById("complete-list").removeChild(reTarget);
      const text = reTarget.firstElementChild.innerText;
      createIncompleteList(text);
    });

    // 完了リストに戻るボタンを含めて表示
    addTarget.appendChild(li);
    addTarget.appendChild(reButton);
    const ul = document.getElementById("complete-list");
    ul.appendChild(addTarget);
  });

  // 削除ボタンの作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    deleteFromList(deleteButton);
  });

  // 未完了リストへ描画
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  const ul = document.getElementById("incomplete-list");
  ul.appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
