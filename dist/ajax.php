<?php
//========================================
//ログ
//========================================
//ログをとるか
ini_set('log_errors','on');
//ログの出力ファイルの指定
ini_set('error_log','php.log');

//========================================
//デバッグ
//========================================
//デバッグフラグ
$debug_flg = true;
//デバッグ関数
function debug($str){
  global $debug_flg;
  if(!empty($debug_flg)){
    error_log('デバッグ：'.$str);
  }
}

//========================================
//セッション準備・セッションの置き場所設定
//========================================
session_save_path('/var/tmp/');
ini_set('session_gc.maxlifetime', 60*60*24*30);
ini_set('session_cookie.lifetime', 60*60*24*30);
session_start();
session_regenerate_id();

//========================================
//画面表示処理開始ログ吐き出し関数
//========================================
function debugLogStart(){
  debug('>>>>>>>>>>>>>>>>>>>>>>>>>> 画面処理開始');
  debug('セッションID：'.session_id());
  debug('セッション変数の中身：'.print_r($_SESSION,true));
  debug('現在日時タイムスタンプ：'.time());
  if(!empty($_SESSION['login_date']) && !empty($_SESSION['login_limit'])){
    debug('ログイン有効期限日時タイムスタンプ：'.($_SESSION['login_date'] + $_SESSION['login_limit']) );
  }
}

debug('[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]');
debug('[[[[[[[[[[[[[AJAX画面]]]]]]]]]]]]]');
debug('[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]');
debugLogStart();
if(!empty($_POST)){
  debug('POST：'.print_r($_POST,true));
  if(!empty($_POST['game_over'])) {
	  exit();
  }
  $name = (!empty($_POST['username']))? $_POST['username']:'';
  $max = (!empty($_POST['getPointMax']))? $_POST['getPointMax']:'';
  
  if(empty($max)){
    $userArray[$name] = array(
      'username' => $name,
    );
  }else{
    $userArray[$name] = array(
      'username' => $name,
      'getPointMax' => $max,
    );
  }
  
  debug('$userArray：'.print_r($userArray,true));
//  debug('$userArray point：'.$userArray['getPointMax']);
  
  $result = isset($_SESSION[$name]);
  debug('$result：'.$result);
  
  //セッションにPOSTの[$name]があるか
  if($result){
    //POSTの[$max]はあるか
    if(empty($userArray[$name]['getPointMax'])){
      //セッションにgetPointMaxはあるか
      if(empty($_SESSION[$name]['getPointMax'])){
        debug('USERセッションあり、最大スコアセッションなし、POST最大スコアなし');
        echo json_encode(array(
          'username'=> $userArray[$name]['username'],
          'getPointMax'=> 0,
        ));
      }else{
        debug('USERセッションあり、最大スコアセッションあり、POST最大スコアなし');
        echo json_encode(array(
          'username'=> $userArray[$name]['username'],
          'getPointMax'=> $_SESSION[$name]['getPointMax'],
        ));
      }
    }else{
      debug('セッションにあり、POST最大スコアあり');
      $_SESSION[$name]['getPointMax'] = $userArray[$name]['getPointMax'];
      echo json_encode(array(
        'username'=> $userArray[$name]['username'],
        'getPointMax'=> $userArray[$name]['getPointMax'],
      ));
    }
  }else{
    debug('セッションなし');
    $_SESSION[$name] = array(
      'username' => $userArray[$name]['username'],
      'getPointMax'=> 0,
      );
    echo json_encode(array(
      'username'=> $userArray[$name]['username'],
      'getPointMax'=> 0,
    ));
  }
}
//成功した場合に、JSON エンコードされた文字列を返します。 失敗した場合に false を返します。
