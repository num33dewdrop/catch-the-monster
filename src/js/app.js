$(function () {
    var GameInfoModule = function () {
        //定数
        var GROUP_MONSTER = {
            SPIDER: 'fa-spider',
            GHOST: 'fa-ghost',
            DRAGON: 'fa-dragon',
        };
        /*========================================
        PRIVATE PROPERTY
        ========================================*/
        var choiceMonsterName = 'SPIDER';
        var choiceMonsterNum = 1;
        /*========================================
        PRIVATE METHOD
        ========================================*/
        //CONSTRUCT
        var Monster = function (name, ico, point, moveSpeed, displayNum, monsterNum) {
            var $btnMonsterNum = $('.display' + displayNum + '>.js-btn-monster' + monsterNum);
            var $skeleton = $('.display' + displayNum + '>.skeleton' + monsterNum);

            this.name = name;
            this.ico = ico;
            this.point = point;
            this.moveSpeed = function () {
                $btnMonsterNum.css({'transition': 'all ' + moveSpeed + 's cubic-bezier(0.22, 0.61, 0.36, 1) 0s'});
            };
            this.moveMonster = function () {
                var containerNum = Number($('.js-set-square').text());
                var x = Math.floor((Math.random() * containerNum) + 1);
                var $parts = $(".parts" + x);

                var leftP = $parts.offset().left;
                var topP = $parts.offset().top;
                var widthP = $parts.width();
                var heightP = $parts.height();

                var widthM = $btnMonsterNum.width();
                var heightM = $btnMonsterNum.height();

                var offsetCenterLeft = leftP + (widthP / 2) - (widthM / 2);
                var offsetCenterTop = topP + (heightP / 2) - (heightM / 2);

                $btnMonsterNum.css({'top': offsetCenterTop + 'px', 'left': offsetCenterLeft + 'px'});
            };
            this.moveInit = function () {
                var topS = $skeleton.offset().top;
                var leftS = $skeleton.offset().left;

                var offsetCenterTopMonster = topS - 2.6;
                $btnMonsterNum.css({
                    'top': offsetCenterTopMonster + 'px',
                    'left': leftS + 'px',
                    'transition': '',
                });
            };
            this.indexUp = function () {
                $btnMonsterNum.css({'z-index': 2});
            };
            this.indexDown = function () {
                $btnMonsterNum.css({'z-index': 1});
            };
            this.sizeUp = function () {
                $btnMonsterNum.removeClass('monster-size');
            };
            this.sizeDown = function () {
                $btnMonsterNum.addClass('monster-size');
            };
        };
        //create monster
        var createMonster = function (TargetMonster, displayNum, monsterNum) {
            if (choiceMonsterName === "SPIDER") {
                TargetMonster = new Monster('SPIDER', GROUP_MONSTER.SPIDER, 200, 3, displayNum, monsterNum);
            } else if (choiceMonsterName === "GHOST") {
                TargetMonster = new Monster('GHOST', GROUP_MONSTER.GHOST, 300, 2, displayNum, monsterNum);
            } else if (choiceMonsterName === "DRAGON") {
                TargetMonster = new Monster('DRAGON', GROUP_MONSTER.DRAGON, 500, 1.5, displayNum, monsterNum);
            }
            return TargetMonster;
        };
        //Switch Display
        var switchDisplayMonster = function () {
            var targetSkeletonContainer = $('.monster-container');
            var displayArray = ['display1', 'display2', 'display3'];
            var choiceSkeletonArray = [];

            targetSkeletonContainer.removeClass(displayArray);
            targetSkeletonContainer.addClass('display' + choiceMonsterNum);

            for (var i = 1; i <= choiceMonsterNum; i++) {
                choiceSkeletonArray.push('<i class="fa-solid ' + Monsters[0].ico + ' skeleton skeleton' + i + '"></i><button type="submit" class="js-btn-monster' + i + ' choice-monster jsCatchMonster"><i class="fa-solid ' + Monsters[0].ico + '"></i></button>');
            }
            targetSkeletonContainer.html(choiceSkeletonArray);
        };
        /*========================================
        PRIVATE PROPERTY
        ========================================*/
        var ChoiceMonster = createMonster(ChoiceMonster, 1, 1);
        var ChoiceMonster1 = {};
        var ChoiceMonster2 = {};
        var Monsters = [ChoiceMonster];
        var intervalIds = [];

        return {
            /*========================================
            PUBLIC PROPERTY
            ========================================*/

            /*========================================
            PUBLIC METHOD
            ========================================*/
            moveStartAll: function () {
                $.each(Monsters, function (index, value) {
                    intervalIds[index] = setInterval(function () {
                        Monsters[index].moveMonster();
                    }, 3000);
                });
            },
            //SHOW MODAL
            showModal: function () {
                //MODAL WIDTH
                var screenWidth = $(window).width();
                var $modal = $('.js-show-modal');
                var modalWidth = $modal.innerWidth();
                var modalPosition = (screenWidth / 2) - (modalWidth / 2);
                $modal.attr({'style': 'margin-left:' + modalPosition + 'px'});
                //SHOW
                $modal.show();
                $('.js-modal-cover').show();
                //HIDE
                $('.js-hide-modal').on('click', function () {
                    $('.js-show-modal').hide();
                    $('.js-modal-cover').hide();
                });
            },
            gameOver: function () {
                //MODAL WIDTH
                var screenWidth = $(window).width();
                var $modal = $('.js-show-game-over');
                var modalWidth = $modal.innerWidth();
                var modalPosition = (screenWidth / 2) - (modalWidth / 2);
                $modal.attr({'style': 'margin-left:' + modalPosition + 'px'});
                //SHOW
                $modal.show();
                $('.js-modal-cover').show();
                //HIDE
                $('.js-retry').on('click', function () {
                    location.reload();
                });
            },
            callbackDisplay: function (monsterNum, callback) {
                choiceMonsterNum = monsterNum;
                $('.js-monster-num').text(monsterNum);
                switchDisplayMonster();
                callback();
            },
            //switch monster num
            switchMonsterNum: function () {
                var targetMonsterArray = [];
                var ChoiceMonsterArray = [ChoiceMonster, ChoiceMonster1, ChoiceMonster2];
                for (var i = 0; i < choiceMonsterNum; i++) {
                    ChoiceMonsterArray[i] = createMonster(ChoiceMonsterArray[i], choiceMonsterNum, i + 1);
                    targetMonsterArray.push(ChoiceMonsterArray[i]);
                }
                Monsters = targetMonsterArray;
            },
            //move monster
            switchMoveMonster: function (method) {
                if (method === "move") {
                    $.each(Monsters, function (index, value) {
                        Monsters[index].moveMonster();
                    });
                } else if (method === "speed") {
                    $.each(Monsters, function (index, value) {
                        Monsters[index].moveSpeed();
                    });
                } else if (method === "init") {
                    $.each(Monsters, function (index, value) {
                        Monsters[index].moveInit();
                        clearInterval(intervalIds[index]);
                    });
                } else if (method === "upIndex") {
                    $.each(Monsters, function (index, value) {
                        Monsters[index].indexUp();
                    });
                } else if (method === "downIndex") {
                    $.each(Monsters, function (index, value) {
                        Monsters[index].indexDown();
                    });
                } else if (method === "upSize") {
                    $.each(Monsters, function (index, value) {
                        Monsters[index].sizeUp();
                    });
                } else if (method === "downSize") {
                    $.each(Monsters, function (index, value) {
                        Monsters[index].sizeDown();
                    });
                }
            },
            //change monster
            changeClass: function (choiceClass) {
                var copy = Object.assign({}, GROUP_MONSTER);
                $.each(copy, function (key, value) {
                    if (choiceClass === value) {
                        delete copy[key];
                    }
                });
                var targetSkeleton = $('.monster-container>i');
                var targetReality = $('.choice-monster>i');
                targetSkeleton.add(targetReality).addClass(choiceClass);
                $.each(copy, function (key, value) {
                    targetSkeleton.add(targetReality).removeClass(value);
                });
            },
            //change disabled
            disabledInit: function () {
                if (Number($('.js-set-square').text()) !== 0 && $('.js-set-username').text().length) {
                    $('.js-start-game').prop("disabled", false);
                    $('.ex-name').text('START');
                } else {
                    $('.js-start-game').prop("disabled", true);
                    $('.ex-name').text(Monsters[0].name);
                }
            },
            changeColor100: function () {
                if (Number($('.js-set-square').text()) === 100) {
                    $('.choice-monster,.choice-monster:disabled,.start-game,.start-game:disabled').css('color', 'darkred');
                } else {
                    $('.choice-monster,.choice-monster:disabled,.start-game,.start-game:disabled').css('color', '#666');
                }
            },
            //setchoiceMonsterName
            setName: function (choiceName) {
                choiceMonsterName = choiceName;
            },
            //getchoiceMonsterName
            getName: function () {
                return choiceMonsterName;
            },
            //getchoiceMonsterNum
            getNum: function () {
                return choiceMonsterNum;
            },
            getMonstersArray: function () {
                return Monsters;
            },
            getIntervalIds: function () {
                return intervalIds;
            }
        };
    };

    var GM1 = new GameInfoModule();
    //ダブルタップズーム無効
    document.addEventListener("dblclick", function(e){ e.preventDefault();}, { passive: false });

    //DROPDOWN
    $("ul.menu li").hover(function () {
        $("ul.submenu:not(:animated)", this).slideDown();
    }, function () {
        $("ul.submenu", this).slideUp();
    });
    $("ul.menu li").on('click', function() {
        $("ul.submenu:not(:animated)", this).slideToggle();
    });

    //DISABLED
    $('.js-get-name').on('keyup', function () {
        if ($(this).val()) {
            $('.js-submit-disabled').prop("disabled", false);
        } else {
            $('.js-submit-disabled').prop("disabled", true);
        }
    });

    $('.js-submit-disabled').on('click', function (e) {
        e.preventDefault();
        $('.js-hide-init').show();
        $('.js-show-init').hide();
        GM1.switchMoveMonster("init");
        $.ajax({
            type: 'post',
            url: 'ajax.php',
            dataType: 'json',
            data: {
                username: $('.js-get-name').val(),
            }
        }).done(function (data, status) {
            var data_json = JSON.parse(JSON.stringify(data));
            console.log(data_json);
            console.log(status);
            $('.js-set-username').text(data_json['username']);
            $('.js-get-point-max').text(data_json['getPointMax']);
        }).done(function (data, status) {
            GM1.disabledInit();
        }).fail(function (msg) {
            console.log('Ajax fail' + msg);
        });
    });

    //INIT
    GM1.switchMoveMonster("init");
    $('.jsCatchMonster').prop("disabled", true);

    $('.js-init-game').on('click', function () {
        location.reload();
    });

    //choice monster
    $('.choice-spider,.choice-ghost,.choice-dragon').on('click', function () {
        GM1.setName($(this).text());
        GM1.switchMonsterNum();//create
        //show
        GM1.changeClass(GM1.getMonstersArray()[0].ico);
        GM1.switchMoveMonster("init");
        $('.ex-name').text(GM1.getMonstersArray()[0].name);
    });

    //choice monster num
    $('.single,.double,.triple').on('click', function () {
        GM1.callbackDisplay(Number($(this).text()), function () {
            GM1.switchMonsterNum();//create
            GM1.switchMoveMonster("init");
            GM1.changeColor100();
            $('.jsCatchMonster').prop("disabled", true);
        });
    });

    //choice square
    $('.js-square64,.js-square100').on('click', function () {
        var squareBox = [64, 100];
        var squareNum = Number($(this).text());
        var choiceSquareIndex = squareBox.indexOf(squareNum);
        var partsGroup = [];
        var $setSquare = $('.js-set-square');

        if (squareNum === 100 && Number($setSquare.text()) !== 100) {
            $('.choice-monster').addClass('roll-animation');
        } else {
            $('.choice-monster').removeClass('roll-animation');
        }

        $setSquare.text(squareNum);
        squareBox.splice(choiceSquareIndex, 1);


        for (var i = 1; i <= squareNum; i++) {
            partsGroup.push('<div class="parts parts' + i + '"><button class="btn btnParts btn' + i + ' jsClick"></button></div>');
        }

        $('.container').html(partsGroup).addClass('container' + squareNum);
        $.each(squareBox, function (index, value) {
            $('.container').removeClass('container' + value);
        });
        GM1.changeColor100();
        GM1.disabledInit();
    });

    //GAME START
    $('.js-start-game').on('click', function () {
        var $gameOver = $('.game-over');
        var $inner = $gameOver.children('.inner');
        $inner.addClass('active');

        var timeoutId = setTimeout(function () {
            $.ajax({
                type: 'post',
                url: 'ajax.php',
                dataType: 'json',
                data: {
                    game_over: true
                },
                complete: function () {
                    // 通信が成功してもエラーになっても実行される場所
                    console.log("ajax complete");
                    $('html, body').animate({scrollTop: 0});
                    GM1.gameOver();
                }
            }).done(function (data, status) {
                console.log(status);
            }).fail(function (msg) {
                console.log('Ajax fail');
            });
        },20000);

        $(this).prop("disabled", true);
        $('.ex-name').text(GM1.getMonstersArray()[0].name);
        $('.js-disabled-menu>li').not('.js-not-disabled').css('pointer-events', 'none');
        GM1.switchMoveMonster("downIndex");
        GM1.switchMoveMonster("speed");

        setTimeout(function () {
            GM1.switchMoveMonster("downSize");
            setTimeout(function () {
                GM1.switchMoveMonster("move");
            }, 100);
        }, 2000);

        GM1.moveStartAll();

        $('.js-switch-show').show('slow', function () {
            $('html, body').animate({scrollTop: $('body').get(0).scrollHeight}, 1000);
        });

        $('.jsCatchMonster').prop("disabled", false);

        $(".jsClick").on('click', function () {
            var $that = $(this);
            $(this).addClass('isAction');
            setTimeout(function () {
                $that.removeClass('isAction');
            }, 1800);
        });

        $(".jsCatchMonster").on('click', function () {
            var $that = $(this);
            var $parentNode = $(this).parent();
            var childrenNode = $parentNode.find("button");
            var getPoint = Number($('.js-get-point').text());
            var getMonsters = Number($('.js-get-monsters').text());
            var getPointMax = Number($('.js-get-point-max').text());

            $(this).prop("disabled", true);

            $.each(childrenNode, function (index, value) {
                if (value === $that[0]) {
                    GM1.getMonstersArray()[index].sizeUp();
                    GM1.getMonstersArray()[index].indexUp();
                    GM1.getMonstersArray()[index].moveInit();
                    clearInterval(GM1.getIntervalIds()[index]);
                    getPoint += GM1.getMonstersArray()[index].point;
                    getMonsters += 1;

                    if (getPoint > getPointMax) {
                        getPointMax = getPoint;
                        $('.js-get-point-max').text(getPointMax);
                    }

                    $('.js-get-point').text(getPoint);
                    $('.js-get-monsters').text(getMonsters);
                }
            });

            if (!($parentNode.find(".monster-size").length)) {
                $('.js-switch-show').hide('slow', function () {
                    $('html, body').animate({scrollTop: 0});
                });
                $('.js-disabled-menu>li').css('pointer-events', 'auto');
                $inner.removeClass('active');
                clearTimeout(timeoutId);
                GM1.showModal();
                GM1.disabledInit();
                $that.off('click');
                $(".jsClick").off('click');
            }

            $.ajax({
                type: 'post',
                url: 'ajax.php',
                dataType: 'json',
                data: {
                    username: $('.js-get-name').val(),
                    getPointMax: getPointMax,
                }
            }).done(function (data, status) {
                var data_json = JSON.parse(JSON.stringify(data));
                $('.js-get-point-max').text(data_json['getPointMax']);
            }).fail(function (msg) {
                console.log('Ajax fail');
            });
        });
    });
});