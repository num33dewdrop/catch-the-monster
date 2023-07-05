<?php
require( 'function.php' );
debug( '[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]' );
debug( '[[[[[[[[[[[[[HOME画面]]]]]]]]]]]]]' );
debug( '[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]' );
debugLogStart();
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CATCH THE MONSTER!!</title>
    <link rel="stylesheet" href="src/css/app.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
</head>
<body>
<header id="header" class="site-width">
    <h1 class="title">CATCH THE MONSTER</h1>
    <ul class="u-container js-hide-init" style="display: none;">
        <li>ユーザー名：<span class="js-set-username"></span></li>
        <li>最大スコア：<span class="js-get-point-max">0</span></li>
    </ul>
    <div style="display: flex; align-items: center; justify-content: space-between">
        <ul class="menu js-disabled-menu">
            <li class="js-not-disabled">
                <button style="font-size:14px;" class="js-init-game">初期</button>
            </li>
            <li>標的
                <ul class="submenu">
                    <li>
                        <button class="choice-spider">SPIDER</button>
                    </li>
                    <li>
                        <button class="choice-ghost">GHOST</button>
                    </li>
                    <li>
                        <button class="choice-dragon">DRAGON</button>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="monster-container display1">
            <i class="fa-solid fa-spider skeleton skeleton1"></i>
            <button type="submit" class="js-btn-monster1 choice-monster jsCatchMonster">
                <i class="fa-solid fa-spider"></i>
            </button>
        </div>
        <ul class="menu js-disabled-menu">
            <li>敵数
                <ul class="submenu">
                    <li>
                        <button class="single">1</button>
                    </li>
                    <li>
                        <button class="double">2</button>
                    </li>
                    <li>
                        <button class="triple">3</button>
                    </li>
                </ul>
            </li>
            <li>マス
                <ul class="submenu">
                    <li>
                        <button class="js-square64">64</button>
                    </li>
                    <li>
                        <button class="js-square100">100</button>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</header>
<div id="main" class="site-width">
    <button class="start-game js-start-game" disabled="disabled">
        <span class="explain ex-name">SPIDER</span>
    </button>
    <p style="font-size: 12px; text-align: center;">標的・敵の数・マスを選択して下さい</p>
    <ul class="explain ex-container">
        <li>敵の数：<span class="js-monster-num">1</span></li>
        <li>マス数：<span class="js-set-square">0</span></li>
        <li class="js-hide-init" style="display: none;">捕獲数：<span class="js-get-monsters">0</span></li>
        <li class="js-hide-init" style="display: none;">スコア：<span class="js-get-point">0</span></li>
    </ul>
    <form action="" method="post" class="js-show-init">
        <div style="text-align: center">
            <label for="username" style="display: block">NAME</label>
            <input id="username" type="text" name="username" class="js-get-name">
        </div>
        <input type="submit" value="START" class="js-submit-disabled" disabled="disabled">
    </form>
    <div class="game-over"><div class="inner"></div></div>
    <div class="game-window js-switch-show">
        <div class="container"></div>
    </div>
</div>

<div class="modal js-show-modal">
    <p>CATCH!!</p>
    <button class="js-hide-modal">REMATCH</button>
</div>
<div class="modal js-show-game-over">
    <p>GAME OVER</p>
    <button class="js-retry">HOME</button>
</div>
<div class="cover js-modal-cover"></div>
<!-- jQuery-->
<script
        src="https://code.jquery.com/jquery-3.7.0.js"
        integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM="
        crossorigin="anonymous"></script>
<script src="src/js/app.js"></script>
</body>
</html>