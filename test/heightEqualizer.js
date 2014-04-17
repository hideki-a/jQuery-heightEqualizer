describe("jQuery.heightEqualizer", function () {
    describe("規約", function () {
        it("jQueryオブジェクトが返されること", function () {
            var $elem = $("<div/>"),
                obj = $elem.heightEqualizer();

            expect(obj).to.be.a(jQuery);
        });
    });

    describe("メソッド", function () {
        it("要素の高さが正しく取れること", function () {
            var $elem = $("<div/>"),
                equalizer;

            $elem.heightEqualizer();
            equalizer = $elem.data("plugin_heightEqualizer");

            $elem.css({
                padding: "4px",
                border: "1px solid #999",
                height: "120px"
            });
            expect(equalizer._getElemHeight($elem)).to.be.eql(120);

            $elem.css({
                height: "130px",
                boxSizing: "border-box",
                visibility: "hidden"
            });
            $("body").append($elem);    // appendしないとFirefoxでバグ発生（テストの場合のみ挙動がおかしい）
            expect(equalizer._getElemHeight($elem)).to.be.eql(130);
        });

        it("揃える高さの値が正しく算出されること", function () {
            var $elem = $("<div/>"),
                equalizer,
                height = [336, 96, 264, 48, 120, 240, 144, 72];

            $elem.heightEqualizer();
            equalizer = $elem.data("plugin_heightEqualizer");

            expect(equalizer._getArrangeHeight(height, height.length)).to.be.eql([
                336,
                336,
                336,
                336,
                336,
                336,
                336,
                336
            ]);
        });

        it("n個毎に揃える高さの値が正しく算出されること", function () {
            var $elem = $("<div/>"),
                equalizer,
                height = [336, 96, 264, 48, 120, 240, 144, 72];

            $elem.heightEqualizer({ groupBy: 3 });
            equalizer = $elem.data("plugin_heightEqualizer");

            expect(equalizer._getArrangeHeight(height, height.length)).to.be.eql([
                336,
                336,
                336,
                240,
                240,
                240,
                144,
                144
            ]);
        });

        it("要素に高さが正しくセットされること", function () {
            var $elem = $("<ul id='set_height_test'><li>&nbsp;</li></ul>"),
                equalizer,
                height = [120];

            $(window).on("load", function () {      // load後でないと、プラグイン内init()で設定されるイベントにより正しくテストが行えない
                $("body").append($elem);
                $("#set_height_test").find("li").css("display", "block");
                $("#set_height_test").heightEqualizer();
                equalizer = $("#set_height_test").data("plugin_heightEqualizer");
                equalizer._setHeight(height, height.length)

                expect($("#set_height_test").find("li").css("height")).to.be.eql("120px");
            });
        });
    });

    describe("独自イベント", function () {
        it("テキストサイズの変更監視が正しく動作すること", function (done) {
            var $elem = $("<div/>"),
                equalizer;

            this.timeout(2000);

            $(window).one("fontresize", function () {
                done();
            });

            $elem.heightEqualizer();
            equalizer = $elem.data("plugin_heightEqualizer");
            $("body").css("fontSize", "20px");
        });
    });
});