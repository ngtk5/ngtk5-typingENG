

// 初期変数定義
// 問題を表示するオブジェクトを取得する
let Q = document.getElementById('_question');
// 問題を表示するオブジェクトを取得する
let A1 = document.getElementById('_ans1');
// 問題＆解答リスト
let Question = [
  ["祖父", "grandfather"],
["自然", "nature"],
["雑誌", "magazine"],
["すばらしい", "awesome"],
["衣服", "clothes"],
["生態系", "ecosystem"],
["好意的な", "friendly"],
["独立", "independence"],
["目の見えない", "blind"],
];
// 正解数を保持する値
let Correct = 0;
// 現在の問題数
let Qcnt = 0;

// 問題を画面に表示する処理
let Q_Set = function() {
Q.textContent = Question[Qcnt][0];
};

// 問題のリストをシャッフルする処理
let arrayShuffle = function() {
  for(var i = (Question.length - 1); 0 < i; i--){

    // 0〜(i+1)の範囲で値を取得
    var r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    var tmp = Question[i];
    Question[i] = Question[r];
    Question[r] = tmp;
  }
};

// 正誤判定の処理
let judge = function(ans) {
  if(ans == Question[Qcnt][1]) {
    // 効果音-正解
    let sound = document.getElementById("correct_sound");
    sound.play();
    Correct++;
  } else {
    // 効果音-不正解
    let sound = document.getElementById("incorrect_sound");
    sound.play();
  }
  Qcnt++;
  // 結果を表示する処理
  if (Qcnt == Question.length) {
    // タイマーストップ
    stop();
    // 経過時間計算
    result_time = result();
    // ランキング登録ボタンを押せるようにする
    var register_btn = document.getElementById('register_btn');
    register_btn.disabled = false;
    // 結果表示
    Q.textContent = "score:" + Correct + "点"+ "   " + "time:" + result_time + "秒";
    // 非表示inputに登録
    register(Correct, result_time)
    // 元に戻す
    Correct = 0;
    Qcnt = 0;
    // 回答欄非表示
    show('answer_form')
    // RESTARTボタン表示
    show("re_start_btn")
    // registerボタン表示
    show('register')
  } else {
    // 画面に表示
    Q_Set();
  }
};

// 表示と非表示を切り替える処理(idのみ)
let show = function(element_name) {
  let element = document.getElementById(element_name);
  console.log(element)
  let style = window.getComputedStyle(element);
  let value = style.getPropertyValue('display');
  // 表示⇔非表示
  if(value == 'flex') {
    element.style.display = 'none';
  }else {
    element.style.display = 'flex';
  }
};

// ゲームを最初からやる処理
let re_start = function() {
  // 切り替える対象を取得
  let ans_form = document.getElementById('answer_form');
  let re_start_btn = document.getElementById('re_start_btn');
  let regis = document.getElementById('register');
  let name = document.getElementById('name');
  //表示する
  ans_form.setAttribute("style", "display:flex");
  //非表示にする
  re_start_btn.setAttribute("style", "display:none");
  regis.setAttribute("style", "display:none");
  //切り替える対象を取得
  let pane = document.getElementsByClassName("data");
  //非表示にする
  pane[1].setAttribute("style", "display:none");
  //表示する
  pane[0].setAttribute("style", "display:flex");
  // value消去
  name.value = ''
  // ページの更新をしないように
  return false;
};

// // GAME STARTが押された時の処理
let display = function() {
  // 問題シャッフル
  arrayShuffle()
  //切り替える対象を取得
  let pane = document.getElementsByClassName("data");
  //非表示にする
  pane[0].setAttribute("style", "display:none");
  //表示する
  pane[1].setAttribute("style", "display:flex");
  // 画面に表示
  Q_Set();
  // 回答欄に最初からカーソルを入れる
  document.answer_form.answer.focus();
  // ページの更新をしないように
  return false;
};

// GAME STARTボタンがEnterキーに反応しないようにする処理
document.getElementById("game_start_btn").keydown = (e) => {
  // game_start_btnに入力されたキーを取得
  const key = e.code || 0;
  console.log(key)
  // 13はEnterキーのキーコード
  if (key == 13) {
    // アクションを行わない
    e.preventDefault();
  }
  // ページの更新をしないように
  return false;
}

// 登録ボタンがEnterキーに反応しないようにする処理
document.getElementById("register_btn").keydown = (e) => {
  // game_start_btnに入力されたキーを取得
  const key = e.code || 0;
  console.log(key)
  // 13はEnterキーのキーコード
  if (key == 13) {
    // アクションを行わない
    e.preventDefault();
  }
  // ページの更新をしないように
  return false;
}

// ゲーム中にEnterキーが押されたときの処理
let x = function() {
  let answer = document.getElementById('answer');
  let ans = answer.value
  // 正誤判定
  judge(ans)
  document.getElementById('answer').value = '';
  // ページの更新をしないように
  return false;
};

// registerのinputにscoreとtimeを挿入
let register = function(s, t) {
  // scoreとtimeのID取得
  score = document.getElementById('score')
  time = document.getElementById('time')
  // inputのvalueに挿入
  score.value = s
  time.value = t
}
var start = function() {
  // 開始時間
  start_time = new Date();
  return start_time
}
var stop = function() {
  // 終了時間
  stop_time = new Date();
  return stop_time
}
var result = function() {
  // 経過時間をミリ秒で取得
  var ms = stop_time.getTime() - start_time.getTime();
  var result_time = ms / 1000;
  return result_time
}