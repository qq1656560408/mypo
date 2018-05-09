(function () {
    var PrintMap = {};
    var layer_count = 0;//完成加载数量
    var layer_length = 0;//图层总数
    window.MapToImg = PrintMap;
    var boolWhether = false;//判断是否显示保存界面
    var schemeNmae = '';//计划名称
    var recpolID = 0;
    PrintMap.excute = function (formulateSchemeMap, Whether, Nmae, recpol) {
        boolWhether = Whether;//判断是否显示保存界面
        schemeNmae = Nmae;//获取计划名称
        recpolID = recpol;
        var canvas = document.createElement("canvas");
        var broz = SuperMap.Browser.name;
        if (!canvas.getContext || (broz == 'msie' && !canvas.msToBlob)) {
            alert("您的浏览器版本太低，请升级。");
            return;
        }
        layer_count = 0;

        var layers = formulateSchemeMap.layers.concat([]);
        var layers2 = [];//不要把车也截图
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].CLASS_NAME != "SuperMap.Layer.AnimatorVector") {
                layers2.push(layers[i]);
            }
        }
        layers = layers2;
        //layers排序，将markers放到最上边
        var layers1 = [];
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].CLASS_NAME == "SuperMap.Layer.Markers") {
                var templayer = layers.splice(i, 1);
                layers1.push(templayer[0]);
            }
        }
        layers = layers.concat(layers1);

        layer_length = layers.length;
        var imgUrls = [];
        for (var i = 0; i < layers.length; i++) {

            var layer = layers[i];


            if (layer.CLASS_NAME == "SuperMap.Layer.TiledDynamicRESTLayer") {//服务地图
                if (layer.useCanvas == false) {
                    draw(getImgLayerData(layer, formulateSchemeMap), i, imgUrls);
                }
                else {
                    draw(getCanvasLayerData(layer), i, imgUrls);
                }
            }
            else if (layer.CLASS_NAME == "SuperMap.Layer.Markers") {//标记物
                draw(getImgLayerData(layer, formulateSchemeMap), i, imgUrls);
            }
            else if (layer.CLASS_NAME == "SuperMap.Layer.Vector") {//矢量图层 || 
                getVectorLayerData(layer, formulateSchemeMap, function (imgUrls, i) {
                    return function (img) {
                        draw(img, i, imgUrls);
                    }
                }(imgUrls, i))
            }
        }
    }

    //每次获取图层的图片存到数组里面来
    function draw(img, i, imgUrls) {

        imgUrls[i] = img;
        layer_count++;

        if (layer_count >= layer_length) {//判断是不是全部保存完成了

            var canvas = document.createElement("canvas");
            var size = formulateSchemeMap.getSize();
            canvas.height = size.h;
            canvas.width = size.w;
            var ctx = canvas.getContext("2d");

            canvas.style.position = "relative";
            canvas.style.border = "1px solid #4c4c4c";

            //document.body.appendChild(canvas);

            var panel = document.createElement("div");

            panel.style.position = "absolute";
            panel.style.left = "0px";
            panel.style.top = "0px";
            panel.style.height = "100%";
            panel.style.width = "100%";
            // panel.style.background = "#e6e8eb";
            panel.style.background = "#ffffff";

            if (boolWhether == true) {
                document.body.appendChild(panel);
            }



            var buttonPanel = document.createElement("div");
            buttonPanel.style.position = "relative";
            panel.appendChild(buttonPanel);
            panel.appendChild(canvas);

            window.setTimeout(function () {

                for (var i = 0; i < imgUrls.length; i++) {
                    ctx.drawImage(imgUrls[i], 0, 0);
                }

                if (boolWhether == true) {//判断是不是要显示保存界面
                    if (canvas.msToBlob) {
                        var button = document.createElement("input");
                        buttonPanel.appendChild(button);
                        button.type = "button";
                        button.value = "保存";
                        button.className = 'btn';
                        button.onclick = function () {
                            alert(canvas.msToBlob());
                            window.navigator.msSaveBlob(canvas.msToBlob(), 'map.png');

                        }
                    }
                    else {
                        var aa = document.createElement("a");
                        buttonPanel.appendChild(aa);
                        aa.target = "_blank";
                        aa.download = "map.png";
                        aa.href = canvas.toDataURL();

                        var button = document.createElement("input");
                        aa.appendChild(button);
                        button.type = "button";
                        button.value = "保存";
                        button.className = 'btn';
                    }
                    var button = document.createElement("input");
                    buttonPanel.appendChild(button);
                    button.type = "button";
                    button.value = "关闭";
                    button.className = 'btn';
                    button.onclick = function () {
                        document.body.removeChild(panel);
                        cancelSaveToImgRestore(); //保存成功把地图恢复可以操作状态
                    }
                } else {//直接保存计划


                    savePlan(canvas.toDataURL("image/png"), schemeNmae, recpolID)
                }
            }, 30);
        }
    }
    //截取图片图层  低图和标记图层
    function getImgLayerData(layer, map) {

        var div = layer.div;
        var pdiv = div.parentNode;
        var offsetX = parseInt(pdiv.style.left.replace(/px/, ""));
        var offsetY = parseInt(pdiv.style.top.replace(/px/, ""));

        var canvas = document.createElement("canvas");
        var size = map.getSize();
        canvas.height = size.h;
        canvas.width = size.w;
        var ctx = canvas.getContext("2d");

        canvas.style.position = "absolute";
        canvas.style.left = "5px";
        canvas.style.top = "600px";
        canvas.style.border = "1px solid #f00";

        //document.body.appendChild(canvas);

        var divs = div.getElementsByTagName("div");
        for (var i = 0; i < divs.length; i++) {
            var div1 = divs[i];
            if (div1.style.display != "none") {
                var left = parseInt(div1.style.left.replace(/px/, ""));
                var top = parseInt(div1.style.top.replace(/px/, ""));
                var img = div1.getElementsByTagName("img")[0];
                var imgWidth = img.style.width;
                var imgHeight = img.style.height;
                var imgW = null, imgH = null;
                if (imgWidth != null || imgWidth != "") {
                    imgW = parseInt(imgWidth.replace(/px/, ""));
                }
                if (imgHeight != null || imgHeight != "") {
                    imgH = parseInt(imgHeight.replace(/px/, ""));
                }
                if (imgW != null && imgH != null) {
                    ctx.drawImage(img, left + offsetX, top + offsetY, imgW, imgH);
                }
                else {
                    ctx.drawImage(img, left + offsetX, top + offsetY);
                }
            }
        }

        var imageUrl = canvas.toDataURL("image/png");
        var img = new Image();
        img.src = imageUrl;

        //if (bools==false) {
        //    myfunction1(img);
        //    bools = true;
        //}
        return img;
    }







    //截取canvas图层
    function getCanvasLayerData(layer) {
        var div = layer.div;
        var canvas0 = div.getElementsByTagName("canvas")[0];
        var imageUrl = canvas0.toDataURL("image/png");
        var img = new Image();
        img.src = imageUrl;

        return img;
    }
    //截取Vector图层
    function getVectorLayerData(layer, map, callback) {
        // console.log("====================================================================================================================");

        var printLayer,
            strategy,
			features1 = [],
			features = layer.features,
			layerStrategies = layer.strategies;


        //GeoText无法截图问题修复
        if (layerStrategies) {
            strategy = new SuperMap.Strategy.GeoText();
            strategy.style = layerStrategies[0].style;
            printLayer = new SuperMap.Layer.Vector("PRINT_LAYER", { strategies: [strategy], visibility: true, renderers: ["Canvas"] });

        } else {
            printLayer = new SuperMap.Layer.Vector("PRINT_LAYER", { visibility: true, renderers: ["Canvas"] });

        }
        map.addLayer(printLayer);
        for (var j = 0; j < features.length; j++) {
            var feature = features[j];
            var feature1 = new SuperMap.Feature.Vector();
            feature1.geometry = feature.geometry;//.clone() 不要加这个单子否则获取不到自己画的图层
            feature1.style = feature.style;
            features1.push(feature1);
        }

        if (layer.style) {
            printLayer.style = layer.style;
        }

        printLayer.setOpacity(0);
        printLayer.addFeatures(features1);


        window.setTimeout(function (printLayer, map, callback) {

            return function () {


                var div = printLayer.div;

                var canvas1 = div.getElementsByTagName("canvas")[0];

                var cxt1 = canvas1.getContext("2d");

                var imageUrl = canvas1.toDataURL("image/png");
                map.removeLayer(printLayer);
                printLayer.destroy();

                var img = new Image();
                img.src = imageUrl;
                callback(img);

            }
        }(printLayer, map, callback), 30);
    }
})()