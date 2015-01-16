jQuery-heightEqualizer [![Build Status](https://secure.travis-ci.org/hideki-a/jQuery-heightEqualizer.png?branch=master)](http://travis-ci.org/hideki-a/jQuery-heightEqualizer)
======================

[MJL.HeightEqualizer](http://www.mitsue.co.jp/knowledge/mjl.html)互換の高さ揃え機能を提供します。jQuery 1.x / 2.xのいずれでも利用できます。

## Demo

* [http://hideki-a.github.io/jQuery-heightEqualizer/demo/](http://hideki-a.github.io/jQuery-heightEqualizer/demo/)

## Getting Started

[jQuery](http://jquery.com/)とjQuery.heightEqualizerを読み込み、次のように記述すると高さ揃えが実行されます。

```js
$(function () {
    $(".selector").heightEqualizer();
});
```

## Options

### groupBy

Type: `Integer`    
Default: `null`

何個ごとにグループ化して高さ揃えを行うかを指定します。

### collect

Type: `Function`    

高さ揃えの対象となる要素を収集し、配列で返す関数です。デフォルトでは、次のようなコードで直接の子要素を収集します。

```
function ($parent) {
    return $parent.children();
}
```

高さ揃えの対象が直接の子要素でない、…例えば`.some-class`が付与された要素を対象にしたい場合は、次のように関数を記述します。

```
function ($parent) {
    return $parent.find(".some-class");
}
```

### checkFontResize

Type: `Boolean`    
Default: `true`

テキストサイズ変更監視の有効無効を指定します。

## Support Browsers

- Internet Explorer 8+
- Firefox
- Chrome
- Safari

## Hints

### ビューポートの幅に応じて、何個ごとにグループ化するかを変えたい

`window.matchMedia`を利用すればよいと思われます。

- [window.matchMedia - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/window.matchMedia)

## Same Plugin

- [Equalizer](https://github.com/CSS-Tricks/Equalizer)

## Release History

- 2014.04.18 v1.0.0 Initial Release.

## License

jQuery.heightEqualizer is released under the [MIT license](http://desandro.mit-license.org/).